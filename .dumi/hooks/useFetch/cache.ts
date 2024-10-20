export default class FetchCache {
  private cache: Map<string, PromiseLike<any>> = new Map();

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: PromiseLike<any>) {
    this.cache.set(key, value);
  }

  promise<T>(key: string, promiseFn: () => PromiseLike<T>): PromiseLike<T> {
    const cached = this.get(key);
    if (cached) {
      return cached;
    }
    const promise = promiseFn();
    this.set(key, promise);
    return promise;
  }
}
