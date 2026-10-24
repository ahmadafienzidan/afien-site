import { useEffect, useRef, useState } from "react";
import { stepIndex } from "../../lib/gallery";
import { KIND_LABEL, TINT_BG } from "../../lib/projects";
import type { ProjectView } from "../../types/project";
import Gallery from "./Gallery";

const linkButton =
	"inline-flex min-h-12 items-center gap-2.5 rounded-[10px] px-6 border-[1.5px] border-ink";

function ArrowUpRight() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
		>
			<path d="M7 17L17 7M9 7h8v8" />
		</svg>
	);
}

export default function ProjectDialog({
	project,
	onClose,
}: {
	project: ProjectView;
	onClose: () => void;
}) {
	const ref = useRef<HTMLDialogElement>(null);
	const [index, setIndex] = useState(0);
	const total = project.gallery.length;

	useEffect(() => {
		ref.current?.showModal();
	}, []);

	return (
		<dialog
			ref={ref}
			aria-labelledby="project-title"
			onClose={() => {
				history.replaceState(null, "", location.pathname);
				onClose();
			}}
			onClick={(e) => {
				if (e.target === e.currentTarget) ref.current?.close();
			}}
			onKeyDown={(e) => {
				if (e.key === "ArrowRight") setIndex(stepIndex(index, total, 1));
				if (e.key === "ArrowLeft") setIndex(stepIndex(index, total, -1));
			}}
			className="m-auto h-fit max-h-[calc(100dvh-48px)] w-[calc(100%-32px)] max-w-[1040px] overflow-hidden rounded-3xl border-[3px] border-ink bg-cream p-0 text-ink shadow-[8px_8px_0_#111111] backdrop:bg-ink/55 open:flex"
		>
			<button
				type="button"
				aria-label="Close"
				onClick={() => ref.current?.close()}
				className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink bg-white text-ink"
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
			<div className="flex min-w-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] min-[900px]:flex-row [&::-webkit-scrollbar]:hidden">
				<div
					className={`flex min-w-0 flex-col min-[900px]:w-[44%] min-[900px]:flex-none ${TINT_BG[project.tint]}`}
				>
					<Gallery
						images={project.gallery}
						index={index}
						onIndex={setIndex}
						badge={`${KIND_LABEL[project.kind]} · ${project.year}`}
					/>
				</div>
				<div className="flex min-w-0 flex-1 flex-col gap-5 border-t-[3px] border-ink px-6 pt-10 pb-8 min-[900px]:border-t-0 min-[900px]:border-l-[3px] min-[900px]:px-8">
					<h2
						id="project-title"
						className="pr-12 font-display text-[clamp(36px,4vw,52px)] leading-[0.95] font-normal text-orange [-webkit-text-stroke:3px_#111111] [paint-order:stroke_fill] [text-shadow:4px_4px_0_#111111]"
					>
						{project.title}
					</h2>
					<p className="text-[17px]">{project.summary}</p>
					<dl className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
						{[
							["Role", project.role],
							["Timeline", project.timeline],
							["Stack", project.stack.join(" · ")],
						].map(([term, value]) => (
							<div key={term} className="rounded-[14px] bg-white p-3.5">
								<dt className="text-sm tracking-[0.1em] text-muted uppercase">
									{term}
								</dt>
								<dd className="mt-1">{value}</dd>
							</div>
						))}
					</dl>
					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-bold">What I did</h3>
						<ul className="flex list-disc flex-col gap-1.5 pl-5">
							{project.points.map((point) => (
								<li key={point}>{point}</li>
							))}
						</ul>
					</div>
					{(project.liveUrl || project.repoUrl) && (
						<div className="flex flex-wrap items-center gap-3">
							{project.liveUrl && (
								<a
									href={project.liveUrl}
									className={`${linkButton} bg-ink text-white hover:text-white hover:opacity-85`}
								>
									Visit live app
									<ArrowUpRight />
								</a>
							)}
							{project.repoUrl && (
								<a
									href={project.repoUrl}
									className={`${linkButton} ${project.liveUrl ? "bg-white" : "bg-ink text-white hover:text-white hover:opacity-85"}`}
								>
									View on GitHub
									<ArrowUpRight />
								</a>
							)}
							<span className="-rotate-4 font-marker text-lg">
								go take a look!
							</span>
						</div>
					)}
				</div>
			</div>
		</dialog>
	);
}
