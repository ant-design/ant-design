import defaultLocale from '../locale-provider/default';

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

let runtimeLocale: ModalLocale = {
  ...defaultLocale.Modal,
};

export function changeConfirmLocale(newLocale?: ModalLocale) {
  if (newLocale) {
    runtimeLocale = {
      ...runtimeLocale,
      ...newLocale,
    };
  } else {
    runtimeLocale = {
      ...defaultLocale.Modal,
    };
  }
}

export function getConfirmLocale() {
  return runtimeLocale;
}
