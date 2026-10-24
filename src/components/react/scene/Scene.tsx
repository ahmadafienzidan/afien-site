import { PresentationControls, View } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
	Component,
	type ReactNode,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
import type { Group } from "three";
import { MODELS, type ModelName } from "./models";

class ModelBoundary extends Component<
	{ children: ReactNode },
	{ failed: boolean }
> {
	state = { failed: false };

	static getDerivedStateFromError() {
		return { failed: true };
	}

	render() {
		return this.state.failed ? null : this.props.children;
	}
}

function MarkActive({ el }: { el: HTMLElement }) {
	const done = useRef(false);
	useFrame(() => {
		if (done.current) return;
		done.current = true;
		el.setAttribute("data-3d-active", "");
	});
	return null;
}

function Spin({ active, children }: { active: boolean; children: ReactNode }) {
	const ref = useRef<Group>(null);
	useFrame((state, delta) => {
		if (!active || !ref.current) return;
		ref.current.rotation.y += delta * 0.5;
		state.invalidate();
	});
	return <group ref={ref}>{children}</group>;
}

function InvalidateOnInput() {
	const invalidate = useThree((state) => state.invalidate);
	useEffect(() => {
		const onInput = () => invalidate();
		const events = ["scroll", "resize", "pointermove"] as const;
		for (const name of events) {
			addEventListener(name, onInput, { passive: true });
		}
		return () => {
			for (const name of events) removeEventListener(name, onInput);
		};
	}, [invalidate]);
	return null;
}

function Slot({
	el,
	visible,
	reducedMotion,
}: {
	el: HTMLElement;
	visible: boolean;
	reducedMotion: boolean;
}) {
	const [track] = useState(() => ({ current: el }));
	const invalidate = useThree((state) => state.invalidate);
	const Model = MODELS[el.getAttribute("data-3d-slot") as ModelName];

	useEffect(() => {
		if (visible) invalidate();
	}, [visible, invalidate]);

	return (
		<View track={track} visible={visible}>
			<ambientLight intensity={1.4} />
			<directionalLight position={[3, 4, 5]} intensity={2.2} />
			<PresentationControls
				polar={[-0.5, 0.5]}
				damping={reducedMotion ? 0 : 0.25}
			>
				<Spin active={visible && !reducedMotion}>
					<ModelBoundary>
						<Suspense fallback={null}>
							<Model />
							<MarkActive el={el} />
						</Suspense>
					</ModelBoundary>
				</Spin>
			</PresentationControls>
		</View>
	);
}

export default function Scene({ slots }: { slots: HTMLElement[] }) {
	const [visible, setVisible] = useState<ReadonlySet<Element>>(new Set());
	const [reducedMotion] = useState(
		() => matchMedia("(prefers-reduced-motion: reduce)").matches,
	);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			setVisible((prev) => {
				const next = new Set(prev);
				for (const entry of entries) {
					if (entry.isIntersecting) next.add(entry.target);
					else next.delete(entry.target);
				}
				return next;
			});
		});
		for (const el of slots) observer.observe(el);
		return () => observer.disconnect();
	}, [slots]);

	return (
		<Canvas
			eventSource={document.body}
			dpr={[1, 1.5]}
			frameloop="demand"
			camera={{ position: [0, 0, 4], fov: 40 }}
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 10,
				pointerEvents: "none",
			}}
			aria-hidden="true"
		>
			<InvalidateOnInput />
			{slots.map((el) => (
				<Slot
					key={el.getAttribute("data-3d-slot")}
					el={el}
					visible={visible.has(el)}
					reducedMotion={reducedMotion}
				/>
			))}
		</Canvas>
	);
}
