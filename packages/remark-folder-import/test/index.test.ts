import { vi, describe, test, expect } from 'vitest';
import codeImport from '../src/index';
import { remark } from 'remark';
import { VFile } from 'vfile';
import path from 'node:path';

const vfile = (value: string) =>
  new VFile({
    value,
    path: path.resolve('./test.md'),
  });

const input = (q: string) => `
\`\`\`js path=./__fixtures__/${q} name=${q}
\`\`\`
`;

test('Basic folder import', () => {
  expect(
    remark()
      .use(codeImport, {})
      .processSync(vfile(input('sample')))
      .toString()
  ).toMatchInlineSnapshot(
    `"\`\`\`js path=./__fixtures__/sample name=sample
[TO-SPLIT][JSX]
// This is a sample JSX file. Will have jsx code
||||
[TSX]
// This is a sample TSX file. Will have tsx code
\`\`\`
"
  `
  );
});
