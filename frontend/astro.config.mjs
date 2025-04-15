// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['mercadopago']
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});