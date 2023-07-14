import fs from "node:fs";
import pkg from "ncp";
const { ncp } = pkg;

const devAppsPath = "./development";

/**
 * Filter function to exclude specific source files.
 *
 * @param {string} source - The source file path to be evaluated.
 * @returns {boolean} - Returns false if the source file path matches any of the exclusion conditions, otherwise returns true.
 */
const filterFn = (source) => {
  if (
    source.includes("/_app.tsx") ||
    source.includes("/_document.tsx") ||
    source.includes("/index.tsx")
  )
    return false;
  return true;
};

/**
 * Copy file from source directory to target directory using filter function
 *
 * @param {string} source
 * @param {string} target
 * @returns {void}
 */
const copyToFolder = (source, target) => {
  ncp(source, target, { filter: filterFn }, function (err) {
    if (err) {
      console.error(err);
    }
  });
};

/**
 * Copy component and page folders to the documentation directory.
 * This function retrieves the component and page folders from the development apps and copies them to the specified destination directories in the documentation.
 * The function excludes specific folders and performs the copy operation using the copyToFolder() function.
 *
 * @returns {void}
 */
const getComponentFoldersList = () => {
  const componentList = fs
    .readdirSync(devAppsPath)
    .filter((ele) => !ele.includes("toolkits-app"))
    .map((app) => "./development/" + app + "/components");
  const pagesList = fs
    .readdirSync(devAppsPath)
    .filter((ele) => !ele.includes("toolkits-app"))
    .map((app) => "./development/" + app + "/pages");
  componentList.forEach((sourcePath) =>
    copyToFolder(sourcePath, "./docs/components")
  );
  pagesList.forEach((sourcePath) => copyToFolder(sourcePath, "./docs/pages"));
  copyToFolder("./development/toolkits-app/pages", "./docs/pages");
};

export default getComponentFoldersList;
