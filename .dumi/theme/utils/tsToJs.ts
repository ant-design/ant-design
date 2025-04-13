import * as ts from 'typescript';
import { format } from '@prettier/sync';

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
export default function (tsCode: string): string {
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

/**
 * 将 TypeScript 代码转换为 JavaScript 代码
 *
 * 这是一个公开的 API，供测试和外部调用使用
 *
 * @param tsCode TypeScript 代码字符串
 * @returns 转换后的 JavaScript 代码
 */
export function parseText(tsCode: string): string {
  return exports.default(tsCode);
}
