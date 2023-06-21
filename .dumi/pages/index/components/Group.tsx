import * as React from 'react';
import { useContext } from 'react';
import { Typography } from 'antd';
import useSiteToken from '../../../hooks/useSiteToken';
import SiteContext from '../../../theme/slots/SiteContext';

export interface GroupMaskProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function GroupMask({ children, style, disabled }: GroupMaskProps) {
  const additionalStyle: React.CSSProperties = disabled
    ? {}
    : {
        position: 'relative',
        background: `rgba(255,255,255,0.1)`,
        backdropFilter: `blur(25px)`,
        zIndex: 1,
      };

  return (
    <div
      className="site-mask"
      style={{
        position: 'relative',
        ...style,
        ...additionalStyle,
      }}
    >
      {children}
    </div>
  );
}

export interface GroupProps {
  id?: string;
  title?: React.ReactNode;
  titleColor?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  background?: string;

  /** 是否不使用两侧 margin */
  collapse?: boolean;

  decoration?: React.ReactNode;
}

export default function Group(props: GroupProps) {
  const { id, title, titleColor, description, children, decoration, background, collapse } = props;
  const { token } = useSiteToken();
  const { isMobile } = useContext(SiteContext);

  const marginStyle: React.CSSProperties = collapse
    ? {}
    : {
        maxWidth: 1208,
        marginInline: 'auto',
        boxSizing: 'border-box',
        paddingInline: isMobile ? token.margin : token.marginXXL,
      };
  const childNode = (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography.Title
          id={id}
          level={1}
          style={{
            fontWeight: 900,
            color: titleColor,
            // Special for the title
            fontFamily: `AliPuHui, ${token.fontFamily}`,
            fontSize: isMobile ? token.fontSizeHeading2 : token.fontSizeHeading1,
          }}
        >
          {title}
        </Typography.Title>
        <Typography.Paragraph
          style={{
            marginBottom: isMobile ? token.marginXXL : token.marginFarXS,
            color: titleColor,
          }}
        >
          {description}
        </Typography.Paragraph>
      </div>

      <div style={marginStyle}>
        {children ? (
          <div>{children}</div>
        ) : (
          <div
            style={{ borderRadius: token.borderRadiusLG, minHeight: 300, background: '#e9e9e9' }}
          />
        )}
      </div>
    </>
  );

  return (
    <div
      style={{ position: 'relative', background, transition: `all ${token.motionDurationSlow}` }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>{decoration}</div>
      <GroupMask
        disabled={!!background}
        style={{
          paddingBlock: token.marginFarSM,
        }}
      >
        {childNode}
      </GroupMask>
    </div>
  );
}
