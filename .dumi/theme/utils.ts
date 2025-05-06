import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import * as ts from 'typescript';
import { format } from '@prettier/sync';

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
    console.error('Your web browser does not support storing settings locally.', error);
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

/**
 * TypeScript 到 JavaScript 代码转换工具
 *
 * 这个模块用于将 TypeScript 代码（包括 TSX）转换为 JavaScript 代码（包括 JSX）
 * 主要用于替代 sylvanas 库的功能，用于文档站点中的代码示例转换
 *
 * 实现原理：使用 TypeScript 编译器 API 将 TS 代码转换为 JS 代码
 *
 * 特性：
 * 1. 删除所有类型注解
 * 2. 保留 JSX 语法
 * 3. 删除类型导入
 * 4. 转换 ES6+ 语法为更兼容的语法（如空值合并运算符）
 * 5. 保留原始代码风格和注释
 * 6. 使用 Prettier 格式化输出代码，提高可读性
 * 7. 处理 React 组件和 hooks 的转换
 * 8. 支持 TypeScript 特有语法（如装饰器、枚举等）的转换
 *
 * @param tsCode TypeScript 代码字符串
 * @returns 转换后的 JavaScript 代码
 */
export function tsToJs(tsCode: string): string {
  // 设置编译器选项，保留 JSX 语法
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2016, // 目标 ECMAScript 版本
    module: ts.ModuleKind.ESNext, // 使用 ES 模块
    jsx: ts.JsxEmit.Preserve, // 保留 JSX 语法
    esModuleInterop: true, // 启用 ES 模块互操作性
    removeComments: false, // 保留注释
    isolatedModules: true, // 将每个文件视为单独模块
    declaration: false, // 不生成类型声明文件
  };

  // 直接使用 TypeScript 编译器 API 进行转换
  const result = ts.transpileModule(tsCode, { compilerOptions });

  try {
    // 使用 Prettier 同步格式化代码
    const formatted = format(result.outputText, {
      // Prettier 格式化选项
      parser: 'babel',
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      jsxSingleQuote: false,
      trailingComma: 'all',
      bracketSpacing: true,
      jsxBracketSameLine: false,
      arrowParens: 'avoid',
    });

    return formatted;
  } catch (error) {
    // 如果格式化出错，返回未格式化的代码
    console.warn('Prettier 格式化出错:', error);
    return result.outputText;
  }
}
