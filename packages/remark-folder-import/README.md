# `remark-code-import`

📝 Populate code blocks from files in a folder.

[![npm version](https://badge.fury.io/js/remark-code-import.svg)](https://badge.fury.io/js/remark-code-import)

**Starting from v1.0.0, the plugin is now [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). Node 12+ is needed to use it and it must be `import`ed instead of `require`d.**

## Installation

```sh
npm install -D remark-folder-import
```

## Setup

The plugin can be imported via named export, there's no default export.

```js
import codeImport from 'remark-folder-import';
```

See [**Using plugins**](https://github.com/remarkjs/remark/blob/master/doc/plugins.md#using-plugins) for more instructions in the official documentation.

It can also be used in various of libraries: `remark`: [MDX](https://mdxjs.com/advanced/plugins#using-remark-and-rehype-plugins), [Gatsby `gatsby-plugin-mdx`](https://www.gatsbyjs.org/docs/mdx/plugins/#remark-plugins), [Storybook docs](https://github.com/storybookjs/storybook/tree/master/addons/docs#manual-configuration).

## Usage

Transform:

````md
```js path=./Hello name=Hello

```
````

into:

````md
```js path=./Hello name=Hello
console.log('Hello remark-code-import!');
```
````

The file path is relative to the markdown file path. You can use `<rootDir>` at the start of the path to import files relatively from the [`rootDir`](#options):

````md
```js path=<rootDir>/<path-to-file> name=<comman-file-name-to-import>

```
````

## License

Shrey Dhyani
[MIT](LICENSE)
