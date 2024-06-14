import { defaultPrefixCls } from '../../config-provider';
import type { GlobalToken } from '../../theme';

export function getWaveTargetCls(rootPrefixCls: string = defaultPrefixCls) {
  return `${rootPrefixCls}-wave-target`;
}

export type ShowWaveEffect = (
  element: HTMLElement,
  info: {
    className: string;
    token: GlobalToken;
    component?: string;
    event: MouseEvent;
    hashId: string;
  },
) => void;

export type ShowWave = (event: MouseEvent) => void;
