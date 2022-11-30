import type { CSSProperties } from 'react';

interface ImageSettings {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  x?: number;
  y?: number;
}

interface QRProps {
  value: string;
  size?: number;
  level?: string;
  color?: string;
  style?: CSSProperties;
  includeMargin?: boolean;
  imageSettings?: ImageSettings;
}

export type QRPropsCanvas = QRProps & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export interface QRCodeProps extends QRProps {
  className?: string;
  prefixCls?: string;
  icon?: string;
  iconSize?: number;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  status?: 'active' | 'expired' | 'loading';
  onRefresh?: () => void;
  // statusRender?: (
  //   status: QRCodeProps['status'],
  //   onRefresh: QRCodeProps['onRefresh'],
  // ) => React.ReactNode;
}
