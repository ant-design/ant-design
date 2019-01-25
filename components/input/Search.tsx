import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';
import Button from '../button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

function noop() {}

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => any;
  enterButton?: boolean | React.ReactNode;
  loading?: boolean;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    enterButton: false,
  };

  private input: Input;

  onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.input.value, e);
    }
    this.input.focus();
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  saveInput = (node: Input) => {
    this.input = node;
  };

  getButtonOrIcon(prefixCls: string) {
    const { enterButton, size, disabled, loading } = this.props;
    const enterButtonAsElement = enterButton as React.ReactElement<any>;
    const iconClassName = classNames(`${prefixCls}-icon`, {
      [`${prefixCls}-loading`]: !!loading,
    });
    const buttonClassName = classNames(`${prefixCls}-button`, {
      [`${prefixCls}-loading`]: !!loading,
    });
    let node;
    if (!enterButton) {
      node = (
        <Icon className={iconClassName} type={loading ? 'loading' : 'search'} key="searchIcon" />
      );
    } else if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
      node = React.cloneElement(
        enterButtonAsElement,
        enterButtonAsElement.type === Button
          ? {
              className: buttonClassName,
              size,
            }
          : {},
      );
    } else {
      node = (
        <Button
          className={buttonClassName}
          type="primary"
          size={size}
          disabled={disabled}
          key="enterButton"
        >
          {enterButton === true ? (
            <Icon type={loading ? 'loading' : 'search'} />
          ) : (
            <span>
              <span
                className={classNames({
                  [`${prefixCls}-button-text-loading`]: !!loading,
                })}
              >
                {enterButton}
              </span>
              {loading && <Icon type="loading" />}
            </span>
          )}
        </Button>
      );
    }
    return React.cloneElement(node, {
      onClick: loading ? noop : this.onSearch,
    });
  }

  renderSearch = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      className,
      size,
      suffix,
      enterButton,
      loading,
      ...others
    } = this.props;
    delete (others as any).onSearch;
    const prefixCls = getPrefixCls('input-search', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
    const buttonOrIcon = this.getButtonOrIcon(prefixCls);
    let searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
    if (Array.isArray(searchSuffix)) {
      searchSuffix = (searchSuffix as React.ReactElement<any>[]).map((item, index) => {
        if (!React.isValidElement(item) || item.key) {
          return item;
        }
        return React.cloneElement(item, { key: index });
      });
    }
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-enter-button`]: !!enterButton,
      [`${prefixCls}-${size}`]: !!size,
    });
    return (
      <Input
        onPressEnter={loading ? noop : this.onSearch}
        {...others}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={searchSuffix}
        ref={this.saveInput}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSearch}</ConfigConsumer>;
  }
}
