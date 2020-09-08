import * as React from 'react';
import { Link } from 'bisheng/router';
import * as utils from '../../utils';

import './Logo.less';

const Logo = ({ isZhCN, location }) => {
  return (
    <h1>
      <Link to={utils.getLocalizedPathname('/', isZhCN, location.query)} id="logo">
        <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        Ant Design
      </Link>
    </h1>
  );
};

export default Logo;
