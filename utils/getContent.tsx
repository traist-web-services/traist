// Other libraries
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

export default getContent;
