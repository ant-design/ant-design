import type { TransferKey } from '../transfer/interface';

export const groupKeysMap = (keys: TransferKey[]) => {
  const map = new Map<TransferKey, number>();
  keys.forEach((key, index) => {
    map.set(key, index);
  });
  return map;
};

export const groupDisabledKeysMap = <RecordType extends any[]>(dataSource: RecordType) => {
  const map = new Map<TransferKey, number>();
  dataSource.forEach(({ disabled, key }, index) => {
    if (disabled) {
      map.set(key, index);
    }
  });
  return map;
};
