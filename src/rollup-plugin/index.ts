import { compileVariables } from "./lib/compile-variables";
import { SmoothVariablesRollupPluginOptions } from "./lib/SmoothVariablesRollupPluginOptions";

const DEFAULT_OPTIONS: Partial<SmoothVariablesRollupPluginOptions> = {
  breakpointsExportName: 'breakpoints',
  variablesExportName: 'uiVariables',
  verbose: false,
}

export default function smoothVariables(
  options: SmoothVariablesRollupPluginOptions
) {
  options = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  return {
    name: 'smooth-variables',
    buildStart: async function () {
      return compileVariables(options, this)
    },
  }
}
