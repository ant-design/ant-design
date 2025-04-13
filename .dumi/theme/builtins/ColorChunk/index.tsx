import * as React from 'react';
import { FastColor } from '@ant-design/fast-color';
import type { ColorInput } from '@ant-design/fast-color';
import { Popover } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token, css }) => ({
  codeSpan: css`
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${token.siteMarkdownCodeBg};
    border-radius: ${token.borderRadius}px;
    font-family: monospace;
  `,
  dot: css`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-inline-end: ${token.marginXXS}px;
    border: 1px solid ${token.colorSplit};
  `,
}));

interface ColorChunkProps {
  value: ColorInput;
  enablePopover?: boolean;
}

const ColorChunk: React.FC<React.PropsWithChildren<ColorChunkProps>> = (props) => {
  const { styles, theme } = useStyle();
  const { value, children, enablePopover } = props;

  const dotColor = React.useMemo(() => new FastColor(value).toHexString(), [value]);

  let dotNode = (
    <span className={styles.codeSpan}>
      <span className={styles.dot} style={{ backgroundColor: dotColor }} />
      {children ?? dotColor}
    </span>
  );

  if (enablePopover) {
    dotNode = (
      <Popover
        placement="left"
        content={<div hidden />}
        styles={{
          body: {
            backgroundColor: dotColor,
            width: 120,
            height: 120,
            borderRadius: theme.borderRadiusLG,
          },
          root: {
            '--antd-arrow-background-color': dotColor,
            backgroundColor: 'transparent',
          } as React.CSSProperties,
        }}
      >
        {dotNode}
      </Popover>
    );
  }

  return dotNode;
};

export default ColorChunk;
