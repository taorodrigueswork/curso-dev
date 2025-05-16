// This configuration file is for Jest, a JavaScript testing framework.
// It uses the `next/jest` package to create a Jest configuration that is compatible with Next.js.
const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

const nextJest = require("next/jest");
require("dotenv").config({ path: ".env.development" });

const createJestConfig = nextJest({
  dir: ".", // The root directory of your Next.js project
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
