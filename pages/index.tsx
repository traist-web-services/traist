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

// Other libraries
import matter from "gray-matter";
import fs from "fs";

// My components
import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";
import Hero from "../components/hero/Hero";
import Slider from "../components/slider/Slider";
import Contact from "../components/contact-form/ContactForm";
import Footer from "../components/layout/Footer";
import DataContext from "../contexts/DataContext";
import styles from "./index.module.scss";

interface File {
  fileRelativePath: string;
  data: string;
  sha: string;
}

interface Service {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
}

interface Frontmatter {
  excerpt: string;
  image: string;
  title: string;
}

interface Props {
  file: File;
  allServices: Service[];
}
const Home = ({ file, allServices }: Props) => {
  const slides = allServices
    ? allServices.map((service) => {
        return {
          text: service.frontmatter.excerpt,
          image: service.frontmatter.image,
          title: service.frontmatter.title,
          linkTo: `/services/${service.slug}`,
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
          <Contact />
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
  const servicesDirectory = "content/services";
  const services = fs.readdirSync(servicesDirectory);
  const serviceData = services.map(async (file) => {
    const fileData = await import(`../content/services/${file}`);
    const { data, content } = matter(fileData.default);
    return {
      slug: file.split(".")[0],
      frontmatter: data,
      body: content,
    };
  });

  const settledPromises = await Promise.all(serviceData);

  if (preview) {
    const githubPreviewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });

    const returnObj = {
      props: {
        allServices: settledPromises,
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
      allServices: settledPromises,
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
