/**
 * This script is used to generate Table of Content for each documentation file and save to data directory in root.
 * This data is then used during build time to generate Tabel of content for right-sidebar during build time
 * It uses remark-extract-toc to fetch toc from the mdx files
 */
import { unified } from "unified";
import markdown from "remark-parse";
import extractToc from "remark-extract-toc";
import fs from "node:fs";

/**
 * Write data to a file at the specified path.
 * This function writes the provided data to a file at the specified path. If an error occurs during the writing process, it logs the error to the console.
 *
 * @param {string} path - The path of the file to write.
 * @param {string} data - The data to be written to the file.
 * @returns {void}
 */
const writeToFile = (path, data) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      console.log("Error while writing to path>>", path, err);
    }
  });
};

/**
 * Export the table of contents (TOC) from a Markdown file.
 * This function reads the content of the Markdown file at the specified path, extracts the table of contents, and returns the resulting tree structure representing the TOC.
 *
 * @param {string} path - The path of the Markdown file.
 * @returns {object} - The tree structure representing the table of contents.
 */
const exportToC = (path) => {
  var text = fs.readFileSync(path, "utf8");
  var processor = unified().use(markdown).use(extractToc);
  var node = processor.parse(text);
  var tree = processor.runSync(node);

  return tree;
};

/**
 * Create JSON files for the table of contents (TOC) of the pages and components.
 * This function generates JSON files containing the table of contents (TOC) data for the pages and components in the specified directory. It utilizes the exportToC function to extract the TOC from each file and writes the resulting data to JSON files.
 * It reads the files and directory asynchronously whihc will improve the speed as when the number of paths to read is large
 *
 * @returns {Promise<void>} - A promise that resolves when the JSON files are created.
 */
const createTocJSON = async () => {
  const path = "./development";

  const dir = await fs.promises.readdir(path);
  const filteredDir = dir.filter((ele) => !ele.includes("toolkits-app"));

  await Promise.all(
    filteredDir.map(async (ele) => {
      const cleanedEle = ele.replace("-app", "");
      const data = exportToC(
        path + "/" + cleanedEle + "-app/pages/" + cleanedEle + "/index.mdx"
      );
      const jsonData = JSON.stringify(data, null, 2);
      writeToFile("./data/" + cleanedEle + "-toc.json", jsonData);
    })
  );

  const toolkitsPaths = [
    path + "/toolkits-app/pages/hooks",
    path + "/toolkits-app/pages/utils",
  ];

  await Promise.all(
    toolkitsPaths.map(async (file) => {
      const list = await fs.promises.readdir(file);
      const filteredList = list.filter((ele) => ele.includes("mdx"));

      await Promise.all(
        filteredList.map(async (ele) => {
          const data = exportToC(file + "/" + ele);
          const jsonData = JSON.stringify(data, null, 2);
          writeToFile(
            "./data/" + ele.replace(".mdx", "") + "-toc.json",
            jsonData
          );
        })
      );
    })
  );
};

export default createTocJSON;
