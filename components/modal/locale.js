const defaultLocale = {
  okText: '确定',
  cancelText: '取消',
  justOkText: '知道了',
};

let runtimeLocale = { ...defaultLocale };

export function changeConfirmLocale(newLocale) {
  if (newLocale) {
    runtimeLocale = { ...runtimeLocale, ...newLocale };
  } else {
    runtimeLocale = { ...defaultLocale };
  }
}

export function getConfirmLocale() {
  return runtimeLocale;
}
