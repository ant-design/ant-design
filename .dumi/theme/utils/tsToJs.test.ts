import { parseText } from './tsToJs';

// 简单 TypeScript 代码示例
const tsCode = `
interface Person {
  name: string;
  age: number;
}

class Employee implements Person {
  name: string;
  age: number;
  department: string;

  constructor(name: string, age: number, department: string) {
    this.name = name;
    this.age = age;
    this.department = department;
  }

  getInfo(): string {
    return \`\${this.name}, \${this.age}, \${this.department}\`;
  }
}

const employee: Employee = new Employee('张三', 30, '研发部');
console.log(employee.getInfo());
`;

// 包含 JSX 的 TypeScript 代码示例
const tsxCode = `
import React, { FC, useState } from 'react';
import { Button } from 'antd';

interface CounterProps {
  initialCount?: number;
  label: string;
}

const Counter: FC<CounterProps> = ({ initialCount = 0, label }) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = (): void => {
    setCount(count + 1);
  };

  const decrement = (): void => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <h3>{label}: {count}</h3>
      <Button type="primary" onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
    </div>
  );
};

export default Counter;
`;

// 复杂 TypeScript 代码示例，包含泛型、类型导入、类型别名等
const complexTsCode = `
import React from 'react';
import type { ReactNode } from 'react';
import { Table } from 'antd';
import type { TableProps, TableColumnType } from 'antd/es/table';

// 类型别名
type Status = 'pending' | 'processing' | 'success' | 'failed';

// 泛型接口
interface DataItem<T = string> {
  id: number;
  name: string;
  status: Status;
  details: T;
  createdAt: Date;
}

// 类型映射和条件类型
type ReadonlyDataItem<T> = {
  readonly [K in keyof DataItem<T>]: DataItem<T>[K];
};

// 工具类型
type OptionalId<T> = Omit<T, 'id'> & { id?: number };

// 类型断言函数
function assertIsDataItem<T>(item: any): asserts item is DataItem<T> {
  if (!item || typeof item.id !== 'number') {
    throw new Error('Invalid DataItem: missing or invalid id');
  }
}

// 使用泛型组件
const DataTable = <T extends string>(props: {
  data: DataItem<T>[];
  renderDetails?: (details: T) => ReactNode;
}) => {
  const { data, renderDetails } = props;

  // 定义表格列
  const columns: TableColumnType<DataItem<T>>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Status) => {
        const statusColors = {
          pending: 'blue',
          processing: 'orange',
          success: 'green',
          failed: 'red',
        };
        return <span style={{ color: statusColors[status] }}>{status}</span>;
      },
    },
    {
      title: '详情',
      dataIndex: 'details',
      key: 'details',
      render: (details: T) => renderDetails ? renderDetails(details) : details,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => date.toLocaleString(),
    },
  ];

  return <Table<DataItem<T>> columns={columns} dataSource={data} rowKey="id" />;
};

// 使用工具类型创建数据
const createDataItem = <T extends string>(item: OptionalId<DataItem<T>>): DataItem<T> => {
  return {
    id: item.id ?? Math.floor(Math.random() * 1000),
    name: item.name,
    status: item.status,
    details: item.details,
    createdAt: item.createdAt || new Date(),
  };
};

// 示例数据
const exampleData: DataItem<string>[] = [
  createDataItem({
    name: '项目 A',
    status: 'success',
    details: '项目顺利完成',
    createdAt: new Date(2023, 0, 15),
  }),
  createDataItem({
    name: '项目 B',
    status: 'processing',
    details: '正在进行中...',
    createdAt: new Date(2023, 2, 10),
  }),
];

// 渲染组件
const App = () => {
  return (
    <div>
      <h1>数据表格示例</h1>
      <DataTable
        data={exampleData}
        renderDetails={(details) => <em>{details}</em>}
      />
    </div>
  );
};

export default App;
`;

// 加入Jest测试用例
describe('tsToJs函数测试', () => {
  // 转换普通 TypeScript 代码
  it('应该能正确转换普通TypeScript代码', () => {
    const jsCode = parseText(tsCode);

    // 验证类型注解被移除
    expect(jsCode).not.toContain('interface Person');
    expect(jsCode).not.toContain(': string');
    expect(jsCode).not.toContain(': number');

    // 验证类实现被保留
    expect(jsCode).toContain('class Employee');
    expect(jsCode).toContain('constructor(name, age, department)');
    expect(jsCode).toContain('getInfo()');

    // 验证实例创建
    expect(jsCode).toContain("new Employee('张三', 30, '研发部')");

    console.log('转换前的 TypeScript 代码：');
    console.log(tsCode);
    console.log('\n转换后的 JavaScript 代码：');
    console.log(jsCode);
  });

  // 转换包含 JSX 的 TypeScript 代码
  it('应该能正确转换TSX代码', () => {
    const jsxCode = parseText(tsxCode);

    // 验证React导入被保留
    expect(jsxCode).toContain('import React');

    // 验证类型注解和类型导入被移除
    expect(jsxCode).not.toContain('FC<');
    expect(jsxCode).not.toContain('interface CounterProps');
    expect(jsxCode).not.toContain('<number>');
    expect(jsxCode).not.toContain(': void');

    // 验证JSX结构被保留
    expect(jsxCode).toContain('<div className="counter">');
    expect(jsxCode).toContain('<Button type="primary"');

    // 验证默认参数被保留
    expect(jsxCode).toContain('initialCount = 0');

    console.log('\n\n转换前的 TSX 代码：');
    console.log(tsxCode);
    console.log('\n转换后的 JSX 代码：');
    console.log(jsxCode);
  });

  // 转换复杂 TypeScript 代码
  it('应该能正确转换复杂TypeScript代码', () => {
    const complexJsCode = parseText(complexTsCode);

    // 验证类型导入被移除
    expect(complexJsCode).not.toContain('import type');

    // 验证泛型被移除
    expect(complexJsCode).not.toContain('<T>');
    expect(complexJsCode).not.toContain('<T extends string>');

    // 验证类型别名和接口被移除
    expect(complexJsCode).not.toContain('type Status');
    expect(complexJsCode).not.toContain('interface DataItem');

    // 验证函数和组件结构被保留
    expect(complexJsCode).toContain('function assertIsDataItem');
    expect(complexJsCode).toContain('const DataTable = ');
    expect(complexJsCode).toContain('const createDataItem = ');

    // 验证JSX结构被保留
    expect(complexJsCode).toContain('<Table');
    expect(complexJsCode).toContain('<span style=');

    // 验证空值合并运算符的处理
    expect(complexJsCode).toContain('_a = item.id'); // TypeScript会将 ?? 转换为更兼容的语法

    console.log('\n\n转换前的复杂 TypeScript 代码：');
    console.log(complexTsCode);
    console.log('\n转换后的 JavaScript 代码：');
    console.log(complexJsCode);
  });
});
