import type { QRProps } from '@rc-component/qrcode';

type ImageSettings = QRProps['imageSettings'];

export type { QRProps, ImageSettings };

export type QRPropsCanvas = QRProps & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export type QRPropsSvg = QRProps & React.SVGAttributes<SVGSVGElement>;

export interface QRCodeProps extends QRProps, React.HTMLAttributes<HTMLDivElement> {
  type?: 'canvas' | 'svg';
  className?: string;
  rootClassName?: string;
  prefixCls?: string;
  icon?: string;
  iconSize?: number | { width: number; height: number };
  bordered?: boolean;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  status?: 'active' | 'expired' | 'loading' | 'scanned';
  onRefresh?: () => void;
}
