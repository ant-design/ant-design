import type { ReactNode } from 'react';
import type { QRProps } from '@rc-component/qrcode';

import type { GenerateSemantic } from '../_util/hooks/semanticType';
import type { Locale } from '../locale';

type ImageSettings = QRProps['imageSettings'];

export type { ImageSettings, QRProps };

export type QRPropsCanvas = QRProps & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export type QRPropsSvg = QRProps & React.SVGAttributes<SVGSVGElement>;

export type QRStatus = 'active' | 'expired' | 'loading' | 'scanned';

export type StatusRenderInfo = {
  status: Exclude<QRStatus, 'active'>;
  locale: Locale['QRCode'];
  onRefresh?: () => void;
};

export type QRCodeSemanticType = {
  classNames?: {
    root?: string;
    cover?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    cover?: React.CSSProperties;
  };
};

export type QRCodeSemanticAllType = GenerateSemantic<QRCodeSemanticType, QRCodeProps>;

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
  statusRender?: (info: StatusRenderInfo) => ReactNode;
  classNames?: QRCodeSemanticAllType['classNames'] | QRCodeSemanticAllType['classNamesFn'];
  styles?: QRCodeSemanticAllType['styles'] | QRCodeSemanticAllType['stylesFn'];
}
