import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default [
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
    external: [
      "react",
      "react-dom",
      "tailwind-merge",
      "@locoworks/reusejs-toolkit-utils",
      "lodash",
      "validate.js",
      "lodash/isEmpty",
      "lodash/indexOf",
      "lodash/keys",
      "lodash/difference",
      "lodash/flatten",
      "lodash/toArray",
      "lodash/result",
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
];
