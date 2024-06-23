import type { ReactNode } from 'react';
import type { QRProps } from '@rc-component/qrcode';

import type { Locale } from '../locale';

type ImageSettings = QRProps['imageSettings'];

export type { QRProps, ImageSettings };

export type QRPropsCanvas = QRProps & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export type QRPropsSvg = QRProps & React.SVGAttributes<SVGSVGElement>;

type StatusRenderInfo = {
  locale: Locale['QRCode'];
  onRefresh?: () => void;
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
  status?: 'active' | 'expired' | 'loading' | 'scanned';
  onRefresh?: () => void;
  statusRender?: {
    expired?: (defaultNode: ReactNode, info: StatusRenderInfo) => ReactNode;
    loading?: (defaultNode: ReactNode, info: StatusRenderInfo) => ReactNode;
    scanned?: (defaultNode: ReactNode, info: StatusRenderInfo) => ReactNode;
  };
}
