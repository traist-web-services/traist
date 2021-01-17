// Next Imports
import { GetStaticProps } from 'next';
import Head from 'next/head'

// Tina imports
import { useCMS, usePlugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm } from 'react-tinacms-inline';

// Other libraries
import matter from 'gray-matter';

// My components
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import Hero from '../components/hero/Hero';
import Slider from '../components/slider/Slider';
import Contact from '../components/contact-form/ContactForm';
import Footer from '../components/layout/Footer';
import DataContext from '../contexts/DataContext';

export default function Home({ file, allServices }) {
  const slides = allServices.map(service => {
    return {
      text: service.frontmatter.excerpt.replaceAll('\\n', "\n"),
      image: service.frontmatter.image,
      title: service.frontmatter.title
    }
  })

  const [data, form] = useGithubJsonForm(file)
  usePlugin(form)
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
  )
}

export const getStaticProps: GetStaticProps = async function ({ preview, previewData }) {

  const services = (context => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        slug
      }
    })
    return data
  })(require.context('../content/services', true, /\.md$/))

  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      allServices: services,
      fileRelativePath: 'content/home.json',
      parse: parseJson
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      allServices: services,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default
      }
    }
  }
}