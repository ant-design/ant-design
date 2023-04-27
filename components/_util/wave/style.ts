import { Keyframes, useStyleRegister } from '@ant-design/cssinjs';
import { useContext } from 'react';
import { ConfigContext } from '../../config-provider';
import type { AliasToken, GenerateStyle, UseComponentStyleResult } from '../../theme/internal';
import { useToken } from '../../theme/internal';

interface WaveToken extends AliasToken {
  hashId: string;
  clickAnimatingNode: string;
  clickAnimatingTrue: string;
  clickAnimatingWithoutExtraNodeTrue: string;
  clickAnimatingWithoutExtraNodeTrueAfter: string;
}

const genWaveStyle: GenerateStyle<WaveToken> = (token) => {
  const waveEffect = new Keyframes('waveEffect', {
    '100%': {
      boxShadow: `0 0 0 6px var(--antd-wave-shadow-color)`,
    },
  });

  const fadeEffect = new Keyframes('fadeEffect', {
    '100%': {
      opacity: 0,
    },
  });

  return [
    {
      [`${token.clickAnimatingWithoutExtraNodeTrue},
      ${token.clickAnimatingTrue}`]: {
        '--antd-wave-shadow-color': token.colorPrimary,
        '--scroll-bar': 0,
        position: 'relative',
      },
      [`${token.clickAnimatingWithoutExtraNodeTrueAfter},
      & ${token.clickAnimatingNode}`]: {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        insetInlineEnd: 0,
        bottom: 0,
        display: 'block',
        borderRadius: 'inherit',
        boxShadow: `0 0 0 0 var(--antd-wave-shadow-color)`,
        opacity: 0.2,
        animation: {
          _skip_check_: true,
          value: `${fadeEffect.getName(token.hashId)} 2s ${
            token.motionEaseOutCirc
          }, ${waveEffect.getName(token.hashId)} 0.4s ${token.motionEaseOutCirc}`,
        },
        animationFillMode: 'forwards',
        content: '""',
        pointerEvents: 'none',
      },
    },
    {},
    waveEffect,
    fadeEffect,
  ];
};

export default (): UseComponentStyleResult => {
  const [theme, token, hashId] = useToken();
  const { getPrefixCls } = useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();

  const clickAnimatingTrue = `[${rootPrefixCls}-click-animating='true']`;
  const clickAnimatingWithoutExtraNodeTrue = `[${rootPrefixCls}-click-animating-without-extra-node='true']`;
  const clickAnimatingNode = `.${rootPrefixCls}-click-animating-node`;

  const waveToken: WaveToken = {
    ...token,
    hashId,
    clickAnimatingNode,
    clickAnimatingTrue,
    clickAnimatingWithoutExtraNodeTrue,
    clickAnimatingWithoutExtraNodeTrueAfter: `${clickAnimatingWithoutExtraNodeTrue}::after`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: ['wave'] }, () => [genWaveStyle(waveToken)]),
    hashId,
  ];
};
