import * as React from 'react';
import { Down } from '@ant-design/icons';
import { FixedType } from 'rc-table/lib/interface';
import Checkbox, { CheckboxProps } from '../../checkbox';
import Dropdown from '../../dropdown';
import Menu from '../../menu';
import Radio from '../../radio';
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
}

type INTERNAL_SELECTION_ITEM = SelectionItem | typeof SELECTION_ALL | typeof SELECTION_INVERT;

export default function useSelection<RecordType>(
  rowSelection: TableRowSelection<RecordType> | undefined,
  config: UseSelectionConfig<RecordType>,
): [TransformColumns<RecordType>, Set<Key>] {
  const {
    selectedRowKeys,
    getCheckboxProps,
    onChange: onSelectionChange,
    columnWidth: selectionColWidth = 60,
    type: selectionType,
    selections,
  } = rowSelection || {};

  const { locale = defaultLocale } = React.useContext(ConfigContext);
  const tableLocale = (locale.Table || {}) as TableLocale;
  const { prefixCls, data, pageData, getRecordByKey, getRowKey, expandType } = config;

  const [innerSelectedKeys, setInnerSelectedKeys] = React.useState<Key[]>();
  const mergedSelectedKeys = selectedRowKeys || innerSelectedKeys || EMPTY_LIST;
  const mergedSelectedKeySet = React.useMemo(() => {
    const keys = selectionType === 'radio' ? mergedSelectedKeys.slice(0, 1) : mergedSelectedKeys;
    return new Set(keys);
  }, [mergedSelectedKeys, selectionType]);

  const setSelectedKeys = (keys: Key[]) => {
    setInnerSelectedKeys(keys);

    if (onSelectionChange) {
      onSelectionChange(keys, keys.map(key => getRecordByKey(key)));
    }
  };

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

              setSelectedKeys(Array.from(keySet));
            });
          },
        };
      }
      return selection as SelectionItem;
    });
  }, [selections, pageData, getRowKey]);

  const transformColumns = React.useCallback(
    (columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      if (!rowSelection) {
        return columns;
      }

      // Support selection
      const keySet = new Set(mergedSelectedKeySet);

      // Get all checkbox props
      const checkboxPropsMap = new Map<Key, Partial<CheckboxProps>>();
      pageData.forEach((record, index) => {
        const key = getRowKey(record, index);
        const checkboxProps = getCheckboxProps ? getCheckboxProps(record) : null;
        checkboxPropsMap.set(key, checkboxProps || {});
      });

      // Record key only need check with enabled
      const recordKeys = pageData
        .map(getRowKey)
        .filter(key => !checkboxPropsMap.get(key)!.disabled);
      const checkedCurrentAll = recordKeys.every(key => keySet.has(key));
      const checkedCurrentSome = recordKeys.some(key => keySet.has(key));

      const onSelectAllChange = () => {
        if (checkedCurrentAll) {
          recordKeys.forEach(key => {
            keySet.delete(key);
          });
        } else {
          recordKeys.forEach(key => {
            keySet.add(key);
          });
        }
        setSelectedKeys(Array.from(keySet));
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
                const { key, text, onSelect } = selection;
                return (
                  <Menu.Item
                    key={key || index}
                    onClick={() => {
                      if (onSelect) {
                        onSelect(recordKeys);
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
                <Down />
              </Dropdown>
            </div>
          );
        }

        title = (
          <div className={`${prefixCls}-selection`}>
            <Checkbox
              checked={!!pageData.length && checkedCurrentAll}
              indeterminate={!checkedCurrentAll && checkedCurrentSome}
              onChange={onSelectAllChange}
              disabled={pageData.length === 0}
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
              checked={keySet.has(key)}
              onChange={() => {
                if (!keySet.has(key)) {
                  setSelectedKeys([key]);
                }
              }}
            />
          );
        };
      } else {
        renderCell = (_, record, index) => {
          const key = getRowKey(record, index);

          return (
            <Checkbox
              {...checkboxPropsMap.get(key)}
              checked={keySet.has(key)}
              onChange={() => {
                if (keySet.has(key)) {
                  keySet.delete(key);
                } else {
                  keySet.add(key);
                }
                setSelectedKeys(Array.from(keySet));
              }}
            />
          );
        };
      }

      // Columns
      const selectionColumn = {
        width: selectionColWidth,
        className: `${prefixCls}-selection-column`,
        title,
        render: renderCell,
      };

      if (expandType === 'row' && columns.length) {
        const [expandColumn, ...restColumns] = columns;
        return [
          expandColumn,
          { ...selectionColumn, fixed: getFixedType(restColumns[0]) },
          ...restColumns,
        ];
      }
      return [{ ...selectionColumn, fixed: getFixedType(columns[0]) }, ...columns];
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
    ],
  );

  return [transformColumns, mergedSelectedKeySet];
}
