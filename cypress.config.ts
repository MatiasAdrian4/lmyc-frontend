import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    supportFile: "cypress/support/command.js"
  },
  env: {
    lmyc_username: "testuser",
    lmyc_password: "testpassword"
  },
  defaultCommandTimeout: 10000
})
