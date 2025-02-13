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
          treeDefaultExpandAll
        />,
      );

      jest.runAllTimers();

      expect(container.querySelector('.ant-select-tree')).toBeTruthy();

      rerender(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1']}
          showCheckedStrategy="SHOW_PARENT"
          open
          treeDefaultExpandAll
        />,
      );

      rerender(
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={2}
          value={['child1']}
          treeCheckStrictly
          showCheckedStrategy="SHOW_ALL"
          open
          treeDefaultExpandAll
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
        <TreeSelect
          treeData={treeData}
          multiple
          maxCount={1}
          value={['child1']}
          open
          treeDefaultExpandAll
          treeCheckable
        />,
      );

      jest.runAllTimers();

      const disabledNodes = container.querySelectorAll('.ant-select-tree-checkbox-disabled');
      expect(disabledNodes.length).toBe(2);

      rerender(
        <TreeSelect
          treeData={treeData}
          multiple
          value={['child1']}
          open
          treeDefaultExpandAll
          treeCheckable
        />,
      );

      jest.runAllTimers();

      expect(container.querySelectorAll('.ant-select-tree-checkbox-disabled').length).toBe(0);
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
          maxCount={1}
          value={[]}
          onChange={onChange}
          open
          treeDefaultExpandAll
          treeCheckable
          treeCheckStrictly
        />,
      );

      jest.runAllTimers();

      const checkbox = container.querySelector('.ant-select-tree-checkbox');
      if (checkbox) {
        fireEvent.click(checkbox);
      }

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
          value={[{ value: 'child1', label: 'child1' }]}
          onChange={onChange}
          open
          treeDefaultExpandAll
          treeCheckable
          treeCheckStrictly
          labelInValue
        />,
      );

      jest.runAllTimers();

      const checkboxes = container.querySelectorAll('.ant-select-tree-checkbox');
      if (checkboxes[2]) {
        fireEvent.click(checkboxes[2]);
      }

      expect(onChange).toHaveBeenCalledWith(
        [
          { value: 'child1', label: 'child1', disabled: false, halfChecked: undefined },
          { value: 'child2', label: 'child2', disabled: false, halfChecked: undefined },
        ],
        null,
        expect.any(Object),
      );

      onChange.mockClear();

      if (checkboxes[3]) {
        fireEvent.click(checkboxes[3]);
      }
      expect(onChange).not.toHaveBeenCalled();
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
          treeDefaultExpandAll
          treeCheckable
        />,
      );

      jest.runAllTimers();

      const checkboxes = container.querySelectorAll('.ant-select-tree-checkbox-checked');
      if (checkboxes[1]) {
        fireEvent.click(checkboxes[1]);
      }

      expect(onChange).toHaveBeenCalledWith(['child2'], expect.any(Array), expect.any(Object));
    });

    it('should handle empty value and treeData', () => {
      const { container, rerender } = render(
        <TreeSelect treeData={[]} multiple maxCount={2} open treeDefaultExpandAll />,
      );

      jest.runAllTimers();

      expect(container.querySelector('.ant-select-empty')).toBeTruthy();

      rerender(
        <TreeSelect
          treeData={[{ value: 'test', title: 'test' }]}
          multiple
          maxCount={2}
          value={undefined}
          open
          treeDefaultExpandAll
        />,
      );

      jest.runAllTimers();

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
          value={[
            { value: 'parent', label: 'parent' },
            { value: 'child1', label: 'child1' },
            { value: 'child2', label: 'child2' },
          ]}
          onChange={onChange}
          open
          treeDefaultExpandAll
          treeCheckable
          treeCheckStrictly
          labelInValue
        />,
      );

      jest.runAllTimers();

      const checkboxes = container.querySelectorAll('.ant-select-tree-checkbox-checked');
      if (checkboxes[0]) {
        fireEvent.click(checkboxes[0]);
      }

      expect(onChange).toHaveBeenCalled();
      const [newValue] = onChange.mock.calls[0];
      expect(newValue).toEqual([
        { value: 'child1', label: 'child1', disabled: undefined, halfChecked: undefined },
        { value: 'child2', label: 'child2', disabled: undefined, halfChecked: undefined },
      ]);
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
          maxCount={1}
          value={['child1']}
          onChange={onChange}
          open
          treeDefaultExpandAll
          treeCheckable
          treeCheckStrictly
        />,
      );

      jest.runAllTimers();

      const checkbox = container.querySelector('.ant-select-tree-checkbox');
      if (checkbox) {
        fireEvent.click(checkbox);
      }

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
