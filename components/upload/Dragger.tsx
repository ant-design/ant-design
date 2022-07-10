import * as React from 'react';
import type { UploadProps } from './interface';
import Upload from './Upload';

export type DraggerProps = UploadProps & { height?: number };

const InternalDragger: React.ForwardRefRenderFunction<unknown, DraggerProps> = (
  { style, height, ...restProps },
  ref,
) => <Upload ref={ref} {...restProps} type="drag" style={{ ...style, height }} />;

const Dragger = React.forwardRef(InternalDragger) as React.FC<DraggerProps>;

if (process.env.NODE_ENV !== 'production') {
  Dragger.displayName = 'Dragger';
}

export default Dragger;
