import fs from "node:fs";
import path from "path";
import pkg from "ncp";
const { ncp } = pkg;

const devAppName = process.argv[2];
const exampleName = process.argv[3];

if (!devAppName) {
  console.log("No Dev-app name added");
  process.exit(2);
}

if (!exampleName) {
  console.log("No Example name added");
  process.exit(2);
}

const sourcePath = "./scripts/scaffold/dev-app/components/_to-replace_";
const targetPath = `./development/${devAppName}-app/components/${devAppName}`;

const renameFolders = () => {
  const commonPath = `./development/${devAppName}-app/components/${devAppName}`;

  const renamingArray = [
    {
      old: commonPath + "/Example/Example.tsx",
      new: commonPath + `/Example/${exampleName}.tsx`,
    },
    {
      old: commonPath + "/Example/Example.jsx",
      new: commonPath + `/Example/${exampleName}.jsx`,
    },
    {
      old: commonPath + "/Example",
      new: commonPath + `/${exampleName}`,
    },
  ];

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

  renamingArray.forEach((node) => renameFolder(node.old, node.new));
};

function reformat(folderPath) {
  try {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        let fileContent = fs.readFileSync(filePath, "utf-8");
        fileContent = fileContent.replace(/Example/g, exampleName);
        fs.writeFileSync(filePath, fileContent, "utf-8");
      } else {
        reformat(path.join(folderPath, file));
      }
    });
  } catch (error) {
    console.log("Error is >>", error);
  }
}

ncp(sourcePath, targetPath, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Component Folder created successfully.");
  }
});

setTimeout(() => {
  renameFolders();
  setTimeout(() => {
    reformat(
      `./development/${devAppName}-app/components/${devAppName}/${exampleName}`
    );
  }, 500);
}, 500);
