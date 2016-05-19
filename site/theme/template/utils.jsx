export function getMenuItems(data, locale) {
  const menuMeta = Object.keys(data)
          .map((key) => data[key])
          .map((file) => {
            if (file.meta) {
              return file.meta;
            }
            return file[locale].meta;
          });

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
