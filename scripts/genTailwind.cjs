const fs = require("fs");
const devAppsPath = "./development";

const getTailWindFromDevApps = async () => {
  const devappList = fs.readdirSync(devAppsPath);
  const devAppsPaths = devappList.map(
    (app) => devAppsPath + "/" + app + "/tailwind.config.js"
  );

  readTailwindConfig(devAppsPaths);

  //   const tailwindConfigPath = "./docs/tailwind.config.js";
  //   const tailwindConfigFile = fs.readFileSync(tailwindConfigPath, "utf8");
  //   const updatedConfigFile = tailwindConfigFile
  //     .replace(
  //       /content: \[.*?\]/,
  //       `content: ${JSON.stringify([...contentArray])}`
  //     )
  //     .replace(
  //       /plugins: \[.*?\]/,
  //       `plugins: ${JSON.stringify([...pluginArray])}`
  //     );
  //   console.log("updatedConfigFile>>", updatedConfigFile);
  //   fs.writeFileSync(tailwindConfigPath, updatedConfigFile, "utf8");

  //   console.log("tailwind.config.js file updated successfully.");
};

const readTailwindConfig = async (paths) => {
  const contentRegex = /content:\s*\[(.*?)\]/s;
  const themeRegex = /theme:\s*(.*?)plugins/s;
  const pluginRegex = /plugins:\s*\[(.*?)\]/s;
  const generatedTailwindObject = { content: "", plugin: "", theme: "" };
  const contentPrommisesArray = paths.map(async (path) => {
    return contentFetcher(path, contentRegex);
  });
  const themePromiseArray = paths.map(async (path) => {
    return themeFetcher(path, themeRegex);
  });
  const pluginsPromiseArray = paths.map(async (path) => {
    return pluginsFetcher(path, pluginRegex);
  });
  Promise.all(contentPrommisesArray).then((values) => {
    console.log("Resolved content values are>>>", [...new Set(values.flat())]);
    generatedTailwindObject["content"] = [...new Set(values.flat())];
  });
  Promise.all(themePromiseArray).then((values) => {
    console.log(
      "Resolved theme values are>>>",
      values.map((val) => JSON.parse(val))
    );
    generatedTailwindObject["theme"] = [values];
  });
  Promise.all(pluginsPromiseArray).then((values) => {
    console.log("Resolved content values are>>>", [...new Set(values.flat())]);
    generatedTailwindObject["content"] = [...new Set(values.flat())];
  });
  // return returnArray;
};

const contentFetcher = (path, regex) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.log("Error in Reading tailwind file!!!");
        reject(err);
        return;
      }
      try {
        const contentResult = data.match(regex);
        let array = contentResult[1]
          .split(",\n")
          .map((val) => val.replaceAll("\n", "").replaceAll(" ", ""))
          .filter(Boolean);
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const themeFetcher = (path, regex) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.log("Error in Reading tailwind file!!!");
        reject(err);
        return;
      }
      try {
        const contentResult = data.match(regex);
        let array = contentResult[1]
          .replaceAll("},\n", "}")
          .replaceAll("\n", "")
          .replaceAll(" ", "")
          .replaceAll(",}", "}")
          .replace(/,\s*$/, "");

        // Remove the trailing comma (if any) after the closing curly brace
        // const stringWithoutTrailingComma = array.replace(/,\s*$/, "");

        // Wrap the property names and string values with double quotes
        const validString = array.replace(
          /(['"])?([a-zA-Z0-9_-]+)(['"])?:/g,
          '"$2": '
        );

        // console.log(validString);
        resolve(validString);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const pluginsFetcher = (path, regex) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.log("Error in Reading tailwind file!!!");
        reject(err);
        return;
      }
      try {
        const pluginResults = data.match(regex);
        let array = pluginResults[1]
          .split(",")
          .map((val) => val.replaceAll("\n", "").replaceAll(" ", ""));
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  });
};

getTailWindFromDevApps();
