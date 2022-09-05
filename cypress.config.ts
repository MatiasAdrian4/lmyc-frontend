import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    supportFile: false
  },
  env: {
    lmyc_username: "matiasadrian",
    lmyc_password: "1234"
  }
})
