import * as React from 'react';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Input, { InputProps } from './Input';
import Button from '../button';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { cloneElement, replaceElement } from '../_util/reactNode';

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

const Search = React.forwardRef<Input, SearchProps>((props, ref) => {
  const inputRef = React.useRef<Input>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange: customOnChange, onSearch: customOnSearch } = props;
    if (e && e.target && e.type === 'click' && customOnSearch) {
      customOnSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e);
    }
    if (customOnChange) {
      customOnChange(e);
    }
  };

  const onMouseDown: React.MouseEventHandler<HTMLElement> = e => {
    if (document.activeElement === inputRef.current?.input) {
      e.preventDefault();
    }
  };

  const onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch: customOnSearch, loading, disabled } = props;
    if (loading || disabled) {
      return;
    }
    if (customOnSearch) {
      customOnSearch(inputRef.current?.input.value!, e);
    }
  };

  const renderLoading = (prefixCls: string) => {
    const { enterButton, size: customizeSize } = props;

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

  const renderSuffix = (prefixCls: string) => {
    const { suffix, enterButton, loading } = props;

    if (loading && !enterButton) {
      return [suffix, renderLoading(prefixCls)];
    }

    if (enterButton) return suffix;

    const icon = (
      <SearchOutlined className={`${prefixCls}-icon`} key="searchIcon" onClick={onSearch} />
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

  const renderAddonAfter = (prefixCls: string, size: SizeType) => {
    const { enterButton, disabled, addonAfter, loading } = props;
    const btnClassName = `${prefixCls}-button`;

    if (loading && enterButton) {
      return [renderLoading(prefixCls), addonAfter];
    }

    if (!enterButton) return addonAfter;

    let button: React.ReactNode;
    const enterButtonAsElement = enterButton as React.ReactElement;
    const isAntdButton =
      enterButtonAsElement.type &&
      (enterButtonAsElement.type as typeof Button).__ANT_BUTTON === true;
    if (isAntdButton || enterButtonAsElement.type === 'button') {
      button = cloneElement(enterButtonAsElement, {
        onMouseDown,
        onClick: onSearch,
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
          onMouseDown={onMouseDown}
          onClick={onSearch}
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

  const renderSearch = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      enterButton,
      className,
      size: customizeSize,
      ...restProps
    } = props;

    delete (restProps as any).onSearch;
    delete (restProps as any).loading;

    const prefixCls = getPrefixCls('input-search', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    const getClassName = (size: SizeType) => {
      let inputClassName;
      if (enterButton) {
        inputClassName = classNames(
          prefixCls,
          {
            [`${prefixCls}-rtl`]: direction === 'rtl',
            [`${prefixCls}-enter-button`]: !!enterButton,
            [`${prefixCls}-${size}`]: !!size,
          },
          className,
        );
      } else {
        inputClassName = classNames(
          prefixCls,
          {
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          className,
        );
      }
      return inputClassName;
    };

    return (
      <SizeContext.Consumer>
        {size => (
          <Input
            ref={composeRef<Input>(inputRef, ref)}
            onPressEnter={onSearch}
            {...restProps}
            size={customizeSize || size}
            prefixCls={inputPrefixCls}
            addonAfter={renderAddonAfter(prefixCls, customizeSize || size)}
            suffix={renderSuffix(prefixCls)}
            onChange={onChange}
            className={getClassName(customizeSize || size)}
          />
        )}
      </SizeContext.Consumer>
    );
  };

  return <ConfigConsumer>{renderSearch}</ConfigConsumer>;
});

Search.defaultProps = {
  enterButton: false,
};

Search.displayName = 'Search';

export default Search;
