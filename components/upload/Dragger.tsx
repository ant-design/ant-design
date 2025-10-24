import * as React from 'react';

import type { UploadProps } from './interface';
import type { UploadRef } from './Upload';
import Upload from './Upload';

export type DraggerProps<T = any> = UploadProps<T> & { height?: number };

const Dragger = React.forwardRef<UploadRef, DraggerProps<any>>((props, ref) => {
  const { style, height, hasControlInside = false, children, ...restProps } = props;
  const mergedStyle: React.CSSProperties = { ...style, height };
  return (
    <Upload
      ref={ref}
      hasControlInside={hasControlInside}
      {...restProps}
      style={mergedStyle}
      type="drag"
    >
      {children}
    </Upload>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Dragger.displayName = 'Dragger';
}

export default Dragger;
