// Next Imports
import { GetStaticProps } from 'next';
import Head from 'next/head'

// Tina imports
import { useForm, usePlugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins } from 'react-tinacms-github';
import { InlineForm } from 'react-tinacms-inline';

// My components
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import Hero from '../components/hero/Hero';
import Slider from '../components/slider/Slider';
import Contact from '../components/contact-form/ContactForm';
import Footer from '../components/layout/Footer';

export default function Home({file}) {
  const data = file.data;
  const [, form] = useForm(data)
  usePlugin(form)
  useGithubToolbarPlugins();
  return (
    <Layout>
      <Head>
        <title>Traist - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InlineForm form={form}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Hero />
        </div>
        <Slider />
        <Contact />
        <Footer />
      </InlineForm>
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