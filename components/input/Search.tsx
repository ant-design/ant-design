import * as React from 'react';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Input, { InputProps } from './Input';
import Button from '../button';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

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

  const renderAddonAfter = (prefixCls: string, size: SizeType) => {
    const { enterButton, disabled, addonAfter, loading } = props;
    const searchIcon =
      typeof enterButton === 'boolean' || typeof enterButton === 'undefined' ? (
        <SearchOutlined />
      ) : null;
    const button = (
      <Button
        className={`${prefixCls}-button`}
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

    if (addonAfter) {
      return [button, addonAfter];
    }

    return button;
  };

  const renderSearch = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      className,
      size: customizeSize,
      suffix,
      ...restProps
    } = props;

    delete (restProps as any).onSearch;
    delete (restProps as any).loading;
    delete (restProps as any).enterButton;

    const prefixCls = getPrefixCls('input-search', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    const getClassName = (size: SizeType) =>
      classNames(
        prefixCls,
        {
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-${size}`]: !!size,
        },
        className,
      );

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
            suffix={suffix}
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
