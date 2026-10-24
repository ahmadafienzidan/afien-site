import { getImage } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import type { ProjectImage, ProjectView } from "../types/project";

const WIDTHS = [400, 800, 1200, 1600];

export async function toProjectImage(
	img: ImageMetadata,
	alt: string,
): Promise<ProjectImage> {
	const [avif, webp] = await Promise.all([
		getImage({ src: img, format: "avif", widths: WIDTHS }),
		getImage({ src: img, format: "webp", widths: WIDTHS }),
	]);
	return {
		avif: avif.srcSet.attribute,
		webp: webp.srcSet.attribute,
		src: webp.src,
		width: img.width,
		height: img.height,
		alt,
	};
}

export async function toProjectView(
	entry: CollectionEntry<"projects">,
): Promise<ProjectView> {
	const { data } = entry;
	return {
		slug: entry.id,
		title: data.title,
		kind: data.kind,
		year: data.year,
		role: data.role,
		timeline: data.timeline,
		stack: data.stack,
		summary: data.summary,
		points: data.points,
		tint: data.tint,
		cover: await toProjectImage(data.cover, ""),
		gallery: await Promise.all(
			data.gallery.map((img, i) =>
				toProjectImage(img, `${data.title}, photo ${i + 1}`),
			),
		),
		liveUrl: data.liveUrl,
		repoUrl: data.repoUrl,
	};
}
