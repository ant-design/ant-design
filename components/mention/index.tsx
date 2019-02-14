import * as React from 'react';
import RcMention, { Nav, toString, toEditorState, getMentions } from 'rc-editor-mention';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import Loading from '../icon/icons/Loading';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export type MentionPlacement = 'top' | 'bottom';

export interface MentionProps {
  prefixCls?: string;
  suggestionStyle?: React.CSSProperties;
  defaultSuggestions?: Array<any>;
  suggestions?: Array<any>;
  onSearchChange?: (value: string, trigger: string) => any;
  onChange?: (contentState: any) => any;
  notFoundContent?: any;
  loading?: boolean;
  style?: React.CSSProperties;
  defaultValue?: any;
  value?: any;
  className?: string;
  multiLines?: boolean;
  prefix?: string | string[];
  placeholder?: string;
  getSuggestionContainer?: (triggerNode: Element) => HTMLElement;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onSelect?: (suggestion: string, data?: any) => any;
  readOnly?: boolean;
  disabled?: boolean;
  placement?: MentionPlacement;
}

export interface MentionState {
  filteredSuggestions?: Array<any>;
  focus?: Boolean;
}

class Mention extends React.Component<MentionProps, MentionState> {
  static getMentions = getMentions;
  static defaultProps = {
    notFoundContent: '无匹配结果，轻敲空格完成输入',
    loading: false,
    multiLines: false,
    placement: 'bottom' as MentionPlacement,
  };
  static Nav = Nav;
  static toString = toString;
  static toContentState = toEditorState;

  private mentionEle: any;
  constructor(props: MentionProps) {
    super(props);
    this.state = {
      filteredSuggestions: props.defaultSuggestions,
      focus: false,
    };
  }

  onSearchChange = (value: string, prefix: string) => {
    if (this.props.onSearchChange) {
      return this.props.onSearchChange(value, prefix);
    }
    return this.defaultSearchChange(value);
  };

  onChange = (editorState: any) => {
    if (this.props.onChange) {
      this.props.onChange(editorState);
    }
  };

  defaultSearchChange(value: string): void {
    const searchValue = value.toLowerCase();
    const filteredSuggestions = (this.props.defaultSuggestions || []).filter(suggestion => {
      if (suggestion.type && suggestion.type === Nav) {
        return suggestion.props.value
          ? suggestion.props.value.toLowerCase().indexOf(searchValue) !== -1
          : true;
      }
      return suggestion.toLowerCase().indexOf(searchValue) !== -1;
    });
    this.setState({
      filteredSuggestions,
    });
  }

  onFocus = (ev: React.FocusEvent<HTMLElement>) => {
    this.setState({
      focus: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  };

  onBlur = (ev: React.FocusEvent<HTMLElement>) => {
    this.setState({
      focus: false,
    });
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  };

  focus = () => {
    this.mentionEle._editor.focusEditor();
  };

  mentionRef = (ele: any) => {
    this.mentionEle = ele;
  };
  renderMention = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      loading,
      placement,
      suggestions,
    } = this.props;
    const { filteredSuggestions, focus } = this.state;
    const prefixCls = getPrefixCls('mention', customizePrefixCls);
    const cls = classNames(className, {
      [`${prefixCls}-active`]: focus,
      [`${prefixCls}-placement-top`]: placement === 'top',
    });
    const notFoundContent = loading ? <Loading /> : this.props.notFoundContent;

    return (
      <RcMention
        {...this.props}
        prefixCls={prefixCls}
        className={cls}
        ref={this.mentionRef}
        onSearchChange={this.onSearchChange}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        suggestions={suggestions || filteredSuggestions}
        notFoundContent={notFoundContent}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderMention}</ConfigConsumer>;
  }
}

polyfill(Mention);

export default Mention;
