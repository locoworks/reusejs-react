// const fs = require("fs");
// const path = require("path");

// const folderPath = "./scripts/scaffold/component/<to-replace>"; // Replace with the actual folder path
// const replacementText = process.argv[2]; // Argument passed to the script

// // Read all files in the folder

const fs = require("node:fs");
const ncp = require("ncp").ncp;
const path = require("path");

const replacementText = process.argv[2];

// const pack = fs.readFileSync(
//   "./scripts/scaffold/component/<to-replace>/package.json",
//   "utf-8"
// );

// console.log(">>>>>>", pack);

function reformat(folderPath) {
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    let fileContent = fs.readFileSync(filePath, "utf-8");
    fileContent = fileContent.replace(/<to-replace>/g, replacementText);
    fs.writeFileSync(filePath, fileContent, "utf-8");
  });
}

const componentSourceFolderPath = "./scripts/scaffold/component"; // Replace with the actual source folder path
const componentTargetFolderPath = "./components/" + process.argv[2]; // Replace with the actual target folder path
const devAppSourceFolderPath = "./scripts/scaffold/dev-app"; // Replace with the actual source folder path
const devAppTargetFolderPath = "./development/" + process.argv[2] + "-app"; // Replace with the actual target folder path

// Copy the folder and its contents
ncp(componentSourceFolderPath, componentTargetFolderPath, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Component Folder created successfully.");
    reformat(componentTargetFolderPath);
  }
});

ncp(devAppSourceFolderPath, devAppTargetFolderPath, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Development folder created successfully.");
    reformat(devAppTargetFolderPath);
  }
});
