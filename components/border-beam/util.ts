type BorderBeamGradientItem = {
  color: string;
  percent: number;
};

export type BorderBeamGradient = BorderBeamGradientItem[];
export type BorderBeamColor = string | BorderBeamGradient;

const MAX_BEAM_COLOR_STOP_PERCENT = 70;
const getLinearGradient = (...colorStops: string[]) =>
  `linear-gradient(to left, ${colorStops.join(', ')}, transparent)`;

const normalizeBorderBeamColor = (value: BorderBeamColor | undefined): BorderBeamGradient =>
  typeof value === 'string'
    ? [
        { color: value, percent: 0 },
        { color: value, percent: 100 },
      ]
    : (value ?? []);

// Map user-facing 0~100 stops into the visible beam segment so the tail area stays reserved.
// We scale instead of hard-clamping because users describe the gradient against the full beam length:
// `30` should stay around the first third of the visible segment, rather than remain `30%` after
// the available range shrinks, which would distort the original color distribution.
const getMappedBeamColorStopPercent = (percent: number) =>
  Number(((Math.min(Math.max(percent, 0), 100) / 100) * MAX_BEAM_COLOR_STOP_PERCENT).toFixed(2));

const normalizeGradientItems = (items: BorderBeamGradient) =>
  items
    .map((item) => ({
      color: item.color,
      percent: getMappedBeamColorStopPercent(item.percent),
    }))
    .sort((prev, next) => prev.percent - next.percent);

// Build the beam gradient from a solid color or explicit gradient stops.
export const getBorderBeamGradient = (
  value: BorderBeamColor | undefined,
  fallbackStartColor: string,
  fallbackEndColor: string,
) => {
  // Reserve the trailing section for fade-out so custom gradients keep a visible tail.
  const normalizedStops = normalizeGradientItems(normalizeBorderBeamColor(value));

  return normalizedStops.length
    ? getLinearGradient(...normalizedStops.map((item) => `${item.color} ${item.percent}%`))
    : getLinearGradient(fallbackStartColor, fallbackEndColor);
};
