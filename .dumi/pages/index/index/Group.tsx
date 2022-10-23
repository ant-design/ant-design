import * as React from 'react';
import { Typography } from 'antd';
import useSiteToken from '../../../hooks/useSiteToken';

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
        zIndex: 1,
        background: `rgba(255,255,255,0.1)`,
        backdropFilter: `blur(25px)`,
      };

  return (
    <div
      className="site-mask"
      style={{
        position: 'relative',
        zIndex: 1,
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

  decoration?: React.ReactNode;
}

export default function Group(props: GroupProps) {
  const { id, title, titleColor, description, children, decoration, background } = props;
  const { token } = useSiteToken();

  let childNode = (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography.Title id={id} level={1} style={{ fontWeight: 400, color: titleColor }}>
          {title}
        </Typography.Title>
        <Typography.Paragraph style={{ marginBottom: token.marginFarXS, color: titleColor }}>
          {description}
        </Typography.Paragraph>
      </div>

      <div style={{ maxWidth: 1208, marginInline: 'auto', paddingInline: token.marginXXL }}>
        {children ? (
          <div>{children}</div>
        ) : (
          <div style={{ borderRadius: token.radiusLG, minHeight: 300, background: '#e9e9e9' }} />
        )}
      </div>
    </>
  );

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0 }}>{decoration}</div>
      <GroupMask
        disabled={!!background}
        style={{
          paddingBlock: token.marginFarSM,
          background,
          transition: `all ${token.motionDurationSlow}`,
        }}
      >
        {childNode}
      </GroupMask>
    </div>
  );
}
