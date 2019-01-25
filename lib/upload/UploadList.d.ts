import * as React from 'react';
import { UploadListProps, UploadFile, UploadListType } from './interface';
import { ConfigConsumerProps } from '../config-provider';
export default class UploadList extends React.Component<UploadListProps, any> {
    static defaultProps: {
        listType: UploadListType;
        progressAttr: {
            strokeWidth: number;
            showInfo: boolean;
        };
        showRemoveIcon: boolean;
        showPreviewIcon: boolean;
    };
    handleClose: (file: UploadFile) => void;
    handlePreview: (file: UploadFile, e: React.SyntheticEvent<HTMLElement, Event>) => void;
    componentDidUpdate(): void;
    renderUploadList: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
