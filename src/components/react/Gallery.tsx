import { useRef } from "react";
import { stepIndex, swipeDelta } from "../../lib/gallery";
import type { ProjectImage } from "../../types/project";

export function Photo({
	image,
	sizes,
	lazy,
	className,
}: {
	image: ProjectImage;
	sizes: string;
	lazy: boolean;
	className: string;
}) {
	return (
		<picture>
			<source type="image/avif" srcSet={image.avif} sizes={sizes} />
			<source type="image/webp" srcSet={image.webp} sizes={sizes} />
			<img
				src={image.src}
				width={image.width}
				height={image.height}
				alt={image.alt}
				loading={lazy ? "lazy" : "eager"}
				decoding="async"
				className={className}
			/>
		</picture>
	);
}

function scrollToThumb(el: HTMLButtonElement | null) {
	el?.scrollIntoView({ block: "nearest", inline: "center" });
}

const roundButton =
	"absolute top-1/2 -mt-[22px] flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink bg-white text-ink";

export default function Gallery({
	images,
	index,
	onIndex,
	badge,
}: {
	images: ProjectImage[];
	index: number;
	onIndex: (index: number) => void;
	badge: string;
}) {
	const swipeStart = useRef<number | null>(null);
	const multiple = images.length > 1;

	const step = (delta: 1 | -1) =>
		onIndex(stepIndex(index, images.length, delta));

	return (
		<div className="flex min-w-0 flex-1 flex-col">
			<div
				className="relative flex min-h-[320px] flex-1 touch-pan-y items-center justify-center"
				onPointerDown={(e) => {
					swipeStart.current = e.clientX;
				}}
				onPointerUp={(e) => {
					if (swipeStart.current === null || !multiple) return;
					const delta = swipeDelta(e.clientX - swipeStart.current);
					swipeStart.current = null;
					if (delta !== 0) step(delta);
				}}
			>
				{images.map((image, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: gallery images can repeat, position is the identity
						key={i}
						hidden={i !== index}
						className="h-full w-full"
					>
						<Photo
							image={image}
							sizes="(min-width: 900px) 460px, 100vw"
							lazy={i !== index}
							className="h-full max-h-[70vh] w-full object-cover"
						/>
					</div>
				))}
				<span className="absolute top-6 left-6 -rotate-3 rounded-full bg-ink px-[18px] py-2 text-[15px] tracking-[0.08em] text-white">
					{badge}
				</span>
				{multiple && (
					<>
						<button
							type="button"
							aria-label="Previous photo"
							onClick={() => step(-1)}
							className={`${roundButton} left-4`}
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
								<path d="M19 12H5M11 6l-6 6 6 6" />
							</svg>
						</button>
						<button
							type="button"
							aria-label="Next photo"
							onClick={() => step(1)}
							className={`${roundButton} right-4`}
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
								<path d="M5 12h14M13 6l6 6-6 6" />
							</svg>
						</button>
						<span className="absolute bottom-5 left-6 rounded-full border-[1.5px] border-ink bg-white px-3.5 py-1.5 text-[15px] tracking-[0.04em]">
							{index + 1} / {images.length}
						</span>
					</>
				)}
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					aria-hidden="true"
					className="absolute right-6 bottom-4 fill-yellow stroke-ink"
					strokeWidth="2"
				>
					<path d="M24 2c2 12 10 20 22 22-12 2-20 10-22 22-2-12-10-20-22-22 12-2 20-10 22-22z" />
				</svg>
			</div>
			{multiple && (
				<fieldset
					aria-label="Photos"
					className="flex min-w-0 snap-x gap-2 overflow-x-auto border-t-[3px] border-ink bg-cream p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				>
					{images.map((image, i) => (
						<button
							// biome-ignore lint/suspicious/noArrayIndexKey: gallery images can repeat, position is the identity
							key={i}
							ref={i === index ? scrollToThumb : undefined}
							type="button"
							aria-label={`Photo ${i + 1}`}
							aria-current={i === index ? "true" : undefined}
							onClick={() => onIndex(i)}
							className={`h-[60px] w-20 flex-none snap-center overflow-hidden rounded-[10px] ${i === index ? "border-[3px] border-ink" : "border-[1.5px] border-[#C9C5BD] opacity-70"}`}
						>
							<Photo
								image={{ ...image, alt: "" }}
								sizes="80px"
								lazy
								className="h-full w-full object-cover"
							/>
						</button>
					))}
				</fieldset>
			)}
		</div>
	);
}
