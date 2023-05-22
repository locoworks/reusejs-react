import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
// import mdx from "rollup-plugin-mdx";

export default [
  {
    input: "./src/core/index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
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
