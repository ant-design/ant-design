import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ColProps } from '../grid/col';
import { ConfigConsumerProps } from '../config-provider';
declare const ValidateStatuses: ["success", "warning", "error", "validating", ""];
export interface FormItemProps {
    prefixCls?: string;
    className?: string;
    id?: string;
    label?: React.ReactNode;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    help?: React.ReactNode;
    extra?: React.ReactNode;
    validateStatus?: (typeof ValidateStatuses)[number];
    hasFeedback?: boolean;
    required?: boolean;
    style?: React.CSSProperties;
    colon?: boolean;
}
export interface FormItemContext {
    vertical: boolean;
}
export default class FormItem extends React.Component<FormItemProps, any> {
    static defaultProps: {
        hasFeedback: boolean;
        colon: boolean;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        labelCol: PropTypes.Requireable<object>;
        help: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        validateStatus: PropTypes.Requireable<"" | "error" | "success" | "warning" | "validating">;
        hasFeedback: PropTypes.Requireable<boolean>;
        wrapperCol: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        id: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        colon: PropTypes.Requireable<boolean>;
    };
    static contextTypes: {
        vertical: PropTypes.Requireable<boolean>;
    };
    context: FormItemContext;
    helpShow: boolean;
    componentDidMount(): void;
    getHelpMessage(): {} | null | undefined;
    getControls(children: React.ReactNode, recursively: boolean): React.ReactElement<any>[];
    getOnlyControl(): React.ReactElement<any> | null;
    getChildProp(prop: string): any;
    getId(): any;
    getMeta(): any;
    getField(): any;
    onHelpAnimEnd: (_key: string, helpShow: boolean) => void;
    renderHelp(prefixCls: string): JSX.Element;
    renderExtra(prefixCls: string): JSX.Element | null;
    getValidateStatus(): "error" | "" | "success" | "validating";
    renderValidateWrapper(prefixCls: string, c1: React.ReactNode, c2: React.ReactNode, c3: React.ReactNode): JSX.Element;
    renderWrapper(prefixCls: string, children: React.ReactNode): JSX.Element;
    isRequired(): any;
    onLabelClick: (e: any) => void;
    renderLabel(prefixCls: string): JSX.Element | null;
    renderChildren(prefixCls: string): (JSX.Element | null)[];
    renderFormItem: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
