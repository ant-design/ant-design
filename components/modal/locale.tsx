import assign from 'object-assign';

const defaultLocale = {
  okText: '确定',
  cancelText: '取消',
  justOkText: '知道了',
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
