import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-re";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

const pkg = require("./package.json");

export default [{
  input: "src/rollup-plugin/index.ts",

  external: [
    "fs",
    "fs-extra",
    "resolve",
    "crypto",
    "path",
    "constants",
    "stream",
    "util",
    "assert",
    "os",
    "@rollup/pluginutils",
    "rxjs",
  ],

  plugins: [
    copy({
      targets: [
        { src: "src/rollup-plugin/transform", dest: "dist" },
      ],
      verbose: true,
    }),

    replace({
      replaces: {
        "$RPT2_VERSION": pkg.version,
        "$TS_VERSION_RANGE": pkg.devDependencies.typescript,
      },
    }),
    resolve({ jsnext: true, preferBuiltins: true }),
    commonjs({
      include: "node_modules/**",
    }),

    typescript(),
  ],

  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
      banner: "/* eslint-disable */",
      exports: "auto",
    },
    {
      format: "es",
      file: pkg.module,
      sourcemap: true,
      banner: "/* eslint-disable */",
      exports: "auto",
    },
  ],
}];
