import * as React from 'react';
import RcMention, { Nav, toString, toEditorState, getMentions } from 'rc-editor-mention';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import Icon from '../icon';
export type MentionPlacement = 'top' | 'bottom';

export interface MentionProps {
  prefixCls?: string;
  suggestionStyle?: React.CSSProperties;
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
  suggestions?: Array<any>;
  focus?: Boolean;
}

class Mention extends React.Component<MentionProps, MentionState> {
  static getMentions = getMentions;
  static defaultProps = {
    prefixCls: 'ant-mention',
    notFoundContent: '无匹配结果，轻敲空格完成输入',
    loading: false,
    multiLines: false,
    placement: 'bottom' as MentionPlacement,
  };
  static Nav = Nav;
  static toString = toString;
  static toContentState = toEditorState;

  static getDerivedStateFromProps(nextProps: MentionProps, state: MentionState) {
    const { suggestions } = nextProps;
    if (!shallowequal(suggestions, state.suggestions)) {
      return {
        suggestions,
      };
    }
    return null;
  }

  private mentionEle: any;
  constructor(props: MentionProps) {
    super(props);
    this.state = {
      suggestions: props.suggestions,
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
    const filteredSuggestions = (this.props.suggestions || []).filter(suggestion => {
      if (suggestion.type && suggestion.type === Nav) {
        return suggestion.props.value
          ? suggestion.props.value.toLowerCase().indexOf(searchValue) !== -1
          : true;
      }
      return suggestion.toLowerCase().indexOf(searchValue) !== -1;
    });
    this.setState({
      suggestions: filteredSuggestions,
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

  render() {
    const { className = '', prefixCls, loading, placement } = this.props;
    const { suggestions, focus } = this.state;
    const cls = classNames(className, {
      [`${prefixCls}-active`]: focus,
      [`${prefixCls}-placement-top`]: placement === 'top',
    });
    const notFoundContent = loading ? <Icon type="loading" /> : this.props.notFoundContent;

    return (
      <RcMention
        {...this.props}
        className={cls}
        ref={this.mentionRef}
        onSearchChange={this.onSearchChange}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        suggestions={suggestions}
        notFoundContent={notFoundContent}
      />
    );
  }
}

polyfill(Mention);

export default Mention;
