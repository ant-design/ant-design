import * as React from 'react';
import { Key, GetRowKey } from '../interface';

interface MapCache<RecordType> {
  data?: RecordType[];
  childrenColumnName?: string;
  kvMap?: Map<Key, RecordType>;
  getRowKey?: Function;
}

export default function useLazyKVMap<RecordType>(
  data: RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>,
) {
  const mapCacheRef = React.useRef<MapCache<RecordType>>({});

  function getRecordByKey(key: Key): RecordType {
    if (
      !mapCacheRef.current ||
      mapCacheRef.current.data !== data ||
      mapCacheRef.current.childrenColumnName !== childrenColumnName ||
      mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<Key, RecordType>();

      /* eslint-disable no-inner-declarations */
      function dig(records: RecordType[]) {
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index);
          kvMap.set(rowKey, record);

          if (record && typeof record === 'object' && childrenColumnName in record) {
            dig((record as any)[childrenColumnName] || []);
          }
        });
      }
      /* eslint-enable */

      dig(data);

      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey,
      };
    }

    return mapCacheRef.current.kvMap!.get(key)!;
  }

  return [getRecordByKey];
}
