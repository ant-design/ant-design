import type { ValidateMessages } from 'rc-field-form/lib/interface';
import * as React from 'react';
import warning from '../_util/warning';
import type { PickerLocale as DatePickerLocale } from '../date-picker/generatePicker';
import type { TransferLocale as TransferLocaleForEmpty } from '../empty';
import type { ModalLocale } from '../modal/locale';
import type { TourLocale } from '../tour/interface';
import { changeConfirmLocale } from '../modal/locale';
import type { PaginationLocale } from '../pagination/Pagination';
import type { PopconfirmLocale } from '../popconfirm/PurePanel';
import type { TableLocale } from '../table/interface';
import type { TransferLocale } from '../transfer';
import type { UploadLocale } from '../upload/interface';
import type { LocaleContextProps } from './context';
import LocaleContext from './context';

import arEG from '../locale/ar_EG';
import azAZ from '../locale/az_AZ';
import bgBG from '../locale/bg_BG';
import bnBD from '../locale/bn_BD';
import byBY from '../locale/by_BY';
import caES from '../locale/ca_ES';
import csCZ from '../locale/cs_CZ';
import daDK from '../locale/da_DK';
import deDE from '../locale/de_DE';
import elGR from '../locale/el_GR';
import enGB from '../locale/en_GB';
import enUS from '../locale/en_US';
import esES from '../locale/es_ES';
import etEE from '../locale/et_EE';
import euES from '../locale/eu_ES';
import faIR from '../locale/fa_IR';
import fiFI from '../locale/fi_FI';
import frBE from '../locale/fr_BE';
import gaIE from '../locale/ga_IE';
import glES from '../locale/gl_ES';
import heIL from '../locale/he_IL';
import hiIN from '../locale/hi_IN';
import hrHR from '../locale/hr_HR';
import huHU from '../locale/hu_HU';
import hyAM from '../locale/hy_AM';
import idID from '../locale/id_ID';
import isIS from '../locale/is_IS';
import itIT from '../locale/it_IT';
import jaJP from '../locale/ja_JP';
import kaGE from '../locale/ka_GE';
import kkKZ from '../locale/kk_KZ';
import kmrIQ from '../locale/kmr_IQ';
import kmKH from '../locale/km_KH';
import knIN from '../locale/kn_IN';
import koKR from '../locale/ko_KR';
import kuIQ from '../locale/ku_IQ';
import ltLT from '../locale/lt_LT';
import lvLV from '../locale/lv_LV';
import mkMK from '../locale/mk_MK';
import mlIN from '../locale/ml_IN';
import mnMN from '../locale/mn_MN';
import msMY from '../locale/ms_MY';
import nbNO from '../locale/nb_NO';
import neNP from '../locale/ne_NP';
import nlBE from '../locale/nl_BE';
import nlNL from '../locale/nl_NL';
import plPL from '../locale/pl_PL';
import ptBR from '../locale/pt_BR';
import ptPT from '../locale/pt_PT';
import roRO from '../locale/ro_RO';
import ruRU from '../locale/ru_RU';
import siLK from '../locale/si_LK';
import skSK from '../locale/sk_SK';
import slSI from '../locale/sl_SI';
import srRS from '../locale/sr_RS';
import svSE from '../locale/sv_SE';
import taIN from '../locale/ta_IN';
import thTH from '../locale/th_TH';
import tkTK from '../locale/tk_TK';
import trTR from '../locale/tr_TR';
import ukUA from '../locale/uk_UA';
import urPK from '../locale/ur_PK';
import viVN from '../locale/vi_VN';
import zhCN from '../locale/zh_CN';
import zhHK from '../locale/zh_HK';
import zhTW from '../locale/zh_TW';
import myMM from '../locale/my_MM';

export { default as useLocale } from './useLocale';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  Pagination?: PaginationLocale;
  DatePicker?: DatePickerLocale;
  TimePicker?: Record<string, any>;
  Calendar?: Record<string, any>;
  Table?: TableLocale;
  Modal?: ModalLocale;
  Tour?: TourLocale;
  Popconfirm?: PopconfirmLocale;
  Transfer?: TransferLocale;
  Select?: Record<string, any>;
  Upload?: UploadLocale;
  Empty?: TransferLocaleForEmpty;
  global?: Record<string, any>;
  PageHeader?: { back: string };
  Icon?: Record<string, any>;
  Text?: {
    edit?: any;
    copy?: any;
    copied?: any;
    expand?: any;
  };
  Form?: {
    optional?: string;
    defaultValidateMessages: ValidateMessages;
  };
  Image?: {
    preview: string;
  };
  QRCode?: {
    expired: string;
    refresh: string;
  };
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
  /** @internal */
  _ANT_MARK__?: string;
}

const LocaleProvider: React.FC<LocaleProviderProps> = (props) => {
  const { locale = {} as Locale, children, _ANT_MARK__ } = props;

  if (process.env.NODE_ENV !== 'production') {
    warning(
      _ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
    );
  }

  React.useEffect(() => {
    changeConfirmLocale(locale && locale.Modal);
    return () => {
      changeConfirmLocale();
    };
  }, [locale]);

  const getMemoizedContextValue = React.useMemo<LocaleContextProps>(
    () => ({ ...locale, exist: true }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={getMemoizedContextValue}>{children}</LocaleContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  LocaleProvider.displayName = 'LocaleProvider';
}

export const localeInfo: Record<string, Locale> = {
  ar: arEG,
  az: azAZ,
  bg: bgBG,
  'bn-bd': bnBD,
  by: byBY,
  ca: caES,
  cs: csCZ,
  da: daDK,
  de: deDE,
  el: elGR,
  'en-gb': enGB,
  en: enUS,
  es: esES,
  et: etEE,
  eu: euES,
  fa: faIR,
  fi: fiFI,
  fr: frBE,
  ga: gaIE,
  gl: glES,
  he: heIL,
  hi: hiIN,
  hr: hrHR,
  hu: huHU,
  'hy-am': hyAM,
  id: idID,
  is: isIS,
  it: itIT,
  ja: jaJP,
  ka: kaGE,
  kk: kkKZ,
  ku: kmrIQ,
  km: kmKH,
  kn: knIN,
  ko: koKR,
  'ku-iq': kuIQ,
  lt: ltLT,
  lv: lvLV,
  mk: mkMK,
  ml: mlIN,
  'mn-mn': mnMN,
  'ms-my': msMY,
  nb: nbNO,
  'ne-np': neNP,
  'nl-be': nlBE,
  nl: nlNL,
  pl: plPL,
  'pt-br': ptBR,
  pt: ptPT,
  ro: roRO,
  ru: ruRU,
  si: siLK,
  sk: skSK,
  sl: slSI,
  sr: srRS,
  sv: svSE,
  ta: taIN,
  th: thTH,
  tk: tkTK,
  tr: trTR,
  uk: ukUA,
  ur: urPK,
  vi: viVN,
  'zh-cn': zhCN,
  'zh-hk': zhHK,
  'zh-tw': zhTW,
  my: myMM,
};

export default LocaleProvider;
