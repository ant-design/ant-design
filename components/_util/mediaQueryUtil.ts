type MQListenerHandler = (mql: MediaQueryList, handler: (e: MediaQueryListEvent) => void) => void;

export const addMediaQueryListener: MQListenerHandler = (mql, handler) => {
  // Don't delete here, please keep the code compatible
  if (typeof mql.addEventListener !== 'undefined') {
    mql.addEventListener('change', handler);
  } else if (typeof mql.addListener !== 'undefined') {
    mql.addListener(handler);
  } else {
    // mql.onchange = handler;
  }
};

export const removeMediaQueryListener: MQListenerHandler = (mql, handler) => {
  // Don't delete here, please keep the code compatible
  if (typeof mql.removeEventListener !== 'undefined') {
    mql.removeEventListener('change', handler);
  } else if (typeof mql.removeListener !== 'undefined') {
    mql.removeListener(handler);
  } else {
    // mql.onchange = null;
  }
};
