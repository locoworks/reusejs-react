//console.log("This script will add Site wrapper to pages after the build step.");
import fs from "node:fs";

const path = "./docs/pages";

const dirs = fs.readdirSync(path);
console.log("dirs", dirs);
