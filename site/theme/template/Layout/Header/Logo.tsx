import * as React from 'react';
import { Link } from 'bisheng/router';
import * as utils from '../../utils';
import { SharedProps } from './interface';

import './Logo.less';

export default ({ isZhCN }: SharedProps) => (
  <h1>
    <Link to={utils.getLocalizedPathname('/', isZhCN)} id="logo">
      <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
      Ant Design
    </Link>
  </h1>
);
