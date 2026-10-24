export const HERO_STATS = [
	{ value: "4+", label: "Years building things" },
	{ value: "10+", label: "Projects shipped" },
];

export const EXPERIENCE: {
	period: string;
	role: string;
	company: string;
	summary: string;
	tone: "orange" | "blue" | "yellow" | "white";
}[] = [
	{
		period: "Aug 2025 — Now",
		role: "Software Engineer",
		company: "Formulatrix Indonesia",
		summary:
			"Building the Rover UI (map and topology editors) and stabilizing the FLO i8 PD web app across v3.4–v3.10. Cut local build time from 58 s to 27 s.",
		tone: "orange",
	},
	{
		period: "Apr 2025 — Jul 2025",
		role: "Software Engineer Intern",
		company: "Formulatrix Indonesia",
		summary:
			"Shipped 5+ user stories in React and Redux, resolved 30+ UI bugs, and refined reusable Storybook components with Jest tests.",
		tone: "blue",
	},
	{
		period: "Sep 2024 — May 2025",
		role: "EV Project & Operations Officer",
		company: "PT Braja Elektrik Motor",
		summary:
			"Ran operations for a 275+ vehicle EV conversion program that secured IDR 2.75B in government incentives.",
		tone: "yellow",
	},
	{
		period: "Aug 2022 — Dec 2022",
		role: "R&D Intern",
		company: "PT Industri Kereta Api (INKA)",
		summary:
			"Wired and maintained 25+ electric buses for the G20 Summit in Bali, and revised 15+ electrical schematics.",
		tone: "white",
	},
];

export const SKILLS: { label: string; highlight?: boolean }[] = [
	{ label: "TypeScript" },
	{ label: "JavaScript" },
	{ label: "React" },
	{ label: "Redux" },
	{ label: "Zustand" },
	{ label: "Tailwind CSS" },
	{ label: "Vite" },
	{ label: "Konva" },
	{ label: "Three.js" },
	{ label: "Node.js" },
	{ label: ".NET (C#)" },
	{ label: "Express" },
	{ label: "Storybook" },
	{ label: "Jest & Vitest" },
	{ label: "Git" },
	{ label: "Figma" },
	{ label: "Claude Code" },
	{ label: "STM32 · Arduino · ESP", highlight: true },
];

export const EDUCATION = {
	period: "Sep 2020 — Jul 2024",
	degree: "B.Eng Electrical Engineering · GPA 3.72/4.00",
	school: "Airlangga University, Surabaya",
};

export const AWARDS: {
	badge: string;
	title: string;
	detail: string;
	highlight?: boolean;
}[] = [
	{
		badge: "1st",
		title: "SAGA electric motorcycle",
		detail: "PLN ICE 2023 · ESA also Top 10",
		highlight: true,
	},
	{ badge: "4th", title: "By-E conversion", detail: "PLN ICE 2022" },
	{
		badge: "Best",
		title: "Final Project & 2nd Best Student",
		detail: "Sanber Code React JS, 2025",
	},
];
