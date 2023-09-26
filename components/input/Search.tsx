import SearchOutlined from '@ant-design/icons/SearchOutlined';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { cloneElement } from '../_util/reactNode';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import { useCompactItemContext } from '../space/Compact';
import type { InputProps, InputRef } from './Input';
import Input from './Input';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    info?: {
      source?: 'clear' | 'input';
    },
  ) => void;
  enterButton?: React.ReactNode;
  loading?: boolean;
}

const Search = React.forwardRef<InputRef, SearchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    className,
    size: customizeSize,
    suffix,
    enterButton = false,
    addonAfter,
    loading,
    disabled,
    onSearch: customOnSearch,
    onChange: customOnChange,
    onCompositionStart,
    onCompositionEnd,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const composedRef = React.useRef<boolean>(false);

  const prefixCls = getPrefixCls('input-search', customizePrefixCls);
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const { compactSize } = useCompactItemContext(prefixCls, direction);

  const size = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  const inputRef = React.useRef<InputRef>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.type === 'click' && customOnSearch) {
      customOnSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e, {
        source: 'clear',
      });
    }
    if (customOnChange) {
      customOnChange(e);
    }
  };

  const onMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    if (document.activeElement === inputRef.current?.input) {
      e.preventDefault();
    }
  };

  const onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (customOnSearch) {
      customOnSearch(inputRef.current?.input?.value!, e, {
        source: 'input',
      });
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (composedRef.current || loading) {
      return;
    }
    onSearch(e);
  };

  const searchIcon = typeof enterButton === 'boolean' ? <SearchOutlined /> : null;
  const btnClassName = `${prefixCls}-button`;

  let button: React.ReactNode;
  const enterButtonAsElement = (enterButton || {}) as React.ReactElement;
  const isAntdButton =
    enterButtonAsElement.type && (enterButtonAsElement.type as typeof Button).__ANT_BUTTON === true;
  if (isAntdButton || enterButtonAsElement.type === 'button') {
    button = cloneElement(enterButtonAsElement, {
      onMouseDown,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        enterButtonAsElement?.props?.onClick?.(e);
        onSearch(e);
      },
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
        type={enterButton ? 'primary' : undefined}
        size={size}
        disabled={disabled}
        key="enterButton"
        onMouseDown={onMouseDown}
        onClick={onSearch}
        loading={loading}
        icon={searchIcon}
      >
        {enterButton}
      </Button>
    );
  }

  if (addonAfter) {
    button = [
      button,
      cloneElement(addonAfter, {
        key: 'addonAfter',
      }),
    ];
  }

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-with-button`]: !!enterButton,
    },
    className,
  );

  const handleOnCompositionStart: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = true;
    onCompositionStart?.(e);
  };

  const handleOnCompositionEnd: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = false;
    onCompositionEnd?.(e);
  };

  return (
    <Input
      ref={composeRef<InputRef>(inputRef, ref)}
      onPressEnter={onPressEnter}
      {...restProps}
      size={size}
      onCompositionStart={handleOnCompositionStart}
      onCompositionEnd={handleOnCompositionEnd}
      prefixCls={inputPrefixCls}
      addonAfter={button}
      suffix={suffix}
      onChange={onChange}
      className={cls}
      disabled={disabled}
    />
  );
});
if (process.env.NODE_ENV !== 'production') {
  Search.displayName = 'Search';
}

export default Search;
