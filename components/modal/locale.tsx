import enUS from '../locale-provider/en_US';

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

const defaultLocale: ModalLocale = enUS.Modal;

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
