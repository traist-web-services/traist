import Head from 'next/head'

import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { GetStaticProps } from 'next';

import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import Hero from '../components/hero/Hero';
import Slider from '../components/slider/Slider';
import Contact from '../components/contact-form/ContactForm';
import Footer from '../components/layout/Footer';
import { parse } from 'path';

export default function Home({file}) {
  const data = file.data;
  return (
    <Layout>
      <Head>
        <title>Traist - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
      </div>
      <Slider />
      <Contact />
      <Footer />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async function ({preview, previewData}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default
      }
    }
  }
  
}