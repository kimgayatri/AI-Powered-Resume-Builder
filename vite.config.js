// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//     // vite.config.js
//   server: {
//   host: "localhost",
//   port: 5173,
//   strictPort: true,
//   hmr: {
//     protocol: "ws",
//     host: "localhost",
//   },
// },

//   },
// })



import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
      protocol: "ws",
      host: "localhost"
    }
  }
})