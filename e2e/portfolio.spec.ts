import { expect, type Page, test } from "@playwright/test";

async function gotoHydrated(page: Page, url: string) {
	await page.goto(url);
	await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
}

test("filters and opens a project", async ({ page }) => {
	await gotoHydrated(page, "/portfolio");
	const filters = page.getByRole("group", { name: "Filter projects" });
	await expect(filters.getByRole("button")).toHaveText([
		"All",
		"Web",
		"Work",
		"EV",
	]);

	await filters.getByRole("button", { name: "EV" }).click();
	const grid = page.getByRole("list", { name: "Projects" });
	await expect(grid.getByRole("button")).toHaveCount(3);

	await grid.getByRole("button", { name: /SAGA & ESA/ }).click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	await expect(
		dialog.getByRole("heading", { level: 2, name: "SAGA & ESA" }),
	).toBeVisible();
	await expect(page).toHaveURL(/#saga-esa$/);

	await page.keyboard.press("ArrowRight");
	await expect(dialog.getByText("2 / 6")).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
	await expect.poll(() => page.evaluate(() => location.hash)).toBe("");
});

test("backdrop click closes the dialog", async ({ page }) => {
	await gotoHydrated(page, "/portfolio");
	await page
		.getByRole("list", { name: "Projects" })
		.getByRole("button")
		.first()
		.click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	await page.mouse.click(5, 5);
	await expect(dialog).toBeHidden();
	await expect.poll(() => page.evaluate(() => location.hash)).toBe("");
});

test("deep link opens even when filtered out", async ({ page }) => {
	await gotoHydrated(page, "/portfolio");
	const web = page
		.getByRole("group", { name: "Filter projects" })
		.getByRole("button", { name: "Web" });
	await web.click();
	await page.goto("/portfolio#rover-ui");
	await expect(web).toHaveAttribute("aria-pressed", "true");
	await expect(
		page.getByRole("dialog").getByRole("heading", { name: "Rover UI" }),
	).toBeVisible();
});

test("single-photo project has no gallery controls", async ({ page }) => {
	await page.goto("/portfolio#nextstep");
	const dialog = page.getByRole("dialog");
	await expect(
		dialog.getByRole("heading", { level: 2, name: "NextStep" }),
	).toBeVisible();
	await expect(dialog.getByRole("button", { name: "Next photo" })).toHaveCount(
		0,
	);
	await expect(dialog.getByText(/^\d+ \/ \d+$/)).toHaveCount(0);
	await expect(dialog.getByRole("group", { name: "Photos" })).toHaveCount(0);

	await expect(dialog.locator("picture img")).toHaveCount(1);
});

test("unknown hash is ignored", async ({ page }) => {
	const errors: string[] = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") errors.push(msg.text());
	});
	page.on("pageerror", (err) => errors.push(err.message));
	await gotoHydrated(page, "/portfolio#nope");
	await expect(page.getByRole("dialog")).toHaveCount(0);
	expect(errors).toEqual([]);
});
