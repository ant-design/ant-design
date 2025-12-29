import * as React from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import omit from '@rc-component/util/lib/omit';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { cloneElement } from '../_util/reactNode';
import Button from '../button/Button';
import type { ButtonSemanticClassNames, ButtonSemanticStyles } from '../button/Button';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import Compact, { useCompactItemContext } from '../space/Compact';
import type { InputProps, InputRef } from './Input';
import Input from './Input';
import useStyle from './style/search';

export type InputSearchSemanticClassNames = {
  root?: string;
  input?: string;
  prefix?: string;
  suffix?: string;
  count?: string;
};

export type InputSearchSemanticStyles = {
  root?: React.CSSProperties;
  input?: React.CSSProperties;
  prefix?: React.CSSProperties;
  suffix?: React.CSSProperties;
  count?: React.CSSProperties;
};

export type InputSearchClassNamesType = SemanticClassNamesType<
  SearchProps,
  InputSearchSemanticClassNames
> & {
  button?: ButtonSemanticClassNames;
};

export type InputSearchStylesType = SemanticStylesType<SearchProps, InputSearchSemanticStyles> & {
  button?: ButtonSemanticStyles;
};

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
  classNames?: InputSearchClassNamesType;
  styles?: InputSearchStylesType;
}

const Search = React.forwardRef<InputRef, SearchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    className,
    size: customizeSize,
    style,
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
    hidden,
    ...restProps
  } = props;

  const {
    direction,
    getPrefixCls,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('inputSearch');

  const mergedProps: SearchProps = {
    ...props,
    enterButton,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    InputSearchClassNamesType,
    InputSearchStylesType,
    SearchProps
  >(
    [contextClassNames, classNames],
    [contextStyles, styles],
    { props: mergedProps },
    {
      button: {
        _default: 'root',
      },
    },
  );

  const composedRef = React.useRef<boolean>(false);

  const prefixCls = getPrefixCls('input-search', customizePrefixCls);
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
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
  const btnPrefixCls = `${prefixCls}-btn`;
  const btnClassName = clsx(btnPrefixCls, {
    [`${btnPrefixCls}-${variant}`]: variant,
  });

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
      ...(isAntdButton ? { className: btnClassName, size } : {}),
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
    cssVarCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-with-button`]: !!enterButton,
    },
    className,
    hashId,
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

  // ========================== Render ==========================
  // >>> Root Props
  const rootProps = pickAttrs(restProps, {
    data: true,
  });

  const inputProps: InputProps = omit(
    {
      ...restProps,
      classNames: omit(mergedClassNames, ['button', 'root']),
      styles: omit(mergedStyles, ['button', 'root']),
      prefixCls: inputPrefixCls,
      type: 'search',
      size,
      variant,
      onPressEnter,
      onCompositionStart: handleOnCompositionStart,
      onCompositionEnd: handleOnCompositionEnd,
      onChange,
      disabled,
    },
    Object.keys(rootProps) as Array<keyof typeof rootProps>,
  );

  return (
    <Compact
      className={mergedClassName}
      style={{ ...style, ...mergedStyles.root }}
      {...rootProps}
      hidden={hidden}
    >
      <Input ref={composeRef<InputRef>(inputRef, ref)} {...inputProps} />
      {button}
    </Compact>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Search.displayName = 'Search';
}

export default Search;
