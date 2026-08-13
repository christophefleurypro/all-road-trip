import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // chemins relatifs dans le build : le dossier dist/ fonctionne déployé
  // n'importe où, y compris dans un sous-dossier
  base: "./"
});
