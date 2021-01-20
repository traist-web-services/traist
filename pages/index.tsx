// Next Imports
import { GetStaticProps } from "next";
import Head from "next/head";

// Tina imports
import { usePlugin } from "tinacms";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import {
  useGithubToolbarPlugins,
  useGithubJsonForm,
} from "react-tinacms-github";
import { InlineForm } from "react-tinacms-inline";

// Utils
import getContent from "../utils/getContent";

// My components
import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";
import Hero from "../components/hero/Hero";
import Slider from "../components/slider/Slider";
import ContactForm from "../components/contact-form/ContactForm";
import Footer from "../components/layout/Footer";
import DataContext from "../contexts/DataContext";
import styles from "./index.module.scss";

interface File {
  fileRelativePath: string;
  data: string;
  sha: string;
}

interface Service {
  fileName: string;
  fileRelativePath: string;
  data: {
    markdownBody: string;
    frontmatter: {
      excerpt: string;
      image: string;
      title: string;
    };
  };
}

interface Props {
  file: File;
  allServices: Service[];
}
const Home = ({ file, allServices }: Props) => {
  const slides = allServices
    ? allServices.map((thisService: Service) => {
        const service = thisService.data;
        const slug = thisService.fileName.split(".")[1];
        return {
          text: service.frontmatter.excerpt,
          image: service.frontmatter.image,
          title: service.frontmatter.title,
          linkTo: `/services/${slug}`,
        };
      })
    : [];

  const [data, form] = useGithubJsonForm(file);
  usePlugin(form);
  useGithubToolbarPlugins();
  return (
    <Layout>
      <Head>
        <title>Traist - Home</title>
      </Head>
      <InlineForm form={form}>
        <DataContext.Provider value={data}>
          <div className={styles.heroContainer}>
            <Header />
            <Hero />
          </div>
          <Slider slides={slides} />
          <ContactForm displayChrome={true} />
          <Footer />
        </DataContext.Provider>
      </InlineForm>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    const githubPreviewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });

    const returnObj = {
      props: {
        allServices: await getContent(preview, previewData, "content/services"),
        ...githubPreviewProps.props,
      },
    };
    return returnObj;
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      allServices: await getContent(preview, previewData, "content/services"),
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
        sha: "",
      },
    },
    revalidate: 3,
  };
};

export default Home;
