export default function Hero() {
	return (
		<group scale={0.9}>
			<mesh rotation={[0.4, 0.6, 0]}>
				<torusKnotGeometry args={[0.55, 0.2, 128, 24]} />
				<meshStandardMaterial color="#FF6B1A" roughness={0.45} />
			</mesh>
			<mesh position={[0.75, 0.7, 0.2]}>
				<sphereGeometry args={[0.22, 32, 32]} />
				<meshStandardMaterial color="#FFD21F" roughness={0.4} />
			</mesh>
			<mesh position={[-0.8, -0.65, 0]} rotation={[0.5, 0.3, 0.2]}>
				<boxGeometry args={[0.35, 0.35, 0.35]} />
				<meshStandardMaterial color="#2F5BFF" roughness={0.5} />
			</mesh>
		</group>
	);
}
