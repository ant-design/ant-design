import { isNumber } from '../_util/is';

type BorderBeamGradientItem = {
  color: string;
  percent: number;
};

export type BorderBeamGradient = BorderBeamGradientItem[];
export type BorderBeamColor = string | BorderBeamGradient;

const MAX_BEAM_COLOR_STOP_PERCENT = 70;

// Map user-facing 0~100 stops into the visible beam segment so the tail area stays reserved.
// We scale instead of hard-clamping because users describe the gradient against the full beam length:
// `30` should stay around the first third of the visible segment, rather than remain `30%` after
// the available range shrinks, which would distort the original color distribution.
const getMappedBeamColorStopPercent = (percent: number) => {
  const clampedPercent = Math.min(Math.max(percent, 0), 100);

  return Number(((clampedPercent / 100) * MAX_BEAM_COLOR_STOP_PERCENT).toFixed(2));
};

// Build the beam gradient from a solid color or explicit gradient stops.
export const getBorderBeamGradient = (
  value: BorderBeamColor | undefined,
  fallbackStartColor: string,
  fallbackEndColor: string,
) => {
  const fallbackGradient = `linear-gradient(to left, ${fallbackStartColor}, ${fallbackEndColor}, transparent)`;

  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      return `linear-gradient(to left, ${trimmedValue}, ${trimmedValue}, transparent)`;
    }

    return fallbackGradient;
  }

  if (Array.isArray(value)) {
    // Reserve the trailing section for fade-out so custom gradients keep a visible tail.
    const normalizedStops = value
      .filter(
        (item): item is BorderBeamGradient[number] =>
          typeof item?.color === 'string' && item.color.trim().length > 0 && isNumber(item.percent),
      )
      .map((item) => ({
        color: item.color.trim(),
        percent: getMappedBeamColorStopPercent(item.percent),
      }))
      .sort((prev, next) => prev.percent - next.percent);

    if (normalizedStops.length) {
      const colorStops = normalizedStops.map((item) => `${item.color} ${item.percent}%`).join(', ');

      return `linear-gradient(to left, ${colorStops}, transparent)`;
    }
  }

  return fallbackGradient;
};
