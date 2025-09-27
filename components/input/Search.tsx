import * as React from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { cloneElement } from '../_util/reactNode';
import Button from '../button';
import type { ButtonSemanticName } from '../button/button';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import { useCompactItemContext } from '../space/Compact';
import type { InputProps, InputRef } from './Input';
import Input from './Input';

type SemanticName = 'root' | 'input' | 'prefix' | 'suffix' | 'count';

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
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  classNames?: Partial<Record<SemanticName, string>> & {
    button?: Partial<Record<ButtonSemanticName, string>>;
  };
  styles?: Partial<Record<SemanticName, React.CSSProperties>> & {
    button?: Partial<Record<ButtonSemanticName, React.CSSProperties>>;
  };
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
    variant,
    onPressEnter: customOnPressEnter,
    classNames,
    styles,
    ...restProps
  } = props;

  const {
    direction,
    getPrefixCls,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('inputSearch');

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      button: {
        _default: 'root',
      },
    },
  );

  const composedRef = React.useRef<boolean>(false);

  const prefixCls = getPrefixCls('input-search', customizePrefixCls);
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const { compactSize } = useCompactItemContext(prefixCls, direction);

  const size = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  const inputRef = React.useRef<InputRef>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target && e.type === 'click' && customOnSearch) {
      customOnSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e, {
        source: 'clear',
      });
    }
    customOnChange?.(e);
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
    customOnPressEnter?.(e);
    onSearch(e);
  };

  const searchIcon = typeof enterButton === 'boolean' ? <SearchOutlined /> : null;
  const btnClassName = clsx(`${prefixCls}-button`, mergedClassNames.button?.root);

  let button: React.ReactNode;
  const enterButtonAsElement = (enterButton || {}) as React.ReactElement;
  const isAntdButton =
    enterButtonAsElement.type && (enterButtonAsElement.type as typeof Button).__ANT_BUTTON === true;
  if (isAntdButton || enterButtonAsElement.type === 'button') {
    button = cloneElement(enterButtonAsElement, {
      onMouseDown,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        (
          enterButtonAsElement as React.ReactElement<{
            onClick?: React.MouseEventHandler<HTMLButtonElement>;
          }>
        )?.props?.onClick?.(e);
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
        classNames={mergedClassNames.button}
        styles={mergedStyles.button}
        className={btnClassName}
        color={enterButton ? 'primary' : 'default'}
        size={size}
        disabled={disabled}
        key="enterButton"
        onMouseDown={onMouseDown}
        onClick={onSearch}
        loading={loading}
        icon={searchIcon}
        variant={
          variant === 'borderless' || variant === 'filled' || variant === 'underlined'
            ? 'text'
            : enterButton
              ? 'solid'
              : undefined
        }
      >
        {enterButton}
      </Button>
    );
  }

  if (addonAfter) {
    button = [button, cloneElement(addonAfter, { key: 'addonAfter' })];
  }

  const mergedClassName = clsx(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-with-button`]: !!enterButton,
    },
    className,
    mergedClassNames.root,
  );

  const handleOnCompositionStart: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = true;
    onCompositionStart?.(e);
  };

  const handleOnCompositionEnd: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = false;
    onCompositionEnd?.(e);
  };

  const inputProps: InputProps = {
    ...restProps,
    className: mergedClassName,
    classNames: mergedClassNames,
    styles: mergedStyles,
    prefixCls: inputPrefixCls,
    type: 'search',
    size,
    variant,
    onPressEnter,
    onCompositionStart: handleOnCompositionStart,
    onCompositionEnd: handleOnCompositionEnd,
    addonAfter: button,
    suffix,
    onChange,
    disabled,
  };

  return <Input ref={composeRef<InputRef>(inputRef, ref)} {...inputProps} />;
});

if (process.env.NODE_ENV !== 'production') {
  Search.displayName = 'Search';
}

export default Search;
