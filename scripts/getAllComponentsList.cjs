const fs = require("fs");
const path = require("path");

function scanDirectory(directory) {
  try {
    const files = fs.readdirSync(directory);
    let componentsArray = [];

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        componentsArray.push(file);
      }
    });
    console.log(componentsArray);
  } catch (error) {
    console.log("Component list fetch error is:", error);
  }
}

const rootDirectory = "./components";
scanDirectory(rootDirectory);
