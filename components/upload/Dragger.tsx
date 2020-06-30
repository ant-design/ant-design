import * as React from 'react';
import Upload from './Upload';
import { UploadProps } from './interface';

export type DraggerProps = UploadProps & { height?: number };

// stick class comoponent to avoid React ref warning inside Form
// https://github.com/ant-design/ant-design/issues/18707
// eslint-disable-next-line react/prefer-stateless-function
export default class Dragger extends React.Component<DraggerProps, any> {
  render() {
    const { style, height, ...restProps } = this.props;
    return <Upload {...restProps} type="drag" style={{ ...style, height }} />;
  }
}
