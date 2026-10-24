import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
	loader: glob({ pattern: "*.mdx", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			kind: z.enum(["web", "work", "ev"]),
			year: z.string(),
			role: z.string(),
			timeline: z.string(),
			stack: z.array(z.string()),
			summary: z.string(),
			points: z.array(z.string()).min(1).max(5),
			cover: image(),
			gallery: z.array(image()).min(1),
			tint: z.enum(["orange", "blue", "sky", "periwinkle", "yellow", "sand"]),
			order: z.number(),
			featured: z.boolean().default(false),
			liveUrl: z.url().optional(),
			repoUrl: z.url().optional(),
		}),
});

export const collections = { projects };
