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
  const content = await Promise.all(
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
            .split(".")[0],
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
        slug: file
          .substring(contentDir.length + 1, file.length - 3)
          .split(".")[0],
      };
    })
  );
  return content.sort(
    (a: any, b: any) =>
      a?.data?.frontmatter?.sortOrder - b?.data?.frontmatter?.sortOrder
  );
};

const getLocalFiles = async (filePath: string) => {
  // grab all md files
  const fg = require("fast-glob");
  const files = await fg(`${filePath}/*.md`);
  return files;
};

export default getContent;
