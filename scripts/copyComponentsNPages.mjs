// const fs = require("node:fs");
// const ncp = require("ncp").ncp;
import fs from "node:fs";
import pkg from "ncp";
const { ncp } = pkg;

const devAppsPath = "./development";

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
  copyToolkits("./development/toolkits-app/pages", "./docs/pages");
};

const copyToolkits = (source, target) => {
  const filterFn = (source) => {
    if (
      source.includes("_app.tsx") ||
      source.includes("_document.tsx") ||
      source.includes("index.tsx")
    )
      return false;
    return true;
  };

  ncp(source, target, { filter: filterFn }, function (err) {
    if (err) {
      console.error(err);
    } else {
      // console.log("Component Folder created successfully.");
    }
  });
};
const copyToFolder = (source, target) => {
  const filterFn = (source) => {
    if (
      source.includes("_app.tsx") ||
      source.includes("_document.tsx") ||
      source.includes("index.tsx")
    )
      return false;
    return true;
  };

  ncp(source, target, { filter: filterFn }, function (err) {
    if (err) {
      console.error(err);
    } else {
      // console.log("Component Folder created successfully.");
    }
  });
};

// module.exports = getComponentFoldersList;
export default getComponentFoldersList;
