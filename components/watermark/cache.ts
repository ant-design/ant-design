export class Cache<ValueType = string, KeyType = string> {
  constructor() {
    // The current Cache is implemented as a simple Map, which appears to be a potential memory leak.
    // Consider switching to a limited-space cache.
    this.cacheStore = {}; // new Map();
  }

  static generateKey(...args: unknown[]): string {
    return Array.from(args)
      .map((item) => {
        try {
          return JSON.stringify(item);
          // eslint-disable-next-line unused-imports/no-unused-vars
        } catch (e) {
          // console.warn(e);
          return item?.toString?.() || '';
        }
      })
      .join();
  }

  get(key: KeyType): ValueType {
    return this.cacheStore[key];
  }

  set(key: KeyType, value: ValueType): ValueType {
    this.cacheStore.set(key, value);
    return value;
  }
}
export default Cache;
