import * as React from 'react';
import { Tooltip } from 'antd';
import { css } from '@emotion/react';
import useSiteToken from '../../../hooks/useSiteToken';

export interface LangBtnProps {
  label1: React.ReactNode;
  label2: React.ReactNode;
  tooltip1?: React.ReactNode;
  tooltip2?: React.ReactNode;
  value: 1 | 2;
  pure?: boolean;
  onClick?: React.MouseEventHandler;
}

const BASE_SIZE = '1.2em';

const useStyle = () => {
  const { token } = useSiteToken();
  const { controlHeight, motionDurationMid } = token;

  return {
    btn: css`
      color: ${token.colorText};
      border-color: ${token.colorBorder};
      padding: 0 !important;
      width: ${controlHeight}px;
      height: ${controlHeight}px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: ${token.borderRadius}px;
      transition: all ${motionDurationMid};
      cursor: pointer;

      .btn-inner {
        transition: all ${motionDurationMid};
      }

      &:hover {
        background: ${token.colorBgTextHover};
      }

      img {
        width: ${BASE_SIZE};
        height: ${BASE_SIZE};
      }

      .anticon {
        font-size: ${BASE_SIZE};
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

  let label1Style: React.CSSProperties;
  let label2Style: React.CSSProperties;

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    fontSize: BASE_SIZE,
    lineHeight: 1,
    border: `1px solid ${token.colorText}`,
    color: token.colorText,
  };

  const fontStyle: React.CSSProperties = {
    left: '-5%',
    top: 0,
    zIndex: 1,
    background: token.colorText,
    color: token.colorBgContainer,
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
    <button onClick={onClick} css={[style.btn]} key="lang-button">
      <div className="btn-inner">
        {pure && (value === 1 ? label1 : label2)}
        {!pure && (
          <div style={{ position: 'relative', width: BASE_SIZE, height: BASE_SIZE }}>
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
      </div>
    </button>
  );

  if (tooltip1 || tooltip2) {
    node = <Tooltip title={value === 1 ? tooltip1 : tooltip2}>{node}</Tooltip>;
  }

  return node;
}
