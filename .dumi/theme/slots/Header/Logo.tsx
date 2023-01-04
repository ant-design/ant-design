import * as React from 'react';
import { Link, useLocation } from 'dumi';
import { css } from '@emotion/react';
import * as utils from '../../utils';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();

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
        margin-inline-end: 12px;
        vertical-align: middle;
      }

      @media only screen and (max-width: ${mobileMaxWidth}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,
  };
};

export interface LogoProps {
  isZhCN: boolean;
  location: any;
}

const Logo = ({ isZhCN }: LogoProps) => {
  const { search } = useLocation();
  const { logo } = useStyle();

  return (
    <h1>
      <Link to={utils.getLocalizedPathname('/', isZhCN, search)} css={logo}>
        <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        <span style={{ lineHeight: '32px' }}>Ant Design</span>
      </Link>
    </h1>
  );
};

export default Logo;
