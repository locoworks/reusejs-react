// const fs = require("fs");
// const path = require("path");

// const folderPath = "./scripts/scaffold/component/<to-replace>"; // Replace with the actual folder path
// const replacementText = process.argv[2]; // Argument passed to the script

// // Read all files in the folder

const fs = require("node:fs");
const ncp = require("ncp").ncp;
const path = require("path");

const replacementText = process.argv[2];

function reformat(folderPath) {
  try {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        let fileContent = fs.readFileSync(filePath, "utf-8");
        fileContent = fileContent.replace(/<to-replace>/g, replacementText);
        fs.writeFileSync(filePath, fileContent, "utf-8");
      }
    });
  } catch (error) {
    console.log("Error is >>", error);
  }
}

const componentSourceFolderPath = "./scripts/scaffold/component"; // Replace with the actual source folder path
const componentTargetFolderPath = "./components/" + process.argv[2]; // Replace with the actual target folder path
const devAppSourceFolderPath = "./scripts/scaffold/dev-app"; // Replace with the actual source folder path
const devAppTargetFolderPath = "./development/" + process.argv[2] + "-app"; // Replace with the actual target folder path

// Copy the folder and its contents for component repo
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

const filePath = "./package.json";
const lineToAdd1 = `"${replacementText}:dev": "turbo run dev --filter=${replacementText}-app...",`;
const lineToAdd2 = `"${replacementText}:build": "turbo run build --filter=@locoworks/reusejs-react-${replacementText}...",`;

const fileContent = fs.readFileSync(filePath, "utf-8");

const lines = fileContent.split("\n");

const insertionIndex = 19;
lines.splice(insertionIndex, 0, lineToAdd2);
lines.splice(insertionIndex, 0, lineToAdd1);

const updatedContent = lines.join("\n");

fs.writeFileSync(filePath, updatedContent, "utf-8");
