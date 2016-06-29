export function collectDocs(docs) {
  // locale copy from layout
  const locale = (typeof localStorage !== 'undefined' && localStorage.getItem('locale') !== 'en-US') ?
        'zh-CN' : 'en-US';
  const docsList = Object.keys(docs)
    .map(key => docs[key])
    .map((value) => {
      if (typeof value !== 'function') {
        return value[locale] || value.index[locale] || value.index;
      }
      return value;
    })
    .map(fn => fn());
  return docsList;
}

export function getMenuItems(data) {
  const menuMeta = data.map((item) => item.meta);
  const menuItems = {};
  menuMeta.sort((a, b) => {
    return parseInt(a.order, 10) - parseInt(b.order, 10);
  }).forEach((meta) => {
    const category = meta.category || 'topLevel';
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
  setTimeout(() => finish('timeout'), 1500);
}
