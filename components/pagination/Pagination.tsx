import * as React from 'react';
import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import type { PaginationLocale, PaginationProps as RcPaginationProps } from 'rc-pagination';
import RcPagination from 'rc-pagination';
import enUS from 'rc-pagination/lib/locale/en_US';

import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { useLocale } from '../locale';
import type { SelectProps } from '../select';
import Select from '../select';
import { useToken } from '../theme/internal';
import useStyle from './style';
import BorderedStyle from './style/bordered';
import useShowSizeChanger from './useShowSizeChanger';

export interface PaginationProps
  extends Omit<RcPaginationProps, 'showSizeChanger' | 'pageSizeOptions'> {
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  size?: 'default' | 'small';
  responsive?: boolean;
  role?: string;
  totalBoundaryShowSizeChanger?: number;
  rootClassName?: string;
  showSizeChanger?: boolean | SelectProps;
  /** @deprecated Not official support. Will be removed in next major version. */
  selectComponentClass?: any;
  /** `string` type will be removed in next major version. */
  pageSizeOptions?: (string | number)[];
}

export type PaginationPosition = 'top' | 'bottom' | 'both';

export interface PaginationConfig extends Omit<PaginationProps, 'rootClassName'> {
  position?: PaginationPosition;
}

export type { PaginationLocale };

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    align,
    prefixCls: customizePrefixCls,
    selectPrefixCls: customizeSelectPrefixCls,
    className,
    rootClassName,
    style,
    size: customizeSize,
    locale: customLocale,
    responsive,
    showSizeChanger,
    selectComponentClass,
    pageSizeOptions,
    ...restProps
  } = props;
  const { xs } = useBreakpoint(responsive);
  const [, token] = useToken();

  const {
    getPrefixCls,
    direction,
    showSizeChanger: contextShowSizeChangerConfig,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('pagination');
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  // ============================== Size ==============================
  const mergedSize = useSize(customizeSize);

  const isSmall = mergedSize === 'small' || !!(xs && !mergedSize && responsive);

  // ============================= Locale =============================
  const [contextLocale] = useLocale('Pagination', enUS);

  const locale = { ...contextLocale, ...customLocale };

  // ========================== Size Changer ==========================
  // Merge the props showSizeChanger
  const [propShowSizeChanger, propSizeChangerSelectProps] = useShowSizeChanger(showSizeChanger);
  const [contextShowSizeChanger, contextSizeChangerSelectProps] = useShowSizeChanger(
    contextShowSizeChangerConfig,
  );

  const mergedShowSizeChanger = propShowSizeChanger ?? contextShowSizeChanger;
  const mergedShowSizeChangerSelectProps =
    propSizeChangerSelectProps ?? contextSizeChangerSelectProps;

  const SizeChanger: typeof Select = selectComponentClass || Select;

  // Generate options
  const mergedPageSizeOptions = React.useMemo(() => {
    return pageSizeOptions ? pageSizeOptions.map((option) => Number(option)) : undefined;
  }, [pageSizeOptions]);

  // Render size changer
  const sizeChangerRender: RcPaginationProps['sizeChangerRender'] = (info) => {
    const {
      disabled,
      size: pageSize,
      onSizeChange,
      'aria-label': ariaLabel,
      className: sizeChangerClassName,
      options,
    } = info;

    const { className: propSizeChangerClassName, onChange: propSizeChangerOnChange } =
      mergedShowSizeChangerSelectProps || {};

    // Origin Select is using Select.Option,
    // So it make the option value must be string
    // Just for compatible
    const selectedValue = options.find(
      (option) => String(option.value) === String(pageSize),
    )?.value;

    return (
      <SizeChanger
        disabled={disabled}
        showSearch
        popupMatchSelectWidth={false}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        aria-label={ariaLabel}
        options={options}
        {...mergedShowSizeChangerSelectProps}
        value={selectedValue}
        onChange={(nextSize, option) => {
          onSizeChange?.(nextSize);
          propSizeChangerOnChange?.(nextSize, option);
        }}
        size={isSmall ? 'small' : 'middle'}
        className={classNames(sizeChangerClassName, propSizeChangerClassName)}
      />
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Pagination');

    warning(
      !selectComponentClass,
      'usage',
      '`selectComponentClass` is not official api which will be removed.',
    );
  }

  // ============================= Render =============================
  const iconsProps = React.useMemo<Record<PropertyKey, React.ReactNode>>(() => {
    const ellipsis = <span className={`${prefixCls}-item-ellipsis`}>•••</span>;
    const prevIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        {direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
      </button>
    );
    const nextIcon = (
      <button className={`${prefixCls}-item-link`} type="button" tabIndex={-1}>
        {direction === 'rtl' ? <LeftOutlined /> : <RightOutlined />}
      </button>
    );
    const jumpPrevIcon = (
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          {direction === 'rtl' ? (
            <DoubleRightOutlined className={`${prefixCls}-item-link-icon`} />
          ) : (
            <DoubleLeftOutlined className={`${prefixCls}-item-link-icon`} />
          )}
          {ellipsis}
        </div>
      </a>
    );
    const jumpNextIcon = (
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
      <a className={`${prefixCls}-item-link`}>
        <div className={`${prefixCls}-item-container`}>
          {direction === 'rtl' ? (
            <DoubleLeftOutlined className={`${prefixCls}-item-link-icon`} />
          ) : (
            <DoubleRightOutlined className={`${prefixCls}-item-link-icon`} />
          )}
          {ellipsis}
        </div>
      </a>
    );
    return { prevIcon, nextIcon, jumpPrevIcon, jumpNextIcon };
  }, [direction, prefixCls]);

  const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);

  const extendedClassName = classNames(
    {
      [`${prefixCls}-${align}`]: !!align,
      [`${prefixCls}-mini`]: isSmall,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-bordered`]: token.wireframe,
    },
    contextClassName,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  return wrapCSSVar(
    <>
      {token.wireframe && <BorderedStyle prefixCls={prefixCls} />}
      <RcPagination
        {...iconsProps}
        {...restProps}
        style={mergedStyle}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        className={extendedClassName}
        locale={locale}
        pageSizeOptions={mergedPageSizeOptions}
        showSizeChanger={mergedShowSizeChanger}
        sizeChangerRender={sizeChangerRender}
      />
    </>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
