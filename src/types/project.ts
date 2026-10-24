export type ProjectKind = "web" | "work" | "ev";
export type Tint = "orange" | "blue" | "sky" | "periwinkle" | "yellow" | "sand";
export type ProjectImage = {
	avif: string;
	webp: string;
	src: string;
	width: number;
	height: number;
	alt: string;
};
export type ProjectView = {
	slug: string;
	title: string;
	kind: ProjectKind;
	year: string;
	role: string;
	timeline: string;
	stack: string[];
	summary: string;
	points: string[];
	tint: Tint;
	cover: ProjectImage;
	gallery: ProjectImage[];
	liveUrl?: string;
	repoUrl?: string;
};
