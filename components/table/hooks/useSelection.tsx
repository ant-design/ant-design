import * as React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { FixedType } from 'rc-table/lib/interface';
import Checkbox, { CheckboxProps } from '../../checkbox';
import Dropdown from '../../dropdown';
import Menu from '../../menu';
import Radio from '../../radio';
import warning from '../../_util/warning';
import {
  TableRowSelection,
  Key,
  ColumnsType,
  GetRowKey,
  TableLocale,
  SelectionItem,
  TransformColumns,
  ExpandType,
} from '../interface';
import { ConfigContext } from '../../config-provider';
import defaultLocale from '../../locale/en_US';

const EMPTY_LIST: any[] = [];

// TODO: warning if use ajax!!!
export const SELECTION_ALL = 'SELECT_ALL';
export const SELECTION_INVERT = 'SELECT_INVERT';

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
}

type INTERNAL_SELECTION_ITEM = SelectionItem | typeof SELECTION_ALL | typeof SELECTION_INVERT;

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
    selectedRowKeys,
    getCheckboxProps,
    onChange: onSelectionChange,
    onSelect,
    onSelectAll,
    onSelectInvert,
    onSelectMultiple,
    columnWidth: selectionColWidth = 60,
    type: selectionType,
    selections,
    fixed,
  } = rowSelection || {};

  const { locale = defaultLocale } = React.useContext(ConfigContext);
  const tableLocale = (locale.Table || {}) as TableLocale;
  const {
    prefixCls,
    data,
    pageData,
    getRecordByKey,
    getRowKey,
    expandType,
    childrenColumnName,
  } = config;

  const [innerSelectedKeys, setInnerSelectedKeys] = React.useState<Key[]>();
  const mergedSelectedKeys = selectedRowKeys || innerSelectedKeys || EMPTY_LIST;
  const mergedSelectedKeySet = React.useMemo(() => {
    const keys = selectionType === 'radio' ? mergedSelectedKeys.slice(0, 1) : mergedSelectedKeys;
    return new Set(keys);
  }, [mergedSelectedKeys, selectionType]);

  // Save last selected key to enable range selection
  const [lastSelectedKey, setLastSelectedKey] = React.useState<Key | null>(null);

  // Reset if rowSelection reset
  React.useEffect(() => {
    if (!rowSelection) {
      setInnerSelectedKeys([]);
    }
  }, [!!rowSelection]);

  const setSelectedKeys = React.useCallback(
    (keys: Key[]) => {
      setInnerSelectedKeys(keys);

      const records = keys.map(key => getRecordByKey(key));

      if (onSelectionChange) {
        onSelectionChange(keys, records);
      }
    },
    [setInnerSelectedKeys, getRecordByKey, onSelectionChange],
  );

  // Trigger single `onSelect` event
  const triggerSingleSelection = React.useCallback(
    (key: Key, selected: boolean, keys: Key[], event: Event) => {
      if (onSelect) {
        const rows = keys.map(k => getRecordByKey(k));
        onSelect(getRecordByKey(key), selected, rows, event);
      }

      setSelectedKeys(keys);
    },
    [onSelect, getRecordByKey, setSelectedKeys],
  );

  const mergedSelections = React.useMemo<SelectionItem[] | null>(() => {
    if (!selections) {
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
            const keySet = new Set(mergedSelectedKeySet);
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
              warning(
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
  }, [selections, mergedSelectedKeySet, pageData, getRowKey]);

  const transformColumns = React.useCallback(
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
          warning(
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

      const onSelectAllChange = () => {
        const changeKeys: Key[] = [];

        if (checkedCurrentAll) {
          recordKeys.forEach(key => {
            keySet.delete(key);
            changeKeys.push(key);
          });
        } else {
          recordKeys.forEach(key => {
            keySet.add(key);
            changeKeys.push(key);
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
            <Menu>
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
              <Dropdown overlay={menu}>
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

        title = (
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
      let renderCell: (_: RecordType, record: RecordType, index: number) => React.ReactNode;
      if (selectionType === 'radio') {
        renderCell = (_, record, index) => {
          const key = getRowKey(record, index);

          return (
            <Radio
              {...checkboxPropsMap.get(key)}
              checked={keySet.has(key)}
              onChange={event => {
                if (!keySet.has(key)) {
                  triggerSingleSelection(key, true, [key], event.nativeEvent);
                }
              }}
            />
          );
        };
      } else {
        renderCell = (_, record, index) => {
          const key = getRowKey(record, index);
          const hasKey = keySet.has(key);

          // Record checked
          return (
            <Checkbox
              {...checkboxPropsMap.get(key)}
              checked={hasKey}
              onChange={({ nativeEvent }) => {
                const { shiftKey } = nativeEvent;

                let startIndex: number = -1;
                let endIndex: number = -1;

                // Get range of this
                if (shiftKey) {
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

                if (endIndex !== -1 && startIndex !== endIndex) {
                  // Batch update selections
                  const rangeKeys = recordKeys.slice(startIndex, endIndex + 1);
                  const changedKeys: Key[] = [];

                  if (hasKey) {
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
                      !hasKey,
                      keys.map(recordKey => getRecordByKey(recordKey)),
                      changedKeys.map(recordKey => getRecordByKey(recordKey)),
                    );
                  }
                } else {
                  // Single record selected
                  if (hasKey) {
                    keySet.delete(key);
                  } else {
                    keySet.add(key);
                  }

                  triggerSingleSelection(key, !hasKey, Array.from(keySet), nativeEvent);
                }

                setLastSelectedKey(key);
              }}
            />
          );
        };
      }

      // Columns
      const selectionColumn = {
        width: selectionColWidth,
        className: `${prefixCls}-selection-column`,
        title: rowSelection.columnTitle || title,
        render: renderCell,
      };

      if (expandType === 'row' && columns.length) {
        const [expandColumn, ...restColumns] = columns;
        return [
          expandColumn,
          { ...selectionColumn, fixed: fixed || getFixedType(restColumns[0]) },
          ...restColumns,
        ];
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
      mergedSelections,
      expandType,
      lastSelectedKey,
      onSelectMultiple,
      triggerSingleSelection,
    ],
  );

  return [transformColumns, mergedSelectedKeySet];
}
