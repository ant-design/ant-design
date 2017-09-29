export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

const defaultLocale: ModalLocale = {
  okText: '确定',
  cancelText: '取消',
  justOkText: '知道了',
};

let runtimeLocale: ModalLocale = {
  ...defaultLocale,
};

export function changeConfirmLocale(newLocale?: ModalLocale) {
  if (newLocale) {
    runtimeLocale = {
      ...runtimeLocale,
      ...newLocale,
    };
  } else {
    runtimeLocale = {
      ...defaultLocale,
    };
  }
}

export function getConfirmLocale() {
  return runtimeLocale;
}
