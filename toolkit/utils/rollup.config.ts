import rollupComponentConfig from "common-rollupconfig/rollup.component.config.json";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default [
	{
		...rollupComponentConfig,
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				useTsconfigDeclarationDir: true,
			}),
		],
	},
];
