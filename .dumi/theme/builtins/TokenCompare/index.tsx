// 用于 color.md 中的颜色对比
import React from 'react';
import { FastColor } from '@ant-design/fast-color';
import { Flex, theme } from 'antd';
import { createStyles } from 'antd-style';
import tokenMeta from 'antd/es/version/token-meta.json';
import { clsx } from 'clsx';

import useLocale from '../../../hooks/useLocale';

const useStyle = createStyles(({ cssVar, css }) => {
  const height = cssVar.controlHeightLG;
  const dotSize = height / 5;

  return {
    container: css`
      background: #fff;
      border-radius: ${cssVar.borderRadiusLG};
      overflow: hidden;
    `,

    row: css`
      display: flex;
      align-items: center;
    `,

    col: css`
      flex: 1 1 33%;
      height: ${height}px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.88);
      border-inline-end: 1px solid rgba(0, 0, 0, 0.1);
    `,

    colDark: css`
      background: #000;
      color: #fff;
    `,

    dot: css`
      border-radius: 100%;
      width: ${dotSize}px;
      height: ${dotSize}px;
      background: #000;
      box-shadow: 0 0 0 1px rgba(150, 150, 150, 0.25);
    `,

    dotColor: css`
      width: calc(${cssVar.fontSize} * 6);
      white-space: nowrap;
    `,
  };
});

function color2Rgba(color: string) {
  return new FastColor(color).toHexString().toUpperCase();
}

interface ColorCircleProps {
  color?: string;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ color }) => {
  const { styles } = useStyle();
  return (
    <Flex align="center" gap={4}>
      <div className={styles.dot} style={{ background: color }} />
      <div className={styles.dotColor}>{color}</div>
    </Flex>
  );
};

export interface TokenCompareProps {
  tokenNames?: string;
}

const TokenCompare: React.FC<TokenCompareProps> = (props) => {
  const { tokenNames = '' } = props;
  const [, lang] = useLocale();
  const { styles } = useStyle();

  const tokenList = React.useMemo(() => {
    const list = tokenNames.split('|');

    const lightTokens = theme.getDesignToken();
    const darkTokens = theme.getDesignToken({ algorithm: theme.darkAlgorithm });

    return list.map((tokenName) => {
      const meta = (tokenMeta.global as any)[tokenName];
      const name = lang === 'cn' ? meta.name : meta.nameEn;
      return {
        name: name.replace('颜色', '').replace('色', '').replace('Color', '').trim(),
        light: color2Rgba((lightTokens as any)[tokenName]),
        dark: color2Rgba((darkTokens as any)[tokenName]),
      };
    });
  }, [lang, tokenNames]);

  return (
    <div className={styles.container}>
      {tokenList.map((data) => (
        <div key={data.name} className={styles.row}>
          <div className={styles.col}>{data.name}</div>
          <div className={styles.col}>
            <ColorCircle color={data.light} />
          </div>
          <div className={clsx(styles.col, styles.colDark)}>
            <ColorCircle color={data.dark} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenCompare;
