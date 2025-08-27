import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import sass from 'rollup-plugin-sass'
import packageJson from './package.json' with {type: "json"}
import fs from 'fs'

export const getFolders = (entry) => {
  const dirs = fs.readdirSync(entry)
  const dirsWithoutIndex = dirs.filter(name => name !== 'index.ts').filter(name => name !== 'utils')
  return dirsWithoutIndex
}

const plugins = [
  peerDepsExternal(),
  resolve(),
  replace({
    __IS_DEV__: process.env.NODE_ENV === 'development',
    preventAssignment: true
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    exclude: ["**/__tests__",
      "**/*.test.[ts|tsx]",
      "**/*.test.d.ts",
      "**/__stories__",
      "**/*.stories.[ts|tsx]",
      "**/testHelpers.[ts|tsx]",
      "**/testHelpers.d.ts"]
  }),
  terser(),
  sass()
]

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      }
    ],
    plugins,
    external: ['react', 'react-dom']
  },
]
