import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcMentions from 'rc-mentions';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export type MentionPlacement = 'top' | 'bottom';

export interface OptionProps {
  value: string;
  children: React.ReactNode;
  [key: string]: any;
}

export interface MentionProps {
  prefixCls?: string;
}

export interface MentionState {}

class Mentions extends React.Component<MentionProps, MentionState> {
  static Option = RcMentions.Option;

  renderMentions = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls } = this.props;
    const prefixCls = getPrefixCls('mentions', customizePrefixCls);
    return <RcMentions prefixCls={prefixCls} {...this.props} />;
  };

  render() {
    return <ConfigConsumer>{this.renderMentions}</ConfigConsumer>;
  }
}

polyfill(Mentions);

export default Mentions;
