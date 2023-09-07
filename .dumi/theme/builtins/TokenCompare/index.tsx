// 用于 color.md 中的颜色对比
import React from 'react';
import classNames from 'classnames';
import { TinyColor } from '@ctrl/tinycolor';
import { createStyles } from 'antd-style';
import tokenMeta from 'antd/es/version/token-meta.json';
import { Space, theme } from 'antd';
import useLocale from '../../../hooks/useLocale';

const useStyle = createStyles(({ token, css }) => {
  const height = token.controlHeightLG;
  const dotSize = height / 5;

  return {
    container: css`
      background: #fff;
      border-radius: ${token.borderRadiusLG}px;
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
      color: rgba(0,0,0,0.88);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
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
      width: ${token.fontSize * 6}px;
      white-space: nowrap;
    `,
  };
});

function color2Rgba(color: string) {
  return `#${new TinyColor(color).toHex8().toUpperCase()}`;
}

interface ColorCircleProps {
  color?: string;
}

function ColorCircle({ color }: ColorCircleProps) {
  const { styles } = useStyle();

  return (
    <Space size={4}>
      <div className={styles.dot} style={{ background: color }} />
      <div className={styles.dotColor}>{color}</div>
    </Space>
  );
}

export interface TokenCompareProps {
  tokenNames?: string;
}

export default function TokenCompare(props: TokenCompareProps) {
  const { tokenNames = '' } = props;
  const [, lang] = useLocale({});
  const { styles } = useStyle();

  const tokenList = React.useMemo(() => {
    const list = tokenNames.split('|');

    const lightTokens = theme.getDesignToken();
    const darkTokens = theme.getDesignToken({
      algorithm: theme.darkAlgorithm,
    });

    return list.map((tokenName) => {
      const meta = tokenMeta.global[tokenName];
      const name = lang === 'cn' ? meta.name : meta.nameEn;

      return {
        name: name.replace('颜色', '').replace('色', '').replace('Color', '').trim(),
        light: color2Rgba(lightTokens[tokenName]),
        dark: color2Rgba(darkTokens[tokenName]),
      };
    });
  }, [tokenNames]);

  return (
    <div className={styles.container}>
      {tokenList.map((data) => (
        <div key={data.name} className={styles.row}>
          <div className={styles.col}>{data.name}</div>
          <div className={styles.col}>
            <ColorCircle color={data.light} />
          </div>
          <div className={classNames(styles.col, styles.colDark)}>
            <ColorCircle color={data.dark} />
          </div>
        </div>
      ))}
    </div>
  );
}
