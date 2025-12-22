import * as React from 'react';

import Select from '..';
import type { SelectClassNamesType, SelectProps } from '..';
import { render } from '../../../tests/utils';

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
    const classNames = {
      root: 'custom-root',
      prefix: 'custom-prefix',
      suffix: 'custom-suffix',
      input: 'custom-input',
      placeholder: 'custom-placeholder',
      content: 'custom-content',
      popup: {
        root: 'custom-popup',
        list: 'custom-list',
        listItem: 'custom-list-item',
      },
    } satisfies SelectClassNamesType;
    const styles = {
      root: { color: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(0, 128, 255)' },
      suffix: { color: 'rgb(255, 128, 0)' },
      input: { color: 'rgb(0, 255, 0)' },
      placeholder: { color: 'rgb(255, 192, 203)' },
      content: { color: 'rgb(255, 165, 0)' },
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
        placeholder="placeholder text"
        classNames={classNames}
        styles={styles}
        prefix={<span>Pre</span>}
        suffix={<span>Suf</span>}
      />,
    );
    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.prefix}`)).toHaveStyle(styles.prefix);
    expect(container.querySelector(`.${classNames.suffix}`)).toHaveStyle(styles.suffix);
    expect(container.querySelector(`.${classNames.placeholder}`)).toHaveStyle(styles.placeholder);
    expect(container.querySelector(`.${classNames.input}`)).toHaveStyle(styles.input);
    expect(container.querySelector(`.${classNames.content}`)).toHaveStyle(styles.content);
    expect(container.querySelector(`.${classNames.popup?.root}`)).toHaveStyle(styles.popup.root);
    expect(container.querySelector(`.${classNames.popup?.list}`)).toHaveStyle(styles.popup.list);
    expect(container.querySelector(`.${classNames.popup?.listItem}`)).toHaveStyle(
      styles.popup.listItem,
    );
  });

  it('support multiple mode classNames and styles', () => {
    const customClassNames = {
      root: 'custom-root',
      prefix: 'custom-prefix',
      suffix: 'custom-suffix',
      item: 'custom-item',
      itemContent: 'custom-item-content',
      itemRemove: 'custom-item-remove',
      popup: {
        root: 'custom-popup',
        list: 'custom-list',
        listItem: 'custom-list-item',
      },
    } satisfies SelectClassNamesType;
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(0, 128, 255)' },
      suffix: { color: 'rgb(255, 128, 0)' },
      item: { background: 'rgb(255, 255, 240)' },
      itemContent: { color: 'rgb(128, 0, 128)' },
      itemRemove: { color: 'rgb(255, 0, 0)' },
      popup: {
        root: { color: 'rgb(128, 0, 128)' },
        list: { color: 'rgb(0, 0, 255)' },
        listItem: { color: 'rgb(255, 255, 0)' },
      },
    };

    const { container } = render(
      <Select
        mode="multiple"
        open
        options={options}
        defaultValue={['GuangZhou']}
        classNames={customClassNames}
        styles={customStyles}
        prefix={<span>Pre</span>}
        suffix={<span>Suf</span>}
      />,
    );
    const root = container.querySelector('.ant-select');
    const prefix = container.querySelector('.ant-select-prefix');
    const suffix = container.querySelector('.ant-select-suffix');
    const list = container.querySelector('.rc-virtual-list');
    const listItem = container.querySelector('.ant-select-item');
    const popup = container.querySelector('.ant-select-dropdown');
    const item = container.querySelector(`.${customClassNames.item}`);
    const itemContent = container.querySelector(`.${customClassNames.itemContent}`);
    const itemRemove = container.querySelector(`.${customClassNames.itemRemove}`);

    expect(root).toHaveClass(customClassNames.root);
    expect(prefix).toHaveClass(customClassNames.prefix);
    expect(suffix).toHaveClass(customClassNames.suffix);
    if (list) {
      expect(list).toHaveClass(customClassNames.popup.list);
    }
    if (listItem) {
      expect(listItem).toHaveClass(customClassNames.popup.listItem);
    }
    if (popup) {
      expect(popup).toHaveClass(customClassNames.popup.root);
    }

    expect(root).toHaveStyle(customStyles.root);
    expect(prefix).toHaveStyle(customStyles.prefix);
    expect(suffix).toHaveStyle(customStyles.suffix);
    if (list) {
      expect(list).toHaveStyle(customStyles.popup.list);
    }
    if (listItem) {
      expect(listItem).toHaveStyle(customStyles.popup.listItem);
    }
    if (popup) {
      expect(popup).toHaveStyle(customStyles.popup.root);
    }
    if (item) {
      expect(item).toHaveStyle(customStyles.item);
    }
    if (itemContent) {
      expect(itemContent).toHaveStyle(customStyles.itemContent);
    }
    if (itemRemove) {
      expect(itemRemove).toHaveStyle(customStyles.itemRemove);
    }
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

    const selectRoot = container.querySelector('.ant-select');
    expect(selectRoot).toHaveClass('disabled-select');
    expect(selectRoot).toHaveStyle({
      background: '#f5f5f5',
      opacity: '0.6',
    });
  });
});
