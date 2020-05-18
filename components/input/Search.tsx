import * as React from 'react';
import classNames from 'classnames';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Input, { InputProps } from './Input';
import Button from '../button';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { replaceElement, cloneElement } from '../_util/reactNode';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  enterButton?: React.ReactNode;
  loading?: boolean;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    enterButton: false,
  };

  private input: Input;

  saveInput = (node: Input) => {
    this.input = node;
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, onSearch } = this.props;
    if (e && e.target && e.type === 'click' && onSearch) {
      onSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e);
    }
    if (onChange) {
      onChange(e);
    }
  };

  onMouseDown: React.MouseEventHandler<HTMLElement> = e => {
    if (document.activeElement === this.input.input) {
      e.preventDefault();
    }
  };

  onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch, loading, disabled } = this.props;
    if (loading || disabled) {
      return;
    }
    if (onSearch) {
      onSearch(this.input.input.value, e);
    }
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  renderLoading = (prefixCls: string) => {
    const { enterButton, size: customizeSize } = this.props;

    if (enterButton) {
      return (
        <SizeContext.Consumer key="enterButton">
          {size => (
            <Button className={`${prefixCls}-button`} type="primary" size={customizeSize || size}>
              <LoadingOutlined />
            </Button>
          )}
        </SizeContext.Consumer>
      );
    }
    return <LoadingOutlined className={`${prefixCls}-icon`} key="loadingIcon" />;
  };

  renderSuffix = (prefixCls: string) => {
    const { suffix, enterButton, loading } = this.props;

    if (loading && !enterButton) {
      return [suffix, this.renderLoading(prefixCls)];
    }

    if (enterButton) return suffix;

    const icon = (
      <SearchOutlined className={`${prefixCls}-icon`} key="searchIcon" onClick={this.onSearch} />
    );

    if (suffix) {
      return [
        replaceElement(suffix, null, {
          key: 'suffix',
        }),
        icon,
      ];
    }

    return icon;
  };

  renderAddonAfter = (prefixCls: string, size: SizeType) => {
    const { enterButton, disabled, addonAfter, loading } = this.props;
    const btnClassName = `${prefixCls}-button`;

    if (loading && enterButton) {
      return [this.renderLoading(prefixCls), addonAfter];
    }

    if (!enterButton) return addonAfter;

    let button: React.ReactNode;
    const enterButtonAsElement = enterButton as React.ReactElement<any>;
    const isAntdButton =
      enterButtonAsElement.type &&
      (enterButtonAsElement.type as typeof Button).__ANT_BUTTON === true;
    if (isAntdButton || enterButtonAsElement.type === 'button') {
      button = cloneElement(enterButtonAsElement, {
        onMouseDown: this.onMouseDown,
        onClick: this.onSearch,
        key: 'enterButton',
        ...(isAntdButton
          ? {
              className: btnClassName,
              size,
            }
          : {}),
      });
    } else {
      button = (
        <Button
          className={btnClassName}
          type="primary"
          size={size}
          disabled={disabled}
          key="enterButton"
          onMouseDown={this.onMouseDown}
          onClick={this.onSearch}
        >
          {enterButton === true ? <SearchOutlined /> : enterButton}
        </Button>
      );
    }

    if (addonAfter) {
      return [
        button,
        replaceElement(addonAfter, null, {
          key: 'addonAfter',
        }),
      ];
    }

    return button;
  };

  renderSearch = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      enterButton,
      className,
      size: customizeSize,
      ...restProps
    } = this.props;

    delete (restProps as any).onSearch;
    delete (restProps as any).loading;

    const prefixCls = getPrefixCls('input-search', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    const getClassName = (size: SizeType) => {
      let inputClassName;
      if (enterButton) {
        inputClassName = classNames(prefixCls, className, {
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-enter-button`]: !!enterButton,
          [`${prefixCls}-${size}`]: !!size,
        });
      } else {
        inputClassName = classNames(prefixCls, className, {
          [`${prefixCls}-rtl`]: direction === 'rtl',
        });
      }
      return inputClassName;
    };

    return (
      <SizeContext.Consumer>
        {size => (
          <Input
            onPressEnter={this.onSearch}
            {...restProps}
            size={customizeSize || size}
            prefixCls={inputPrefixCls}
            addonAfter={this.renderAddonAfter(prefixCls, customizeSize || size)}
            suffix={this.renderSuffix(prefixCls)}
            onChange={this.onChange}
            ref={this.saveInput}
            className={getClassName(customizeSize || size)}
          />
        )}
      </SizeContext.Consumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSearch}</ConfigConsumer>;
  }
}
