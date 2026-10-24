// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://afien.dev",
	integrations: [react(), mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
