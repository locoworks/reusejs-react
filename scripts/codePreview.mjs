import fs from "node:fs";
import path from "node:path";
import { EOL } from "node:os";
import { visit } from "unist-util-visit";
import stripIndent from "strip-indent";

function extractLines(
  content,
  fromLine,
  hasDash,
  toLine,
  preserveTrailingNewline = false
) {
  const lines = content.split(EOL);
  const start = fromLine || 1;
  let end;
  if (!hasDash) {
    end = start;
  } else if (toLine) {
    end = toLine;
  } else if (lines[lines.length - 1] === "" && !preserveTrailingNewline) {
    end = lines.length - 1;
  } else {
    end = lines.length;
  }
  return lines.slice(start - 1, end).join("\n");
}

function codeImport(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  if (!path.isAbsolute(rootDir)) {
    throw new Error(`"rootDir" has to be an absolute path`);
  }

  return function transformer(tree, file) {
    const codes = [];
    const promises = [];
    visit(tree, "code", (node, index, parent) => {
      codes.push([node, index, parent]);
    });
    for (const [node] of codes) {
      const pathMeta = (node.meta || "") //
        // Allow escaping spaces
        .split(/(?<!\\) /g) //
        .find((meta) => meta.startsWith("path=")); //
      const nameMeta = (node.meta || "") //
        // Allow escaping spaces
        .split(/(?<!\\) /g) //
        .find((meta) => meta.startsWith("name=")); //

      if (!pathMeta) {
        continue;
      }
      if (!file.dirname) {
        throw new Error('"file" should be an instance of VFile');
      }
      //   const res =
      //     /^file=(?<path>.+?)(?:(?:#(?:L(?<from>\d+)(?<dash>-)?)?)(?:L(?<to>\d+))?)?$/.exec(
      //       fileMeta
      //     );

      let pathRes = "";
      let componentName = "";
      let folderPath = "";
      let normalizedFolderPath = "";
      let folderAbsPath = "";
      let folderFiles = "";

      //   if (pathMeta) {
      pathRes =
        /^path=(?<path>.+?)(?:(?:#(?:L(?<from>\d+)(?<dash>-)?)?)(?:L(?<to>\d+))?)?$/.exec(
          pathMeta
        ); //

      if (!pathRes || !pathRes.groups || !pathRes.groups.path) {
        throw new Error(`Unable to parse file path ${fileMeta}`);
      }
      // const componentName = /^name=(?<name>)?$/.exec(pathMeta);//
      componentName = /^name=(?<name>.+?)$/
        .exec(nameMeta)
        .groups.name.replaceAll(`"`, "");

      folderPath = pathRes.groups.path; //
      normalizedFolderPath = folderPath
        .replace(/^<rootDir>/, rootDir)
        .replace(/\\ /g, " ");
      folderAbsPath = path.resolve(file.dirname, normalizedFolderPath);

      folderFiles = fs.readdirSync(folderAbsPath); //

      // console.log(">>>>", folderFiles); //
      //   }

      //   if (!res || !res.groups || !res.groups.path) {
      //     throw new Error(`Unable to parse file path ${fileMeta}`);
      //   }

      let AllContent = "[TO-SPLIT]";

      //   const filePath = res.groups.path;
      const fromLine = pathRes.groups.from
        ? parseInt(pathRes.groups.from, 10)
        : undefined;
      const hasDash = !!pathRes.groups.dash || fromLine === undefined;
      const toLine = pathRes.groups.to
        ? parseInt(pathRes.groups.to, 10)
        : undefined;
      //   const normalizedFilePath = filePath
      //     .replace(/^<rootDir>/, rootDir)
      //     .replace(/\\ /g, " ");
      //   console.log("#####", normalizedFilePath);
      //   console.log("FILE DIR NAME IS>>", file.dirname);
      //   const fileAbsPath = path.resolve(file.dirname, normalizedFilePath);

      //This is Where all content rendering START
      if (pathMeta && folderFiles.length !== 0) {
        folderFiles.forEach((file) => {
          const filePath = path.resolve(folderAbsPath, file);
          if (file.includes(".preview")) {
            // console.log("Preview FILE>>>>", filePath);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const previewContent = extractLines(
              fileContent,
              fromLine,
              hasDash,
              toLine,
              options.preserveTrailingNewline
            );
            AllContent =
              AllContent +
              (AllContent === "[TO-SPLIT]"
                ? "[preview]\n" + previewContent
                : "\n||||\n[preview]\n" + previewContent);
          } else if (
            file.includes(componentName + ".jsx") ||
            file.includes(componentName + ".js")
          ) {
            // console.log("JSX FILE>>>>", filePath);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const jsxContent = extractLines(
              fileContent,
              fromLine,
              hasDash,
              toLine,
              options.preserveTrailingNewline
            );
            // AllContent = AllContent + "\n||||\n[jsx]\n" + jsxContent;
            AllContent =
              AllContent +
              (AllContent === "[TO-SPLIT]"
                ? "[JSX]\n" + jsxContent
                : "\n||||\n[JSX]\n" + jsxContent);
          } else if (
            file.includes(componentName + ".tsx") ||
            file.includes(componentName + ".ts")
          ) {
            // console.log("TSX FILE>>>>", filePath);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const tsxContent = extractLines(
              fileContent,
              fromLine,
              hasDash,
              toLine,
              options.preserveTrailingNewline
            );
            // AllContent = AllContent + "\n||||\n[tsx]\n" + tsxContent;
            AllContent =
              AllContent +
              (AllContent === "[TO-SPLIT]"
                ? "[TSX]\n" + tsxContent
                : "\n||||\n[TSX]\n" + tsxContent);
          }
          // const fileContent = fs.readFileSync(filePath, 'utf8');
        });
      }
      //   console.log("ALL CONTENT>>>", AllContent);

      //This is the END

      //   if (!options.allowImportingFromOutside) {
      //     const relativePathFromRootDir = path.relative(rootDir, fileAbsPath);
      //     if (
      //       !rootDir ||
      //       relativePathFromRootDir.startsWith(`..${path.sep}`) ||
      //       path.isAbsolute(relativePathFromRootDir)
      //     ) {
      //       throw new Error(
      //         `Attempted to import code from "${fileAbsPath}", which is outside from the rootDir "${rootDir}"`
      //       );
      //     }
      //   }
      if (options.async) {
        // promises.push(
        //   new Promise((resolve, reject) => {
        //     fs.readFile(fileAbsPath, "utf8", (err, fileContent) => {
        //       if (err) {
        //         reject(err);
        //         return;
        //       }
        //       node.value = extractLines(
        //         fileContent,
        //         fromLine,
        //         hasDash,
        //         toLine,
        //         options.preserveTrailingNewline
        //       );
        //       if (options.removeRedundantIndentations) {
        //         node.value = stripIndent(node.value);
        //       }
        //       resolve();
        //     });
        //   })
        // );
      } else {
        // console.log("FILE absolute path>>>>", fileAbsPath);
        // const fileContent = fs.readFileSync(fileAbsPath, "utf8");
        // node.data = { js: extractLines(fileContent, fromLine, hasDash, toLine, options.preserveTrailingNewline) }
        // if (pathMeta !== "") {
        node.value = extractLines(
          AllContent,
          fromLine,
          hasDash,
          toLine,
          options.preserveTrailingNewline
        );
        // } else {
        //   node.value = extractLines(
        //     fileContent,
        //     fromLine,
        //     hasDash,
        //     toLine,
        //     options.preserveTrailingNewline
        //   );
        // }
        // console.log(">>>>>>NODE>>>>>>", node);
        if (options.removeRedundantIndentations) {
          node.value = stripIndent(node.value);
        }
      }
    }
    if (promises.length) {
      return Promise.all(promises);
    }
  };
}
export { codeImport };
export default codeImport;
