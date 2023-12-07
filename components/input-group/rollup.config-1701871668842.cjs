'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjs = require('@rollup/plugin-commonjs');
var resolve = require('@rollup/plugin-node-resolve');
var typescript = require('rollup-plugin-typescript2');
var postcss = require('rollup-plugin-postcss');

var rollup_config = [
	{
		input: "./index.ts",
		output: [
			{
				file: "dist/index.cjs.js",
				format: "cjs",
			},
			{
				file: "dist/index.esm.js",
				format: "es",
			},
		],
		external: ["react", "react-dom", "tailwind-merge"],
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				useTsconfigDeclarationDir: true,
			}),
			// mdx(),
			postcss({
				extract: "styles.css",
				config: {
					path: "./postcss.config.js",
					ctx: null,
				},
				extensions: [".css"],
				minimize: true,
				inject: {
					insertAt: "top",
				},
			}),
		],
	},
];

exports.default = rollup_config;
