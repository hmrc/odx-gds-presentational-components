import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: "jsdom",
  roots: ['src', '__mocks__'],
  reporters: [
    'default',
    ['jest-stare', {"coverageLink":"../coverage/lcov-report/index.html"}],
    ["jest-junit", { outputDirectory: "./test-results", outputName: "junit.xml" }]
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/StillToBuild/"
  ]
};

export default config;