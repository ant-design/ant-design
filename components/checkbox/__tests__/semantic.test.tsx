import React from 'react';

import Checkbox from '..';
import type { CheckboxProps } from '..';
import { render } from '../../../tests/utils';

describe('Checkbox.Semantic', () => {
  it('should support custom styles', () => {
    const customClassNames: CheckboxProps['classNames'] = {
      root: 'custom-root',
      icon: 'custom-icon',
      label: 'custom-label',
    };

    const customStyles: CheckboxProps['styles'] = {
      root: { backgroundColor: 'rgb(255, 0, 0)' },
      icon: { backgroundColor: 'rgb(0, 0, 0)' },
      label: { backgroundColor: 'rgb(128, 128, 128)' },
    };

    const { container } = render(
      <Checkbox classNames={customClassNames} styles={customStyles}>
        Checkbox
      </Checkbox>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-checkbox-wrapper');
    const iconElement = container.querySelector<HTMLElement>('.ant-checkbox');
    const labelElement = container.querySelector<HTMLElement>('.ant-checkbox-label');

    expect(rootElement).toHaveClass(customClassNames.root as string);
    expect(iconElement).toHaveClass(customClassNames.icon as string);
    expect(labelElement).toHaveClass(customClassNames.label as string);

    expect(rootElement).toHaveStyle({ backgroundColor: customStyles.root?.backgroundColor });
    expect(iconElement).toHaveStyle({ backgroundColor: customStyles.icon?.backgroundColor });
    expect(labelElement).toHaveStyle({ backgroundColor: customStyles.label?.backgroundColor });
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
          root: { color: 'rgb(128, 128, 128)' },
          icon: { color: 'rgb(169, 169, 169)' },
          label: { color: 'rgb(69, 69, 69)' },
        };
      }
      return {
        root: { color: 'rgb(173, 216, 230)' },
        icon: { color: 'rgb(0, 0, 255)' },
        label: { color: 'rgb(139, 0, 139)' },
      };
    };

    const { container } = render(
      <Checkbox disabled={false} classNames={classNamesFn} styles={stylesFn}>
        Function Checkbox
      </Checkbox>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-checkbox-wrapper');
    const iconElement = container.querySelector<HTMLElement>('.ant-checkbox');
    const labelElement = container.querySelector<HTMLElement>('.ant-checkbox-label');

    expect(rootElement).toHaveClass('enabled-checkbox');
    expect(iconElement).toHaveClass('enabled-icon');
    expect(labelElement).toHaveClass('enabled-label');

    expect(rootElement).toHaveStyle({ color: 'rgb(173, 216, 230)' });
    expect(iconElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(labelElement).toHaveStyle({ color: 'rgb(139, 0, 139)' });
  });

  it('should get correct checked prop when defaultChecked is true', () => {
    const classNamesFn: CheckboxProps['classNames'] = ({ props }) => {
      return {
        root: props.checked ? 'checked-checkbox' : 'unchecked-checkbox',
      };
    };

    const { container } = render(
      <Checkbox defaultChecked classNames={classNamesFn}>
        Checkbox
      </Checkbox>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-checkbox-wrapper');
    expect(rootElement).toHaveClass('checked-checkbox');
  });
});
