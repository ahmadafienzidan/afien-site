import type { ProjectKind, Tint } from "../types/project";

export const KIND_ORDER: readonly ProjectKind[] = ["web", "work", "ev"];

export const KIND_LABEL: Record<ProjectKind, string> = {
	web: "Web",
	work: "Work",
	ev: "EV",
};

export const TINT_BG: Record<Tint, string> = {
	orange: "bg-orange",
	blue: "bg-blue",
	sky: "bg-sky",
	periwinkle: "bg-periwinkle",
	yellow: "bg-yellow",
	sand: "bg-sand",
};

export function sortProjects<T extends { order: number; title: string }>(
	items: T[],
): T[] {
	return [...items].sort(
		(a, b) => a.order - b.order || a.title.localeCompare(b.title),
	);
}

export function filterProjects<T extends { kind: ProjectKind }>(
	items: T[],
	filter: ProjectKind | "all",
): T[] {
	return filter === "all" ? items : items.filter((i) => i.kind === filter);
}

export function availableKinds(items: { kind: ProjectKind }[]): ProjectKind[] {
	return KIND_ORDER.filter((kind) => items.some((i) => i.kind === kind));
}

export function pickFeatured<T extends { featured: boolean; slug: string }>(
	items: T[],
): T | null {
	const featured = items.filter((i) => i.featured);
	if (featured.length > 1) {
		throw new Error(
			`Only one project can be featured, found: ${featured.map((i) => i.slug).join(", ")}`,
		);
	}
	return featured[0] ?? null;
}
