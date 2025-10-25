import * as React from 'react';

import Cascader from '..';
import type { CascaderProps } from '..';
import { render } from '../../../tests/utils';

describe('Cascader.Semantic', () => {
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
  it('support classNames and styles', () => {
    const classNames = {
      root: 'custom-root',
      prefix: 'custom-prefix',
      suffix: 'custom-suffix',
      input: 'custom-input',
      popup: {
        root: 'custom-popup',
        list: 'custom-list',
        listItem: 'custom-list-item',
      },
    };
    const styles = {
      root: { color: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(255, 165, 0)' },
      suffix: { color: 'rgb(255, 192, 203)' },
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
        classNames={classNames}
        styles={styles}
        prefix={<span>prefix</span>}
        suffix={<span>suffix</span>}
      />,
    );

    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.prefix}`)).toHaveStyle(styles.prefix);
    expect(container.querySelector(`.${classNames.suffix}`)).toHaveStyle(styles.suffix);
    expect(container.querySelector(`.${classNames.input}`)).toHaveStyle(styles.input);
    expect(container.querySelector(`.${classNames.popup.list}`)).toHaveStyle(styles.popup.list);
    expect(container.querySelector(`.${classNames.popup.listItem}`)).toHaveStyle(
      styles.popup.listItem,
    );
    expect(container.querySelector(`.${classNames.popup.root}`)).toHaveStyle(styles.popup.root);
  });

  it('support placeholder classNames and styles', () => {
    const classNames = {
      placeholder: 'custom-placeholder',
    };
    const styles = {
      placeholder: { color: 'rgb(128, 128, 128)' },
    };

    const { container } = render(
      <Cascader
        open
        options={options}
        classNames={classNames}
        styles={styles}
        placeholder="Please select"
      />,
    );

    expect(container.querySelector(`.${classNames.placeholder}`)).toHaveStyle(styles.placeholder);
  });

  it('support multiple mode classNames and styles', () => {
    const classNames = {
      root: 'custom-root',
      prefix: 'custom-prefix',
      suffix: 'custom-suffix',
      input: 'custom-input',
      content: 'custom-content',
      item: 'custom-item',
      itemContent: 'custom-item-content',
      itemRemove: 'custom-item-remove',
      popup: {
        root: 'custom-popup',
        list: 'custom-list',
        listItem: 'custom-list-item',
      },
    };
    const styles = {
      root: { background: 'rgb(255, 240, 240)' },
      prefix: { color: 'rgb(255, 165, 0)' },
      suffix: { color: 'rgb(255, 192, 203)' },
      input: { color: 'rgb(0, 255, 0)' },
      content: { background: 'rgb(240, 240, 255)' },
      item: { background: 'rgb(255, 255, 240)' },
      itemContent: { color: 'rgb(128, 0, 128)' },
      itemRemove: { color: 'rgb(255, 0, 0)' },
      popup: {
        root: { background: 'rgb(128, 0, 128)' },
        list: { color: 'rgb(0, 0, 255)' },
        listItem: { color: 'rgb(255, 255, 0)' },
      },
    };

    const { container } = render(
      <Cascader
        multiple
        open
        options={options}
        defaultValue={[
          [1, 'hangzhou'],
          ['jiangsu', 'nanjing'],
        ]}
        classNames={classNames}
        styles={styles}
        prefix={<span>prefix</span>}
        suffix={<span>suffix</span>}
      />,
    );

    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.prefix}`)).toHaveStyle(styles.prefix);
    expect(container.querySelector(`.${classNames.suffix}`)).toHaveStyle(styles.suffix);
    expect(container.querySelector(`.${classNames.input}`)).toHaveStyle(styles.input);
    expect(container.querySelector(`.${classNames.content}`)).toHaveStyle(styles.content);
    expect(container.querySelector(`.${classNames.item}`)).toHaveStyle(styles.item);
    expect(container.querySelector(`.${classNames.itemContent}`)).toHaveStyle(styles.itemContent);
    expect(container.querySelector(`.${classNames.itemRemove}`)).toHaveStyle(styles.itemRemove);
    expect(container.querySelector(`.${classNames.popup.list}`)).toHaveStyle(styles.popup.list);
    expect(container.querySelector(`.${classNames.popup.listItem}`)).toHaveStyle(
      styles.popup.listItem,
    );
    expect(container.querySelector(`.${classNames.popup.root}`)).toHaveStyle(styles.popup.root);
  });

  it('should support function-based classNames and styles', () => {
    const classNames: CascaderProps['classNames'] = (info) => {
      const { props } = info;
      return {
        root: props.disabled ? 'disabled-cascader' : 'enabled-cascader',
        prefix: 'dynamic-prefix',
        suffix: 'dynamic-suffix',
      };
    };

    const styles: CascaderProps['styles'] = (info) => {
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
      <Cascader
        open
        options={options}
        disabled
        classNames={classNames}
        styles={styles}
        prefix="prefix"
      />,
    );

    expect(container.querySelector('.disabled-cascader')).toHaveStyle({
      background: '#f5f5f5',
      opacity: '0.6',
    });
  });
});
