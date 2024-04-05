import * as React from 'react';
import { useContext } from 'react';
import { Typography } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import classNames from 'classnames';

import SiteContext from '../../../theme/slots/SiteContext';
import GroupMaskLayer from './GroupMaskLayer';

const useStyle = createStyles(({ css, token }) => ({
  box: css`
    position: relative;
    transition: all ${token.motionDurationSlow};
  `,
  marginStyle: css`
    max-width: 1208px;
    margin-inline: auto;
    box-sizing: border-box;
    padding-inline: ${token.marginXXL}px;
  `,
  withoutChildren: css`
    min-height: 300px;
    border-radius: ${token.borderRadiusLG}px;
    background-color: '#e9e9e9';
  `,
}));

export interface GroupProps {
  id?: string;
  title?: React.ReactNode;
  titleColor?: string;
  description?: React.ReactNode;
  background?: string;
  /** 是否不使用两侧 margin */
  collapse?: boolean;
  decoration?: React.ReactNode;
}

const Group: React.FC<React.PropsWithChildren<GroupProps>> = (props) => {
  const { id, title, titleColor, description, children, decoration, background, collapse } = props;
  const token = useTheme();
  const { styles } = useStyle();
  const { isMobile } = useContext(SiteContext);
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
            marginBottom: isMobile ? token.marginXXL : token.marginFarXS,
          }}
        >
          {description}
        </Typography.Paragraph>
      </div>
      <div className={classNames({ [styles.marginStyle]: !collapse })}>
        {children ? <div>{children}</div> : <div className={styles.withoutChildren} />}
      </div>
    </>
  );

  return (
    <div style={{ backgroundColor: background }} className={styles.box}>
      <div style={{ position: 'absolute', inset: 0 }}>{decoration}</div>
      <GroupMaskLayer style={{ paddingBlock: token.marginFarSM }}>{childNode}</GroupMaskLayer>
    </div>
  );
};

export default Group;
