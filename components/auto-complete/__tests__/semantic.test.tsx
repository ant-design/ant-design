import React from 'react';

import AutoComplete from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('AutoComplete.Semantic', () => {
  mountTest(AutoComplete);
  rtlTest(AutoComplete);

  it('should support classNames and styles', () => {
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
      input: { color: 'rgb(0, 128, 0)' },
      popup: {
        root: { color: 'rgb(128, 0, 128)' },
        list: { color: 'rgb(0, 0, 255)' },
        listItem: { color: 'rgb(255, 255, 0)' },
      },
    };
    const { container } = render(
      <AutoComplete
        options={[{ label: '123', value: '123' }]}
        classNames={customClassNames}
        styles={customStyles}
        open
      />,
    );

    const root = container.querySelector('.ant-select-auto-complete');
    const input = container.querySelector('.ant-select-selection-search-input');
    const list = container.querySelector('.rc-virtual-list');
    const listItem = container.querySelector('.ant-select-item-option');
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

  it('should support function classNames and styles', () => {
    const classNamesFn = (info: { props: any }) => {
      if (info.props.status === 'error') {
        return { root: 'custom-error-root' };
      }
      return { root: 'custom-normal-root' };
    };

    const stylesFn = (info: { props: any }) => {
      if (info.props.status === 'warning') {
        return { root: { backgroundColor: 'rgb(255, 255, 0)' } };
      }
      return { root: { backgroundColor: 'rgb(0, 255, 255)' } };
    };

    const { container } = render(
      <AutoComplete
        options={[{ label: '123', value: '123' }]}
        status="error"
        classNames={classNamesFn}
        styles={stylesFn}
      />,
    );

    const root = container.querySelector('.ant-select-auto-complete');
    expect(root).toHaveClass('custom-error-root');
    expect(root).toHaveStyle({ backgroundColor: 'rgb(0, 255, 255)' });
  });
});
