import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default [
	{
		input: "./index.ts",
		output: [
			{
				file: "dist/index.cjs.js",
				format: "cjs",
				inlineDynamicImports: true,
			},
			{
				file: "dist/index.esm.js",
				format: "es",
				inlineDynamicImports: true,
			},
		],
		external: [
			"react",
			"react-dom",
			"lexical",
			"@lexical/react",
			"tailwind-merge",
		],
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
