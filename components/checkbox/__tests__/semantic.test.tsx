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

    expect(rootElement).toHaveClass('custom-root');
    expect(iconElement).toHaveClass('custom-icon');
    expect(labelElement).toHaveClass('custom-label');

    expect(rootElement).toHaveStyle({ backgroundColor: 'red' });
    expect(iconElement).toHaveStyle({ backgroundColor: 'black' });
    expect(labelElement).toHaveStyle({ backgroundColor: 'gray' });
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

    expect(rootElement).toHaveClass('enabled-checkbox');
    expect(iconElement).toHaveClass('enabled-icon');
    expect(labelElement).toHaveClass('enabled-label');

    expect(rootElement).toHaveStyle({ backgroundColor: 'lightblue' });
    expect(iconElement).toHaveStyle({ color: 'blue' });
    expect(labelElement).toHaveStyle({ color: 'darkblue' });
  });
});
