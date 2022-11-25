import * as React from 'react';
import { Button, Tooltip } from 'antd';
import useSharedStyle from './style';
import useSiteToken from '../../../hooks/useSiteToken';
import { css } from '@emotion/react';

export interface LangBtnProps {
  label1: React.ReactNode;
  label2: React.ReactNode;
  tooltip1?: React.ReactNode;
  tooltip2?: React.ReactNode;
  value: 1 | 2;
  pure?: boolean;
  onClick?: React.MouseEventHandler;
}

const useStyle = () => {
  const { token } = useSiteToken();
  const { controlHeightSM } = token;

  return {
    btn: css`
      padding: 0 !important;
      width: ${controlHeightSM}px;
      height: ${controlHeightSM}px;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      img {
        width: 1em;
        height: 1em;
      }
    `,
  };
};

export default function LangBtn({
  label1,
  label2,
  tooltip1,
  tooltip2,
  value,
  pure,
  onClick,
}: LangBtnProps) {
  const { token } = useSiteToken();
  const style = useStyle();
  const sharedStyle = useSharedStyle();

  let label1Style: React.CSSProperties;
  let label2Style: React.CSSProperties;

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    fontSize: '1em',
    lineHeight: 1,
    border: `1px solid ${token.colorText}`,
    color: token.colorText,
  };

  const fontStyle: React.CSSProperties = {
    left: '-5%',
    top: 0,
    zIndex: 1,
    background: token.colorText,
    color: token.colorTextLightSolid,
    transformOrigin: '0 0',
    transform: `scale(0.7)`,
  };
  const backStyle: React.CSSProperties = {
    right: '-5%',
    bottom: 0,
    zIndex: 0,
    transformOrigin: '100% 100%',
    transform: `scale(0.5)`,
  };

  if (value === 1) {
    label1Style = fontStyle;
    label2Style = backStyle;
  } else {
    label1Style = backStyle;
    label2Style = fontStyle;
  }

  let node = (
    <Button
      size="small"
      onClick={onClick}
      css={[sharedStyle.headerButton, style.btn]}
      key="lang-button"
    >
      {pure ? (
        value === 1 ? (
          label1
        ) : (
          label2
        )
      ) : (
        <div style={{ position: 'relative', width: '1em', height: '1em' }}>
          <span
            style={{
              ...iconStyle,
              ...label1Style,
            }}
          >
            {label1}
          </span>
          <span
            style={{
              ...iconStyle,
              ...label2Style,
            }}
          >
            {label2}
          </span>
        </div>
      )}
    </Button>
  );

  if (tooltip1 || tooltip2) {
    node = <Tooltip title={value === 1 ? tooltip1 : tooltip2}>{node}</Tooltip>;
  }

  return node;
}
