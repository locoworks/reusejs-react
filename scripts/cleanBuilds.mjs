import fs from "fs";
import path from "path";

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`Deleted folder: ${folderPath}`);
  }
}

function searchAndDeleteFolders(startPath, folderNames) {
  if (!fs.existsSync(startPath)) {
    console.log("Invalid directory path.");
    return;
  }

  fs.readdirSync(startPath).forEach((file) => {
    const filePath = path.join(startPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      if (folderNames.includes(file)) {
        deleteFolderRecursive(filePath);
      } else {
        searchAndDeleteFolders(filePath, folderNames);
      }
    }
  });
}

const repoPath = ".";
const foldersToDelete = [".turbo", "node_modules", "dist"];

searchAndDeleteFolders(repoPath, foldersToDelete);
