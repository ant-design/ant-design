export type mapItem = {
  k: string;
  i: number;
};
export type MapType = Record<string, mapItem>;

export const groupKeysMap = (keys: string[]) => {
  const map: MapType = {};
  keys.forEach((k, i) => {
    map[k] = { k, i };
  });
  return map;
};
export const groupDisabledKeysMap = <RecordType extends any[]>(dataSource: RecordType) => {
  const map: MapType = {};
  dataSource.forEach((d, i) => {
    if (d.disabled) {
      map[d.key] = {
        k: d.key,
        i,
      };
    }
  });
  return map;
};
