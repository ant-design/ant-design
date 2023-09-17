import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';

import themeConfig from './themeConfig';

interface Meta {
  skip?: boolean;
  category?: any;
  type?: any;
  title?: any;
  subtitle?: string;
  tag?: string;
  path?: string;
  cover?: string;
  order?: number;
  children?: Meta[];
}

interface ModuleDataItem {
  meta: Meta;
}

interface Orders {
  [key: string]: number;
}

export function getMenuItems(
  moduleData: ModuleDataItem[],
  locale: string,
  categoryOrder: Orders,
  typeOrder: Orders,
) {
  const menuMeta = moduleData.map((item) => item.meta).filter((meta) => !meta.skip);

  const menuItems: Meta[] = [];
  const sortFn = (a: Meta, b: Meta) => (a.order || 0) - (b.order || 0);
  menuMeta.sort(sortFn).forEach((meta) => {
    // Format
    if (meta.category) {
      meta.category = meta.category[locale] || meta.category;
    }
    if (meta.type) {
      meta.type = meta.type[locale] || meta.type;
    }
    if (meta?.title) {
      meta.title = meta.title[locale] || meta.title;
    }

    if (!meta.category) {
      menuItems.push(meta);
      return;
    }

    // Component
    if (meta.category === 'Components' && meta.type) {
      let type = menuItems.find((i) => i?.title === meta.type);
      if (!type) {
        type = {
          type: 'type',
          title: meta.type,
          children: [],
          order: typeOrder[meta.type],
        };
        menuItems.push(type);
      }
      type.children = type.children || [];
      type.children.push(meta);
      return;
    }

    let group = menuItems.find((i) => i?.title === meta.category);

    if (!group) {
      group = {
        type: 'category',
        title: meta.category,
        children: [],
        order: categoryOrder[meta.category],
      };
      menuItems.push(group);
    }

    group.children = group.children || [];

    if (meta.type) {
      let type = group.children.filter((i) => i?.title === meta.type)[0];
      if (!type) {
        type = {
          type: 'type',
          title: meta.type,
          children: [],
          order: typeOrder[meta.type],
        };
        group.children.push(type);
      }
      type.children = type.children || [];
      type.children.push(meta);
    } else {
      group.children.push(meta);
    }
  });

  function nestSort(list: Meta[]): Meta[] {
    return list.sort(sortFn).map((item) => {
      if (item.children) {
        return {
          ...item,
          children: nestSort(item.children),
        };
      }

      return item;
    });
  }

  return nestSort(menuItems);
}

export function isZhCN(pathname: string) {
  return /-cn\/?$/.test(pathname);
}

export function getLocalizedPathname(
  path: string,
  zhCN?: boolean,
  search?: string,
  hash?: {
    zhCN?: string;
    enUS?: string;
  },
) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  let fullPath: string;
  if (!zhCN) {
    // to enUS
    fullPath = /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
  } else if (pathname === '/') {
    fullPath = '/index-cn';
  } else if (pathname.endsWith('/')) {
    fullPath = pathname.replace(/\/$/, '-cn/');
  } else {
    fullPath = `${pathname}-cn`;
    fullPath = fullPath.replace(/(-cn)+/, '-cn');
  }

  if (hash) {
    const localHash = hash[zhCN ? 'zhCN' : 'enUS'];
    fullPath += `#${localHash}`;
  }

  return { pathname: fullPath, search };
}

export function ping(callback: (status: string) => void) {
  const url =
    'https://private-a' +
    'lipay' +
    'objects.alip' +
    'ay.com/alip' +
    'ay-rmsdeploy-image/rmsportal/RKuAiriJqrUhyqW.png';
  const img = new Image();
  let done: boolean;
  const finish = (status: string) => {
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

export function isLocalStorageNameSupported() {
  const testKey = 'test';
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head!.appendChild(script);
  });
}

export function getMetaDescription(jml?: any[] | null) {
  const COMMON_TAGS = ['h1', 'h2', 'h3', 'p', 'img', 'a', 'code', 'strong'];
  if (!Array.isArray(jml)) {
    return '';
  }
  const paragraph = flattenDeep(
    jml
      .filter((item) => {
        if (Array.isArray(item)) {
          const [tag] = item;
          return tag === 'p';
        }
        return false;
      })
      // ['p', ['code', 'aa'], 'bb'] => ['p', 'aabb']
      .map((item) => {
        const [tag, ...others] = flatten(item);
        const content = others
          .filter((other) => typeof other === 'string' && !COMMON_TAGS.includes(other))
          .join('');
        return [tag, content];
      }),
  ).find((p) => p && typeof p === 'string' && !COMMON_TAGS.includes(p)) as string;
  return paragraph;
}

export const getThemeConfig = () => themeConfig;
