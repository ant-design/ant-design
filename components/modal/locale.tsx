import defaultLocale from '../locale/en_US';

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

let runtimeLocale: ModalLocale = {
  ...(defaultLocale.Modal as ModalLocale),
};

let localeList: ModalLocale[] = [];

const generateLocale = () =>
  localeList.reduce(
    (merged, locale) => ({ ...merged, ...locale }),
    defaultLocale.Modal as ModalLocale,
  );

export function changeConfirmLocale(newLocale?: ModalLocale) {
  if (newLocale) {
    const cloneLocale = { ...newLocale };
    localeList.push(cloneLocale);
    runtimeLocale = generateLocale();

    return () => {
      localeList = localeList.filter((locale) => locale !== cloneLocale);
      runtimeLocale = generateLocale();
    };
  }

  runtimeLocale = {
    ...(defaultLocale.Modal as ModalLocale),
  };
}

export function getConfirmLocale() {
  return runtimeLocale;
}
