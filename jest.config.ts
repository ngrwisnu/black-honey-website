const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
  modulePaths: ["<rootDir>"],
  modulePathIgnorePatterns: ["<rootDir>/components/ui/*.tsx"],
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/config/**",
    "!**/data/**",
    "!**/hooks/**",
    "!**/lib/**",
    "!**/store/**",
    "!**/types/**",
    "!**/validations/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/.swc/**",
    "!<rootDir>/.vscode/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/*.config.ts",
    "!<rootDir>/components/ui/*.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: -10,
    },
    "./components/": {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
