const fs = require("fs");
const path = require("path");

function getComponents(directory) {
  const COMPONENTIGNOREARRAY = ["code-preview"];
  try {
    const files = fs.readdirSync(directory);
    let componentsArray = [];

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory() && !COMPONENTIGNOREARRAY.includes(file)) {
        const temp = file
          .split("-")
          .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
          .join(" ");

        componentsArray.push(temp);
      }
    });
    return componentsArray;
  } catch (error) {
    console.log("Component list fetch error is:", error);
  }
}

function getHooksList(directory) {
  try {
    const files = fs.readdirSync(directory);
    let hooksList = [];

    files.forEach((file) => {
      const temp = file
        .replace(".ts", "")
        .replace("js", "")
        .replace(".tsx", "")
        .replace("jsx", "")
        .split("-")
        .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
        .join("");
      hooksList.push(temp);
    });
    return hooksList;
  } catch (error) {
    console.log("Component list fetch error is:", error);
  }
}

function getUtilsList(directory) {
  try {
    const files = fs.readdirSync(directory);
    let utilsList = [];

    files.forEach((file) => {
      const temp = file.replace(".ts", "").split("-").join("");
      utilsList.push(temp);
    });
    return utilsList;
  } catch (error) {
    console.log("Component list fetch error is:", error);
  }
}

const createJSONList = () => {
  const data = { Components: [], Hooks: [], Utils: [] };

  data["Components"] = getComponents("./components");
  data["Hooks"] = getHooksList("./toolkit/hooks/src");
  data["Utils"] = getUtilsList("./toolkit/utils/src");

  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile("./data/sidemenu_data.json", jsonData, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file created successfully!");
    }
  });
};

createJSONList();
