import * as React from 'react';
import * as PropTypes from 'prop-types';
import FormItem from './FormItem';
import { ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';
declare type FormCreateOptionMessagesCallback = (...args: any[]) => string;
interface FormCreateOptionMessages {
    [messageId: string]: string | FormCreateOptionMessagesCallback | FormCreateOptionMessages;
}
export interface FormCreateOption<T> {
    onFieldsChange?: (props: T, fields: object, allFields: any, add: string) => void;
    onValuesChange?: (props: T, changedValues: any, allValues: any) => void;
    mapPropsToFields?: (props: T) => void;
    validateMessages?: FormCreateOptionMessages;
    withRef?: boolean;
}
declare const FormLayouts: ["horizontal", "inline", "vertical"];
export declare type FormLayout = (typeof FormLayouts)[number];
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    layout?: FormLayout;
    form?: WrappedFormUtils;
    onSubmit?: React.FormEventHandler<any>;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
    hideRequiredMark?: boolean;
}
export declare type ValidationRule = {
    /** validation error message */
    message?: React.ReactNode;
    /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
    type?: string;
    /** indicates whether field is required */
    required?: boolean;
    /** treat required fields that only contain whitespace as errors */
    whitespace?: boolean;
    /** validate the exact length of a field */
    len?: number;
    /** validate the min length of a field */
    min?: number;
    /** validate the max length of a field */
    max?: number;
    /** validate the value from a list of possible values */
    enum?: string | string[];
    /** validate from a regular expression */
    pattern?: RegExp;
    /** transform a value before validation */
    transform?: (value: any) => any;
    /** custom validate function (Note: callback must be called) */
    validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
};
export declare type ValidateCallback = (errors: any, values: any) => void;
export declare type GetFieldDecoratorOptions = {
    /** 子节点的值的属性，如 Checkbox 的是 'checked' */
    valuePropName?: string;
    /** 子节点的初始值，类型、可选值均由子节点决定 */
    initialValue?: any;
    /** 收集子节点的值的时机 */
    trigger?: string;
    /** 可以把 onChange 的参数转化为控件的值，例如 DatePicker 可设为：(date, dateString) => dateString */
    getValueFromEvent?: (...args: any[]) => any;
    /** Get the component props according to field value. */
    getValueProps?: (value: any) => any;
    /** 校验子节点值的时机 */
    validateTrigger?: string | string[];
    /** 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) */
    rules?: ValidationRule[];
    /** 是否和其他控件互斥，特别用于 Radio 单选控件 */
    exclusive?: boolean;
    /** Normalize value to form component */
    normalize?: (value: any, prevValue: any, allValues: any) => any;
    /** Whether stop validate on first rule of error for this field.  */
    validateFirst?: boolean;
    /** 是否一直保留子节点的信息 */
    preserve?: boolean;
};
export declare type WrappedFormUtils = {
    /** 获取一组输入控件的值，如不传入参数，则获取全部组件的值 */
    getFieldsValue(fieldNames?: Array<string>): Object;
    /** 获取一个输入控件的值*/
    getFieldValue(fieldName: string): any;
    /** 设置一组输入控件的值*/
    setFieldsValue(obj: Object): void;
    /** 设置一组输入控件的值*/
    setFields(obj: Object): void;
    /** 校验并获取一组输入域的值与 Error */
    validateFields(fieldNames: Array<string>, options: Object, callback: ValidateCallback): void;
    validateFields(options: Object, callback: ValidateCallback): void;
    validateFields(fieldNames: Array<string>, callback: ValidateCallback): void;
    validateFields(fieldNames: Array<string>, options: Object): void;
    validateFields(fieldNames: Array<string>): void;
    validateFields(callback: ValidateCallback): void;
    validateFields(options: Object): void;
    validateFields(): void;
    /** 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 */
    validateFieldsAndScroll(fieldNames: Array<string>, options: Object, callback: ValidateCallback): void;
    validateFieldsAndScroll(options: Object, callback: ValidateCallback): void;
    validateFieldsAndScroll(fieldNames: Array<string>, callback: ValidateCallback): void;
    validateFieldsAndScroll(fieldNames: Array<string>, options: Object): void;
    validateFieldsAndScroll(fieldNames: Array<string>): void;
    validateFieldsAndScroll(callback: ValidateCallback): void;
    validateFieldsAndScroll(options: Object): void;
    validateFieldsAndScroll(): void;
    /** 获取某个输入控件的 Error */
    getFieldError(name: string): Object[];
    getFieldsError(names?: Array<string>): Object;
    /** 判断一个输入控件是否在校验状态*/
    isFieldValidating(name: string): boolean;
    isFieldTouched(name: string): boolean;
    isFieldsTouched(names?: Array<string>): boolean;
    /** 重置一组输入控件的值与状态，如不传入参数，则重置所有组件 */
    resetFields(names?: Array<string>): void;
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
};
export interface FormComponentProps {
    form: WrappedFormUtils;
}
export interface RcBaseFormProps {
    wrappedComponentRef?: any;
}
export interface ComponentDecorator {
    <P extends FormComponentProps>(component: React.ComponentClass<P> | React.SFC<P>): React.ComponentClass<RcBaseFormProps & Omit<P, keyof FormComponentProps>>;
}
export default class Form extends React.Component<FormProps, any> {
    static defaultProps: {
        layout: "inline" | "horizontal" | "vertical";
        hideRequiredMark: boolean;
        onSubmit(e: React.FormEvent<HTMLFormElement>): void;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        layout: PropTypes.Requireable<"inline" | "horizontal" | "vertical">;
        children: PropTypes.Requireable<any>;
        onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        hideRequiredMark: PropTypes.Requireable<boolean>;
    };
    static childContextTypes: {
        vertical: PropTypes.Requireable<boolean>;
    };
    static Item: typeof FormItem;
    static createFormField: any;
    static create: <TOwnProps>(options?: FormCreateOption<TOwnProps>) => ComponentDecorator;
    constructor(props: FormProps);
    getChildContext(): {
        vertical: boolean;
    };
    renderForm: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
