import fs from "fs";

interface Props {
  slug: string | string[];
  directory: string;
}

const getFileNameFromSlug = ({ slug, directory }: Props) => {
  const fileList = fs.readdirSync(directory);
  const slugs = fileList.map((file) => {
    return {
      slug: file.split(".")[1].trim(),
      fullFileName: file,
    };
  });

  const thisFile = slugs.find((el) => el.slug === slug);
  return thisFile.fullFileName;
};

export default getFileNameFromSlug;
