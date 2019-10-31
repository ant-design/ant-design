import * as React from 'react';
import Checkbox, { CheckboxProps } from '../../checkbox';
import Radio from '../../radio';
import { TableRowSelection, Key, ColumnsType, GetRowKey } from '../interface';

const EMPTY_LIST: any[] = [];

interface UseSelectionConfig<RecordType> {
  prefixCls: string;
  data: RecordType[];
  getRowKey: GetRowKey<RecordType>;
  getRecordByKey: (key: Key) => RecordType;
}

export default function useSelection<RecordType>(
  rowSelection: TableRowSelection<RecordType> | undefined,
  config: UseSelectionConfig<RecordType>,
): [(columns: ColumnsType<RecordType>) => ColumnsType<RecordType>, Set<Key>] {
  const {
    selectedRowKeys,
    getCheckboxProps,
    onChange: onSelectionChange,
    columnWidth: selectionColWidth = 60,
    type: selectionType,
  } = rowSelection || {};

  const { prefixCls, data, getRecordByKey, getRowKey } = config;

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

  const transformColumns = React.useCallback(
    (columns: ColumnsType<RecordType>) => {
      if (!rowSelection) {
        return columns;
      }

      // Support selection
      const keySet = new Set(mergedSelectedKeySet);

      // Get all checkbox props
      const checkboxPropsMap = new Map<Key, Partial<CheckboxProps>>();
      data.forEach((record, index) => {
        const key = getRowKey(record, index);
        const checkboxProps = getCheckboxProps ? getCheckboxProps(record) : null;
        checkboxPropsMap.set(key, checkboxProps || {});
      });

      // Record key only need check with enabled
      const recordKeys = data.map(getRowKey).filter(key => !checkboxPropsMap.get(key)!.disabled);
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

      // Render record selection cell
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

      return [
        {
          width: selectionColWidth,
          className: `${prefixCls}-selection-column`,
          title: selectionType !== 'radio' && (
            <Checkbox
              checked={checkedCurrentAll}
              indeterminate={!checkedCurrentAll && checkedCurrentSome}
              onChange={onSelectAllChange}
            />
          ),
          render: renderCell,
        },
        ...columns,
      ];
    },
    [getRowKey, data, rowSelection, innerSelectedKeys, mergedSelectedKeys, selectionColWidth],
  );

  return [transformColumns, mergedSelectedKeySet];
}
