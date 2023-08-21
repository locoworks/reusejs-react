import fs from "node:fs";

const componentsPath = "./components";
const devAppsPath = "./development";
const pathToPackage = "./docs/package.json";

/**
Update the package.json file with the provided updated dependencies.

@param {Object} updatedDependencies - The updated dependencies to be added to the package.json file.
@param {string} pathToPackage - The path to the package.json file.
@returns {void}
*/
const updatePackageJsonWith = (updatedDependencies) => {
  fs.readFile(pathToPackage, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading package.json:", err);
      return;
    }
    try {
      const packageJson = JSON.parse(data);
      packageJson.dependencies = {
        ...packageJson.dependencies,
        ...updatedDependencies,
      };

      const updatedPackageJson = JSON.stringify(packageJson, null, 2);
      fs.writeFile(pathToPackage, updatedPackageJson + "\n", "utf8", (err) => {
        if (err) {
          console.error("Error writing package.json:", err);
          return;
        }
      });
    } catch (error) {
      console.error("Error parsing package.json:", error);
    }
  });
};

/**
Retrieves the merged dependencies from the package.json files of development apps.

@returns {Promise<Object>} - A promise that resolves to an object representing the merged dependencies.
*/
const getDevAppsMergedDependencies = async () => {
  const devappList = fs.readdirSync(devAppsPath);
  const devappPaths = devappList.map(
    (app) => devAppsPath + "/" + app + "/package.json"
  );
  const promises = devappPaths.map((path) => getDependencyObject(path));
  try {
    const dependenciesList = await Promise.all(promises);
    const mergedDependencies = dependenciesList.reduce(
      (merged, dependencies) => ({ ...merged, ...dependencies }),
      {}
    );
    return mergedDependencies;
  } catch (error) {
    console.error("Error fetching dependencies:", error);
  }
};

/**
Retrieve the dependency object from the package.json file at the specified path.
@param {string} path - The path to the package.json file.

@returns {Promise<Object>} - A promise that resolves to the dependency object parsed from the package.json file.
*/
const getDependencyObject = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading package.json:", err);
        return;
      }
      try {
        const packageJson = JSON.parse(data);
        resolve(packageJson.dependencies);
      } catch (error) {
        console.error("Error parsing package.json:", error);
        reject(error);
      }
    });
  });
};

/**

Get the component names as dependencies and return them as an object.
@returns {Object} - An object representing the component names as dependencies.
*/
const getComponentAsDependenciesObject = () => {
  const componnets = fs.readdirSync(componentsPath);
  const packages = {};
  componnets.forEach(
    (comp) => (packages["@locoworks/reusejs-react-" + comp] = "*")
  );
  return packages;
};

/**
Update the package.json file with the merged dependencies from development apps and component dependencies.

@returns {Promise<void>} - A promise that resolves once the package.json file is updated.
*/
const updatePackages = async () => {
  const val = await getDevAppsMergedDependencies();
  const comps = getComponentAsDependenciesObject();
  updatePackageJsonWith({ ...val, ...comps });
};

export default updatePackages;
