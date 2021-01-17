// Next Imports
import { GetStaticProps } from 'next';
import Head from 'next/head'

// Tina imports
import { useCMS, usePlugin } from 'tinacms';
import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubMarkdownForm } from 'react-tinacms-github';
import { InlineForm, InlineTextarea } from 'react-tinacms-inline';

// Other libraries
import matter from 'gray-matter';
import fs from 'fs';
import ReactMarkdown from 'react-markdown';

// My Components
import Layout from '../../components/layout/Layout';
import DataContext from '../../contexts/DataContext';
import Footer from '../../components/layout/Footer';

export default function ServiceTemplate(props) {
  const formOptions = {
    label: 'Service',
    fields: [{
      name: 'excerpt',
      component: 'textarea'
    }]
  }
  const [data, form] = useGithubMarkdownForm(props.file, formOptions)
  usePlugin(form);
  useGithubToolbarPlugins();
  return (
    <Layout>
      <InlineForm form={form}>
        <DataContext.Provider value={data}>
          <article>
            <h1><InlineTextarea name="frontmatter.title" /></h1>
            <div>
              <ReactMarkdown source={props.file.markdownBody} />
            </div>
            {props.file.frontmatter.title}
          </article>
          <Footer />
        </DataContext.Provider>
      </InlineForm>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async function ({ preview, previewData, ...ctx }) {
  const { slug } = ctx.params
  const content = await import(`../../content/services/${slug}.md`)
  // const config = await import(`../../data/config.json`)
  const data = matter(content.default)

  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      siteTitle: 'Traist',
      file: {
        fileRelativePath: `content/services/${slug}.md`,
        frontmatter: data.data,
        markdownBody: data.content,
      },
      //parse: parseMarkdown
    })
  }

  return {
    props: {
      siteTitle: 'Traist',
      file: {
        fileRelativePath: `content/services/${slug}.md`,
        frontmatter: data.data,
        markdownBody: data.content,
      }
    }
  }
}

export async function getStaticPaths() {
  //get all .md files in the posts dir
  const servicesDirectory = 'content/services';
  const services = fs.readdirSync(servicesDirectory);
  //remove path and extension to leave filename only
  const serviceSlugs = services.map(file =>
    file
      .split('.')[0]
      .trim()
  )

  // create paths with `slug` param
  const paths = serviceSlugs.map(slug => `/services/${slug}`)

  return {
    paths,
    fallback: false,
  }
}