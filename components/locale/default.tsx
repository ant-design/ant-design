import enUS from './en_US';
import zhCN from './zh_CN';

const {lang = 'zh-cn'} = (window as any)['_se_ds_conf'];

const curLang = lang === 'zh-cn' ? zhCN : enUS;

const defaultLocale = {
  ...curLang
}

export default defaultLocale;
