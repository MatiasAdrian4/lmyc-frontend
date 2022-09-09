import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    supportFile: false
  },
  env: {
    lmyc_username: "matiasadrian4_1993",
    lmyc_password: "Algodon1206_"
  }
})
