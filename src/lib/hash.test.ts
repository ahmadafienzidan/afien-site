import { describe, expect, it } from "vitest";
import { projectHash, readProjectHash } from "./hash";

describe("readProjectHash", () => {
	const slugs = ["saga-esa"];

	it("returns a known slug", () => {
		expect(readProjectHash("#saga-esa", slugs)).toBe("saga-esa");
	});

	it("returns null for unknown, empty and bare-hash input", () => {
		expect(readProjectHash("#nope", slugs)).toBeNull();
		expect(readProjectHash("", slugs)).toBeNull();
		expect(readProjectHash("#", slugs)).toBeNull();
	});

	it("returns null for malformed encoding without throwing", () => {
		expect(readProjectHash("#%E0", slugs)).toBeNull();
	});
});

describe("projectHash", () => {
	it("builds a hash from a slug", () => {
		expect(projectHash("by-e")).toBe("#by-e");
	});

	it("returns an empty string for null", () => {
		expect(projectHash(null)).toBe("");
	});
});
