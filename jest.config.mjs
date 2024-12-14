export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { configFile: "./babel.config.cjs" }]
  },
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@supabase|.+\\.mjs$))"
  ],
  extensionsToTreatAsEsm: [".jsx", ".ts", ".tsx"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"]
  }
}