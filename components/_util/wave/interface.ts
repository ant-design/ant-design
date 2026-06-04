import type { WaveProps } from '.';
import { defaultPrefixCls } from '../../config-provider';
import type { GlobalToken } from '../../theme/internal';

export const TARGET_CLS = `${defaultPrefixCls}-wave-target`;

export type ShowWaveEffect = (
  element: HTMLElement,
  info: {
    className: string;
    token: GlobalToken;
    rootPrefixCls?: string;
    component?: WaveComponent;
    event: MouseEvent;
    hashId: string;
    colorSource?: WaveProps['colorSource'];
  },
) => void;

export type ShowWave = (event: MouseEvent) => void;

export type WaveComponent = 'Tag' | 'Button' | 'Checkbox' | 'Radio' | 'Switch' | 'Steps';
