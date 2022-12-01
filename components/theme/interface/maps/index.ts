import type { ColorPalettes } from '../presetColors';
import type { SeedToken } from '../seeds';
import type { SizeMapToken, HeightMapToken, FontSizeMapToken } from './size';
import type { ColorMapToken } from './colors';
import type { StyleMapToken } from './style';

export * from './colors';
export * from './style';
export * from './size';

export interface CommonMapToken extends FontSizeMapToken, StyleMapToken {
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
    CommonMapToken {}
