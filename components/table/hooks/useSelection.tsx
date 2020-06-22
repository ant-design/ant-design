import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { convertDataToEntities } from 'rc-tree/lib/utils/treeUtil';
import { conductCheck } from 'rc-tree/lib/utils/conductUtil';
import { parseCheckedKeys, arrAdd, arrDel } from 'rc-tree/lib/util';
import { DataNode, GetCheckDisabled } from 'rc-tree/lib/interface';
import { INTERNAL_COL_DEFINE } from 'rc-table';
import { FixedType } from 'rc-table/lib/interface';
import Checkbox, { CheckboxProps } from '../../checkbox';
import Dropdown from '../../dropdown';
import Menu from '../../menu';
import Radio from '../../radio';
import devWarning from '../../_util/devWarning';
import {
  TableRowSelection,
  Key,
  ColumnsType,
  GetRowKey,
  TableLocale,
  SelectionItem,
  TransformColumns,
  ExpandType,
  GetPopupContainer,
} from '../interface';

const EMPTY_LIST: any[] = [];

// TODO: warning if use ajax!!!
export const SELECTION_ALL = 'SELECT_ALL' as const;
export const SELECTION_INVERT = 'SELECT_INVERT' as const;

function getFixedType<RecordType>(column: ColumnsType<RecordType>[number]): FixedType | undefined {
  return column && column.fixed;
}

interface UseSelectionConfig<RecordType> {
  prefixCls: string;
  pageData: RecordType[];
  data: RecordType[];
  getRowKey: GetRowKey<RecordType>;
  getRecordByKey: (key: Key) => RecordType;
  expandType: ExpandType;
  childrenColumnName: string;
  expandIconColumnIndex?: number;
  locale: TableLocale;
  getPopupContainer?: GetPopupContainer;
}

export type INTERNAL_SELECTION_ITEM =
  | SelectionItem
  | typeof SELECTION_ALL
  | typeof SELECTION_INVERT;

function flattenData<RecordType>(
  data: RecordType[] | undefined,
  childrenColumnName: string,
): RecordType[] {
  let list: RecordType[] = [];
  (data || []).forEach(record => {
    list.push(record);

    if (childrenColumnName in record) {
      list = [
        ...list,
        ...flattenData<RecordType>((record as any)[childrenColumnName], childrenColumnName),
      ];
    }
  });

  return list;
}

export default function useSelection<RecordType>(
  rowSelection: TableRowSelection<RecordType> | undefined,
  config: UseSelectionConfig<RecordType>,
): [TransformColumns<RecordType>, Set<Key>] {
  const {
    preserveSelectedRowKeys,
    selectedRowKeys,
    getCheckboxProps,
    onChange: onSelectionChange,
    onSelect,
    onSelectAll,
    onSelectInvert,
    onSelectMultiple,
    columnWidth: selectionColWidth,
    type: selectionType,
    selections,
    fixed,
    renderCell: customizeRenderCell,
    hideSelectAll,
    checkStrictly = true,
  } = rowSelection || {};

  const {
    prefixCls,
    data,
    pageData,
    getRecordByKey,
    getRowKey,
    expandType,
    childrenColumnName,
    locale: tableLocale,
    expandIconColumnIndex,
    getPopupContainer,
  } = config;

  // ======================== Caches ========================
  const preserveRecordsRef = React.useRef(new Map<Key, RecordType>());

  // ========================= Keys =========================
  const [innerSelectedKeys, setInnerSelectedKeys] = useState<{
    checked: Key[];
    halfChecked: Key[];
  }>();
  let {
    checkedKeys: mergedSelectedKeys,
    halfCheckedKeys: mergedHalfSelectedKeys,
  } = parseCheckedKeys(selectedRowKeys || innerSelectedKeys || EMPTY_LIST);
  mergedSelectedKeys = mergedSelectedKeys || [];
  mergedHalfSelectedKeys = mergedHalfSelectedKeys || [];
  const mergedSelectedKeySet: Set<Key> = useMemo(() => {
    const keys = selectionType === 'radio' ? mergedSelectedKeys.slice(0, 1) : mergedSelectedKeys;
    return new Set(keys);
  }, [mergedSelectedKeys, selectionType]);
  const mergedHalfSelectedKeySet: Set<Key> = useMemo(() => {
    const keys = selectionType === 'radio' ? [] : mergedHalfSelectedKeys;
    return new Set(keys);
  }, [mergedHalfSelectedKeys, selectionType]);

  const { keyEntities } = useMemo(
    () => convertDataToEntities((data as unknown) as DataNode[], undefined, getRowKey as any),
    [data, getRowKey],
  );

  // Save last selected key to enable range selection
  const [lastSelectedKey, setLastSelectedKey] = useState<Key | null>(null);

  // Reset if rowSelection reset
  React.useEffect(() => {
    if (!rowSelection) {
      setInnerSelectedKeys({
        checked: [],
        halfChecked: [],
      });
    }
  }, [!!rowSelection]);

  const setSelectedKeys = useCallback(
    (keys: Key[], halfCheckedKeys: Key[]) => {
      let availableKeys: Key[];
      let records: RecordType[];

      if (preserveSelectedRowKeys) {
        // Keep key if mark as preserveSelectedRowKeys
        const newCache = new Map<Key, RecordType>();
        availableKeys = keys;
        records = keys.map(key => {
          let record = getRecordByKey(key);

          if (!record && preserveRecordsRef.current.has(key)) {
            record = preserveRecordsRef.current.get(key)!;
          }

          newCache.set(key, record);

          return record;
        });

        // Refresh to new cache
        preserveRecordsRef.current = newCache;
      } else {
        // Filter key which not exist in the `dataSource`
        availableKeys = [];
        records = [];

        keys.forEach(key => {
          const record = getRecordByKey(key);
          if (record !== undefined) {
            availableKeys.push(key);
            records.push(record);
          }
        });
      }

      setInnerSelectedKeys({
        checked: availableKeys,
        halfChecked: halfCheckedKeys,
      });

      if (onSelectionChange) {
        onSelectionChange(availableKeys, records);
      }
    },
    [setInnerSelectedKeys, getRecordByKey, onSelectionChange, preserveSelectedRowKeys],
  );

  // ====================== Selections ======================
  // Trigger single `onSelect` event
  const triggerSingleSelection = useCallback(
    (key: Key, selected: boolean, keys: Key[], halfCheckedKeys: Key[], event: Event) => {
      if (onSelect) {
        const rows = keys.map(k => getRecordByKey(k));
        onSelect(getRecordByKey(key), selected, rows, event);
      }

      setSelectedKeys(keys, halfCheckedKeys);
    },
    [onSelect, getRecordByKey, setSelectedKeys],
  );

  // ======================= Columns ========================
  const transformColumns = useCallback(
    (columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      if (!rowSelection) {
        return columns;
      }

      // Get flatten data
      const flattedData = flattenData(pageData, childrenColumnName);

      // Support selection
      const keySet = new Set(mergedSelectedKeySet);

      // Get all checkbox props
      const checkboxPropsMap = new Map<Key, Partial<CheckboxProps>>();
      flattedData.forEach((record, index) => {
        const key = getRowKey(record, index);
        const checkboxProps = (getCheckboxProps ? getCheckboxProps(record) : null) || {};
        checkboxPropsMap.set(key, checkboxProps);

        if (
          process.env.NODE_ENV !== 'production' &&
          ('checked' in checkboxProps || 'defaultChecked' in checkboxProps)
        ) {
          devWarning(
            false,
            'Table',
            'Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.',
          );
        }
      });

      // Record key only need check with enabled
      const recordKeys = flattedData
        .map(getRowKey)
        .filter(key => !checkboxPropsMap.get(key)!.disabled);
      const checkedCurrentAll = recordKeys.every(key => keySet.has(key));
      const checkedCurrentSome = recordKeys.some(key => keySet.has(key));

      const onSelectAllChange = (treatAsNotAllChecked = false) => {
        const changeKeys: Key[] = [];

        if (checkedCurrentAll && !treatAsNotAllChecked) {
          recordKeys.forEach(key => {
            keySet.delete(key);
            changeKeys.push(key);
          });
        } else {
          recordKeys.forEach(key => {
            if (!keySet.has(key)) {
              keySet.add(key);
              changeKeys.push(key);
            }
          });
        }

        const keys = Array.from(keySet);
        setSelectedKeys(keys, []);

        if (onSelectAll) {
          onSelectAll(
            treatAsNotAllChecked || !checkedCurrentAll,
            keys.map(k => getRecordByKey(k)),
            changeKeys.map(k => getRecordByKey(k)),
          );
        }
      };

      const mergedSelections: SelectionItem[] | null = (() => {
        if (!selections || hideSelectAll) {
          return null;
        }

        const selectionList: INTERNAL_SELECTION_ITEM[] =
          selections === true ? [SELECTION_ALL, SELECTION_INVERT] : selections;

        return selectionList.map((selection: INTERNAL_SELECTION_ITEM) => {
          if (selection === SELECTION_ALL) {
            return {
              key: 'all',
              text: tableLocale.selectionAll,
              onSelect() {
                onSelectAllChange(true);
              },
            };
          }
          if (selection === SELECTION_INVERT) {
            return {
              key: 'invert',
              text: tableLocale.selectInvert,
              onSelect() {
                pageData.forEach(record => {
                  const key = getRowKey(record);

                  if (keySet.has(key)) {
                    keySet.delete(key);
                  } else {
                    keySet.add(key);
                  }
                });

                const keys = Array.from(keySet);
                setSelectedKeys(keys, []);
                if (onSelectInvert) {
                  devWarning(
                    false,
                    'Table',
                    '`onSelectInvert` will be removed in future. Please use `onChange` instead.',
                  );
                  onSelectInvert(keys);
                }
              },
            };
          }
          return selection as SelectionItem;
        });
      })();

      // ===================== Render =====================
      // Title Cell
      let title: React.ReactNode;
      if (selectionType !== 'radio') {
        let customizeSelections: React.ReactNode;
        if (mergedSelections) {
          const menu = (
            <Menu getPopupContainer={getPopupContainer}>
              {mergedSelections.map((selection, index) => {
                const { key, text, onSelect: onSelectionClick } = selection;
                return (
                  <Menu.Item
                    key={key || index}
                    onClick={() => {
                      if (onSelectionClick) {
                        onSelectionClick(recordKeys);
                      }
                    }}
                  >
                    {text}
                  </Menu.Item>
                );
              })}
            </Menu>
          );
          customizeSelections = (
            <div className={`${prefixCls}-selection-extra`}>
              <Dropdown overlay={menu} getPopupContainer={getPopupContainer}>
                <span>
                  <DownOutlined />
                </span>
              </Dropdown>
            </div>
          );
        }

        const allDisabled = flattedData.every(record => {
          const key = getRowKey(record);
          const checkboxProps = checkboxPropsMap.get(key) || {};
          return checkboxProps.disabled;
        });

        title = !hideSelectAll && (
          <div className={`${prefixCls}-selection`}>
            <Checkbox
              checked={!allDisabled && !!flattedData.length && checkedCurrentAll}
              indeterminate={!checkedCurrentAll && checkedCurrentSome}
              onChange={() => onSelectAllChange() as any}
              disabled={flattedData.length === 0 || allDisabled}
            />
            {customizeSelections}
          </div>
        );
      }

      // Body Cell
      let renderCell: (
        _: RecordType,
        record: RecordType,
      ) => { node: React.ReactNode; checked: boolean };
      if (selectionType === 'radio') {
        renderCell = (_, record) => {
          const key = getRowKey(record);
          const checked = keySet.has(key);

          return {
            node: (
              <Radio
                {...checkboxPropsMap.get(key)}
                checked={checked}
                onClick={e => e.stopPropagation()}
                onChange={event => {
                  if (!keySet.has(key)) {
                    triggerSingleSelection(key, true, [key], [], event.nativeEvent);
                  }
                }}
              />
            ),
            checked,
          };
        };
      } else {
        renderCell = (_, record) => {
          const key = getRowKey(record);
          const checked = keySet.has(key);
          const indeterminate = mergedHalfSelectedKeySet.has(key);

          // Record checked
          return {
            node: (
              <Checkbox
                {...checkboxPropsMap.get(key)}
                checked={checked}
                indeterminate={indeterminate}
                onClick={e => e.stopPropagation()}
                onChange={({ nativeEvent }) => {
                  const { shiftKey } = nativeEvent;

                  let startIndex: number = -1;
                  let endIndex: number = -1;

                  // Get range of this
                  if (shiftKey && checkStrictly) {
                    const pointKeys = new Set([lastSelectedKey, key]);

                    recordKeys.some((recordKey, recordIndex) => {
                      if (pointKeys.has(recordKey)) {
                        if (startIndex === -1) {
                          startIndex = recordIndex;
                        } else {
                          endIndex = recordIndex;
                          return true;
                        }
                      }

                      return false;
                    });
                  }

                  if (endIndex !== -1 && startIndex !== endIndex && checkStrictly) {
                    // Batch update selections
                    const rangeKeys = recordKeys.slice(startIndex, endIndex + 1);
                    const changedKeys: Key[] = [];

                    if (checked) {
                      rangeKeys.forEach(recordKey => {
                        if (keySet.has(recordKey)) {
                          changedKeys.push(recordKey);
                          keySet.delete(recordKey);
                        }
                      });
                    } else {
                      rangeKeys.forEach(recordKey => {
                        if (!keySet.has(recordKey)) {
                          changedKeys.push(recordKey);
                          keySet.add(recordKey);
                        }
                      });
                    }

                    const keys = Array.from(keySet);
                    setSelectedKeys(keys, mergedHalfSelectedKeys);
                    if (onSelectMultiple) {
                      onSelectMultiple(
                        !checked,
                        keys.map(recordKey => getRecordByKey(recordKey)),
                        changedKeys.map(recordKey => getRecordByKey(recordKey)),
                      );
                    }
                  } else {
                    // Single record selected
                    const oriCheckedKeys = mergedSelectedKeys;
                    const oriHalfCheckedKeys = mergedHalfSelectedKeys;
                    if (checkStrictly) {
                      const checkedKeys = checked
                        ? arrDel(oriCheckedKeys, key)
                        : arrAdd(oriCheckedKeys, key);
                      const halfCheckedKeys = arrDel(oriHalfCheckedKeys, key);
                      triggerSingleSelection(
                        key,
                        !checked,
                        checkedKeys,
                        halfCheckedKeys,
                        nativeEvent,
                      );
                    } else {
                      const isCheckboxDisabled: GetCheckDisabled<RecordType> = (r: RecordType) =>
                        !!checkboxPropsMap.get(getRowKey(r))?.disabled;
                      // Always fill first
                      const result = conductCheck(
                        [...oriCheckedKeys, key],
                        true,
                        keyEntities,
                        isCheckboxDisabled as any,
                      );
                      let { checkedKeys, halfCheckedKeys } = result;

                      // If remove, we do it again to correction
                      if (checked) {
                        const tempKeySet = new Set(checkedKeys);
                        tempKeySet.delete(key);
                        ({ checkedKeys, halfCheckedKeys } = conductCheck(
                          Array.from(tempKeySet),
                          { checked: false, halfCheckedKeys },
                          keyEntities,
                          isCheckboxDisabled as any,
                        ));
                      }

                      triggerSingleSelection(
                        key,
                        !checked,
                        checkedKeys,
                        halfCheckedKeys,
                        nativeEvent,
                      );
                    }
                  }

                  setLastSelectedKey(key);
                }}
              />
            ),
            checked,
          };
        };
      }

      const renderSelectionCell = (_: any, record: RecordType, index: number) => {
        const { node, checked } = renderCell(_, record);

        if (customizeRenderCell) {
          return customizeRenderCell(checked, record, index, node);
        }

        return node;
      };

      // Columns
      const selectionColumn = {
        width: selectionColWidth,
        className: `${prefixCls}-selection-column`,
        title: rowSelection.columnTitle || title,
        render: renderSelectionCell,
        [INTERNAL_COL_DEFINE]: {
          className: `${prefixCls}-selection-col`,
        },
      };

      if (expandType === 'row' && columns.length && !expandIconColumnIndex) {
        const [expandColumn, ...restColumns] = columns;
        const selectionFixed = fixed || getFixedType(restColumns[0]);
        if (selectionFixed) {
          expandColumn.fixed = selectionFixed;
        }
        return [expandColumn, { ...selectionColumn, fixed: selectionFixed }, ...restColumns];
      }
      return [{ ...selectionColumn, fixed: fixed || getFixedType(columns[0]) }, ...columns];
    },
    [
      getRowKey,
      pageData,
      rowSelection,
      innerSelectedKeys,
      mergedSelectedKeys,
      selectionColWidth,
      expandType,
      lastSelectedKey,
      onSelectMultiple,
      triggerSingleSelection,
      selections,
      mergedSelectedKeySet,
    ],
  );

  return [transformColumns, mergedSelectedKeySet];
}
