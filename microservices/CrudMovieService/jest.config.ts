export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  "preset": "@shelf/jest-mongodb",
  
  roots: ["<rootDir>/"],
  
  globalTeardown: '<rootDir>/test-teardown-globals.js',
  
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
