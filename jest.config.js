module.exports = {
  preset: "ts-jest",
  silent: true,
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts"],
  collectCoverage: false,
  coverageDirectory: "coverage",
};
