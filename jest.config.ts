import { JestConfigWithTsJest } from "ts-jest";

const configs: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testPathIgnorePatterns: ["<rootDir>/lib"],
};

export default configs;
