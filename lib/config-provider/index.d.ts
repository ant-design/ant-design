import * as React from 'react';
import { RenderEmptyHandler } from './renderEmpty';
export { RenderEmptyHandler };
export interface ConfigConsumerProps {
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    rootPrefixCls?: string;
    getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
    renderEmpty: RenderEmptyHandler;
}
interface ConfigProviderProps {
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    prefixCls?: string;
    children?: React.ReactNode;
    renderEmpty?: RenderEmptyHandler;
}
export declare const ConfigConsumer: React.ComponentClass<import("create-react-context").ConsumerProps<ConfigConsumerProps | null>, any>;
declare class ConfigProvider extends React.Component<ConfigProviderProps> {
    getPrefixCls: (suffixCls: string, customizePrefixCls?: string | undefined) => string;
    renderProvider: (context: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
declare type IReactComponent<P = any> = React.StatelessComponent<P> | React.ComponentClass<P> | React.ClassicComponentClass<P>;
interface BasicExportProps {
    prefixCls?: string;
}
interface ConsumerConfig {
    prefixCls: string;
}
export declare function withConfigConsumer<ExportProps extends BasicExportProps>(config: ConsumerConfig): (Component: IReactComponent<any>) => React.FunctionComponent<ExportProps>;
export default ConfigProvider;
