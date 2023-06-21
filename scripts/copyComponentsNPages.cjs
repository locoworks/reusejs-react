const fs = require("node:fs");
const ncp = require("ncp").ncp;

const devAppsPath = "./development";

//Get Component Folder of each Development app
const getComponentFoldersList = () => {
  const componentList = fs
    .readdirSync(devAppsPath)
    .map((app) => "./development/" + app + "/components");
  const pagesList = fs
    .readdirSync(devAppsPath)
    .map((app) => "./development/" + app + "/pages");
  console.log(">>>", componentList);
  // console.log("dev>>", {
  //   componentsPathList: [...componentList],
  //   pagesPathList: [...pagesList],
  // });
  componentList.forEach((sourcePath) =>
    copyToFolder(sourcePath, "./docs/components")
  );
  pagesList.forEach((sourcePath) => copyToFolder(sourcePath, "./docs/pages"));
  // copyToFolder();
};

const copyToFolder = (source, target) => {
  ncp(source, target, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Component Folder created successfully.");
      // reformat(componentTargetFolderPath);
    }
  });
};

getComponentFoldersList();
