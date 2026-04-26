import React from 'react';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import type { BaseInputProps } from '@rc-component/input/lib/interface';

import { isPlainObject } from './is';

export type AllowClear = BaseInputProps['allowClear'];

const getAllowClear = (allowClear: AllowClear): AllowClear => {
  let mergedAllowClear: AllowClear;
  if (isPlainObject(allowClear) && allowClear?.clearIcon) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = {
      clearIcon: <CloseCircleFilled />,
    };
  }

  return mergedAllowClear;
};

export default getAllowClear;
