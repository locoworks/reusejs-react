import fs from "fs";
import path from "path";

/**
 * getComponents
 *
 * Fetches the list of components in the specified directory, excluding ignored components.
 *
 * @param {string} directory - The directory path where the components are located.
 * @returns {string[]} - An array containing the names of the components.
 */
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

/**
 * getHooksList
 *
 * Fetches the list of hooks in the specified directory, excluding ignored components.
 *
 * @param {string} directory - The directory path where the hooks are located.
 * @returns {string[]} - An array containing the names of the hooks.
 */
function getHooksList(directory) {
  try {
    const files = fs.readdirSync(directory);
    let hooksList = [];

    const replacer = (file) => {
      if (file.includes(".jsx")) {
        return file.replace(".jsx", "");
      } else if (file.includes(".tsx")) {
        return file.replace(".tsx", "");
      } else if (file.includes(".js")) {
        return file.replace(".js", "");
      } else if (file.includes(".ts")) {
        return file.replace(".ts", "");
      } else {
        return file;
      }
    };

    files.forEach((file) => {
      const temp = replacer(file)
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

/**
 * getUtilsList
 *
 * Fetches the list of utils in the specified directory, excluding ignored components.
 *
 * @param {string} directory - The directory path where the utils are located.
 * @returns {string[]} - An array containing the names of the utils.
 */
function getUtilsList(directory) {
  try {
    const files = fs.readdirSync(directory);
    let utilsList = [];

    files.forEach((file) => {
      const temp = file
        .replace(".ts", "")
        .replace("js", "")
        .replace(".tsx", "")
        .replace("jsx", "")
        .split("-")
        .join("");
      utilsList.push(temp);
    });
    return utilsList;
  } catch (error) {
    console.log("Component list fetch error is:", error);
  }
}

/**
 * createJSONList
 *
 * Creates a JSON file containing a list of components, hooks, and utils.
 * The JSON file is structured with "Components", "Hooks", and "Utils" keys,
 * each containing an array of names corresponding to the components, hooks, and utils.
 * The JSON file is written to the specified file path "./data/sidemenu_data.json".
 */
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
