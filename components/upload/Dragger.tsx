import * as React from 'react';
import Upload from './Upload';
import { UploadProps } from './interface';

export type DraggerProps = UploadProps & { height?: number };

const InternalDragger: React.ForwardRefRenderFunction<unknown, DraggerProps> = (
  { style, height, ...restProps },
  ref,
) => {
  return <Upload ref={ref} {...restProps} type="drag" style={{ ...style, height }} />;
};

const Dragger = React.forwardRef(InternalDragger) as React.FC<DraggerProps>;

Dragger.displayName = 'Dragger';

export default Dragger;
