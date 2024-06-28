function use<T>(promise: PromiseLike<T>): T {
  const internal: PromiseLike<T> & {
    status?: 'pending' | 'fulfilled' | 'rejected';
    value?: T;
    reason?: any;
  } = promise;
  if (internal.status === 'fulfilled') {
    return internal.value as T;
  }
  if (internal.status === 'rejected') {
    throw internal.reason;
  }
  if (internal.status === 'pending') {
    throw internal;
  }
  internal.status = 'pending';
  internal.then(
    (result) => {
      internal.status = 'fulfilled';
      internal.value = result;
    },
    (reason) => {
      internal.status = 'rejected';
      internal.reason = reason;
    },
  );
  throw internal;
}

export default use;
