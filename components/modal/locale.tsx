import assign from 'object-assign';

const defaultLocale = {
  okText: 'OK',
  cancelText: 'Cancel',
  justOkText: 'OK',
};

let runtimeLocale = assign({}, defaultLocale);

export function changeConfirmLocale(newLocale?: Object) {
  if (newLocale) {
    runtimeLocale = assign({}, runtimeLocale, newLocale);
  } else {
    runtimeLocale = assign({}, defaultLocale);
  }
}

export function getConfirmLocale() {
  return runtimeLocale;
}
