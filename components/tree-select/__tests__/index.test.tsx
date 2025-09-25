import React from 'react';
import { Button, ConfigProvider, Input, Space, TreeNodeProps } from 'antd';

import TreeSelect, { TreeNode } from '..';
import { resetWarned } from '../../_util/warning';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen } from '../../../tests/utils';

describe('TreeSelect', () => {
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

  it('legacy popupClassName', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<TreeSelect popupClassName="legacy" open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `popupClassName` is deprecated. Please use `classNames.popup.root` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('legacy dropdownClassName', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<TreeSelect dropdownClassName="legacy" open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `dropdownClassName` is deprecated. Please use `classNames.popup.root` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('legacy dropdownMatchSelectWidth', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<TreeSelect dropdownMatchSelectWidth open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `dropdownMatchSelectWidth` is deprecated. Please use `popupMatchSelectWidth` instead.',
    );

    errSpy.mockRestore();
  });

  it('legacy dropdownStyle', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<TreeSelect dropdownStyle={{ color: 'red' }} open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `dropdownStyle` is deprecated. Please use `styles.popup.root` instead.',
    );
    expect(container.querySelector('.ant-select-dropdown')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('legacy dropdownRender', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <TreeSelect dropdownRender={(menu) => <div className="custom-dropdown">{menu}</div>} open />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `dropdownRender` is deprecated. Please use `popupRender` instead.',
    );
    expect(container.querySelector('.custom-dropdown')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('legacy onDropdownVisibleChange', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onDropdownVisibleChange = jest.fn();

    const { container } = render(<TreeSelect onDropdownVisibleChange={onDropdownVisibleChange} />);

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `onDropdownVisibleChange` is deprecated. Please use `onOpenChange` instead.',
    );

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    expect(onDropdownVisibleChange).toHaveBeenCalled();

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

  it('TreeSelect ContextIsolator', () => {
    const { container } = render(
      <Space.Compact>
        <TreeSelect
          open
          defaultValue="lucy"
          style={{ width: 120 }}
          popupRender={(menu) => {
            return (
              <div>
                {menu}
                <Button>123</Button>
                <Input style={{ width: 50 }} />
              </div>
            );
          }}
          treeData={[
            { value: 'jack', title: 'Jack', children: [{ value: 'Emily', title: 'Emily' }] },
            { value: 'lucy', title: 'Lucy' },
          ]}
        />
        <Button className="test-button">test</Button>
      </Space.Compact>,
    );
    const compactButton = container.querySelector('.test-button');
    const popupElement = document.querySelector('.ant-select-dropdown');
    // selector should have compact
    expect(compactButton).toBeInTheDocument();
    expect(compactButton!.className.includes('compact')).toBeTruthy();
    // popupRender element haven't compact
    expect(popupElement).toBeInTheDocument();
    const button = popupElement!.querySelector('button');
    const input = popupElement!.querySelector('input');
    expect(button!.className.includes('compact')).toBeFalsy();
    expect(input!.className.includes('compact')).toBeFalsy();
  });

  it('should support switcherIcon from ConfigProvider', () => {
    render(
      <ConfigProvider
        treeSelect={{
          switcherIcon: ({ expanded }: TreeNodeProps) => {
            return expanded ? (
              <span data-testid="custom-expanded">▼</span>
            ) : (
              <span data-testid="custom-collapsed">▶</span>
            );
          },
        }}
      >
        <TreeSelect open>
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf" key="random" />
              <TreeNode value="leaf2" title="your leaf" key="random1" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </ConfigProvider>,
    );

    const customIcon = screen.getByTestId(/custom-(expanded|collapsed)/);
    expect(customIcon).toBeInTheDocument();
  });
});
