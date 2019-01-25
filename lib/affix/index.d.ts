import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumerProps } from '../config-provider';
export interface AffixProps {
    /**
     * 距离窗口顶部达到指定偏移量后触发
     */
    offsetTop?: number;
    offset?: number;
    /** 距离窗口底部达到指定偏移量后触发 */
    offsetBottom?: number;
    style?: React.CSSProperties;
    /** 固定状态改变时触发的回调函数 */
    onChange?: (affixed?: boolean) => void;
    /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
    target?: () => Window | HTMLElement | null;
    prefixCls?: string;
}
export interface AffixState {
    affixStyle: React.CSSProperties | undefined;
    placeholderStyle: React.CSSProperties | undefined;
}
export default class Affix extends React.Component<AffixProps, AffixState> {
    static propTypes: {
        offsetTop: PropTypes.Requireable<number>;
        offsetBottom: PropTypes.Requireable<number>;
        target: PropTypes.Requireable<(...args: any[]) => any>;
    };
    state: AffixState;
    private timeout;
    private eventHandlers;
    private fixedNode;
    private placeholderNode;
    private readonly events;
    setAffixStyle(e: Event, affixStyle: React.CSSProperties | null): void;
    setPlaceholderStyle(placeholderStyle: React.CSSProperties | null): void;
    syncPlaceholderStyle(e: Event): void;
    updatePosition(e: Event): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: AffixProps): void;
    componentWillUnmount(): void;
    setTargetEventListeners(getTarget: () => HTMLElement | Window | null): void;
    clearEventListeners(): void;
    saveFixedNode: (node: HTMLDivElement) => void;
    savePlaceholderNode: (node: HTMLDivElement) => void;
    renderAffix: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
