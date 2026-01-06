import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Look for .test.ts files
  testMatch: ["**/*.test.ts"],

  // Use tsconfig.json
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },

  // Clear mocks between tests
  clearMocks: true,
};

export default config;
