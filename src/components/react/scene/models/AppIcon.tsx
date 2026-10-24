import { RoundedBox } from "@react-three/drei";
import type { ReactNode } from "react";

function Icon({ color, children }: { color: string; children: ReactNode }) {
	return (
		<group rotation={[0.4, -0.6, 0]}>
			<RoundedBox args={[1.3, 1.3, 0.4]} radius={0.16} smoothness={4}>
				<meshStandardMaterial color={color} roughness={0.5} />
			</RoundedBox>
			<group position={[0, 0, 0.35]}>{children}</group>
		</group>
	);
}

export function AppShapeshift() {
	return (
		<Icon color="#FF6B1A">
			<mesh rotation={[0, 0, Math.PI / 4]}>
				<octahedronGeometry args={[0.4]} />
				<meshStandardMaterial color="#FFD21F" roughness={0.4} />
			</mesh>
		</Icon>
	);
}

export function AppNextstep() {
	return (
		<Icon color="#2F5BFF">
			<mesh rotation={[0, 0, -Math.PI / 2]}>
				<coneGeometry args={[0.32, 0.6, 3]} />
				<meshStandardMaterial color="#BFD0FF" roughness={0.4} />
			</mesh>
		</Icon>
	);
}

export function AppSoon() {
	return (
		<Icon color="#FFD21F">
			<mesh>
				<sphereGeometry args={[0.3, 32, 32]} />
				<meshStandardMaterial color="#FF6B1A" roughness={0.4} />
			</mesh>
		</Icon>
	);
}

export function AppGithub() {
	return (
		<Icon color="#D9D5CE">
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[0.3, 0.1, 16, 48]} />
				<meshStandardMaterial color="#111111" roughness={0.5} />
			</mesh>
		</Icon>
	);
}
