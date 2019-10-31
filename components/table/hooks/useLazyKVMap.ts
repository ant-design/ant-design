import * as React from 'react';
import { Key, GetRowKey } from '../interface';

interface MapCache<RecordType> {
  data?: RecordType[];
  kvMap?: Map<Key, RecordType>;
  getRowKey?: Function;
}

export default function useLazyKVMap<RecordType>(
  data: RecordType[],
  getRowKey: GetRowKey<RecordType>,
) {
  const mapCacheRef = React.useRef<MapCache<RecordType>>({});

  function getRecordByKey(key: Key): RecordType {
    if (
      !mapCacheRef.current ||
      mapCacheRef.current.data !== data ||
      mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<Key, RecordType>();
      data.forEach((record, index) => {
        const rowKey = getRowKey(record, index);
        kvMap.set(rowKey, record);
      });

      mapCacheRef.current = {
        data,
        kvMap,
        getRowKey,
      };
    }

    return mapCacheRef.current.kvMap!.get(key)!;
  }

  return [getRecordByKey];
}
