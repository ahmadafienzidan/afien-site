export function readProjectHash(
	hash: string,
	slugs: readonly string[],
): string | null {
	let slug: string;
	try {
		slug = decodeURIComponent(hash.replace(/^#/, ""));
	} catch {
		return null;
	}
	return slugs.includes(slug) ? slug : null;
}

export function projectHash(slug: string | null): string {
	return slug ? `#${slug}` : "";
}
