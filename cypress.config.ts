import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    supportFile: "cypress/support/command.js"
  },
  env: {
    lmyc_username: "test_user",
    lmyc_password: "test_password"
  },
  defaultCommandTimeout: 10000
})
