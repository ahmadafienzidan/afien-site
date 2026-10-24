export const NAV = [
	{ id: "home", label: "Home", href: "/" },
	{ id: "portfolio", label: "Portfolio", href: "/portfolio" },
	{ id: "links", label: "Links", href: "/links" },
] as const;

export const CONTACT = {
	email: "afienzidan227@gmail.com",
	linkedin: "https://linkedin.com/in/ahmad-afien-zidan",
	github: "https://github.com/ahmadafienzidan",
	gitlab: "https://gitlab.com/afienzidan",
} as const;

export type DoodleKind = "star" | "squiggle" | "smiley" | "arrow" | "spark";
