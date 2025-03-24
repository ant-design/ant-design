import tsToJs from '../tsToJs';

describe('tsToJs', () => {
  it('应该将基本的 TypeScript 转换为 JavaScript', () => {
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

    // 检查结果中不应包含 TypeScript 特有的语法
    expect(jsOutput).not.toContain('interface');
    expect(jsOutput).not.toContain(': string');
    expect(jsOutput).not.toContain(': Person');
    expect(jsOutput).not.toContain(': number');

    // 检查结果应包含 JavaScript 代码
    expect(jsOutput).toContain('function greet(person)');
    expect(jsOutput).toContain('return');
    expect(jsOutput).toContain('Hello');
    expect(jsOutput).toContain("const john = { name: 'John', age: 30 }");
  });

  it('应该保留 JSX 语法', () => {
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

    // 检查结果中不应包含 TypeScript 特有的语法
    expect(jsxOutput).not.toContain('interface ButtonProps');
    expect(jsxOutput).not.toContain(': FC<ButtonProps>');

    // 检查结果应保留 JSX 语法
    expect(jsxOutput).toContain('<button');
    expect(jsxOutput).toContain('className="primary-button"');
    expect(jsxOutput).toContain('</button>');
    expect(jsxOutput).toContain('onClick={onClick}');
  });

  it('应该删除类型导入', () => {
    const tsInput = `
      import React from 'react';
      import type { ReactNode } from 'react';
      import { Button } from 'antd';
      import type { ButtonProps } from 'antd/es/button';

      const MyButton = (props: ButtonProps) => {
        return <Button {...props} />;
      };
    `;

    const jsOutput = tsToJs(tsInput);

    // 检查结果中不应包含类型导入
    expect(jsOutput).not.toContain('import type');
    expect(jsOutput).not.toContain('ReactNode');
    expect(jsOutput).not.toContain('ButtonProps');

    // 保留普通导入
    expect(jsOutput).toContain("import React from 'react'");
    expect(jsOutput).toContain("import { Button } from 'antd'");
  });
});
