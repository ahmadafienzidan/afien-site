import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:4321";

export default defineConfig({
	testDir: "e2e",
	use: { baseURL },
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		command: "bun run build && bun run preview -- --port 4321 --ignore-lock",
		url: baseURL,
		reuseExistingServer: !process.env.CI,
	},
});
