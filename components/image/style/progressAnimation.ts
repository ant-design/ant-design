import { Keyframes } from '@ant-design/cssinjs';

// Progress active animation - subtle shimmer effect (reverse direction)
export const progressActive = new Keyframes('antImageProgressActive', {
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-200% 0' },
});

// Create ink flow keyframes with custom transform and opacity values
const createInkFlow = (
  name: string,
  midTransform: string,
  midOpacity: number,
  startTransform = 'translate(0%, 0%)',
  startOpacity = 0.8,
) =>
  new Keyframes(name, {
    '0%': { transform: startTransform, opacity: startOpacity },
    '50%': { transform: midTransform, opacity: midOpacity },
    '100%': { transform: startTransform, opacity: startOpacity },
  });

export const inkFlow1 = createInkFlow('antImageInkFlow1', 'translate(15%, -20%) scale(1.25)', 0.5);
export const inkFlow2 = createInkFlow(
  'antImageInkFlow2',
  'translate(-18%, 15%) scale(0.85)',
  0.9,
  'translate(0%, 0%) scale(1.1)',
  0.7,
);
export const inkFlow3 = createInkFlow(
  'antImageInkFlow3',
  'translate(8%, 10%) scale(1.15)',
  0.8,
  'translate(0%, 0%) scale(0.85)',
  0.65,
);
