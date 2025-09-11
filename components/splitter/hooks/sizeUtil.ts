type SizeUnit = number | undefined;

/**
 * TODO: 自动分配百分比尺寸：
 * 1. ptgSizes 中如果有数字值则不处理。
 * 2. ptgSizes 中如果有 undefined 则进行自动分配：
 * - 如果 undefined 的槽有 min 或 max 限制，则优先对其进行分配。
 * - 如果 undefined 的槽没有 min 和 max 限制，则均分剩余空间。
 */
export function autoPtgSizes(ptgSizes: SizeUnit[], minPtgSizes: SizeUnit[], maxPtgSizes: SizeUnit[]) {
}
