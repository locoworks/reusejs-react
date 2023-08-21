/**
 * This script is used to add sitewrapper wrapper to all docs page if not already added.
 * It adds import for site wrapper and toc file which is generated for each page
 * and add a SiteWrapper to children which will render the toc as sidebar in the final output
 */

import fs from "node:fs";
import { writeToFile } from "./writeToFile.mjs";

const LINETOADD = `import SiteWrapper from "../../components/support/SiteWrapper.tsx"`;
const WRAPPERSTART = `<SiteWrapper toc={toc}>`;
const SNIPPERTOWRAP =
  '<div className="prose max-w-full mx-4 pb-10" >{children}</div>';
const WRAPPEREND = "</SiteWrapper>";
const PATH = "./docs/pages";

/**
 * Updates the content of a file with Sitewrapper imports and wrappers.
 * Also add toc import for each mdx doc which generates right side bar toc
 *
 * @param {string} data - The original content of the file.
 * @param {number} importIndex - The index at which the toc import statement is located.
 * @param {string} tocImport - The import statement for the table of contents (TOC) file.
 * @returns {string} - The updated content with added imports and wrappers.
 */
const getUpdatedContent = (data, importIndex, tocImport) => {
  let updatedContent =
    data.slice(0, importIndex) +
    LINETOADD +
    "\n" +
    tocImport +
    "\n" +
    data.slice(importIndex);

  updatedContent = updatedContent.replace(
    new RegExp(SNIPPERTOWRAP, "g"),
    `${WRAPPERSTART}${SNIPPERTOWRAP}${WRAPPEREND}`
  );

  return updatedContent;
};

/**
 * Adds necessary imports and wraps content in a docs index.mdx for each file in the specified path. This function is specifically for componnet docs only not hooks and utils
 *
 * @param {string} path - The path of the directory containing the files.
 * @returns {Promise} - A promise that resolves when all files are processed.
 */
const addToComponents = async (path) => {
  const dirs = await fs.promises.readdir(path);
  const temp = dirs
    .filter((ele) => !ele.includes("hooks"))
    .filter((ele) => !ele.includes("utils"));

  await Promise.all(
    temp.map(async (file) => {
      const fileStat = await fs.promises.stat(path + "/" + file);
      if (fileStat.isDirectory()) {
        try {
          const data = await fs.promises.readFile(
            path + "/" + file + "/index.mdx",
            "utf8"
          );
          const importIndex = data.indexOf("import");
          if (importIndex === -1) {
            console.log(`No import statement found in file ${file}`);
            return;
          }
          if (
            data.includes(LINETOADD) &&
            data.includes(WRAPPERSTART) &&
            data.includes(WRAPPEREND)
          ) {
            console.log("Already configured");
            return;
          }
          const tocImport = `import toc from "../../../data/${file}-toc.json" `;

          const updatedContent = getUpdatedContent(
            data,
            importIndex,
            tocImport
          );

          writeToFile(path + "/" + file + "/index.mdx", updatedContent);
        } catch (err) {
          console.log("Unable to read file!!", err);
        }
      }
    })
  );
};

/**
 * Adds necessary imports and wraps content in a documentation file for each file in the specified toolkits path. This is for hooks and utils specific
 *
 * @param {string} path - The path of the directory containing the toolkits.
 * @returns {Promise} - A promise that resolves when all files are processed.
 */
const addToToolkits = async (path) => {
  const toolkitsFolder = ["hooks", "utils"];

  await Promise.all(
    toolkitsFolder.map(async (file) => {
      const fileStat = await fs.promises.stat(path + "/" + file);
      if (fileStat.isDirectory()) {
        const files = await fs.promises.readdir(path + "/" + file);

        await Promise.all(
          files.map(async (toolkitFile) => {
            try {
              const data = await fs.promises.readFile(
                path + "/" + file + "/" + toolkitFile,
                "utf8"
              );

              if (data.includes(LINETOADD)) {
                console.log("Already configured");
                return;
              }
              const tocImport = `import toc from "../../../data/${toolkitFile.replace(
                ".mdx",
                ""
              )}-toc.json"\n`;
              const importIndex = data.indexOf("##");

              const updatedContent = getUpdatedContent(
                data,
                importIndex,
                tocImport
              );

              writeToFile(
                path + "/" + file + "/" + toolkitFile,
                updatedContent
              );
            } catch (err) {
              console.log("unable to read file!!", err);
            }
          })
        );
      }
    })
  );
};

/**
 * Adds necessary imports and wraps content in a component for each file in the specified path.
 * Calls the functions addToComponents and addToToolkits to process the files.
 *
 * @returns {Promise} - A promise that resolves when all files are processed.
 */
const addSiteWrapper = async () => {
  await addToComponents(PATH);
  await addToToolkits(PATH);
};

export default addSiteWrapper;
