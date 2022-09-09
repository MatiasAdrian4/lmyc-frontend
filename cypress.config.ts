import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    supportFile: false
  },
  env: {
    lmyc_username: "admin",
    lmyc_password: "password"
  },
  defaultCommandTimeout: 60000
})
