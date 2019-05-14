import classNames from 'classnames';
import omit from 'omit.js';
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

interface MentionsConfig {
  prefix?: string | string[];
  split?: string;
}

interface MentionsEntity {
  prefix: string;
  value: string;
}

class Mentions extends React.Component<MentionProps, MentionState> {
  static Option = Option;

  static getMentions = (value: string = '', config?: MentionsConfig): MentionsEntity[] => {
    const { prefix = '@', split = ' ' } = config || {};
    const prefixList: string[] = Array.isArray(prefix) ? prefix : [prefix];

    return value
      .split(split)
      .map(
        (str = ''): MentionsEntity | null => {
          let hitPrefix: string | null = null;

          prefixList.some(prefixStr => {
            const startStr = str.slice(0, prefix.length);
            if (startStr === prefixStr) {
              hitPrefix = prefixStr;
              return true;
            }
            return false;
          });

          if (hitPrefix !== null) {
            return {
              prefix: hitPrefix,
              value: str.slice(hitPrefix!.length),
            };
          }
          return null;
        },
      )
      .filter((entity): entity is MentionsEntity => !!entity);
  };

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
    const { prefixCls: customizePrefixCls, className, disabled, ...restProps } = this.props;
    const prefixCls = getPrefixCls('mentions', customizePrefixCls);
    const mentionsProps = omit(restProps, ['loading']);

    const mergedClassName = classNames(className, {
      [`${prefixCls}-disabled`]: disabled,
    });

    return (
      <RcMentions
        prefixCls={prefixCls}
        notFoundContent={this.getNotFoundContent(renderEmpty)}
        className={mergedClassName}
        disabled={disabled}
        {...mentionsProps}
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
