import _ from "lodash";
import fs from "node:fs";
import { readFile } from "fs/promises";

const devAppsPath = "./development";

/**
 * Retrieve Tailwind configuration from development apps and generate a new Tailwind configuration file.
 * This function reads the Tailwind configuration files from the specified development apps and additional documentation config file. It merges the content, theme, and plugins data from these files to generate a new Tailwind configuration object. The generated configuration object is then written to the documentation Tailwind config file.
 *
 * @returns {Promise<void>} - A promise that resolves once the new Tailwind configuration file is written.
 */
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
    console.log("Error while writing to tailwind Config>>", error);
  }
};

/**
 * Read the Tailwind configuration from the specified paths and generate a Tailwind object.
 * This function reads the Tailwind configuration files from the given paths and extracts the content, plugins, and theme information. It returns a generated Tailwind object containing the extracted data.
 * @param {string[]} paths - An array of paths to the Tailwind configuration files.
 * @returns {Promise<Object>} - A promise that resolves to the generated Tailwind object.
 */
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

/**
 * Fetch content from a file based on a regular expression pattern.
 * This function reads the content of the specified file using the readFile function, matches it against the provided regular expression pattern, and returns the captured content.
 *
 * @param {string} path - The path of the file to read.
 * @param {RegExp} regex - The regular expression pattern to match against the file content.
 * @returns {Promise<string>} - A promise that resolves to the captured content.
 */
const fetcher = async (path, regex) => {
  const data = await readFile(path, "utf8");
  const contentResults = data.match(regex);
  return contentResults[1];
};

/**
 * Fetch and process content from a file based on a regular expression pattern.
 * This function reads the content of the specified file using the fetcher function and processes it based on the provided regular expression pattern. It splits the content by comma and newline, removes extra whitespace and empty values, and returns the resulting array of processed content.
 *
 * @param {string} path - The path of the file to read.
 * @param {RegExp} regex - The regular expression pattern to match against the file content.
 * @returns {Promise<string[]>} - A promise that resolves to an array of processed content.
 * @throws {Error} - If there is an error in reading the file or processing the content.
 */
const contentFetcher = async (path, regex) => {
  try {
    const array = (await fetcher(path, regex))
      .split(",\n")
      .map((val) => val.replaceAll("\n", "").replaceAll(" ", ""))
      .filter(Boolean);
    return array;
  } catch (error) {
    console.log("Error in reading tailwind file:", error);
    throw error;
  }
};

/**
 * Fetch and process theme data from a file based on a regular expression pattern.
 * This function reads the content of the specified file using the fetcher function and processes the theme data based on the provided regular expression pattern. It performs string replacements and formatting to ensure a valid JSON string representing the theme data.
 *
 * @param {string} path - The path of the file to read.
 * @param {RegExp} regex - The regular expression pattern to match against the file content.
 * @returns {Promise<string>} - A promise that resolves to a valid JSON string representing the processed theme data.
 */
const themeFetcher = async (path, regex) => {
  const array = (await fetcher(path, regex))
    .replaceAll("},\n", "}")
    .replaceAll("\n", "")
    .replaceAll(/\s{2,}/g, "")
    .replaceAll(",}", "}")
    .replace(/,\s*$/, "");
  const validString = array.replace(
    /(['"])?([a-zA-Z0-9_-]+)(['"])?:/g,
    '"$2": '
  );
  return validString;
};

/**
 * Fetch and process plugin data from a file based on a regular expression pattern.
 * This function reads the content of the specified file using the fetcher function and processes the plugin data based on the provided regular expression pattern. It splits the data by comma, removes newline characters and extra whitespace, and returns the resulting array of processed plugin data.
 *
 * @param {string} path - The path of the file to read.
 * @param {RegExp} regex - The regular expression pattern to match against the file content.
 * @returns {Promise<string[]>} - A promise that resolves to an array of processed plugin data.
 */
const pluginsFetcher = async (path, regex) => {
  let array = (await fetcher(path, regex))
    .split(",")
    .map((val) => val.replaceAll("\n", "").replaceAll(" ", ""));
  return array;
};

/**
 * Retrieve Tailwind configuration from development apps and generate a new Tailwind configuration file.
 * This function reads the Tailwind configuration files from the specified development apps and additional documentation config file. It merges the content, theme, and plugins data from these files to generate a new Tailwind configuration object. The generated configuration object is then written to the documentation Tailwind config file.
 *
 * @returns {Promise<void>} - A promise that resolves once the new Tailwind configuration file is written.
 */
const getTailWindFromDevApps = async () => {
  const devappList = await fs.promises.readdir(devAppsPath);
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

export default getTailWindFromDevApps;
