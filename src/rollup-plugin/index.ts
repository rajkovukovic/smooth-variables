import { compileVariables } from "./lib/compile-variables";
import { SmoothVariablesRollupPluginOptions } from "./lib/SmoothVariablesRollupPluginOptions";

const DEFAULT_OPTIONS: Partial<SmoothVariablesRollupPluginOptions> = {
  breakpointsExportName: 'default',
  variablesExportName: 'default',
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
    buildStart: async () => compileVariables(options, this),
  }
}
