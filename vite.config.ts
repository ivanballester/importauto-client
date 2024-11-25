import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Asegura que Vite escuche en todas las interfaces
    port: 5173, // (Opcional) especifica el puerto, por si acaso
  },
});
