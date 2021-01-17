// Next Imports
import { GetStaticProps } from 'next';
import Head from 'next/head'

// Tina imports
import { useCMS, usePlugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm } from 'react-tinacms-inline';

// My components
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import Hero from '../components/hero/Hero';
import Slider from '../components/slider/Slider';
import Contact from '../components/contact-form/ContactForm';
import Footer from '../components/layout/Footer';
import DataContext from '../contexts/DataContext';

export default function Home({ file }) {
  const cms = useCMS();
  if (cms.enabled) {
    import("react-tinacms-editor").then(
      ({ MarkdownFieldPlugin }) => {
        cms.plugins.add(MarkdownFieldPlugin)
      }
    )
  }
  const formOptions = {
    label: 'Home Page',
    fields: [{
      label: 'Slides',
      name: 'slides',
      component: 'group-list',
      description: 'Slides',
      itemProps: item => ({
        label: item.title
      }),
      defaultItem: () => ({
        text: 'Sample text',
        image: 'https://source.unsplash.com/random'
      }),
      fields: [{
        label: 'Title',
        name: 'title',
        component: 'text'
      },
        {
          label: 'Text',
          name: 'text',
          component: 'markdown',
        },
        {
          label: 'Image',
          name: 'image',
          component: 'image',
          parse: media => `/images/${media.filename}`
        },
      ],
    },
    ],
  }
  const [data, form] = useGithubJsonForm(file, formOptions)
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
          <Slider slides={data.slides} />
          <Contact />
          <Footer />
        </DataContext.Provider>
      </InlineForm>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async function ({ preview, previewData }) {
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