import * as React from 'react';
import { Link, useLocation } from 'dumi';
import * as utils from '../../utils';
import { css } from '@emotion/react';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    logo: css`
      height: ${token.headerHeight}px;
      padding-left: 40px;
      overflow: hidden;
      color: ${token.colorTextHeading};
      font-weight: bold;
      font-size: 18px;
      font-family: PuHuiTi, ${token.fontFamily}, sans-serif;
      line-height: ${token.headerHeight}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;

      &:hover {
        color: ${token.colorTextHeading};
      }

      .ant-row-rtl & {
        float: right;
        padding-right: 40px;
        padding-left: 0;
      }

      img {
        height: 32px;
        margin-right: 12px;
        vertical-align: middle;

        .ant-row-rtl & {
          margin-right: 0;
          margin-left: 16px;
        }
      }

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        padding-right: 0;
        padding-left: 0;
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
        Ant Design
      </Link>
    </h1>
  );
};

export default Logo;
