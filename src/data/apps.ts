export const APPS: {
	name: string;
	blurb: string;
	href: string | null;
	tone: "orange" | "blue" | "yellow" | "white";
	model: string;
	badge?: string;
}[] = [
	{
		name: "Shapeshift",
		blurb:
			"Privacy-first file tools — convert, compress, PDF, QR and JSON, all in your browser.",
		href: "https://ahmadafienzidan.github.io/shapeshift",
		tone: "orange",
		model: "app-shapeshift",
	},
	{
		name: "NextStep",
		blurb:
			"A responsive job vacancy portal — browse, post and manage listings.",
		href: null,
		tone: "blue",
		model: "app-nextstep",
	},
	{
		name: "Coming soon",
		blurb: "[Your next app — what it does, in one line]",
		href: null,
		tone: "yellow",
		model: "app-soon",
		badge: "stay tuned!",
	},
	{
		name: "All repos on GitHub",
		blurb: "Side projects, experiments and everything in between.",
		href: "https://github.com/ahmadafienzidan",
		tone: "white",
		model: "app-github",
	},
];
