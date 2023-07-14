import fs from "node:fs";

const addSiteWrapper = () => {
  const path = "./docs/pages";

  const dirs = fs.readdirSync(path);
  const temp = dirs
    .filter((ele) => !ele.includes("hooks"))
    .filter((ele) => !ele.includes("utils"));
  // console.log(">>>>>>", temp);

  const lineToAdd = `import SiteWrapper from "../../components/support/SiteWrapper.tsx"`;
  const snippetToWrap =
    '<div className="prose max-w-full mx-4 pb-10" >{children}</div>';
  const wrapperEnd = "</SiteWrapper>";
  const wrapperStart = `<SiteWrapper toc={toc}>`;
  temp.forEach((file) => {
    if (fs.statSync(path + "/" + file).isDirectory()) {
      fs.readFile(path + "/" + file + "/index.mdx", "utf8", (err, data) => {
        const tocImport = `import toc from "../../../data/${file}-toc.json" `;
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        const importIndex = data.indexOf("import");

        if (importIndex === -1) {
          console.log(`No import statement found in file ${file}`);
          return;
        }
        if (data.includes(lineToAdd)) {
          console.log("Already configured");
          return;
        }

        let updatedContent =
          data.slice(0, importIndex) +
          lineToAdd +
          "\n" +
          tocImport +
          "\n" +
          data.slice(importIndex);

        updatedContent = updatedContent.replace(
          new RegExp(snippetToWrap, "g"),
          `${wrapperStart}${snippetToWrap}${wrapperEnd}`
        );
        fs.writeFile(
          path + "/" + file + "/index.mdx",
          updatedContent,
          "utf8",
          (err) => {
            if (err) {
              console.error(
                `Error writing to file ${path + "/" + file + "/index.mdx"}:`,
                err
              );
              return;
            }
          }
        );
      });
    }
  });

  const toolkitsFolder = ["hooks", "utils"];

  toolkitsFolder.forEach((file) => {
    if (fs.statSync(path + "/" + file).isDirectory()) {
      const files = fs.readdirSync(path + "/" + file);
      // console.log("Files", files);
      files.forEach((toolkitFile) => {
        // console.log(">>>>", path + "/" + file + "/" + toolkitFile);
        const tocImport = `import toc from "../../../data/${toolkitFile.replace(
          ".mdx",
          ""
        )}-toc.json"\n\n`;
        fs.readFile(
          path + "/" + file + "/" + toolkitFile,
          "utf8",
          (err, data) => {
            if (err) {
              console.error(`Error reading file ${toolkitFile}:`, err);
              return;
            }
            if (data.includes(lineToAdd)) {
              console.log("Already configured");
              return;
            }
            const importIndex = data.indexOf("##");
            let updatedContent =
              data.slice(0, importIndex) +
              lineToAdd +
              "\n" +
              tocImport +
              data.slice(importIndex);

            updatedContent = updatedContent.replace(
              new RegExp(snippetToWrap, "g"),
              `${wrapperStart}${snippetToWrap}${wrapperEnd}`
            );

            // console.log("DATA>>>", updatedContent);
            fs.writeFile(
              path + "/" + file + "/" + toolkitFile,
              updatedContent,
              "utf8",
              (err) => {
                if (err) {
                  console.error(
                    `Error writing to file ${
                      path + "/" + file + "/" + toolkitFile
                    }:`,
                    err
                  );
                  return;
                }
              }
            );
          }
        );
      });
    }
  });
};

export default addSiteWrapper;
addSiteWrapper();
