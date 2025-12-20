import type { ReactNode } from 'react';
import type { QRProps } from '@rc-component/qrcode';

import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
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

export type QRCodeSemanticName = 'root' | 'cover';

export type ProgressSemanticClassNames = {
  root?: string;
  cover?: string;
};

export type ProgressSemanticStyles = {
  root?: React.CSSProperties;
  cover?: React.CSSProperties;
};

export type QRCodeClassNamesType = SemanticClassNamesType<QRCodeProps, ProgressSemanticClassNames>;

export type QRCodeStylesType = SemanticStylesType<QRCodeProps, ProgressSemanticStyles>;

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
  classNames?: QRCodeClassNamesType;
  styles?: QRCodeStylesType;
}
