import { RoundedBox } from "@react-three/drei";

export default function Featured() {
	return (
		<group rotation={[0.35, -0.5, 0]}>
			<RoundedBox args={[1.2, 1.2, 1.2]} radius={0.22} smoothness={4}>
				<meshStandardMaterial color="#2F5BFF" roughness={0.45} />
			</RoundedBox>
			<mesh position={[0, 0.95, 0]}>
				<sphereGeometry args={[0.3, 32, 32]} />
				<meshStandardMaterial color="#BFD0FF" roughness={0.4} />
			</mesh>
		</group>
	);
}
