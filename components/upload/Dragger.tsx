import * as React from 'react';

import type { UploadProps } from './interface';
import type { UploadRef } from './Upload';
import Upload from './Upload';

export type DraggerProps = UploadProps & { height?: number };

const Dragger = React.forwardRef<UploadRef, DraggerProps>(
  ({ style, height, hasControlInside = false, ...restProps }, ref) => (
    <Upload
      ref={ref}
      hasControlInside={hasControlInside}
      {...restProps}
      type="drag"
      style={{ ...style, height }}
    />
  ),
);

if (process.env.NODE_ENV !== 'production') {
  Dragger.displayName = 'Dragger';
}

export default Dragger;
