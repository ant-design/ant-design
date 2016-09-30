import assign from 'object-assign';

export default function getLocale(props, context, component, getDefaultLocale) {
  let locale = null;
  if (context && context.antLocale && context.antLocale[component]) {
    locale = context.antLocale[component];
  } else {
    locale = getDefaultLocale();
  }
  // 统一合并为完整的 Locale
  const result = assign({}, locale, props.locale);
  result.lang = assign({}, locale.lang, props.locale.lang);
  return result;
}
