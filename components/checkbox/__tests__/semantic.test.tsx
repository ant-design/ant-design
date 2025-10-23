import React from 'react';

import Checkbox from '..';
import type { CheckboxProps } from '..';
import { render } from '../../../tests/utils';

describe('Checkbox.Semantic', () => {
  it('should support custom styles', () => {
    const customClassNames = {
      root: 'custom-root',
      icon: 'custom-icon',
      label: 'custom-label',
    };

    const customStyles = {
      root: { backgroundColor: 'red' },
      icon: { backgroundColor: 'black' },
      label: { backgroundColor: 'gray' },
    };
    const { container } = render(
      <Checkbox classNames={customClassNames} styles={customStyles}>
        Checkbox
      </Checkbox>,
    );

    const rootElement = container.querySelector('.ant-checkbox-wrapper') as HTMLElement;
    const iconElement = container.querySelector('.ant-checkbox') as HTMLElement;
    const labelElement = container.querySelector('.ant-checkbox-label') as HTMLElement;

    expect(rootElement.classList).toContain('custom-root');
    expect(iconElement.classList).toContain('custom-icon');
    expect(labelElement.classList).toContain('custom-label');

    expect(rootElement.style.backgroundColor).toBe('red');
    expect(iconElement.style.backgroundColor).toBe('black');
    expect(labelElement.style.backgroundColor).toBe('gray');
  });

  it('should support function-based classNames and styles', () => {
    const classNamesFn = ({ props }: { props: CheckboxProps }) => {
      if (props.disabled) {
        return { root: 'disabled-checkbox', icon: 'disabled-icon', label: 'disabled-label' };
      }
      return { root: 'enabled-checkbox', icon: 'enabled-icon', label: 'enabled-label' };
    };

    const stylesFn = ({ props }: { props: CheckboxProps }) => {
      if (props.disabled) {
        return {
          root: { backgroundColor: 'gray' },
          icon: { color: 'darkgray' },
          label: { color: 'lightgray' },
        };
      }
      return {
        root: { backgroundColor: 'lightblue' },
        icon: { color: 'blue' },
        label: { color: 'darkblue' },
      };
    };

    const { container } = render(
      <Checkbox disabled={false} classNames={classNamesFn} styles={stylesFn}>
        Function Checkbox
      </Checkbox>,
    );

    const rootElement = container.querySelector('.ant-checkbox-wrapper') as HTMLElement;
    const iconElement = container.querySelector('.ant-checkbox') as HTMLElement;
    const labelElement = container.querySelector('.ant-checkbox-label') as HTMLElement;

    expect(rootElement.classList).toContain('enabled-checkbox');
    expect(iconElement.classList).toContain('enabled-icon');
    expect(labelElement.classList).toContain('enabled-label');

    expect(rootElement.style.backgroundColor).toBe('lightblue');
    expect(iconElement.style.color).toBe('blue');
    expect(labelElement.style.color).toBe('darkblue');
  });
});
