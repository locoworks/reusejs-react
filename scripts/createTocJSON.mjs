import { unified } from "unified";
import markdown from "remark-parse";
import extractToc from "remark-extract-toc";
import fs from "node:fs";

const createTocJSON = () => {
  const path = "./development";
  const dir = fs.readdirSync(path);
  dir.map((ele) => {
    ele = ele.split("-");
    ele.pop();
    ele = ele.join("-");
    path + "/" + ele + "-app/pages/" + ele + "/index.mdx";
    const data = exportToC(
      path + "/" + ele + "-app/pages/" + ele + "/index.mdx"
    );
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile("./docs/public/" + ele + "-toc.json", jsonData, (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        // console.log("JSON file created successfully!");
      }
    });
  });
};

const exportToC = (path) => {
  var text = fs.readFileSync(path, "utf8");

  var processor = unified().use(markdown).use(extractToc);

  var node = processor.parse(text);
  var tree = processor.runSync(node);
  return tree;
};

export default createTocJSON;
