const use = (promise) => {
  const internal = promise;
  if (internal.status === 'fulfilled') {
    return internal.value;
  }
  if (internal.status === 'rejected') {
    throw internal.reason;
  } else if (internal.status === 'pending') {
    throw internal;
  } else {
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
};

module.exports = use;
