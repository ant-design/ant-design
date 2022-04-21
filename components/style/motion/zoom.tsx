import { Keyframes } from '@ant-design/cssinjs';

export const antZoomIn = new Keyframes('antZoomIn', {
  '0%': {
    transform: 'scale(0.2)',
    opacity: 0,
  },

  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
});

export const antZoomOut = new Keyframes('antZoomOut', {
  '0%': {
    transform: 'scale(1)',
  },

  '100%': {
    transform: 'scale(0.2)',
    opacity: 0,
  },
});
