import { unified } from "unified";
import markdown from "remark-parse";
import extractToc from "remark-extract-toc";
import fs from "node:fs";

const getAllMDX = () => {
  const path = "./development";
  const dir = fs.readdirSync(path);
  const fileList = dir.map((ele) => {
    ele = ele.split("-");
    ele.pop();
    ele = ele.join("-");
    path + "/" + ele + "-app/pages/" + ele + "/index.mdx";
    const data = exportToC(
      path + "/" + ele + "-app/pages/" + ele + "/index.mdx"
    );
    console.log("data", data);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(path + "/" + ele + "-app/public/toc.json", jsonData, (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file created successfully!");
      }
    });
  });
  // fileList.forEach((ele) => {
  //   const data = exportToC(ele);
  //   const jsonData = JSON.stringify(data, null, 2);
  //   fs.writeFile(path + "/" + ele + "-app/data/static", jsonData, (err) => {
  //     if (err) {
  //       console.error("Error writing JSON file:", err);
  //     } else {
  //       console.log("JSON file created successfully!");
  //     }
  //   });
  // });
};

const exportToC = (path) => {
  console.log(">>>>", path);
  var text = fs.readFileSync(path, "utf8");

  var processor = unified().use(markdown).use(extractToc);

  var node = processor.parse(text);
  var tree = processor.runSync(node);
  // console.log(tree);
  return tree;
};

getAllMDX();

export default exportToC;
