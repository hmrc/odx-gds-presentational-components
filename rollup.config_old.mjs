import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss'
import { readdir } from 'fs';


import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import generatePackageJson from "rollup-plugin-generate-package-json";

/* const plugins = [
  peerDepsExternal(),
  resolve(),
  replace({
    __IS_DEV__: process.env.NODE_ENV === "development",
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json",
    useTsconfigDeclarationDir: true,
  }),
  terser(),
];

const subfolderPlugins = (folderName) => {return ([
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: "../cjs/index.js", // --> points to cjs format entry point of whole library
      module: "./index.js", // --> points to esm format entry point of individual component
      types: "./index.d.ts", // --> points to types definition file of individual component
    },
  }),
])}; */


const packageJson = require('./package.json');

let folderBuilds;
readdir('./src',{}, (err, folders) => {
    folderBuilds = folders.map((folder) => {
        console.log('FOLDER: ' + folder)
        return {
          input: `src/${folder}/index.ts`,
          output: {
            file: `dist/${folder}/index.js`,
            sourcemap: true,
            exports: 'named',
            format: 'esm',
          },
          plugins: subfolderPlugins(folder),
          external: ['react', 'react-dom'],
        };
      });
})
/*  const folderBuilds = getFolders('./src').map((folder) => {
    return {
      input: `src/${folder}/index.ts`,
      output: {
        file: `dist/${folder}/index.js`,
        sourcemap: true,
        exports: 'named',
        format: 'esm',
      },
      plugins: subfolderPlugins(folder),
      external: ['react', 'react-dom'],
    };
  });*/

export default [{
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
            assetFileNames: 'src/styles.scss',              
            exports: "named",         
        },
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,            
            exports: "named",
        },
    ],    
    plugins: [
        external("react", "react-dom"),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss(),
        scss(),
        terser()
    ]
    },
    {
        input: 'dist/index.js',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        external: [/\.css$/],
        plugins: [typescript({ tsconfig: './tsconfig.json' })],
    },
   /* {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    },*/,
    // ...folderBuilds,
    {
        input: `src/Button/index.ts`,
        output: {
          file: `dist/Button/index.js`,
          sourcemap: true,
          exports: 'named',
          format: 'esm',
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            replace({
                __IS_DEV__: process.env.NODE_ENV === "development",
            }),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                useTsconfigDeclarationDir: true,
            }),
            terser(),
            generatePackageJson({
                baseContents: {
                  name: `${packageJson.name}/'Button`,
                  private: true,
                  main: "../cjs/index.js", // --> points to cjs format entry point of whole library
                  module: "./index.js", // --> points to esm format entry point of individual component
                  types: "./index.d.ts", // --> points to types definition file of individual component
                },
              }),
            ],
//subfolderPlugins('Button'),
        external: ['react', 'react-dom'],
    }
]


