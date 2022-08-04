import enUS from './en_US';
import zhCN from './zh_CN';

const seDsConf = (window as any)['_hi_system_conf'];
const lang = seDsConf?.lang ?? 'zh-cn';

const curLang = lang === 'zh-cn' ? zhCN : enUS;

const defaultLocale = {
  ...curLang
}

export default defaultLocale;
