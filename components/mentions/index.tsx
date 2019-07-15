import classNames from 'classnames';
import omit from 'omit.js';
import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcMentions from 'rc-mentions';
import { MentionsProps as RcMentionsProps } from 'rc-mentions/lib/Mentions';
import { OptionProps as RcOptionProps } from 'rc-mentions/lib/Option';
import Spin from '../spin';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';

const Option: React.FunctionComponent<RcOptionProps> = RcMentions.Option;

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

export interface MentionState {
  focused: boolean;
}

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
      .map((str = ''): MentionsEntity | null => {
        let hitPrefix: string | null = null;

        prefixList.some(prefixStr => {
          const startStr = str.slice(0, prefixStr.length);
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
      })
      .filter((entity): entity is MentionsEntity => !!entity && !!entity.value);
  };

  state = {
    focused: false,
  };

  onFocus: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(...args);
    }
    this.setState({
      focused: true,
    });
  };

  onBlur: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(...args);
    }
    this.setState({
      focused: false,
    });
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

  getFilterOption = (): any => {
    const { filterOption, loading } = this.props;
    if (loading) {
      return loadingFilterOption;
    }
    return filterOption;
  };

  renderMentions = ({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => {
    const { focused } = this.state;
    const { prefixCls: customizePrefixCls, className, disabled, ...restProps } = this.props;
    const prefixCls = getPrefixCls('mentions', customizePrefixCls);
    const mentionsProps = omit(restProps, ['loading']);

    const mergedClassName = classNames(className, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: focused,
    });

    return (
      <RcMentions
        prefixCls={prefixCls}
        notFoundContent={this.getNotFoundContent(renderEmpty)}
        className={mergedClassName}
        disabled={disabled}
        {...mentionsProps}
        filterOption={this.getFilterOption()}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
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
