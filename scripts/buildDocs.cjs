const updatePackages = require("./updatePackages.cjs");
const copyComponentsNPages = require("./copyComponentsNPages.cjs");
const genTailwind = require("./gentailwind.cjs");

updatePackages();
copyComponentsNPages();
genTailwind();
