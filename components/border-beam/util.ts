import { isString } from '../_util/is';

type BorderBeamGradientItem = {
  color: string;
  percent: number;
};

export type BorderBeamGradient = BorderBeamGradientItem[];
export type BorderBeamColor = string | BorderBeamGradient;

export const MAX_BEAM_COLOR_STOP_PERCENT = 70;

const getLinearGradient = (...colorStops: string[]) =>
  `linear-gradient(to left, ${colorStops.join(', ')}, transparent)`;

const normalizeBorderBeamColor = (value?: BorderBeamColor): BorderBeamGradient =>
  isString(value) ? [{ color: value, percent: 0 }] : (value ?? []);

const fillGradientEnd = (items: BorderBeamGradient): BorderBeamGradient => {
  const lastItem = items[items.length - 1];

  if (!lastItem || lastItem.percent === 100) {
    return items;
  }

  return [...items, { ...lastItem, percent: 100 }];
};

// Map user-facing 0~100 stops into the visible beam segment so the tail area stays reserved.
// We scale instead of hard-clamping because users describe the gradient against the full beam length:
// `30` should stay around the first third of the visible segment, rather than remain `30%` after
// the available range shrinks, which would distort the original color distribution.
const getMappedBeamColorStopPercent = (percent: number) =>
  Number(((Math.min(Math.max(percent, 0), 100) / 100) * MAX_BEAM_COLOR_STOP_PERCENT).toFixed(2));

const normalizeGradientItems = (items: BorderBeamGradient) =>
  fillGradientEnd(items).map((item) => ({
    ...item,
    percent: getMappedBeamColorStopPercent(item.percent),
  }));

// Build the beam gradient from a solid color or explicit gradient stops.
export const getBorderBeamGradient = (value?: BorderBeamColor) => {
  // Reserve the trailing section for fade-out so custom gradients keep a visible tail.
  const normalizedStops = normalizeGradientItems(normalizeBorderBeamColor(value));

  return normalizedStops.length
    ? getLinearGradient(...normalizedStops.map((item) => `${item.color} ${item.percent}%`))
    : undefined;
};
