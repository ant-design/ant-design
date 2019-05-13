import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcMentions from 'rc-mentions';
import { MentionsProps as RcMentionsProps } from 'rc-mentions/lib/Mentions';
import Spin from '../spin';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';

const { Option } = RcMentions;

function loadingFilterOption() {
  return true;
}

export type MentionPlacement = 'top' | 'bottom';

export interface OptionProps {
  value: string;
  children: React.ReactNode;
  [key: string]: any;
}

export interface MentionProps extends RcMentionsProps {
  loading?: boolean;
}

export interface MentionState {}

class Mentions extends React.Component<MentionProps, MentionState> {
  static Option = Option;

  getNotFoundContent(renderEmpty: RenderEmptyHandler) {
    const { notFoundContent } = this.props;
    if (notFoundContent !== undefined) {
      return notFoundContent;
    }

    return renderEmpty('Select');
  }

  getOptions = () => {
    const { children, loading } = this.props;
    if (loading) {
      return (
        <Option value={'ANTD_SEARCHING'} disabled>
          <Spin size="small" />
        </Option>
      );
    }

    return children;
  };

  getFilterOption = () => {
    const { filterOption, loading } = this.props;
    if (loading) {
      return loadingFilterOption;
    }
    return filterOption;
  };

  renderMentions = ({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, ...restProps } = this.props;
    const prefixCls = getPrefixCls('mentions', customizePrefixCls);
    return (
      <RcMentions
        prefixCls={prefixCls}
        notFoundContent={this.getNotFoundContent(renderEmpty)}
        {...restProps}
        filterOption={this.getFilterOption()}
      >
        {this.getOptions()}
      </RcMentions>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderMentions}</ConfigConsumer>;
  }
}

polyfill(Mentions);

export default Mentions;
