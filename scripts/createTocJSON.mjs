import { unified } from "unified";
import markdown from "remark-parse";
import extractToc from "remark-extract-toc";
import fs from "node:fs";

const writeToFile = (path, data) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      console.log("Error while writing to path>>", path, err);
    }
  });
};

const exportToC = (path) => {
  var text = fs.readFileSync(path, "utf8");

  var processor = unified().use(markdown).use(extractToc);

  var node = processor.parse(text);
  var tree = processor.runSync(node);
  return tree;
};

const createTocJSON = () => {
  const path = "./development";

  const dir = fs
    .readdirSync(path)
    .filter((ele) => !ele.includes("toolkits-app"));
  dir.map((ele) => {
    ele = ele.split("-");
    ele.pop();
    ele = ele.join("-");
    const data = exportToC(
      path + "/" + ele + "-app/pages/" + ele + "/index.mdx"
    );
    const jsonData = JSON.stringify(data, null, 2);
    writeToFile("./data/" + ele + "-toc.json", jsonData);
  });
  const toolkitsPaths = [
    path + "/toolkits-app/pages/hooks",
    path + "/toolkits-app/pages/utils",
  ];
  toolkitsPaths.forEach((file) => {
    const list = fs.readdirSync(file).filter((ele) => ele.includes("mdx"));
    list.forEach((ele) => {
      const data = exportToC(file + "/" + ele);
      const jsonData = JSON.stringify(data, null, 2);
      writeToFile("./data/" + ele.replace(".mdx", "") + "-toc.json", jsonData);
    });
  });
};

export default createTocJSON;
