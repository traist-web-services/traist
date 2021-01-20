import fs from "fs";

interface Props {
  directory: string;
  mountPath: string;
}

const getSlugs = ({ directory, mountPath }: Props) => {
  const fileList = fs.readdirSync(directory);
  const slugs = fileList.map((file) => file.split(".")[0].trim());

  const paths = slugs.map((slug) => `/${mountPath}/${slug}`);
  return {
    paths,
    fallback: false,
  };
};

export default getSlugs;
