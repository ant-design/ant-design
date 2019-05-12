import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcMentions from 'rc-mentions';
import { MentionsProps as RcMentionsProps } from 'rc-mentions/lib/Mentions';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';

export type MentionPlacement = 'top' | 'bottom';

export interface OptionProps {
  value: string;
  children: React.ReactNode;
  [key: string]: any;
}

export interface MentionProps extends RcMentionsProps {
  prefixCls?: string;
}

export interface MentionState {}

class Mentions extends React.Component<MentionProps, MentionState> {
  static Option = RcMentions.Option;

  getNotFoundContent(renderEmpty: RenderEmptyHandler) {
    const { notFoundContent } = this.props;
    if (notFoundContent !== undefined) {
      return notFoundContent;
    }

    return renderEmpty('Select');
  }

  renderMentions = ({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls } = this.props;
    const prefixCls = getPrefixCls('mentions', customizePrefixCls);
    return (
      <RcMentions
        prefixCls={prefixCls}
        notFoundContent={this.getNotFoundContent(renderEmpty)}
        {...this.props}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderMentions}</ConfigConsumer>;
  }
}

polyfill(Mentions);

export default Mentions;
