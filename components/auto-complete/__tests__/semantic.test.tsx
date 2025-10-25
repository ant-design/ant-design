import React from 'react';

import AutoComplete from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('AutoComplete.Semantic', () => {
  mountTest(AutoComplete);
  rtlTest(AutoComplete);

  it('should support classNames and styles', () => {
    const classNames = {
      root: 'custom-root',
      prefix: 'custom-prefix',
      placeholder: 'custom-placeholder',
      content: 'custom-content',
      popup: {
        root: 'custom-popup',
        list: 'custom-list',
        listItem: 'custom-list-item',
      },
    };
    const styles = {
      root: { color: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(255, 165, 0)' },
      placeholder: { color: 'rgb(255, 192, 203)' },
      content: { color: 'rgb(165, 42, 42)' },
      popup: {
        root: { color: 'rgb(128, 0, 128)' },
        list: { color: 'rgb(0, 0, 255)' },
        listItem: { color: 'rgb(255, 255, 0)' },
      },
    };
    const { container } = render(
      <AutoComplete
        options={[{ label: '123', value: '123' }]}
        classNames={classNames}
        styles={styles}
        prefix={<span>prefix</span>}
        placeholder="placeholder text"
        open
      />,
    );

    expect(container.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
    expect(container.querySelector(`.${classNames.prefix}`)).toHaveStyle(styles.prefix);
    expect(container.querySelector(`.${classNames.placeholder}`)).toHaveStyle(styles.placeholder);
    expect(container.querySelector(`.${classNames.content}`)).toHaveStyle(styles.content);
    expect(container.querySelector(`.${classNames.popup.root}`)).toHaveStyle(styles.popup.root);
    expect(container.querySelector(`.${classNames.popup.list}`)).toHaveStyle(styles.popup.list);
    expect(container.querySelector(`.${classNames.popup.listItem}`)).toHaveStyle(
      styles.popup.listItem,
    );
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

    expect(container.querySelector('.custom-error-root')).toHaveStyle({
      backgroundColor: 'rgb(0, 255, 255)',
    });
  });
});
