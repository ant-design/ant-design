export const addMediaQueryListener = (
  mql: MediaQueryList,
  handler: (e: MediaQueryListEvent) => void,
) => {
  // Don't modify here, please keep the code compatible
  if (typeof mql.addEventListener !== 'undefined') {
    mql.addEventListener('change', handler);
  } else if (typeof mql.addListener !== 'undefined') {
    mql.addListener(handler);
  } else {
    mql.onchange = handler;
  }
};

export const removeMediaQueryListener = (
  mql: MediaQueryList,
  handler: (e: MediaQueryListEvent) => void,
) => {
  // Don't modify here, please keep the code compatible
  if (typeof mql.removeEventListener !== 'undefined') {
    mql.removeEventListener('change', handler);
  } else if (typeof mql.removeListener !== 'undefined') {
    mql.removeListener(handler);
  } else {
    mql.onchange = null;
  }
};
