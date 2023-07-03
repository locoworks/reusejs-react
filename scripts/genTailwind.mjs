// const fs = require("fs");
const devAppsPath = "./development";
// const _ = require("lodash");
import _ from "lodash";
import fs from "node:fs";

const getTailWindFromDevApps = async () => {
  const devappList = fs.readdirSync(devAppsPath);
  const devAppsPaths = [
    ...devappList.map((app) => devAppsPath + "/" + app + "/tailwind.config.js"),
    "./docs/tailwind.config.js",
  ];

  const newTailwindObject = await readTailwindConfig(devAppsPaths);
  writeToDocsTailwindConfig(
    newTailwindObject.content,
    newTailwindObject.theme,
    newTailwindObject.plugins
  );
};

const writeToDocsTailwindConfig = (contentArray, themeObject, pluginsArray) => {
  try {
    const replacementContent =
      "content: [\n" + contentArray.join(",\n") + "\n]";
    const replacementTheme =
      "theme: " + JSON.stringify(themeObject) + ",\nplugins";
    const replacementPlugins = "plugins: [" + pluginsArray.join(",") + "]";
    const tailwindConfigPath = "./docs/tailwind.config.js";
    const tailwindConfigFile = fs.readFileSync(tailwindConfigPath, "utf8");
    const updatedConfigFile = tailwindConfigFile
      .replace(/content:\s*\[(.*?)\]/s, `${replacementContent}`)
      .replace(/theme:\s*(.*?)plugins/s, `${replacementTheme}`)
      .replace(/plugins:\s*\[(.*?)\]/s, `${replacementPlugins}`);
    fs.writeFileSync(tailwindConfigPath, updatedConfigFile, "utf8");
  } catch (error) {
    console.log("error>>", error);
  }
};

const readTailwindConfig = async (paths) => {
  const contentRegex = /content:\s*\[(.*?)\]/s;
  const themeRegex = /theme:\s*(.*?)plugins/s;
  const pluginRegex = /plugins:\s*\[(.*?)\]/s;
  const generatedTailwindObject = { content: "", plugins: "", theme: "" };
  const contentPrommisesArray = paths.map(async (path) => {
    return contentFetcher(path, contentRegex);
  });
  const themePromiseArray = paths.map(async (path) => {
    return themeFetcher(path, themeRegex);
  });
  const pluginsPromiseArray = paths.map(async (path) => {
    return pluginsFetcher(path, pluginRegex);
  });
  const contentPromise = Promise.all(contentPrommisesArray).then((values) => {
    generatedTailwindObject["content"] = [...new Set(values.flat())];
  });
  const themePromise = Promise.all(themePromiseArray).then((values) => {
    generatedTailwindObject["theme"] = _.merge(
      ...values.map((val) => JSON.parse(val))
    );
  });
  const pluginsPromise = Promise.all(pluginsPromiseArray).then((values) => {
    generatedTailwindObject["plugins"] = [...new Set(values.flat())];
  });

  await Promise.all([contentPromise, themePromise, pluginsPromise]);

  return generatedTailwindObject;
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
          .replaceAll(/\s{2,}/g, "")
          .replaceAll(",}", "}")
          .replace(/,\s*$/, "");
        const validString = array.replace(
          /(['"])?([a-zA-Z0-9_-]+)(['"])?:/g,
          '"$2": '
        );
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

export default getTailWindFromDevApps;
