import * as React from 'react';

import Select from '..';
import { render } from '../../../tests/utils';
import type { SelectProps } from '..';

describe('Select.Semantic', () => {
  const options = [
    {
      value: 'GuangZhou',
      label: 'GuangZhou',
    },
    {
      value: 'ShenZhen',
      label: 'ShenZhen',
    },
  ];
  it('support classNames and styles', () => {
    const customClassNames = {
      root: 'custom-root',
      input: 'custom-input',
      popup: {
        root: 'custom-popup',
        list: 'custom-list',
        listItem: 'custom-list-item',
      },
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      input: { color: 'rgb(0, 255, 0)' },
      popup: {
        root: { color: 'rgb(128, 0, 128)' },
        list: { color: 'rgb(0, 0, 255)' },
        listItem: { color: 'rgb(255, 255, 0)' },
      },
    };

    const { container } = render(
      <Select
        open
        options={options}
        defaultValue={'GuangZhou'}
        classNames={customClassNames}
        styles={customStyles}
      />,
    );
    const root = container.querySelector('.ant-select');
    const input = container.querySelector('.ant-select-selection-search-input');
    const list = container.querySelector('.rc-virtual-list');
    const listItem = container.querySelector('.ant-select-item');
    const popup = container.querySelector('.ant-select-dropdown');

    expect(root).toHaveClass(customClassNames.root);
    expect(input).toHaveClass(customClassNames.input);
    expect(list).toHaveClass(customClassNames.popup.list);
    expect(listItem).toHaveClass(customClassNames.popup.listItem);
    expect(popup).toHaveClass(customClassNames.popup.root);

    expect(root).toHaveStyle(customStyles.root);
    expect(input).toHaveStyle(customStyles.input);
    expect(list).toHaveStyle(customStyles.popup.list);
    expect(listItem).toHaveStyle(customStyles.popup.listItem);
    expect(popup).toHaveStyle(customStyles.popup.root);
  });
  it('should support function-based classNames and styles', () => {
    const classNamesFn: SelectProps['classNames'] = (info) => {
      const { props } = info;
      return {
        root: props.disabled ? 'disabled-select' : 'enabled-select',
        prefix: 'dynamic-prefix',
        suffix: 'dynamic-suffix',
      };
    };

    const stylesFn: SelectProps['styles'] = (info) => {
      const { props } = info;
      return {
        root: {
          background: props.disabled ? '#f5f5f5' : '#ffffff',
          opacity: props.disabled ? 0.6 : 1,
        },
        prefix: {
          color: props.disabled ? '#d9d9d9' : '#52c41a',
        },
        suffix: {
          color: props.disabled ? '#d9d9d9' : '#52c41a',
        },
      };
    };
    const { container } = render(
      <Select
        open
        options={options}
        disabled
        classNames={classNamesFn}
        styles={stylesFn}
        prefix="prefix"
      />,
    );

    const cascader = container.querySelector('.ant-select');
    expect(cascader).toHaveClass('disabled-select');
    expect(cascader).toHaveStyle({
      background: '#f5f5f5',
      opacity: '0.6',
    });
  });
});
