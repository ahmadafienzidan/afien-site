import { lazy, Suspense, useEffect, useState } from "react";
import { readEnv3D, shouldUse3D } from "../../../lib/three-support";

const Scene = lazy(() => import("./Scene"));

export default function SceneHost() {
	const [slots, setSlots] = useState<HTMLElement[]>([]);

	useEffect(() => {
		if (!shouldUse3D(readEnv3D())) return;
		setSlots([...document.querySelectorAll<HTMLElement>("[data-3d-slot]")]);
	}, []);

	if (slots.length === 0) return null;
	return (
		<Suspense fallback={null}>
			<Scene slots={slots} />
		</Suspense>
	);
}
