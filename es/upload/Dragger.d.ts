import * as React from 'react';
import { UploadProps } from './interface';
export declare type DraggerProps = UploadProps & {
    height?: number;
};
export default class Dragger extends React.Component<DraggerProps, any> {
    render(): JSX.Element;
}
