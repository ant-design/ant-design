import type { ReactNode } from 'react';
import type { QRProps } from '@rc-component/qrcode';

import type { Locale } from '../locale';

type ImageSettings = QRProps['imageSettings'];

export type { QRProps, ImageSettings };

export type QRPropsCanvas = QRProps & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export type QRPropsSvg = QRProps & React.SVGAttributes<SVGSVGElement>;

export type QRStatus = 'active' | 'expired' | 'loading' | 'scanned';

type StatusRenderInfo = {
  status: QRStatus;
  locale: Locale['QRCode'];
  onRefresh?: () => void;
};

type StatusRender = {
  expired?: (oriNode: ReactNode, info: StatusRenderInfo) => ReactNode;
  loading?: (oriNode: ReactNode, info: StatusRenderInfo) => ReactNode;
  scanned?: (oriNode: ReactNode, info: StatusRenderInfo) => ReactNode;
};

export interface QRCodeProps extends QRProps, React.HTMLAttributes<HTMLDivElement> {
  type?: 'canvas' | 'svg';
  className?: string;
  rootClassName?: string;
  prefixCls?: string;
  icon?: string;
  iconSize?: number | { width: number; height: number };
  bordered?: boolean;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  status?: QRStatus;
  onRefresh?: () => void;
  statusRender?: StatusRender;
}
