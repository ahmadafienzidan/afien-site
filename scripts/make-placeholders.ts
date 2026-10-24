import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import type { Tint } from "../src/types/project";

const COLORS: Record<Tint, string> = {
	orange: "#FF6B1A",
	blue: "#2F5BFF",
	sky: "#BFD0FF",
	periwinkle: "#7E9BFF",
	yellow: "#FFD21F",
	sand: "#D9D5CE",
};

const outDir = new URL("../src/assets/placeholders/", import.meta.url);
mkdirSync(outDir, { recursive: true });

for (const [tint, background] of Object.entries(COLORS)) {
	await sharp({
		create: { width: 1600, height: 1200, channels: 3, background },
	})
		.png()
		.toFile(fileURLToPath(new URL(`${tint}.png`, outDir)));
}
