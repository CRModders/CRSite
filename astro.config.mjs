import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";


// https://astro.build/config
export default defineConfig({
  integrations: [icon(), mdx(), sitemap()],
});