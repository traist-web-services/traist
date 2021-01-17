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

export default function Home({ file, allServices }) {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InlineForm form={form}>
        <DataContext.Provider value={data}>
          <div className="min-h-screen flex flex-col">
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
}

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
      },
    },
    revalidate: 3,
  };
};
