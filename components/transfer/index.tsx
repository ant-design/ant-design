import type { ChangeEvent, CSSProperties } from 'react';
import React, { useCallback, useContext } from 'react';
import { clsx } from 'clsx';

import { useMergeSemantic, useMultipleSelect } from '../_util/hooks';
import type { PrevSelectedIndex, SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { groupDisabledKeysMap, groupKeysMap } from '../_util/transKeys';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import type { FormItemStatusContextProps } from '../form/context';
import { FormItemInputContext } from '../form/context';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import Actions from './Actions';
import useData from './hooks/useData';
import useSelection from './hooks/useSelection';
import type { PaginationType, TransferKey } from './interface';
import Search from './search';
import type { TransferCustomListBodyProps, TransferListProps } from './Section';
import Section from './Section';
import useStyle from './style';

export type { TransferOperationProps } from './Actions';
export type { TransferSearchProps } from './search';
export type { TransferListProps } from './Section';

export type SemanticName =
  | 'root'
  | 'section'
  | 'header'
  | 'title'
  | 'body'
  | 'list'
  | 'item'
  | 'itemIcon'
  | 'itemContent'
  | 'footer'
  | 'actions';

export type TransferClassNamesType = SemanticClassNamesType<TransferProps, SemanticName>;
export type TransferStylesType = SemanticStylesType<TransferProps, SemanticName>;

export type TransferDirection = 'left' | 'right';

export interface RenderResultObject {
  label: React.ReactElement;
  value: string;
}

export type RenderResult = React.ReactElement | RenderResultObject | string | null;

export interface TransferItem {
  key?: TransferKey;
  title?: string;
  description?: string;
  disabled?: boolean;
  [name: string]: any;
}

export type KeyWise<T> = T & { key: TransferKey };

export type KeyWiseTransferItem = KeyWise<TransferItem>;

type TransferRender<RecordType> = (item: RecordType) => RenderResult;

export interface ListStyle {
  direction: TransferDirection;
}

export type SelectAllLabel =
  | React.ReactNode
  | ((info: { selectedCount: number; totalCount: number }) => React.ReactNode);

export interface TransferLocale {
  titles?: React.ReactNode[];
  notFoundContent?: React.ReactNode | React.ReactNode[];
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
  remove?: string;
  selectAll?: string;
  deselectAll?: string;
  selectCurrent?: string;
  selectInvert?: string;
  removeAll?: string;
  removeCurrent?: string;
}

export interface TransferSearchOption {
  placeholder?: string;
  defaultValue?: string;
}

export interface TransferProps<RecordType = any> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  /** @deprecated Please use `styles.section` instead. */
  listStyle?: ((style: ListStyle) => CSSProperties) | CSSProperties;
  /** @deprecated Please use `styles.actions` instead. */
  operationStyle?: CSSProperties;
  classNames?: TransferClassNamesType;
  styles?: TransferStylesType;

  disabled?: boolean;
  dataSource?: RecordType[];
  targetKeys?: TransferKey[];
  selectedKeys?: TransferKey[];
  render?: TransferRender<RecordType>;
  onChange?: (
    targetKeys: TransferKey[],
    direction: TransferDirection,
    moveKeys: TransferKey[],
  ) => void;
  onSelectChange?: (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => void;

  titles?: React.ReactNode[];
  /** @deprecated Please use `actions` instead. */
  operations?: string[];
  actions?: React.ReactNode[];
  showSearch?: boolean | TransferSearchOption;
  filterOption?: (inputValue: string, item: RecordType, direction: TransferDirection) => boolean;
  locale?: Partial<TransferLocale>;
  footer?: (
    props: TransferListProps<RecordType>,
    info?: { direction: TransferDirection },
  ) => React.ReactNode;
  rowKey?: (record: RecordType) => TransferKey;
  onSearch?: (direction: TransferDirection, value: string) => void;
  onScroll?: (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => void;
  children?: (props: TransferCustomListBodyProps<RecordType>) => React.ReactNode;
  showSelectAll?: boolean;
  selectAllLabels?: SelectAllLabel[];
  oneWay?: boolean;
  pagination?: PaginationType;
  status?: InputStatus;
  selectionsIcon?: React.ReactNode;
}

const Transfer = <RecordType extends TransferItem = TransferItem>(
  props: TransferProps<RecordType>,
) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    classNames,
    styles,
    style,
    listStyle,
    operationStyle,

    operations,
    actions,

    dataSource,
    targetKeys = [],
    selectedKeys,
    selectAllLabels = [],
    locale = {},
    titles,
    disabled,
    showSearch = false,

    showSelectAll,
    oneWay,
    pagination,
    status: customStatus,
    selectionsIcon,
    filterOption,
    render,
    footer,
    children,
    rowKey,
    onScroll,
    onChange,
    onSearch,
    onSelectChange,
  } = props;

  const {
    getPrefixCls,
    renderEmpty,
    direction: dir,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    selectionsIcon: contextSelectionsIcon,
  } = useComponentConfig('transfer');

  const contextDisabled = useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;

  // =========== Merged Props for Semantic ==========
  const mergedProps: TransferProps<RecordType> = {
    ...props,
    disabled: mergedDisabled,
  };

  const prefixCls = getPrefixCls('transfer', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const mergedActions = actions || operations || [];

  // Fill record with `key`
  const [mergedDataSource, leftDataSource, rightDataSource] = useData(
    dataSource,
    rowKey,
    targetKeys,
  );

  // Get direction selected keys
  const [
    // Keys
    sourceSelectedKeys,
    targetSelectedKeys,
    // Setters
    setSourceSelectedKeys,
    setTargetSelectedKeys,
  ] = useSelection(leftDataSource as any, rightDataSource as any, selectedKeys);

  const [leftMultipleSelect, updateLeftPrevSelectedIndex] = useMultipleSelect<
    KeyWise<RecordType>,
    TransferKey
  >((item) => item.key);

  const [rightMultipleSelect, updateRightPrevSelectedIndex] = useMultipleSelect<
    KeyWise<RecordType>,
    TransferKey
  >((item) => item.key);

  const setStateKeys = useCallback(
    (
      direction: TransferDirection,
      keys: TransferKey[] | ((prevKeys: TransferKey[]) => TransferKey[]),
    ) => {
      if (direction === 'left') {
        const nextKeys = typeof keys === 'function' ? keys(sourceSelectedKeys || []) : keys;
        setSourceSelectedKeys(nextKeys);
      } else {
        const nextKeys = typeof keys === 'function' ? keys(targetSelectedKeys || []) : keys;
        setTargetSelectedKeys(nextKeys);
      }
    },
    [sourceSelectedKeys, targetSelectedKeys],
  );

  const setPrevSelectedIndex = (direction: TransferDirection, value: PrevSelectedIndex) => {
    const isLeftDirection = direction === 'left';
    const updatePrevSelectedIndex = isLeftDirection
      ? updateLeftPrevSelectedIndex
      : updateRightPrevSelectedIndex;
    updatePrevSelectedIndex(value);
  };

  const handleSelectChange = useCallback(
    (direction: TransferDirection, holder: TransferKey[]) => {
      if (direction === 'left') {
        onSelectChange?.(holder, targetSelectedKeys);
      } else {
        onSelectChange?.(sourceSelectedKeys, holder);
      }
    },
    [sourceSelectedKeys, targetSelectedKeys],
  );

  const getTitles = (transferLocale: TransferLocale): React.ReactNode[] =>
    titles ?? transferLocale.titles ?? [];

  const handleLeftScroll = (e: React.SyntheticEvent<HTMLUListElement>) => {
    onScroll?.('left', e);
  };

  const handleRightScroll = (e: React.SyntheticEvent<HTMLUListElement>) => {
    onScroll?.('right', e);
  };

  const moveTo = (direction: TransferDirection) => {
    const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
    const dataSourceDisabledKeysMap = groupDisabledKeysMap(mergedDataSource);
    // filter the disabled options
    const newMoveKeys = moveKeys.filter((key) => !dataSourceDisabledKeysMap.has(key));
    const newMoveKeysMap = groupKeysMap(newMoveKeys);
    // move items to target box
    const newTargetKeys =
      direction === 'right'
        ? newMoveKeys.concat(targetKeys)
        : targetKeys.filter((targetKey) => !newMoveKeysMap.has(targetKey));

    // empty checked keys
    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    setStateKeys(oppositeDirection, []);
    handleSelectChange(oppositeDirection, []);
    onChange?.(newTargetKeys, direction, newMoveKeys);
  };

  const moveToLeft = () => {
    moveTo('left');
    setPrevSelectedIndex('left', null);
  };

  const moveToRight = () => {
    moveTo('right');
    setPrevSelectedIndex('right', null);
  };

  const onItemSelectAll = (
    direction: TransferDirection,
    keys: string[],
    checkAll: boolean | 'replace',
  ) => {
    setStateKeys(direction, (prevKeys) => {
      let mergedCheckedKeys: TransferKey[] = [];
      if (checkAll === 'replace') {
        mergedCheckedKeys = keys;
      } else if (checkAll) {
        // Merge current keys with origin key
        mergedCheckedKeys = Array.from(new Set<TransferKey>([...prevKeys, ...keys]));
      } else {
        const selectedKeysMap = groupKeysMap(keys);
        // Remove current keys from origin keys
        mergedCheckedKeys = prevKeys.filter((key) => !selectedKeysMap.has(key));
      }
      handleSelectChange(direction, mergedCheckedKeys);
      return mergedCheckedKeys;
    });
    setPrevSelectedIndex(direction, null);
  };

  const onLeftItemSelectAll = (keys: string[], checkAll: boolean) => {
    onItemSelectAll('left', keys, checkAll);
  };

  const onRightItemSelectAll = (keys: string[], checkAll: boolean) => {
    onItemSelectAll('right', keys, checkAll);
  };

  const leftFilter = (e: ChangeEvent<HTMLInputElement>) => onSearch?.('left', e.target.value);

  const rightFilter = (e: ChangeEvent<HTMLInputElement>) => onSearch?.('right', e.target.value);

  const handleLeftClear = () => onSearch?.('left', '');

  const handleRightClear = () => onSearch?.('right', '');

  const handleSingleSelect = (
    direction: TransferDirection,
    holder: Set<TransferKey>,
    selectedKey: TransferKey,
    checked: boolean,
    currentSelectedIndex: number,
  ) => {
    const isSelected = holder.has(selectedKey);
    if (isSelected) {
      holder.delete(selectedKey);
      setPrevSelectedIndex(direction, null);
    }
    if (checked) {
      holder.add(selectedKey);
      setPrevSelectedIndex(direction, currentSelectedIndex);
    }
  };

  const handleMultipleSelect = (
    direction: TransferDirection,
    data: KeyWise<RecordType>[],
    holder: Set<TransferKey>,
    currentSelectedIndex: number,
  ) => {
    const isLeftDirection = direction === 'left';
    const multipleSelect = isLeftDirection ? leftMultipleSelect : rightMultipleSelect;
    multipleSelect(currentSelectedIndex, data, holder);
  };

  const onItemSelect = (
    direction: TransferDirection,
    selectedKey: TransferKey,
    checked: boolean,
    multiple?: boolean,
  ) => {
    const isLeftDirection = direction === 'left';
    const holder = [...(isLeftDirection ? sourceSelectedKeys : targetSelectedKeys)];
    const holderSet = new Set(holder);
    const data = [...(isLeftDirection ? leftDataSource : rightDataSource)].filter(
      (item) => !item?.disabled,
    );
    const currentSelectedIndex = data.findIndex((item) => item.key === selectedKey);
    // multiple select by hold down the shift key
    if (multiple && holder.length > 0) {
      handleMultipleSelect(direction, data as any, holderSet, currentSelectedIndex);
    } else {
      handleSingleSelect(direction, holderSet, selectedKey, checked, currentSelectedIndex);
    }
    const holderArr = Array.from(holderSet);
    handleSelectChange(direction, holderArr);
    if (!props.selectedKeys) {
      setStateKeys(direction, holderArr);
    }
  };

  const onLeftItemSelect: TransferListProps<KeyWise<RecordType>>['onItemSelect'] = (
    selectedKey,
    checked,
    e,
  ) => {
    onItemSelect('left', selectedKey, checked, e?.shiftKey);
  };

  const onRightItemSelect = (
    selectedKey: TransferKey,
    checked: boolean,
    e?: React.MouseEvent<Element, MouseEvent>,
  ) => {
    onItemSelect('right', selectedKey, checked, e?.shiftKey);
  };

  const onRightItemRemove = (keys: TransferKey[]) => {
    setStateKeys('right', []);
    onChange?.(
      targetKeys.filter((key) => !keys.includes(key)),
      'left',
      [...keys],
    );
  };

  const handleListStyle = (direction: TransferDirection): CSSProperties => {
    if (typeof listStyle === 'function') {
      return listStyle({ direction });
    }
    return listStyle || {};
  };

  const formItemContext = useContext<FormItemStatusContextProps>(FormItemInputContext);

  const { hasFeedback, status } = formItemContext;

  const getLocale = (transferLocale: TransferLocale) => ({
    ...transferLocale,
    notFoundContent: renderEmpty?.('Transfer') || <DefaultRenderEmpty componentName="Transfer" />,
    ...locale,
  });

  const mergedStatus = getMergedStatus(status, customStatus);
  const mergedPagination = !children && pagination;

  const leftActive =
    rightDataSource.filter((d) => targetSelectedKeys.includes(d.key as TransferKey) && !d.disabled)
      .length > 0;

  const rightActive =
    leftDataSource.filter((d) => sourceSelectedKeys.includes(d.key as TransferKey) && !d.disabled)
      .length > 0;

  // ====================== Styles ======================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TransferClassNamesType,
    TransferStylesType,
    TransferProps<RecordType>
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: mergedDisabled,
      [`${prefixCls}-customize-list`]: !!children,
      [`${prefixCls}-rtl`]: dir === 'rtl',
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
    contextClassName,
    className,
    rootClassName,
    hashId,
    cssVarCls,
    mergedClassNames.root,
  );

  // ====================== Locale ======================
  const [contextLocale] = useLocale('Transfer', defaultLocale.Transfer);

  const listLocale = getLocale(contextLocale!);

  const [leftTitle, rightTitle] = getTitles(listLocale);

  const mergedSelectionsIcon = selectionsIcon ?? contextSelectionsIcon;

  // ===================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Transfer');

    warning(!pagination || !children, 'usage', '`pagination` not support customize render list.');

    [
      ['listStyle', 'styles.section'],
      ['operationStyle', 'styles.actions'],
      ['operations', 'actions'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  // ====================== Render ======================
  return (
    <div className={cls} style={{ ...contextStyle, ...mergedStyles.root, ...style }}>
      <Section<KeyWise<RecordType>>
        prefixCls={prefixCls}
        style={handleListStyle('left')}
        classNames={mergedClassNames}
        styles={mergedStyles}
        titleText={leftTitle}
        dataSource={leftDataSource as any}
        filterOption={filterOption}
        checkedKeys={sourceSelectedKeys}
        handleFilter={leftFilter}
        handleClear={handleLeftClear}
        onItemSelect={onLeftItemSelect}
        onItemSelectAll={onLeftItemSelectAll as any}
        render={render}
        showSearch={showSearch}
        renderList={children as any}
        footer={footer as any}
        onScroll={handleLeftScroll}
        disabled={mergedDisabled}
        direction={dir === 'rtl' ? 'right' : 'left'}
        showSelectAll={showSelectAll}
        selectAllLabel={selectAllLabels[0]}
        pagination={mergedPagination}
        selectionsIcon={mergedSelectionsIcon}
        {...listLocale}
      />
      <Actions
        className={clsx(`${prefixCls}-actions`, mergedClassNames.actions)}
        rightActive={rightActive}
        moveToRight={moveToRight}
        leftActive={leftActive}
        actions={mergedActions}
        moveToLeft={moveToLeft}
        style={{
          ...operationStyle,
          ...mergedStyles.actions,
        }}
        disabled={mergedDisabled}
        direction={dir}
        oneWay={oneWay}
      />
      <Section<KeyWise<RecordType>>
        prefixCls={prefixCls}
        style={handleListStyle('right')}
        classNames={mergedClassNames}
        styles={mergedStyles}
        titleText={rightTitle}
        dataSource={rightDataSource as any}
        filterOption={filterOption}
        checkedKeys={targetSelectedKeys}
        handleFilter={rightFilter}
        handleClear={handleRightClear}
        onItemSelect={onRightItemSelect}
        onItemSelectAll={onRightItemSelectAll as any}
        onItemRemove={onRightItemRemove}
        render={render}
        showSearch={showSearch}
        renderList={children as any}
        footer={footer as any}
        onScroll={handleRightScroll}
        disabled={mergedDisabled}
        direction={dir === 'rtl' ? 'left' : 'right'}
        showSelectAll={showSelectAll}
        selectAllLabel={selectAllLabels[1]}
        showRemove={oneWay}
        pagination={mergedPagination}
        selectionsIcon={mergedSelectionsIcon}
        {...listLocale}
      />
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Transfer.displayName = 'Transfer';
}

Transfer.List = Section;
Transfer.Search = Search;
Transfer.Operation = Actions;

export default Transfer;
