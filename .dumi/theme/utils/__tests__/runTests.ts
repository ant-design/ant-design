import tsToJs from '../tsToJs';

// 简单测试用例：基本的 TypeScript 到 JavaScript 转换
console.log('测试 1: 基本 TypeScript 转换');
const tsInput = `
  interface Person {
    name: string;
    age: number;
  }

  function greet(person: Person): string {
    return \`Hello, \${person.name}!\`;
  }

  const john: Person = { name: 'John', age: 30 };
  greet(john);
`;

const jsOutput = tsToJs(tsInput);
console.log('输入:', tsInput);
console.log('输出:', jsOutput);
console.log('检查点:');
console.log('- interface 被移除:', !jsOutput.includes('interface'));
console.log('- 类型注解被移除:', !jsOutput.includes(': string') && !jsOutput.includes(': Person'));
console.log('- 函数定义正确:', jsOutput.includes('function greet(person)'));
console.log('- 对象定义正确:', jsOutput.includes('const john = { name:'));

// 测试用例 2: JSX 转换
console.log('\n测试 2: JSX 转换');
const tsxInput = `
  import React, { FC } from 'react';

  interface ButtonProps {
    text: string;
    onClick: () => void;
  }

  const Button: FC<ButtonProps> = ({ text, onClick }) => {
    return (
      <button
        className="primary-button"
        onClick={onClick}
      >
        {text}
      </button>
    );
  };

  export default Button;
`;

const jsxOutput = tsToJs(tsxInput);
console.log('输入:', tsxInput);
console.log('输出:', jsxOutput);
console.log('检查点:');
console.log('- interface 被移除:', !jsxOutput.includes('interface ButtonProps'));
console.log('- 类型注解被移除:', !jsxOutput.includes(': FC<ButtonProps>'));
console.log('- JSX 被保留:', jsxOutput.includes('<button') && jsxOutput.includes('</button>'));
console.log(
  '- 属性被保留:',
  jsxOutput.includes('className="primary-button"') && jsxOutput.includes('onClick={onClick}'),
);

// 测试用例 3: 类型导入处理
console.log('\n测试 3: 类型导入处理');
const typeImportInput = `
  import React from 'react';
  import type { ReactNode } from 'react';
  import { Button } from 'antd';
  import type { ButtonProps } from 'antd/es/button';

  const MyButton = (props: ButtonProps) => {
    return <Button {...props} />;
  };
`;

const typeImportOutput = tsToJs(typeImportInput);
console.log('输入:', typeImportInput);
console.log('输出:', typeImportOutput);
console.log('检查点:');
console.log('- 类型导入被移除:', !typeImportOutput.includes('import type'));
console.log('- ReactNode 被移除:', !typeImportOutput.includes('ReactNode'));
console.log('- ButtonProps 被移除:', !typeImportOutput.includes('ButtonProps'));
console.log(
  '- 普通导入被保留:',
  typeImportOutput.includes("import React from 'react'") &&
    typeImportOutput.includes("import { Button } from 'antd'"),
);

// 总结测试结果
console.log('\n测试总结:');
const test1Pass =
  !jsOutput.includes('interface') &&
  !jsOutput.includes(': string') &&
  jsOutput.includes('function greet(person)');
const test2Pass =
  !jsxOutput.includes('interface ButtonProps') &&
  jsxOutput.includes('<button') &&
  jsxOutput.includes('</button>');
const test3Pass =
  !typeImportOutput.includes('import type') &&
  typeImportOutput.includes("import React from 'react'");

console.log('测试 1 (基本 TypeScript 转换):', test1Pass ? '通过' : '失败');
console.log('测试 2 (JSX 转换):', test2Pass ? '通过' : '失败');
console.log('测试 3 (类型导入处理):', test3Pass ? '通过' : '失败');
console.log('所有测试:', test1Pass && test2Pass && test3Pass ? '通过' : '失败');
