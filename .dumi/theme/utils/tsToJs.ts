import prettierSync from '@prettier/sync';
import * as ts from 'typescript';

/**
 * 将 TypeScript 代码（含 TSX）转换为 JavaScript 代码（含 JSX）。
 *
 * 使用 TypeScript 编译器 API 移除类型注解和类型导入，保留 JSX 语法和注释，并将代码转换为 JavaScript。转换结果会通过 Prettier 进行格式化，提升可读性。适用于文档示例、代码展示等场景。
 *
 * @param tsCode - 输入的 TypeScript 代码字符串。
 * @returns 转换并格式化后的 JavaScript 代码字符串。
 *
 * @remark 若 Prettier 格式化失败，将返回未格式化的转换结果。
 */
export default function tsToJs(tsCode: string): string {
  // 设置编译器选项，保留 JSX 语法并避免生成辅助代码
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020, // 使用 ES2020 避免 async/await 转换
    module: ts.ModuleKind.ESNext, // 使用 ES 模块
    jsx: ts.JsxEmit.Preserve, // 保留 JSX 语法
    esModuleInterop: true, // 启用 ES 模块互操作性
    removeComments: false, // 保留注释
    isolatedModules: true, // 将每个文件视为单独模块
    declaration: false, // 不生成类型声明文件
    noEmitHelpers: true, // 不生成辅助函数如 __awaiter
    importHelpers: false, // 不导入辅助函数
    downlevelIteration: false, // 避免生成迭代辅助代码
  };

  // 直接使用 TypeScript 编译器 API 进行转换
  const result = ts.transpileModule(tsCode, { compilerOptions });

  try {
    // 使用 Prettier 同步格式化代码
    const formatted = prettierSync.format(result.outputText, {
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
    // 如果格式化出错，返回清理后的代码
    console.warn('Prettier 格式化出错:', error);
    return result.outputText;
  }
}
