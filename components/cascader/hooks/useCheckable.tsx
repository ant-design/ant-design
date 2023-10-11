import * as React from 'react';

export default function useCheckable(cascaderPrefixCls: string, multiple?: boolean) {
  return React.useMemo(
    () => (multiple ? <span className={`${cascaderPrefixCls}-checkbox-inner`} /> : false),
    [multiple],
  );
}
