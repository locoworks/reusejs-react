import fs from "node:fs";
import path from "path";
import pkg from "ncp";
const { ncp } = pkg;

const replacementText = process.argv[2];

//Function to Replace all occurances of <to-replace> with the given component name
function reformat(folderPath) {
  try {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        let fileContent = fs.readFileSync(filePath, "utf-8");
        fileContent = fileContent.replace(/<to-replace>/g, replacementText);
        fs.writeFileSync(filePath, fileContent, "utf-8");
      } else {
        reformat(path.join(folderPath, file));
      }
    });
  } catch (error) {
    console.log("Error is >>", error);
  }
}

// Copy the folder and its contents for component repo
const copyScaffoldings = () => {
  const componentSourceFolderPath = "./scripts/scaffold/component";
  const componentTargetFolderPath = "./components/" + process.argv[2];
  const devAppSourceFolderPath = "./scripts/scaffold/dev-app";
  const devAppTargetFolderPath = "./development/" + process.argv[2] + "-app";
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
};

//Add Files to package.json
const addToPackageJSON = () => {
  const filePath = "./package.json";
  const lineToAdd1 = `\t\t"${replacementText}:dev": "turbo run dev --filter=${replacementText}-app...",`;
  const lineToAdd2 = `\t\t"${replacementText}:build": "turbo run build --filter=@locoworks/reusejs-react-${replacementText}...",`;

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const lines = fileContent.split("\n");

  const insertionIndex = 17;
  lines.splice(insertionIndex, 0, lineToAdd2);
  lines.splice(insertionIndex, 0, lineToAdd1);

  const updatedContent = lines.join("\n");
  fs.writeFileSync(filePath, updatedContent, "utf-8");
};

//Rename folders in dev-app
const renameFolders = () => {
  const folderpath2 = `./development/${replacementText}-app/pages/<to-replace>`;
  const foldernewName2 = `./development/${replacementText}-app/pages/${replacementText}`;

  const folderpath3 = `./development/${replacementText}-app/components/<to-replace>`;
  const foldernewName3 = `./development/${replacementText}-app/components/${replacementText}`;

  const renameFolder = (oldFolderPath, newFolderPath) => {
    fs.rename(
      path.resolve(oldFolderPath),
      path.resolve(newFolderPath),
      (err) => {
        if (err) {
          console.error(`Error renaming folder: ${err}`);
          return;
        }

        console.log("Folder renamed successfully.");
      }
    );
  };

  renameFolder(folderpath2, foldernewName2);
  renameFolder(folderpath3, foldernewName3);
};

copyScaffoldings();
addToPackageJSON();
setTimeout(() => {
  renameFolders();
}, 1000);
