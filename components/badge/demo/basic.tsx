import React from 'react';

export const presetColors = ['red', 'green', 'blue', 'yellow'] as const;

type _PresetColors = typeof presetColors[number];
type InvertedPresetColors = `${_PresetColors}-inverted`;
type LiteralUnion<T extends U, U> = T | (U & {});

type PresetColors = _PresetColors | InvertedPresetColors;

interface ColorChunkProps {
  // color: PresetColors | React.CSSProperties['color'] // this works
  // color: PresetColors | string & {} // this works
  color: LiteralUnion<PresetColors, string>; // not working
  children?: React.ReactNode;
}

export const ColorChunk = ({ color, children }: ColorChunkProps) => (
  <span style={{ color }}>{children}</span>
);

const App = () => (
  <>
    <ColorChunk color="r">Red</ColorChunk>
    <ColorChunk color="">Red-Inverted</ColorChunk>
    {/* not preset */}
    <ColorChunk color="white">white</ColorChunk>
    <ColorChunk color="rgba(0, 0, 0, .2)">Rgba</ColorChunk>
  </>
);

export default App;
