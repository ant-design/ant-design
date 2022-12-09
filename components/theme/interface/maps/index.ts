import type { ColorPalettes } from '../presetColors';
import type { SeedToken } from '../seeds';
import type { SizeMapToken, HeightMapToken } from './size';
import type { ColorMapToken } from './colors';
import type { StyleMapToken } from './style';
import type { FontMapToken } from './font';

export * from './colors';
export * from './style';
export * from './size';
export * from './font';

export interface CommonMapToken extends StyleMapToken {
  // Motion
  motionDurationFast: string;
  motionDurationMid: string;
  motionDurationSlow: string;
}

// ======================================================================
// ==                         Map Token                         ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥

export interface MapToken
  extends SeedToken,
    ColorPalettes,
    ColorMapToken,
    SizeMapToken,
    HeightMapToken,
    StyleMapToken,
    FontMapToken,
    CommonMapToken {}
