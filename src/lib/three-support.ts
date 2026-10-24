export type Env3D = {
	webgl: boolean;
	saveData: boolean;
	cores: number;
	touch: boolean;
};

export function shouldUse3D(env: Env3D): boolean {
	if (!env.webgl || env.saveData) return false;
	return !(env.touch && env.cores <= 4);
}

export function readEnv3D(): Env3D {
	const canvas = document.createElement("canvas");
	const connection = (navigator as { connection?: { saveData?: boolean } })
		.connection;
	return {
		webgl: Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
		saveData: connection?.saveData === true,
		cores: navigator.hardwareConcurrency,
		touch: matchMedia("(pointer: coarse)").matches,
	};
}
