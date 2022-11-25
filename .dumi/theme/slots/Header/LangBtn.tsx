import * as React from 'react';
import { Button } from 'antd';
import { useLocation } from 'dumi';
import useSharedStyle from './style';
import useSiteToken from '../../../hooks/useSiteToken';

export interface LangBtnProps {
  cn?: boolean;
  onClick?: React.MouseEventHandler;
}

export default function LangBtn({ cn, onClick }: LangBtnProps) {
  const { token } = useSiteToken();
  const style = useSharedStyle();

  let cnStyle: React.CSSProperties;
  let enStyle: React.CSSProperties;

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

  if (cn) {
    cnStyle = fontStyle;
    enStyle = backStyle;
  } else {
    cnStyle = backStyle;
    enStyle = fontStyle;
  }

  return (
    <Button
      size="small"
      onClick={onClick}
      css={style.headerButton}
      style={{
        padding: 0,
        width: token.controlHeightSM,
        height: token.controlHeightSM,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      key="lang-button"
    >
      <div style={{ position: 'relative', width: '1em', height: '1em' }}>
        <span
          style={{
            ...iconStyle,
            ...cnStyle,
          }}
        >
          中
        </span>
        <span
          style={{
            ...iconStyle,
            ...enStyle,
          }}
        >
          En
        </span>
      </div>
    </Button>
  );
}
