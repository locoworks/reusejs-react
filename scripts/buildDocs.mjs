import updatePackages from "./updatePackages.mjs";
import getComponentFoldersList from "./copyComponentsNPages.mjs";
import getTailWindFromDevApps from "./genTailwind.mjs";
import createTocJSON from "./createTocJSON.mjs";
import addSiteWrapper from "./addSiteWrapper.mjs";

updatePackages();
getComponentFoldersList();
getTailWindFromDevApps();
createTocJSON();
setTimeout(() => {
  addSiteWrapper();
}, 2000);
