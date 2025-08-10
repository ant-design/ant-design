import React from 'react';
import { render } from '../../../tests/utils';
import Descriptions from '..';
import { resetWarned } from '../../_util/warning';

describe('Descriptions.Item span property types', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  // 测试数字类型的 span
  it('should support number type span in JSX mode', () => {
    const { container } = render(
      <Descriptions column={4}>
        <Descriptions.Item label="Normal" span={1}>
          Normal span
        </Descriptions.Item>
        <Descriptions.Item label="Double" span={2}>
          Double span
        </Descriptions.Item>
        <Descriptions.Item label="Single">Default span (1)</Descriptions.Item>
      </Descriptions>,
    );

    const items = container.querySelectorAll('.ant-descriptions-item');
    expect(items[0]).toHaveAttribute('colSpan', '1');
    expect(items[1]).toHaveAttribute('colSpan', '2');
    expect(items[2]).toHaveAttribute('colSpan', '1');
  });

  // 测试 'filled' 类型的 span
  it('should support "filled" type span in JSX mode', () => {
    const { container } = render(
      <Descriptions column={3}>
        <Descriptions.Item label="Item 1">Content 1</Descriptions.Item>
        <Descriptions.Item label="Item 2" span="filled">
          This should fill the rest of the row
        </Descriptions.Item>
        <Descriptions.Item label="Item 3">Content 3</Descriptions.Item>
      </Descriptions>,
    );

    const items = container.querySelectorAll('.ant-descriptions-item');
    expect(items[0]).toHaveAttribute('colSpan', '1');
    expect(items[1]).toHaveAttribute('colSpan', '2'); // 应该填充剩余的列
    expect(items[2]).toHaveAttribute('colSpan', '3'); // 下一行应该占满整行
  });

  // 测试响应式对象类型的 span
  it('should support responsive object type span in JSX mode', () => {
    const { container } = render(
      <Descriptions column={4}>
        <Descriptions.Item label="Responsive" span={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2, xxl: 1 }}>
          Responsive span
        </Descriptions.Item>
        <Descriptions.Item label="Normal">Normal content</Descriptions.Item>
      </Descriptions>,
    );

    // 由于测试环境中无法真实模拟响应式断点，这里只能测试是否正确渲染
    // 实际的响应式行为需要在浏览器环境中测试
    expect(container.querySelectorAll('.ant-descriptions-item')).toHaveLength(2);
  });

  // 测试 items 模式下的所有 span 类型
  it('should support all span types in items mode', () => {
    const { container } = render(
      <Descriptions
        column={4}
        items={[
          {
            key: '1',
            label: 'Number Span',
            children: 'Using number span',
            span: 2,
          },
          {
            key: '2',
            label: 'Filled Span',
            children: 'Using filled span',
            span: 'filled',
          },
          {
            key: '3',
            label: 'Responsive Span',
            children: 'Using responsive span',
            span: { xs: 1, sm: 2, md: 3, lg: 4 },
          },
          {
            key: '4',
            label: 'Default Span',
            children: 'Default span (1)',
          },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-descriptions-item');
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveAttribute('colSpan', '2');
    // 其他项的 colSpan 会根据实际渲染情况而定
  });

  // 测试混合使用不同类型的 span
  it('should handle mixed span types in the same descriptions', () => {
    const { container } = render(
      <Descriptions
        column={6}
        items={[
          // 第一行
          { key: '1', label: 'Number', children: 'Content', span: 2 },
          { key: '2', label: 'Default', children: 'Content' }, // 默认 span=1
          { key: '3', label: 'Responsive', children: 'Content', span: { xs: 1, sm: 2, md: 3 } },
          // 第二行
          { key: '4', label: 'Filled', children: 'Content', span: 'filled' },
          { key: '5', label: 'Last', children: 'Content' },
        ]}
      />,
    );

    expect(container.querySelectorAll('.ant-descriptions-item')).toHaveLength(5);
  });

  // 测试 span 超出列数的警告
  it('should warn when span exceeds column count', () => {
    resetWarned();

    render(
      <Descriptions
        column={3}
        items={[{ key: '1', label: 'Excessive Span', children: 'Content', span: 4 }]}
      />,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Sum of column `span` in a line not match `column` of Descriptions.'),
    );
  });

  // 测试多个 'filled' span 的行为
  it('should handle multiple filled spans correctly', () => {
    const { container } = render(
      <Descriptions
        column={4}
        items={[
          // 第一行
          { key: '1', label: 'Item 1', children: 'Content 1' },
          { key: '2', label: 'Filled 1', children: 'Content 2', span: 'filled' },
          // 第二行
          { key: '3', label: 'Item 3', children: 'Content 3' },
          { key: '4', label: 'Filled 2', children: 'Content 4', span: 'filled' },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-descriptions-item');
    expect(items[0]).toHaveAttribute('colSpan', '1');
    expect(items[1]).toHaveAttribute('colSpan', '3'); // 填充第一行剩余的列
    expect(items[2]).toHaveAttribute('colSpan', '1');
    expect(items[3]).toHaveAttribute('colSpan', '3'); // 填充第二行剩余的列
  });

  // 测试所有响应式断点
  it('should support all responsive breakpoints', () => {
    const { container } = render(
      <Descriptions
        column={6}
        items={[
          {
            key: '1',
            label: 'All Breakpoints',
            children: 'Using all responsive breakpoints',
            span: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 },
          },
          {
            key: '2',
            label: 'Partial Breakpoints',
            children: 'Using some responsive breakpoints',
            span: { xs: 1, md: 3, xl: 5 },
          },
        ]}
      />,
    );

    expect(container.querySelectorAll('.ant-descriptions-item')).toHaveLength(2);
  });
});
