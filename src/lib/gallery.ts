export const SWIPE_THRESHOLD_PX = 40;

export function stepIndex(
	current: number,
	total: number,
	delta: 1 | -1,
): number {
	if (total <= 1) return 0;
	return (current + delta + total) % total;
}

export function swipeDelta(dx: number): 1 | -1 | 0 {
	if (dx <= -SWIPE_THRESHOLD_PX) return 1;
	if (dx >= SWIPE_THRESHOLD_PX) return -1;
	return 0;
}
