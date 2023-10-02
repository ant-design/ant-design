import { createStyles } from 'antd-style';
import { Link, useLocation } from 'dumi';
import * as React from 'react';
import * as utils from '../../utils';

const useStyle = createStyles(({ token, css }) => {
  const { headerHeight, colorTextHeading, fontFamily, mobileMaxWidth } = token;

  return {
    logo: css`
      height: ${headerHeight}px;
      padding-inline-start: 40px;
      overflow: hidden;
      color: ${colorTextHeading};
      font-weight: bold;
      font-size: 18px;
      font-family: AlibabaPuHuiTi, ${fontFamily}, sans-serif;
      line-height: ${headerHeight}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;

      &:hover {
        color: ${colorTextHeading};
      }

      img {
        height: 32px;
        vertical-align: middle;
        margin-inline-end: 12px;
      }

      @media only screen and (max-width: ${mobileMaxWidth}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,
    title: css`
      line-height: 32px;
    `,
  };
});

export interface LogoProps {
  isZhCN: boolean;
  location: any;
}

const Logo: React.FC<LogoProps> = ({ isZhCN }) => {
  const { search } = useLocation();
  const { styles } = useStyle();
  return (
    <h1>
      <Link to={utils.getLocalizedPathname('/', isZhCN, search)} className={styles.logo}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          height={32}
          width={32}
          alt="logo"
        />
        <span className={styles.title}>Ant Design</span>
      </Link>
    </h1>
  );
};

export default Logo;
