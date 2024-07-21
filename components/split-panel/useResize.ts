import type React from 'react';
import { useRef, useState } from 'react';

export interface StartInfo {
  x: number;
  y: number;
  splitPanelBar: HTMLDivElement | null;
}

const useResize = (): [
  boolean,
  React.MutableRefObject<StartInfo>,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [resizing, setResizing] = useState(false);
  const startInfo = useRef<StartInfo>({ x: 0, y: 0, splitPanelBar: null });

  return [resizing, startInfo, setResizing];
};

export default useResize;
