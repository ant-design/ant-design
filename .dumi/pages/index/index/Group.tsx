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
  description?: React.ReactNode;
  children?: React.ReactNode;
  background?: string;
  decoration?: React.ReactNode;
}

export default function Group(props: GroupProps) {
  const { id, title, description, children, decoration, background } = props;
  const { token } = useSiteToken();

  let childNode = (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography.Title id={id} level={1} style={{ fontWeight: 400 }}>
          {title}
        </Typography.Title>
        <Typography.Paragraph style={{ marginBottom: token.marginFarXS }}>
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
      {decoration}
      <GroupMask disabled={!!background} style={{ paddingBlock: token.marginFarSM, background }}>
        {childNode}
      </GroupMask>
    </div>
  );
}
