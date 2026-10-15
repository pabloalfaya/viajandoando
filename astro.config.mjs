// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: mantener sincronizado con SITE.dominio (src/config/site.ts) cuando haya dominio.
const DOMINIO = "https://dominio-pendiente.example";
const NOINDEX = ["/aviso-legal/", "/privacidad/", "/cookies/", "/404/"];

export default defineConfig({
  site: DOMINIO,
  trailingSlash: "always",
  output: "static",
  integrations: [
    sitemap({
      filter: (pagina) => !NOINDEX.some((ruta) => new URL(pagina).pathname === ruta),
    }),
  ],
  image: {
    layout: "constrained",
  },
});
