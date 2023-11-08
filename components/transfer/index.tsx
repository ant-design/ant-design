import type { ChangeEvent, CSSProperties } from 'react';
import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';

import type { PrevSelectedIndex } from '../_util/hooks/useMultipleSelect';
import useMultipleSelect from '../_util/hooks/useMultipleSelect';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { groupDisabledKeysMap, groupKeysMap } from '../_util/transKeys';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import type { FormItemStatusContextProps } from '../form/context';
import { FormItemInputContext } from '../form/context';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import useData from './hooks/useData';
import useSelection from './hooks/useSelection';
import type { PaginationType } from './interface';
import type { TransferCustomListBodyProps, TransferListProps } from './list';
import List from './list';
import Operation from './operation';
import Search from './search';
import useStyle from './style';

export type { TransferListProps } from './list';
export type { TransferOperationProps } from './operation';
export type { TransferSearchProps } from './search';

export type TransferDirection = 'left' | 'right';

export interface RenderResultObject {
  label: React.ReactElement;
  value: string;
}

export type RenderResult = React.ReactElement | RenderResultObject | string | null;

export interface TransferItem {
  key?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  [name: string]: any;
}

export type KeyWise<T> = T & { key: string };

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
  selectCurrent?: string;
  selectInvert?: string;
  removeAll?: string;
  removeCurrent?: string;
}

export interface TransferProps<RecordType> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  disabled?: boolean;
  dataSource?: RecordType[];
  targetKeys?: string[];
  selectedKeys?: string[];
  render?: TransferRender<RecordType>;
  onChange?: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  style?: React.CSSProperties;
  listStyle?: ((style: ListStyle) => CSSProperties) | CSSProperties;
  operationStyle?: CSSProperties;
  titles?: React.ReactNode[];
  operations?: string[];
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: RecordType, direction: TransferDirection) => boolean;
  locale?: Partial<TransferLocale>;
  footer?: (
    props: TransferListProps<RecordType>,
    info?: { direction: TransferDirection },
  ) => React.ReactNode;
  rowKey?: (record: RecordType) => string;
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
    dataSource,
    targetKeys = [],
    selectedKeys,
    selectAllLabels = [],
    operations = [],
    style = {},
    listStyle = {},
    locale = {},
    titles,
    disabled,
    showSearch = false,
    operationStyle,
    showSelectAll,
    oneWay,
    pagination,
    status: customStatus,
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
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
    transfer,
  } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('transfer', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

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
  ] = useSelection(leftDataSource, rightDataSource, selectedKeys);

  const [leftMultipleSelect, updateLeftPrevSelectedIndex] = useMultipleSelect<
    KeyWise<RecordType>,
    string
  >((item) => item.key);
  const [rightMultipleSelect, updateRightPrevSelectedIndex] = useMultipleSelect<
    KeyWise<RecordType>,
    string
  >((item) => item.key);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Transfer');

    warning(!pagination || !children, 'usage', '`pagination` not support customize render list.');
  }

  const setStateKeys = useCallback(
    (direction: TransferDirection, keys: string[] | ((prevKeys: string[]) => string[])) => {
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
    (direction: TransferDirection, holder: string[]) => {
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
      let mergedCheckedKeys: string[] = [];
      if (checkAll === 'replace') {
        mergedCheckedKeys = keys;
      } else if (checkAll) {
        // Merge current keys with origin key
        mergedCheckedKeys = Array.from(new Set<string>([...prevKeys, ...keys]));
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
    holder: Set<string>,
    selectedKey: string,
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
    holder: Set<string>,
    currentSelectedIndex: number,
  ) => {
    const isLeftDirection = direction === 'left';
    const multipleSelect = isLeftDirection ? leftMultipleSelect : rightMultipleSelect;
    multipleSelect(currentSelectedIndex, data, holder);
  };

  const onItemSelect = (
    direction: TransferDirection,
    selectedKey: string,
    checked: boolean,
    multiple?: boolean,
  ) => {
    const isLeftDirection = direction === 'left';
    const holder = [...(isLeftDirection ? sourceSelectedKeys : targetSelectedKeys)];
    const holderSet = new Set(holder);
    const data = [...(isLeftDirection ? leftDataSource : rightDataSource)].filter(
      (item) => !item.disabled,
    );
    const currentSelectedIndex = data.findIndex((item) => item.key === selectedKey);
    // multiple select by hold down the shift key
    if (multiple && holder.length > 0) {
      handleMultipleSelect(direction, data, holderSet, currentSelectedIndex);
    } else {
      handleSingleSelect(direction, holderSet, selectedKey, checked, currentSelectedIndex);
    }
    const holderArr = Array.from(holderSet);
    handleSelectChange(direction, holderArr);
    if (!props.selectedKeys) {
      setStateKeys(direction, holderArr);
    }
  };

  const onLeftItemSelect = (
    selectedKey: string,
    checked: boolean,
    e?: React.MouseEvent<Element, MouseEvent>,
  ) => {
    onItemSelect('left', selectedKey, checked, e?.shiftKey);
  };

  const onRightItemSelect = (
    selectedKey: string,
    checked: boolean,
    e?: React.MouseEvent<Element, MouseEvent>,
  ) => {
    onItemSelect('right', selectedKey, checked, e?.shiftKey);
  };

  const onRightItemRemove = (keys: string[]) => {
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

  const leftActive = targetSelectedKeys.length > 0;
  const rightActive = sourceSelectedKeys.length > 0;

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-customize-list`]: !!children,
      [`${prefixCls}-rtl`]: dir === 'rtl',
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
    transfer?.className,
    className,
    rootClassName,
    hashId,
  );

  const [contextLocale] = useLocale('Transfer', defaultLocale.Transfer);

  const listLocale = getLocale(contextLocale!);

  const [leftTitle, rightTitle] = getTitles(listLocale);

  return wrapSSR(
    <div className={cls} style={{ ...transfer?.style, ...style }}>
      <List<KeyWise<RecordType>>
        prefixCls={`${prefixCls}-list`}
        titleText={leftTitle}
        dataSource={leftDataSource}
        filterOption={filterOption}
        style={handleListStyle('left')}
        checkedKeys={sourceSelectedKeys}
        handleFilter={leftFilter}
        handleClear={handleLeftClear}
        onItemSelect={onLeftItemSelect}
        onItemSelectAll={onLeftItemSelectAll}
        render={render}
        showSearch={showSearch}
        renderList={children}
        footer={footer}
        onScroll={handleLeftScroll}
        disabled={disabled}
        direction={dir === 'rtl' ? 'right' : 'left'}
        showSelectAll={showSelectAll}
        selectAllLabel={selectAllLabels[0]}
        pagination={mergedPagination}
        selectionsIcon={selectionsIcon}
        {...listLocale}
      />
      <Operation
        className={`${prefixCls}-operation`}
        rightActive={rightActive}
        rightArrowText={operations[0]}
        moveToRight={moveToRight}
        leftActive={leftActive}
        leftArrowText={operations[1]}
        moveToLeft={moveToLeft}
        style={operationStyle}
        disabled={disabled}
        direction={dir}
        oneWay={oneWay}
      />
      <List<KeyWise<RecordType>>
        prefixCls={`${prefixCls}-list`}
        titleText={rightTitle}
        dataSource={rightDataSource}
        filterOption={filterOption}
        style={handleListStyle('right')}
        checkedKeys={targetSelectedKeys}
        handleFilter={rightFilter}
        handleClear={handleRightClear}
        onItemSelect={onRightItemSelect}
        onItemSelectAll={onRightItemSelectAll}
        onItemRemove={onRightItemRemove}
        render={render}
        showSearch={showSearch}
        renderList={children}
        footer={footer}
        onScroll={handleRightScroll}
        disabled={disabled}
        direction={dir === 'rtl' ? 'left' : 'right'}
        showSelectAll={showSelectAll}
        selectAllLabel={selectAllLabels[1]}
        showRemove={oneWay}
        pagination={mergedPagination}
        selectionsIcon={selectionsIcon}
        {...listLocale}
      />
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Transfer.displayName = 'Transfer';
}

Transfer.List = List;
Transfer.Search = Search;
Transfer.Operation = Operation;

export default Transfer;
