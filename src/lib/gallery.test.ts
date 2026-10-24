import { describe, expect, it } from "vitest";
import { SWIPE_THRESHOLD_PX, stepIndex, swipeDelta } from "./gallery";

describe("stepIndex", () => {
	it("advances forward", () => {
		expect(stepIndex(0, 5, 1)).toBe(1);
	});

	it("wraps forward past the last item", () => {
		expect(stepIndex(4, 5, 1)).toBe(0);
	});

	it("wraps backward past the first item", () => {
		expect(stepIndex(0, 5, -1)).toBe(4);
	});

	it("stays at zero when there is a single item", () => {
		expect(stepIndex(0, 1, 1)).toBe(0);
		expect(stepIndex(0, 1, -1)).toBe(0);
	});

	it("returns zero when there are no items", () => {
		expect(stepIndex(0, 0, 1)).toBe(0);
	});
});

describe("swipeDelta", () => {
	it("maps a left swipe past the threshold to the next item", () => {
		expect(swipeDelta(-60)).toBe(1);
	});

	it("maps a right swipe past the threshold to the previous item", () => {
		expect(swipeDelta(60)).toBe(-1);
	});

	it("ignores swipes shorter than the threshold", () => {
		expect(swipeDelta(-39)).toBe(0);
		expect(swipeDelta(39)).toBe(0);
	});

	it("treats a swipe exactly at the threshold as a step", () => {
		expect(SWIPE_THRESHOLD_PX).toBe(40);
		expect(swipeDelta(-40)).toBe(1);
		expect(swipeDelta(40)).toBe(-1);
	});
});
