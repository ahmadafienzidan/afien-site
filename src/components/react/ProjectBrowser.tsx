import { useEffect, useState } from "react";
import { projectHash, readProjectHash } from "../../lib/hash";
import {
	availableKinds,
	filterProjects,
	KIND_LABEL,
	TINT_BG,
} from "../../lib/projects";
import type { ProjectKind, ProjectView } from "../../types/project";
import { Photo } from "./Gallery";
import ProjectDialog from "./ProjectDialog";

const pill =
	"min-h-11 rounded-full border-[1.5px] border-ink px-[18px] text-base";

export default function ProjectBrowser({
	projects,
}: {
	projects: ProjectView[];
}) {
	const [filter, setFilter] = useState<ProjectKind | "all">("all");
	const [openSlug, setOpenSlug] = useState<string | null>(null);
	const open = projects.find((p) => p.slug === openSlug);
	const filters: { value: ProjectKind | "all"; label: string }[] = [
		{ value: "all", label: "All" },
		...availableKinds(projects).map((kind) => ({
			value: kind,
			label: KIND_LABEL[kind],
		})),
	];

	useEffect(() => {
		const slugs = projects.map((p) => p.slug);
		const sync = () => setOpenSlug(readProjectHash(location.hash, slugs));
		sync();
		window.addEventListener("hashchange", sync);
		return () => window.removeEventListener("hashchange", sync);
	}, [projects]);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 id="all-work" className="text-[32px] font-bold">
					All projects{" "}
					<svg
						width="64"
						height="20"
						viewBox="0 0 72 20"
						fill="none"
						strokeWidth="3"
						strokeLinecap="round"
						aria-hidden="true"
						className="inline-block stroke-orange align-middle"
					>
						<path d="M2 14c10-12 18-12 22 0s14 6 22-6 14-4 24 4" />
					</svg>
				</h2>
				<fieldset aria-label="Filter projects" className="flex flex-wrap gap-2">
					{filters.map((f) => (
						<button
							key={f.value}
							type="button"
							aria-pressed={filter === f.value}
							onClick={() => setFilter(f.value)}
							className={`${pill} ${filter === f.value ? "bg-ink text-white" : "bg-white text-ink"}`}
						>
							{f.label}
						</button>
					))}
				</fieldset>
			</div>
			<ul
				aria-label="Projects"
				className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4"
			>
				{filterProjects(projects, filter).map((p) => (
					<li key={p.slug}>
						<button
							type="button"
							onClick={() => {
								history.replaceState(null, "", projectHash(p.slug));
								setOpenSlug(p.slug);
							}}
							className="flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left"
						>
							<span
								className={`relative block aspect-square w-full ${TINT_BG[p.tint]}`}
							>
								<Photo
									image={p.cover}
									sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 100vw"
									lazy
									className="h-full w-full object-cover"
								/>
								<span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[13px] tracking-[0.06em] text-white">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<rect x="3" y="6" width="18" height="14" rx="2" />
										<circle cx="12" cy="13" r="3.5" />
										<path d="M8 6l2-3h4l2 3" />
									</svg>
									<span aria-hidden="true">{p.gallery.length}</span>
									<span className="sr-only">{p.gallery.length} photos</span>
								</span>
							</span>
							<span className="flex w-full items-center justify-between gap-3 p-4">
								<span className="flex min-w-0 flex-col">
									<span>{p.title}</span>
									<span className="mt-0.5 text-[15px] text-muted">
										{KIND_LABEL[p.kind]} · {p.year}
									</span>
								</span>
								<span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-[1.5px] border-ink">
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<path d="M12 5v14M5 12h14" />
									</svg>
								</span>
							</span>
						</button>
					</li>
				))}
			</ul>
			{open && (
				<ProjectDialog
					key={open.slug}
					project={open}
					onClose={() => setOpenSlug(null)}
				/>
			)}
		</div>
	);
}
