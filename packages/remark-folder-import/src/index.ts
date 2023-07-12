import fs from 'node:fs';
import path from 'node:path';
import { EOL } from 'node:os';
import { visit } from 'unist-util-visit';
import stripIndent from 'strip-indent';
import type { Root, Code, Parent } from 'mdast';
import type { VFile } from 'vfile';

interface CodeImportOptions {
  preserveTrailingNewline?: boolean;
  removeRedundantIndentations?: boolean;
  rootDir?: string;
}

function extractLines(
  content: string,
  fromLine: number | undefined,
  hasDash: boolean,
  toLine: number | undefined,
  preserveTrailingNewline: boolean = false
) {
  const lines = content.split(EOL);
  const start = fromLine || 1;
  let end = toLine;

  if (hasDash && !end) {
    end =
      lines[lines.length - 1] === '' && !preserveTrailingNewline
        ? lines.length - 1
        : lines.length;
  }

  return lines.slice(start - 1, end).join('\n');
}

const getMeta = (
  metaValue: string | null | undefined,
  matchString: string
): any => {
  return (metaValue || '')
    .split(/(?<!\\) /g)
    .find((meta) => meta.startsWith(matchString));
};

function codeImport(options: CodeImportOptions = {}) {
  const rootDir = options.rootDir || process.cwd();

  if (!path.isAbsolute(rootDir)) {
    throw new Error(`"rootDir" has to be an absolute path`);
  }

  return function transformer(tree: Root, file: VFile) {
    const codes: [Code, number | null, Parent][] = [];

    //This segment pushes all noes of tree into code array.
    visit(tree, 'code', (node, index, parent) => {
      codes.push([node as Code, index, parent as Parent]);
    });

    // Iterates Over all the code nodes from the tree
    for (const [node] of codes) {
      // Both of the below can be extarcted in a seperate function
      // Get meta values from node decleration in mdx for path pattern
      // const pathMeta = (node.meta || '')
      //   .split(/(?<!\\) /g)
      //   .find((meta) => meta.startsWith('path='));
      const pathMeta = getMeta(node.meta, 'path=');
      // Get meta values from node decleration in mdx for path pattern
      // const nameMeta = (node.meta || '')
      //   .split(/(?<!\\) /g)
      //   .find((meta) => meta.startsWith('name='));
      const nameMeta = getMeta(node.meta, 'name=');

      //Check for presense of values if failed then no need to perform any action on this code node
      if (!pathMeta || !nameMeta) {
        continue;
      }

      if (!file.dirname) {
        throw new Error('"file" should be an instance of VFile');
      }

      const nameRes = /^name=(?<name>.+?)$/.exec(nameMeta);
      if (!nameRes || !nameRes.groups || !nameRes.groups.name) {
        throw new Error(`Unable to parse component name ${nameRes}`);
      }
      const componentName = nameRes.groups.name;

      const res =
        /^path=(?<path>.+?)(?:(?:#(?:L(?<from>\d+)(?<dash>-)?)?)(?:L(?<to>\d+))?)?$/.exec(
          pathMeta
        );

      if (!res || !res.groups || !res.groups.path) {
        throw new Error(`Unable to parse folder path ${pathMeta}`);
      }

      const folderPath = res.groups.path;
      const fromLine = res.groups.from
        ? parseInt(res.groups.from, 10)
        : undefined;
      const hasDash = !!res.groups.dash || fromLine === undefined;
      const toLine = res.groups.to ? parseInt(res.groups.to, 10) : undefined;
      const normalizedFolderPath = folderPath
        .replace(/^<rootDir>/, rootDir)
        .replace(/\\ /g, ' ');
      const folderAbsPath = path.resolve(file.dirname, normalizedFolderPath);

      let newNodeContent = '[TO-SPLIT]';
      const folderFiles = fs.readdirSync(folderAbsPath);

      const addToContent = (filePath: string, type: string) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const content = extractLines(
          fileContent,
          fromLine,
          hasDash,
          toLine,
          options.preserveTrailingNewline
        );
        newNodeContent =
          newNodeContent +
          (newNodeContent === '[TO-SPLIT]'
            ? `[${type}]\n` + content
            : `\n||||\n[${type}]\n` + content);
      };

      if (pathMeta && folderFiles.length !== 0) {
        folderFiles.forEach((file) => {
          const filePath = path.resolve(folderAbsPath, file);
          if (fs.lstatSync(filePath).isFile()) {
            addToContent(
              filePath,
              file.includes(componentName + '.js') ||
                file.includes(componentName + '.jsx')
                ? 'JSX'
                : 'TSX'
            );
          }
        });
      }

      node.value = extractLines(
        newNodeContent,
        fromLine,
        hasDash,
        toLine,
        options.preserveTrailingNewline
      );
      if (options.removeRedundantIndentations) {
        node.value = stripIndent(node.value);
      }
    }
  };
}

export { codeImport };
export default codeImport;
