const updatePackages = require("./updatePackages.cjs");
const copyComponentsNPages = require("./copyComponentsNPages.cjs");
const genTailwind = require("./genTailwind.cjs");

updatePackages();
copyComponentsNPages();
genTailwind();
