import { describe, expect, it } from "vitest";
import { shouldUse3D } from "./three-support";

describe("shouldUse3D", () => {
	it("is false without WebGL", () => {
		expect(
			shouldUse3D({ webgl: false, saveData: false, cores: 8, touch: false }),
		).toBe(false);
	});

	it("is false with Save-Data", () => {
		expect(
			shouldUse3D({ webgl: true, saveData: true, cores: 8, touch: false }),
		).toBe(false);
	});

	it("is false on low-core touch devices", () => {
		expect(
			shouldUse3D({ webgl: true, saveData: false, cores: 4, touch: true }),
		).toBe(false);
	});

	it("is true on low-core non-touch devices", () => {
		expect(
			shouldUse3D({ webgl: true, saveData: false, cores: 4, touch: false }),
		).toBe(true);
	});

	it("is true on high-core touch devices", () => {
		expect(
			shouldUse3D({ webgl: true, saveData: false, cores: 8, touch: true }),
		).toBe(true);
	});
});
