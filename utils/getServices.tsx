// Other libraries
import matter from "gray-matter";
import fs from "fs";

const getServices = async () => {
  const servicesDirectory = "content/services";
  const services = fs.readdirSync(servicesDirectory).sort();
  const serviceData = services.map(async (file) => {
    const fileData = await import(`../content/services/${file}`);
    const { data, content } = matter(fileData.default);
    return {
      slug: file.split(".")[1],
      frontmatter: data,
      body: content,
    };
  });

  return Promise.all(serviceData);
};

export default getServices;

const getServiceSlugs = async () => {
  
}