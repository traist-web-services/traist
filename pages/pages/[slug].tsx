// Next Imports
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

// Tina imports
import { useCMS, usePlugin } from "tinacms";
import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github";
import {
  useGithubToolbarPlugins,
  useGithubMarkdownForm,
} from "react-tinacms-github";
import { InlineForm, InlineTextarea, InlineImage } from "react-tinacms-inline";

// Other libraries
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

// My Components
import Layout from "../../components/layout/Layout";
import DataContext from "../../contexts/DataContext";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import InlineWysiwyg from "../../components/inline-wysiwyg/InlineWysiwyg";
import styles from "./[slug].module.scss";
import getSlugs from "../../utils/getSlugs";
import getFileNameFromSlug from "../../utils/getFileNameFromSlug";

interface Props {
  file: File;
}

interface File {
  fileRelativePath: string;
  data: string;
  sha: string;
}

const PageTemplate = ({ file }: Props) => {
  const cms = useCMS();
  if (cms.enabled) {
    import("react-tinacms-editor").then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin);
    });
  }
  const formOptions = {
    label: "Service",
    fields: [
      {
        name: "frontmatter.image",
        label: "Image",
        component: "image",
        parse: (media) => `/images/${media.filename}`,
        uploadDir: () => "public/images/",
      },
    ],
  };
  const [data, form] = useGithubMarkdownForm(file, formOptions);
  usePlugin(form);
  useGithubToolbarPlugins();
  return (
    <Layout>
      <Head>
        <title>Traist - {data.frontmatter.title}</title>
      </Head>
      <InlineForm form={form}>
        <Header />
        <DataContext.Provider value={data}>
          <div className={styles.imageContainer}>
            <InlineImage
              name="frontmatter.image"
              parse={(media) => `/images/${media.filename}`}
              uploadDir={() => "/public/images"}
              alt={`Illustration for the ${data.frontmatter.title} page.`}
            >
              {(props) => (
                <Image
                  src={props.src}
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                />
              )}
            </InlineImage>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.articleContainer}>
              <article className={styles.article}>
                <h1 className={styles.title}>
                  <InlineTextarea name="frontmatter.title" />
                </h1>
                <div className={styles.content}>
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
  );
};

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  ...ctx
}) {
  const { slug } = ctx.params;
  const fileRelativePath = `content/pages/${slug}.md`;

  const content = await import(`../../content/pages/${slug}.md`);
  // const config = await import(`../../data/config.json`)
  const data = matter(content.default);
  if (preview) {
    const githubPreviewProps = getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    });
    return githubPreviewProps;
  }

  return {
    props: {
      siteTitle: "Traist",
      file: {
        fileRelativePath,
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        },
      },
    },
    revalidate: 3,
  };
};

export async function getStaticPaths() {
  return getSlugs({
    directory: "content/pages",
    mountPath: "pages",
  });
}

export default PageTemplate;
