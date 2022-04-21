// import '../../style/index.less';
// import './index.less';

// // style dependencies
// import '../../button/style';

// deps-lint-skip-all
import * as React from 'react';
import { CSSObject } from '@ant-design/cssinjs';
import {
  GenerateStyle,
  resetComponent,
  FullToken,
  genComponentStyleHook,
  mergeToken,
} from '../../_util/theme';

export interface ComponentToken {}

interface DropdownToken extends FullToken<'Slider'> {}

// ============================== Export ==============================
export default genComponentStyleHook('Dropdown', token => {
  const dropdownToken = mergeToken<DropdownToken>(token, {});
  return [];
});
