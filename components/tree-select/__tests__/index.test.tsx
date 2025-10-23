import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, Space } from 'antd';
import type { TreeNodeProps } from 'antd';

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

    fireEvent.mouseDown(container.querySelector('.ant-select')!);
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
  it('support classNames and styles for basic elements (root, prefix, input, suffix, content)', () => {
    const treeData = [
      {
        value: 'parent 1',
        title: 'parent 1',
        children: [
          {
            value: 'leaf1',
            title: 'my leaf',
          },
        ],
      },
    ];
    const customClassNames = {
      root: 'test-root',
      prefix: 'test-prefix',
      input: 'test-input',
      suffix: 'test-suffix',
      content: 'test-content',
    };
    const customStyles = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(0, 255, 0)' },
      input: { color: 'rgb(0, 0, 255)' },
      suffix: { color: 'rgb(255, 255, 0)' },
      content: { color: 'rgb(255, 192, 203)' },
    };
    const { container } = render(
      <TreeSelect
        classNames={customClassNames}
        styles={customStyles}
        showSearch
        prefix="P"
        suffixIcon={<SmileOutlined />}
        treeData={treeData}
      />,
    );

    const selectRoot = container.querySelector('.ant-tree-select');
    const prefix = container.querySelector('.ant-select-prefix');
    const content = container.querySelector('.ant-select-content');
    const suffix = container.querySelector('.ant-select-suffix');
    const input = container.querySelector('.ant-select-input');

    expect(selectRoot).toHaveClass(customClassNames.root);
    expect(prefix).toHaveClass(customClassNames.prefix);
    expect(content).toHaveClass(customClassNames.content);
    expect(suffix).toHaveClass(customClassNames.suffix);
    expect(input).toHaveClass(customClassNames.input);

    expect(selectRoot).toHaveStyle(customStyles.root);
    expect(prefix).toHaveStyle(customStyles.prefix);
    expect(content).toHaveStyle(customStyles.content);
    expect(suffix).toHaveStyle(customStyles.suffix);
    expect(input).toHaveStyle(customStyles.input);
  });

  it('support classNames and styles for placeholder', () => {
    const treeData = [
      {
        value: 'leaf1',
        title: 'Leaf 1',
      },
    ];
    const customClassNames = {
      placeholder: 'test-placeholder',
    };
    const customStyles = {
      placeholder: { color: 'rgb(165, 42, 42)' },
    };
    const { container } = render(
      <TreeSelect
        classNames={customClassNames}
        styles={customStyles}
        placeholder="Please select"
        treeData={treeData}
      />,
    );

    const placeholder = container.querySelector('.ant-select-placeholder');

    expect(placeholder).toHaveClass(customClassNames.placeholder);
    expect(placeholder).toHaveStyle(customStyles.placeholder);
  });

  it('support classNames and styles for items (item, itemContent, itemRemove)', () => {
    const treeData = [
      {
        value: 'parent 1',
        title: 'parent 1',
        children: [
          {
            value: 'parent 1-0',
            title: 'parent 1-0',
            children: [
              {
                value: 'leaf1',
                title: 'my leaf',
              },
              {
                value: 'leaf2',
                title: 'your leaf',
              },
            ],
          },
        ],
      },
    ];
    const customClassNames = {
      item: 'test-item',
      itemContent: 'test-item-content',
      itemRemove: 'test-item-remove',
      popup: {
        root: 'test-popup',
        item: 'test-popup-item',
        itemTitle: 'test-item-title',
      },
    };
    const customStyles = {
      item: { color: 'rgb(70, 130, 180)' },
      itemContent: { color: 'rgb(255, 20, 147)' },
      itemRemove: { color: 'rgb(34, 139, 34)' },
      popup: {
        root: { color: 'rgb(255, 165, 0)' },
        item: { color: 'rgb(0, 0, 0)' },
        itemTitle: { color: 'rgb(128, 0, 128)' },
      },
    };
    const { container } = render(
      <TreeSelect
        classNames={customClassNames}
        styles={customStyles}
        multiple
        value={['leaf1']}
        open
        treeDefaultExpandAll
        treeData={treeData}
      />,
    );

    const selectedItem = container.querySelector('.ant-select-selection-item');
    const itemContent = container.querySelector('.ant-select-selection-item-content');
    const itemRemove = container.querySelector('.ant-select-selection-item-remove');
    const popup = container.querySelector('.ant-tree-select-dropdown');
    const itemTitle = container.querySelector('.ant-select-tree-title');

    expect(selectedItem).toHaveClass(customClassNames.item);
    expect(itemContent).toHaveClass(customClassNames.itemContent);
    expect(itemRemove).toHaveClass(customClassNames.itemRemove);
    expect(popup).toHaveClass(customClassNames.popup.root);
    expect(itemTitle).toHaveClass(customClassNames.popup.itemTitle);

    expect(selectedItem).toHaveStyle(customStyles.item);
    expect(itemContent).toHaveStyle(customStyles.itemContent);
    expect(itemRemove).toHaveStyle(customStyles.itemRemove);
    expect(popup).toHaveStyle(customStyles.popup.root);
    expect(itemTitle).toHaveStyle(customStyles.popup.itemTitle);

    // Test popup item if it exists
    const popupItem = container.querySelector(`.${customClassNames.popup.item}`);
    if (popupItem) {
      expect(popupItem).toHaveStyle(customStyles.popup.item);
    }
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

  it('support classNames and styles as functions', () => {
    const treeData = [
      {
        value: 'parent 1',
        title: 'parent 1',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
        ],
      },
    ];

    const { container } = render(
      <TreeSelect
        treeData={treeData}
        placeholder="Please select"
        disabled={false}
        size="middle"
        classNames={(info) => ({
          root: info.props.disabled ? 'disabled-tree-select-root' : 'enabled-tree-select-root',
          input: `dynamic-input-${info.props.size}`,
          suffix: 'dynamic-suffix',
          content: 'dynamic-content',
          placeholder: 'dynamic-placeholder',
          item: 'dynamic-item',
          itemContent: 'dynamic-item-content',
          itemRemove: 'dynamic-item-remove',
          popup: {
            root: 'dynamic-popup-root',
            item: info.props.disabled ? 'disabled-item' : 'enabled-item',
            itemTitle: 'dynamic-item-title',
          },
        })}
        styles={(info) => ({
          root: {
            opacity: info.props.disabled ? 0.5 : 1,
            backgroundColor: info.props.disabled ? 'gray' : 'white',
          },
          input: { fontSize: '14px' },
          suffix: { color: 'blue' },
          content: { padding: '4px' },
          placeholder: { color: 'gray' },
          item: { margin: '2px' },
          itemContent: { fontWeight: 'normal' },
          itemRemove: { cursor: 'pointer' },
          popup: {
            root: { zIndex: 1000 },
            item: { padding: '6px' },
            itemTitle: { color: 'black' },
          },
        })}
      />,
    );

    const treeSelectElement = container.querySelector('.ant-select');
    expect(treeSelectElement).toHaveClass('enabled-tree-select-root');
    expect(treeSelectElement).toHaveAttribute('style');
    const style = treeSelectElement?.getAttribute('style');
    expect(style).toContain('opacity: 1');
    expect(style).toContain('background-color: white');
  });
});
