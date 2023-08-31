import rollupComponentConfig from "common-rollupconfig/rollup.component.config.json";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default [
	{
		...rollupComponentConfig,
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
