import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    supportFile: "cypress/support/command.js"
  },
  env: {
    backendUrl: "http://localhost:8001/",
    lmycUsername: "test_user",
    lmycPassword: "test_password"
  },
  defaultCommandTimeout: 10000,
  video: false,
  screenshotOnRunFailure: false
})
