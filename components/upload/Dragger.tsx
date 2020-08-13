import * as React from 'react';
import Upload from './Upload';
import { UploadProps } from './interface';

export type DraggerProps = UploadProps & { height?: number };

const Dragger: React.FC<DraggerProps> = ({ style, height, ...restProps }) => {
  return <Upload {...restProps} type="drag" style={{ ...style, height }} />;
};

export default Dragger;
