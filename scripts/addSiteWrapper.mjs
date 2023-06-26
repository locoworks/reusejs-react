import fs from "node:fs";

const addSiteWrapper = () => {
  const path = "./docs/pages";

  const dirs = fs.readdirSync(path);

  dirs.forEach((file) => {
    if (fs.statSync(path + "/" + file).isDirectory()) {
      const lineToAdd = `import SiteWrapper from "../../components/support/SiteWrapper.tsx"`;
      const tocImport = `import toc from "../../public/${file}-toc.json" `;
      const snippetToWrap =
        '<div className="prose max-w-full mx-4 pb-10" >{children}</div>';
      const wrapperEnd = "</SiteWrapper>";
      const wrapperStart = `<SiteWrapper toc={toc}>`;

      fs.readFile(path + "/" + file + "/index.mdx", "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        const importIndex = data.indexOf("import");

        if (importIndex === -1) {
          console.log(`No import statement found in file ${file}`);
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

            // console.log(
            //   `Code wrapped in file ${path + "/" + file + "/index.mdx"}`
            // );
          }
        );
      });
    }
  });
};

export default addSiteWrapper;
