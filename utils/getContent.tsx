/* Other libraries
import matter from "gray-matter";
import fs from "fs";

interface Props {
  contentType: "services" | "pages";
}

const contentTypes = {
  services: getServices,
  pages: getPages,
};

const getContent = async ({ contentType }: Props) => {
  return contentTypes[contentType]();
};

async function getServices() {
  const contentFiles = fs.readdirSync("content/services").sort();
  const contentFileData = contentFiles.map(async (file) => {
    const fileData = await import(`../content/services/${file}`);
    const { data, content } = matter(fileData.default);
    return {
      slug: file.split(".")[1],
      frontmatter: data,
      body: content,
    };
  });
  return await Promise.all(contentFileData);
}

async function getPages() {
  const contentFiles = fs.readdirSync("content/pages").sort();
  const contentFileData = contentFiles.map(async (file) => {
    const fileData = await import(`../content/pages/${file}`);
    const { data, content } = matter(fileData.default);
    return {
      slug: file.split(".")[1],
      frontmatter: data,
      body: content,
    };
  });
  return await Promise.all(contentFileData);
}

export default getContent;*/

import matter from "gray-matter";
import {
  getFiles as getGithubFiles,
  getGithubPreviewProps,
  parseMarkdown,
} from "next-tinacms-github";

const getContent = async (preview, previewData, contentDir) => {
  const fs = require("fs");
  const files = preview
    ? await getGithubFiles(
        contentDir,
        previewData.working_repo_full_name,
        previewData.head_branch,
        previewData.github_access_token
      )
    : await getLocalFiles(contentDir);
  const posts = await Promise.all(
    files.map(async (file) => {
      if (preview) {
        const previewProps = await getGithubPreviewProps({
          ...previewData,
          fileRelativePath: file,
          parse: parseMarkdown,
        });
        return {
          fileName: file.substring(contentDir.length + 1, file.length - 3),
          fileRelativePath: file,
          data: previewProps.props.file?.data,
          slug: file
            .substring(contentDir.length + 1, file.length - 3)
            .split(".")[1],
        };
      }
      const content = fs.readFileSync(`${file}`, "utf8");
      const data = matter(content);
      return {
        fileName: file.substring(contentDir.length + 1, file.length - 3),
        fileRelativePath: file,
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        },
      };
    })
  );
  return posts;
};

const getLocalFiles = async (filePath) => {
  // grab all md files
  const fg = require("fast-glob");
  const files = await fg(`${filePath}**/*.md`);
  return files;
};

export default getContent;
