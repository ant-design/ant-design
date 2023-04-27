import * as React from 'react';
import type { UploadProps } from './interface';
import Upload from './Upload';

export type DraggerProps = UploadProps & { height?: number };

const Dragger = React.forwardRef<unknown, DraggerProps>(({ style, height, ...restProps }, ref) => (
  <Upload ref={ref} {...restProps} type="drag" style={{ ...style, height }} />
));

if (process.env.NODE_ENV !== 'production') {
  Dragger.displayName = 'Dragger';
}

export default Dragger;
