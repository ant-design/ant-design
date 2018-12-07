import * as React from 'react';
import Upload from './Upload';
import { UploadProps } from './interface';

export type DraggerProps = UploadProps & { height?: number };

export default class Dragger extends React.Component<DraggerProps, any> {
  render() {
    const { props } = this;
    return <Upload {...props} type="drag" style={{ ...props.style, height: props.height }} />;
  }
}
