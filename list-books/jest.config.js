module.exports ={
  testIgnorePatters: ["/node_modules"],
  setupFilesAfterEnv:[
    "<rootDir>/src/tests/setupTest.js"
  ],
  testEnvironment:"jsdom"
}