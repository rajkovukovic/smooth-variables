import * as path from 'path';
import watch from 'node-watch';
import { ChildProcess, spawn, SpawnOptions } from 'child_process';
import { SmoothVariablesRollupPluginOptions } from './SmoothVariablesRollupPluginOptions';

const TRANSFORM_SCRIPT_PATH = path.resolve(__dirname, 'transform/transform-cli.ts')
const OUTPUT_FILE_INDENTATION = '  '

let childProcess: ChildProcess

export function transformFile(options: SmoothVariablesRollupPluginOptions) {
  if (childProcess) {
    console.log('source file changed. killing previous compile process.')
    childProcess.kill('SIGINT')
    childProcess = null
  }

  console.log('compiling...')

  const childProcessParams = [
    TRANSFORM_SCRIPT_PATH,
    options.inputFilePath,
    options.outputFilePath,
    OUTPUT_FILE_INDENTATION,
  ]

  const spawnOptions: SpawnOptions = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  }

  childProcess = spawn(`ts-node`, childProcessParams, spawnOptions);
  childProcess.on('close', () => childProcess = null)
}

export function watchFiles(
  files: string[],
  options: SmoothVariablesRollupPluginOptions,
) {
  console.log('watch mode')
  transformFile(options)

  watch(files, { delay: 50 }, (event, _fileName) => {
    if (event === 'update') {
      transformFile(options)
    }
  })
}

export function compileVariables(
  options: SmoothVariablesRollupPluginOptions,
  rollupContext: any,
) {
  console.log({
    dirname: __dirname,
    filename: __filename,
    '.': path.resolve('.'),
  })
  if (rollupContext.meta.watchMode) {
    watchFiles(
      [
        TRANSFORM_SCRIPT_PATH,
        options.inputFilePath,
      ],
      options,
    )
  } else {
    transformFile(options);
  }
}
