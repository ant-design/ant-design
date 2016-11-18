export function getMenuItems(moduleData, locale) {
  const menuMeta = moduleData.map(item => item.meta);
  const menuItems = {};
  menuMeta.sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  ).forEach((meta) => {
    const category = (meta.category && meta.category[locale]) || meta.category || 'topLevel';
    if (!menuItems[category]) {
      menuItems[category] = {};
    }

    const type = meta.type || 'topLevel';
    if (!menuItems[category][type]) {
      menuItems[category][type] = [];
    }

    menuItems[category][type].push(meta);
  });
  return menuItems;
}

export function isZhCN() {
  if (typeof location === 'undefined') {
    // Use English in SSR.
    return false;
  }
  if (location.search.indexOf('locale=zh-CN') > -1) {
    return true;
  }
  if (location.search.indexOf('locale=en-US') > -1) {
    return false;
  }

  const language = (
    typeof localStorage === 'undefined' ||
      !localStorage.getItem('locale')
  ) ? navigator.language : localStorage.getItem('locale');
  return language === 'zh-CN';
}

export function ping(url, callback) {
  const img = new Image();
  let done;
  const finish = (status) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}
