// https://nextjs.org/docs/pages/building-your-application/testing/jest
// @testing-library/jest-dom @testing-library/react jest-environment-jsdom @testing-library/user-event ts-jest jest

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
