import * as React from 'react';
import { useContext } from 'react';
import { Typography } from 'antd';
import { useTheme } from 'antd-style';

import SiteContext from '../../../theme/slots/SiteContext';

export interface GroupMaskProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export const GroupMask: React.FC<GroupMaskProps> = (props) => {
  const { children, style, disabled, onMouseMove, onMouseEnter, onMouseLeave } = props;
  const additionalStyle: React.CSSProperties = disabled
    ? {}
    : {
        position: 'relative',
        zIndex: 1,
      };

  return (
    <div
      className="site-mask"
      style={{ position: 'relative', ...style, ...additionalStyle }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

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

const Group: React.FC<GroupProps> = (props) => {
  const { id, title, titleColor, description, children, decoration, background, collapse } = props;
  const token = useTheme();
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
            color: titleColor,
            marginBottom: isMobile ? token.marginXXL : (token as any).marginFarXS,
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
          paddingBlock: (token as any).marginFarSM,
        }}
      >
        {childNode}
      </GroupMask>
    </div>
  );
};

export default Group;
