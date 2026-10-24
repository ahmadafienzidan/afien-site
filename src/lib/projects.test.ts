import { describe, expect, it } from "vitest";
import {
	availableKinds,
	filterProjects,
	pickFeatured,
	sortProjects,
} from "./projects";

describe("sortProjects", () => {
	it("orders by order then title without mutating the input", () => {
		const items = [
			{ order: 2, title: "b" },
			{ order: 1, title: "z" },
			{ order: 2, title: "a" },
		];
		const snapshot = [...items];
		expect(sortProjects(items).map((i) => i.title)).toEqual(["z", "a", "b"]);
		expect(items).toEqual(snapshot);
	});
});

describe("filterProjects", () => {
	const items = [
		{ kind: "web" as const },
		{ kind: "ev" as const },
		{ kind: "work" as const },
		{ kind: "ev" as const },
	];

	it("returns all items for 'all'", () => {
		expect(filterProjects(items, "all")).toEqual(items);
	});

	it("returns only the matching kind", () => {
		const result = filterProjects(items, "ev");
		expect(result).toHaveLength(2);
		expect(result.every((i) => i.kind === "ev")).toBe(true);
	});
});

describe("availableKinds", () => {
	it("returns present kinds in KIND_ORDER", () => {
		expect(
			availableKinds([{ kind: "ev" }, { kind: "web" }, { kind: "ev" }]),
		).toEqual(["web", "ev"]);
	});
});

describe("pickFeatured", () => {
	it("returns null when there are no items", () => {
		expect(pickFeatured([])).toBeNull();
	});

	it("returns the single featured item", () => {
		const a = { featured: false, slug: "a" };
		const b = { featured: true, slug: "b" };
		expect(pickFeatured([a, b])).toBe(b);
	});

	it("returns null when none is featured", () => {
		expect(pickFeatured([{ featured: false, slug: "a" }])).toBeNull();
	});

	it("throws when more than one is featured", () => {
		expect(() =>
			pickFeatured([
				{ featured: true, slug: "a" },
				{ featured: true, slug: "b" },
			]),
		).toThrow("Only one project can be featured, found: a, b");
	});
});
