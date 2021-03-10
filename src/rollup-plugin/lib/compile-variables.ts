import * as path from 'path';
import watch from 'node-watch';
import { ChildProcess, spawn, SpawnOptions } from 'child_process';
import { SmoothVariablesRollupPluginOptions } from './SmoothVariablesRollupPluginOptions';

const TRANSFORM_SCRIPT_PATH = path.resolve('./src-svelte/scripts/helpers/transform-variables.ts')
const OUTPUT_FILE_INDENTATION = '  '

let childProcess: ChildProcess

export function transformFile(srcFilePath: string, outputFilePath: string) {
  if (childProcess) {
    console.log('source file changed. killing previous compile process.')
    childProcess.kill('SIGINT')
    childProcess = null
  }

  console.log('compiling...')

  const childProcessParams = [TRANSFORM_SCRIPT_PATH, srcFilePath, outputFilePath, `${OUTPUT_FILE_INDENTATION}`]

  const defaults: SpawnOptions = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  }

  childProcess = spawn(`ts-node`, childProcessParams, defaults);
  childProcess.on('close', () => childProcess = null)
}

export function watchFiles(files) {
  console.log('watch mode')
  transformFile()

  watch(files, { delay: 50 }, (event, _fileName) => {
    if (event === 'update') {
      transformFile()
    }
  })
}

export function compileVariables(
  options: SmoothVariablesRollupPluginOptions,
  rollupContext: any,
) {
  if (rollupContext.meta.watchMode) {
    watchFiles([
      TRANSFORM_SCRIPT_PATH,
      srcFilePath,
    ])
  } else {
    transformFile();
  }
}