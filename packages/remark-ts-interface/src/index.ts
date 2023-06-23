import fs from 'node:fs';
import path from 'node:path';
// import { EOL } from 'node:os';
import { visit } from 'unist-util-visit';
// import stripIndent from 'strip-indent';
import type { Root, Code, Parent } from 'mdast';
import type { VFile } from 'vfile';

interface CodeImportOptions {
  // preserveTrailingNewline?: boolean;
  // removeRedundantIndentations?: boolean;
  rootDir?: string;
}

// function extractLines(
//   content: string,
//   fromLine: number | undefined,
//   hasDash: boolean,
//   toLine: number | undefined,
//   preserveTrailingNewline: boolean = false
// ) {
//   const lines = content.split(EOL);
//   const start = fromLine || 1;
//   let end;
//   if (!hasDash) {
//     end = start;
//   } else if (toLine) {
//     end = toLine;
//   } else if (lines[lines.length - 1] === '' && !preserveTrailingNewline) {
//     end = lines.length - 1;
//   } else {
//     end = lines.length;
//   }
//   return lines.slice(start - 1, end).join('\n');
// }

function objectFetch(options: CodeImportOptions = {}) {
  const rootDir = options.rootDir || process.cwd();

  if (!path.isAbsolute(rootDir)) {
    throw new Error(`"rootDir" has to be an absolute path`);
  }

  console.log('Hello>>>>>', rootDir);

  return function transformer(tree: Root, file: VFile) {
    const codes: [Code, number | null, Parent][] = [];

    visit(tree, 'code', (node, index, parent) => {
      codes.push([node as Code, index, parent as Parent]);
    });

    for (const [node] of codes) {
      const pathMeta = (node.meta || '')
        .split(/(?<!\\) /g)
        .find((meta) => meta.startsWith('props='));
      const interfaceName = pathMeta?.replace('props=', '') + 'Props';

      // if (!pathMeta || !nameMeta) {
      //   continue;
      // }

      if (pathMeta) {
        console.log('>>>>Node', node);
        console.log('>>>>Intervace Name', interfaceName);
      }

      const val = fs.readFileSync(
        '/Users/betalectic/Desktop/ReuseJSV2/reusejs-react-v2/components/button/src/HeadlessButton.tsx'
      );

      console.log('val>>', val);

      node.value = JSON.stringify(val);

      if (!file.dirname) {
        throw new Error('"file" should be an instance of VFile');
      }

      // const nameRes = /^name=(?<name>.+?)$/.exec(nameMeta);
      // if (!nameRes || !nameRes.groups || !nameRes.groups.name) {
      //   throw new Error(`Unable to parse component name ${nameRes}`);
      // }

      // const componentName = nameRes.groups.name;

      // const res =
      //   /^path=(?<path>.+?)(?:(?:#(?:L(?<from>\d+)(?<dash>-)?)?)(?:L(?<to>\d+))?)?$/.exec(
      //     pathMeta
      //   );

      // if (!res || !res.groups || !res.groups.path) {
      //   throw new Error(`Unable to parse folder path ${pathMeta}`);
      // }

      // const folderPath = res.groups.path;
      // const fromLine = res.groups.from
      //   ? parseInt(res.groups.from, 10)
      //   : undefined;
      // const hasDash = !!res.groups.dash || fromLine === undefined;
      // const toLine = res.groups.to ? parseInt(res.groups.to, 10) : undefined;
      // const normalizedFolderPath = folderPath
      //   .replace(/^<rootDir>/, rootDir)
      //   .replace(/\\ /g, ' ');
      // const folderAbsPath = path.resolve(file.dirname, normalizedFolderPath);

      // let AllContent = '[TO-SPLIT]';
      // const folderFiles = fs.readdirSync(folderAbsPath); //

      // const addToContent = (filePath: string, type: string) => {
      //   const fileContent = fs.readFileSync(filePath, 'utf8');
      //   const content = extractLines(
      //     fileContent,
      //     fromLine,
      //     hasDash,
      //     toLine,
      //     options.preserveTrailingNewline
      //   );
      //   AllContent =
      //     AllContent +
      //     (AllContent === '[TO-SPLIT]'
      //       ? `[${type}]\n` + content
      //       : `\n||||\n[${type}]\n` + content);
      // };

      // if (pathMeta && folderFiles.length !== 0) {
      //   folderFiles.forEach((file) => {
      //     const filePath = path.resolve(folderAbsPath, file);
      //     if (file.includes('.preview')) {
      //       addToContent(filePath, 'preview');
      //     } else if (
      //       file.includes(componentName + '.jsx') ||
      //       file.includes(componentName + '.js')
      //     ) {
      //       addToContent(filePath, 'JSX');
      //     } else if (
      //       file.includes(componentName + '.tsx') ||
      //       file.includes(componentName + '.ts')
      //     ) {
      //       addToContent(filePath, 'TSX');
      //     }
      //   });
      // }

      // node.value = extractLines(
      //   AllContent,
      //   fromLine,
      //   hasDash,
      //   toLine,
      //   options.preserveTrailingNewline
      // );
      // if (options.removeRedundantIndentations) {
      //   node.value = stripIndent(node.value);
      // }
    }
  };
}

export { objectFetch };
export default objectFetch;
