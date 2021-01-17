// Next Imports
import { GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image';

// Tina imports
import { useCMS, usePlugin } from 'tinacms';
import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubMarkdownForm } from 'react-tinacms-github';
import { InlineForm, InlineTextarea, InlineImage } from 'react-tinacms-inline';

// Other libraries
import matter from 'gray-matter';
import fs from 'fs';
import ReactMarkdown from 'react-markdown';

// My Components
import Layout from '../../components/layout/Layout';
import DataContext from '../../contexts/DataContext';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { InlineWysiwyg } from '../../components/inline-wysiwyg/InlineWysiwyg';

export default function ServiceTemplate(props) {
  const cms = useCMS();
  const test = async () => {
    console.log(await cms.api.github)
  }
  test();
  if (cms.enabled) {
    import("react-tinacms-editor").then(
      ({ MarkdownFieldPlugin }) => {
        cms.plugins.add(MarkdownFieldPlugin)
      }
    )
  }
  const formOptions = {
    label: 'Service',
    fields: [{
      name: 'frontmatter.image',
      label: 'Image',
      component: 'image',
      parse: media => `/images/${media.filename}`,
      uploadDir: () => 'public/images/',
    }, {
      name: 'frontmatter.excerpt',
      label: 'Excerpt',
      component: 'markdown'
    }]
  }
  const [data, form] = useGithubMarkdownForm(props.file, formOptions)
  usePlugin(form);
  useGithubToolbarPlugins();
  return (
    <Layout>
      <Head>
        <title>{data.frontmatter.title}</title>
      </Head>
      <InlineForm form={form}>
        <Header />
        <DataContext.Provider value={data}>
          <div className="relative h-96 w-full">
            <InlineImage 
              name="frontmatter.image" 
              parse={media => `/images/${media.filename}`} 
              uploadDir={() => '/public/images'} 
              alt={`Illustration for the ${data.frontmatter.title} service.`}
              >
              {props => <Image src={props.src} layout="fill" objectFit="cover" />}
            </InlineImage>
          </div>
          <div className="relative flex items-center -top-16">
            <div className="bg-white p-16 pt-8 mx-auto rounded-lg">
              <article className="max-w-prose">
                <h1 className="text-6xl font-bold mb-4">
                  <InlineTextarea name="frontmatter.title" />
                </h1>
                <div className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
                  <InlineWysiwyg name="markdownBody" format="markdown">
                    <ReactMarkdown source={data.markdownBody} />
                  </InlineWysiwyg>
                </div>
              </article>
            </div>
          </div>
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

    const githubPreviewProps = getGithubPreviewProps({
      ...previewData,
      fileRelativePath: `content/services/${slug}.md`,
      parse: parseMarkdown
    })
    return githubPreviewProps;
  }

  return {
    props: {
      siteTitle: 'Traist',
      file: {
        fileRelativePath: `content/services/${slug}.md`,
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        }
      }
    }
  }
}

export async function getStaticPaths() {
  const servicesDirectory = 'content/services';
  const services = fs.readdirSync(servicesDirectory);
  const serviceSlugs = services.map(file =>
    file
      .split('.')[0]
      .trim()
  )

  const paths = serviceSlugs.map(slug => `/services/${slug}`)

  return {
    paths,
    fallback: false,
  }
}