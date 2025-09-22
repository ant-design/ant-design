import * as React from 'react';

import Cascader from '..';
import { render } from '../../../tests/utils';

describe('Cascader.Semantic', () => {
  it('support classNames and styles', () => {
    const options = [
      {
        value: 1,
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
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
      <Cascader
        open
        options={options}
        defaultValue={[1, 'hangzhou']}
        classNames={customClassNames}
        styles={customStyles}
      />,
    );
    const root = container.querySelector('.ant-cascader');
    const input = container.querySelector('.ant-select-selection-search-input');
    const list = container.querySelector('.ant-cascader-menu');
    const listItem = container.querySelector('.ant-cascader-menu-item');
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
});
