import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TreeSelect, { TreeNode } from '..';
import { resetWarned } from '../../_util/warning';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('TreeSelect', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  focusTest(TreeSelect, { refFocus: true });
  mountTest(TreeSelect);
  rtlTest(TreeSelect);

  describe('TreeSelect Custom Icons', () => {
    it('should support customized icons', () => {
      const { container } = render(
        <TreeSelect
          showSearch
          clearIcon={<span>clear</span>}
          removeIcon={<span>remove</span>}
          value={['leaf1', 'leaf2']}
          placeholder="Please select"
          multiple
          allowClear
          treeDefaultExpandAll
        >
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf" key="random" />
              <TreeNode value="leaf2" title="your leaf" key="random1" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should `treeIcon` work', () => {
      const { container } = render(
        <TreeSelect treeIcon open>
          <TreeNode value="parent 1" title="parent 1" icon={<span className="bamboo" />} />
        </TreeSelect>,
      );

      expect(container.querySelector('.ant-select-tree-treenode .bamboo')).toBeTruthy();
    });
  });

  it('should support notFoundContent', () => {
    const content = 'notFoundContent';
    const { container } = render(<TreeSelect treeIcon open notFoundContent={content} />);
    expect(container.querySelector('.ant-select-empty')?.innerHTML).toBe(content);
  });

  it('legacy dropdownClassName', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<TreeSelect dropdownClassName="legacy" open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `dropdownClassName` is deprecated. Please use `popupClassName` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('warning for legacy dropdownMatchSelectWidth', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<TreeSelect dropdownMatchSelectWidth open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `dropdownMatchSelectWidth` is deprecated. Please use `popupMatchSelectWidth` instead.',
    );

    errSpy.mockRestore();
  });

  it('support aria-*', async () => {
    const { container } = render(
      <TreeSelect
        open
        treeData={[{ value: 'parent 1', title: 'parnet 1', 'aria-label': 'label' }]}
      />,
    );
    expect(
      container.querySelector('.ant-select-tree-treenode-leaf-last')?.getAttribute('aria-label'),
    ).toBe('label');
  });

  it('deprecate showArrow', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<TreeSelect showArrow />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.',
    );
    expect(container.querySelector('.ant-select-show-arrow')).toBeTruthy();

    errSpy.mockRestore();
  });

  describe('maxCount', () => {
    it('should handle maxCount with different showCheckedStrategy', () => {
      const treeData = [
        {
          value: 'parent',
          title: 'parent',
          children: [
            { value: 'child1', title: 'child1' },
            { value: 'child2', title: 'child2' },
          ],
        },
      ];

      const { rerender, container } = render(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1']}
          showCheckedStrategy="SHOW_ALL"
          open
        />,
      );

      // 测试 SHOW_ALL 策略
      expect(container.querySelector('.ant-select-tree')).toBeTruthy();

      // 测试 SHOW_PARENT 策略
      rerender(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1']}
          showCheckedStrategy="SHOW_PARENT"
          open
        />,
      );

      // 测试 treeCheckStrictly
      rerender(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1']}
          treeCheckStrictly
          showCheckedStrategy="SHOW_ALL"
          open
        />,
      );
    });

    it('should process treeData correctly when maxCount is set', () => {
      const treeData = [
        {
          value: 'parent',
          title: 'parent',
          children: [
            { value: 'child1', title: 'child1' },
            { value: 'child2', title: 'child2' },
          ],
        },
      ];

      const { container, rerender } = render(
        <TreeSelect treeData={treeData} multiple maxCount={1} value={['child1']} open />,
      );

      // 检查未选中节点是否被禁用
      expect(container.querySelectorAll('.ant-select-tree-node-disabled').length).toBe(2);

      // 测试没有 maxCount 的情况
      rerender(<TreeSelect treeData={treeData} multiple value={['child1']} open />);
      expect(container.querySelectorAll('.ant-select-tree-node-disabled').length).toBe(0);
    });

    it('should handle parent node selection with maxCount', () => {
      const onChange = jest.fn();
      const treeData = [
        {
          value: 'parent',
          title: 'parent',
          children: [
            { value: 'child1', title: 'child1' },
            { value: 'child2', title: 'child2' },
          ],
        },
      ];

      const { container } = render(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1']}
          onChange={onChange}
          open
        />,
      );

      // 尝试选择父节点（这会导致选择所有子节点）
      fireEvent.click(container.querySelector('.ant-select-tree-node-content-wrapper')!);

      // 由于会超过 maxCount，所以不应该触发 onChange
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should handle child nodes selection with maxCount', () => {
      const onChange = jest.fn();
      const treeData = [
        {
          value: 'parent',
          title: 'parent',
          children: [
            { value: 'child1', title: 'child1' },
            { value: 'child2', title: 'child2' },
            { value: 'child3', title: 'child3' },
          ],
        },
      ];

      const { container } = render(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1']}
          onChange={onChange}
          open
        />,
      );

      // 选择第二个子节点（应该允许，因为还没达到 maxCount）
      const treeNodes = container.querySelectorAll('.ant-select-tree-node-content-wrapper');
      fireEvent.click(treeNodes[2]);

      expect(onChange).toHaveBeenCalledWith(
        ['child1', 'child2'],
        expect.any(Array),
        expect.any(Object),
      );

      // 尝试选择第三个子节点（不应该允许，因为已经达到 maxCount）
      fireEvent.click(treeNodes[3]);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should handle deselection correctly when maxCount is reached', () => {
      const onChange = jest.fn();
      const treeData = [
        {
          value: 'parent',
          title: 'parent',
          children: [
            { value: 'child1', title: 'child1' },
            { value: 'child2', title: 'child2' },
          ],
        },
      ];

      const { container } = render(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1', 'child2']}
          onChange={onChange}
          open
        />,
      );

      // 取消选择一个子节点
      const treeNodes = container.querySelectorAll('.ant-select-tree-node-content-wrapper');
      fireEvent.click(treeNodes[1]);

      expect(onChange).toHaveBeenCalledWith(['child2'], expect.any(Array), expect.any(Object));
    });

    it('should handle empty value and treeData', () => {
      const { container, rerender } = render(
        <TreeSelect treeData={[]} multiple maxCount={2} open />,
      );

      expect(container.querySelector('.ant-select-tree')).toBeTruthy();

      // 测试 value 为 undefined 的情况
      rerender(
        <TreeSelect
          treeData={[{ value: 'test', title: 'test' }]}
          multiple
          maxCount={2}
          value={undefined}
          open
        />,
      );

      expect(container.querySelector('.ant-select-tree-node-content-wrapper')).toBeTruthy();
    });
  });

  describe('handleChange', () => {
    it('should handle parent node deselection correctly', () => {
      const onChange = jest.fn();
      const treeData = [
        {
          value: 'parent',
          title: 'parent',
          children: [
            { value: 'child1', title: 'child1' },
            { value: 'child2', title: 'child2' },
          ],
        },
      ];

      const { container } = render(
        <TreeSelect
          treeData={treeData}
          multiple
          value={['parent', 'child1', 'child2']}
          onChange={onChange}
          open
        />,
      );

      // 模拟取消选择父节点
      fireEvent.click(container.querySelector('.ant-select-tree-node-content-wrapper')!);

      // 验证 onChange 调用
      expect(onChange).toHaveBeenCalled();
      const [newValue] = onChange.mock.calls[0];
      expect(newValue).toEqual([]);
    });

    it('should handle maxCount limit correctly', () => {
      const onChange = jest.fn();
      const treeData = [
        {
          value: 'parent',
          title: 'parent',
          children: [
            { value: 'child1', title: 'child1' },
            { value: 'child2', title: 'child2' },
          ],
        },
      ];

      const { container } = render(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1', 'child2']}
          onChange={onChange}
          open
        />,
      );

      // 尝试选择超过 maxCount 的节点
      fireEvent.click(container.querySelector('.ant-select-tree-node-content-wrapper')!);

      // 验证 onChange 没有被调用（因为超过了 maxCount）
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
