import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { convertDataToEntities } from 'rc-tree/lib/utils/treeUtil';
import { conductCheck } from 'rc-tree/lib/utils/conductUtil';
import { arrAdd, arrDel } from 'rc-tree/lib/util';
import { DataNode, GetCheckDisabled } from 'rc-tree/lib/interface';
import { INTERNAL_COL_DEFINE } from 'rc-table';
import { FixedType } from 'rc-table/lib/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
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

    if (record && typeof record === 'object' && childrenColumnName in record) {
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
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(selectedRowKeys || [], {
    value: selectedRowKeys,
  });

  const { keyEntities } = useMemo(
    () =>
      checkStrictly
        ? { keyEntities: null }
        : convertDataToEntities((data as unknown) as DataNode[], undefined, getRowKey as any),
    [data, getRowKey, checkStrictly],
  );

  // Get flatten data
  const flattedData = useMemo(() => flattenData(pageData, childrenColumnName), [
    pageData,
    childrenColumnName,
  ]);

  // Get all checkbox props
  const checkboxPropsMap = useMemo(() => {
    const map = new Map<Key, Partial<CheckboxProps>>();
    flattedData.forEach((record, index) => {
      const key = getRowKey(record, index);
      const checkboxProps = (getCheckboxProps ? getCheckboxProps(record) : null) || {};
      map.set(key, checkboxProps);

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
    return map;
  }, [flattedData, getRowKey, getCheckboxProps]);

  const isCheckboxDisabled: GetCheckDisabled<RecordType> = useCallback(
    (r: RecordType) => {
      return !!checkboxPropsMap.get(getRowKey(r))?.disabled;
    },
    [checkboxPropsMap, getRowKey],
  );

  const [derivedSelectedKeys, derivedHalfSelectedKeys] = useMemo(() => {
    if (checkStrictly) {
      return [mergedSelectedKeys, []];
    }
    const { checkedKeys, halfCheckedKeys } = conductCheck(
      mergedSelectedKeys,
      true,
      keyEntities as any,
      isCheckboxDisabled as any,
    );
    return [checkedKeys, halfCheckedKeys];
  }, [mergedSelectedKeys, checkStrictly, keyEntities, isCheckboxDisabled]);

  const derivedSelectedKeySet: Set<Key> = useMemo(() => {
    const keys = selectionType === 'radio' ? derivedSelectedKeys.slice(0, 1) : derivedSelectedKeys;
    return new Set(keys);
  }, [derivedSelectedKeys, selectionType]);
  const derivedHalfSelectedKeySet = useMemo(() => {
    return selectionType === 'radio' ? new Set() : new Set(derivedHalfSelectedKeys);
  }, [derivedHalfSelectedKeys, selectionType]);

  // Save last selected key to enable range selection
  const [lastSelectedKey, setLastSelectedKey] = useState<Key | null>(null);

  // Reset if rowSelection reset
  React.useEffect(() => {
    if (!rowSelection) {
      setMergedSelectedKeys([]);
    }
  }, [!!rowSelection]);

  const setSelectedKeys = useCallback(
    (keys: Key[]) => {
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

      setMergedSelectedKeys(availableKeys);

      if (onSelectionChange) {
        onSelectionChange(availableKeys, records);
      }
    },
    [setMergedSelectedKeys, getRecordByKey, onSelectionChange, preserveSelectedRowKeys],
  );

  // ====================== Selections ======================
  // Trigger single `onSelect` event
  const triggerSingleSelection = useCallback(
    (key: Key, selected: boolean, keys: Key[], event: Event) => {
      if (onSelect) {
        const rows = keys.map(k => getRecordByKey(k));
        onSelect(getRecordByKey(key), selected, rows, event);
      }

      setSelectedKeys(keys);
    },
    [onSelect, getRecordByKey, setSelectedKeys],
  );

  const mergedSelections = useMemo<SelectionItem[] | null>(() => {
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
            setSelectedKeys(data.map((record, index) => getRowKey(record, index)));
          },
        };
      }
      if (selection === SELECTION_INVERT) {
        return {
          key: 'invert',
          text: tableLocale.selectInvert,
          onSelect() {
            const keySet = new Set(derivedSelectedKeySet);
            pageData.forEach((record, index) => {
              const key = getRowKey(record, index);

              if (keySet.has(key)) {
                keySet.delete(key);
              } else {
                keySet.add(key);
              }
            });

            const keys = Array.from(keySet);
            setSelectedKeys(keys);
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
  }, [selections, derivedSelectedKeySet, pageData, getRowKey, onSelectInvert, setSelectedKeys]);

  // ======================= Columns ========================
  const transformColumns = useCallback(
    (columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      if (!rowSelection) {
        return columns;
      }

      // Support selection
      const keySet = new Set(derivedSelectedKeySet);

      // Record key only need check with enabled
      const recordKeys = flattedData
        .map(getRowKey)
        .filter(key => !checkboxPropsMap.get(key)!.disabled);
      const checkedCurrentAll = recordKeys.every(key => keySet.has(key));
      const checkedCurrentSome = recordKeys.some(key => keySet.has(key));

      const onSelectAllChange = () => {
        const changeKeys: Key[] = [];

        if (checkedCurrentAll) {
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
        setSelectedKeys(keys);

        if (onSelectAll) {
          onSelectAll(
            !checkedCurrentAll,
            keys.map(k => getRecordByKey(k)),
            changeKeys.map(k => getRecordByKey(k)),
          );
        }
      };

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

        const allDisabled = flattedData.every((record, index) => {
          const key = getRowKey(record, index);
          const checkboxProps = checkboxPropsMap.get(key) || {};
          return checkboxProps.disabled;
        });

        title = !hideSelectAll && (
          <div className={`${prefixCls}-selection`}>
            <Checkbox
              checked={!allDisabled && !!flattedData.length && checkedCurrentAll}
              indeterminate={!checkedCurrentAll && checkedCurrentSome}
              onChange={onSelectAllChange}
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
        index: number,
      ) => { node: React.ReactNode; checked: boolean };
      if (selectionType === 'radio') {
        renderCell = (_, record, index) => {
          const key = getRowKey(record, index);
          const checked = keySet.has(key);

          return {
            node: (
              <Radio
                {...checkboxPropsMap.get(key)}
                checked={checked}
                onClick={e => e.stopPropagation()}
                onChange={event => {
                  if (!keySet.has(key)) {
                    triggerSingleSelection(key, true, [key], event.nativeEvent);
                  }
                }}
              />
            ),
            checked,
          };
        };
      } else {
        renderCell = (_, record, index) => {
          const key = getRowKey(record, index);
          const checked = keySet.has(key);
          const indeterminate = derivedHalfSelectedKeySet.has(key);
          const checkboxProps = checkboxPropsMap.get(key);
          let mergedIndeterminate: boolean;
          if (expandType === 'nest') {
            mergedIndeterminate = indeterminate;
            devWarning(
              !(typeof checkboxProps?.indeterminate === 'boolean'),
              'Table',
              'set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.',
            );
          } else {
            mergedIndeterminate = checkboxProps?.indeterminate ?? indeterminate;
          }
          // Record checked
          return {
            node: (
              <Checkbox
                {...checkboxProps}
                indeterminate={mergedIndeterminate}
                checked={checked}
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
                    setSelectedKeys(keys);
                    if (onSelectMultiple) {
                      onSelectMultiple(
                        !checked,
                        keys.map(recordKey => getRecordByKey(recordKey)),
                        changedKeys.map(recordKey => getRecordByKey(recordKey)),
                      );
                    }
                  } else {
                    // Single record selected
                    const originCheckedKeys = derivedSelectedKeys;
                    if (checkStrictly) {
                      const checkedKeys = checked
                        ? arrDel(originCheckedKeys, key)
                        : arrAdd(originCheckedKeys, key);
                      triggerSingleSelection(key, !checked, checkedKeys, nativeEvent);
                    } else {
                      // Always fill first
                      const result = conductCheck(
                        [...originCheckedKeys, key],
                        true,
                        keyEntities as any,
                        isCheckboxDisabled as any,
                      );
                      const { checkedKeys, halfCheckedKeys } = result;
                      let nextCheckedKeys = checkedKeys;

                      // If remove, we do it again to correction
                      if (checked) {
                        const tempKeySet = new Set(checkedKeys);
                        tempKeySet.delete(key);
                        nextCheckedKeys = conductCheck(
                          Array.from(tempKeySet),
                          { checked: false, halfCheckedKeys },
                          keyEntities as any,
                          isCheckboxDisabled as any,
                        ).checkedKeys;
                      }

                      triggerSingleSelection(key, !checked, nextCheckedKeys, nativeEvent);
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
        const { node, checked } = renderCell(_, record, index);

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
      flattedData,
      rowSelection,
      derivedSelectedKeys,
      derivedSelectedKeySet,
      derivedHalfSelectedKeySet,
      selectionColWidth,
      mergedSelections,
      expandType,
      lastSelectedKey,
      checkboxPropsMap,
      onSelectMultiple,
      triggerSingleSelection,
      isCheckboxDisabled,
    ],
  );

  return [transformColumns, derivedSelectedKeySet];
}
