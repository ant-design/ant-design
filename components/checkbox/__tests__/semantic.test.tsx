import React from 'react';

import type { CheckboxProps } from '..';
import Checkbox from '..';
import type { GetProp } from '../../_util/type';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';

describe('Checkbox.Semantic', () => {
  it('should support custom styles', () => {
    const customClassNames: Required<GetProp<CheckboxProps, 'classNames', 'Return'>> = {
      root: 'custom-root',
      icon: 'custom-icon',
      label: 'custom-label',
    };

    const customStyles: Required<GetProp<CheckboxProps, 'styles', 'Return'>> = {
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

    expect(rootElement).toHaveClass(customClassNames.root);
    expect(iconElement).toHaveClass(customClassNames.icon);
    expect(labelElement).toHaveClass(customClassNames.label);

    expect(rootElement).toHaveStyle({ backgroundColor: customStyles.root.backgroundColor });
    expect(iconElement).toHaveStyle({ backgroundColor: customStyles.icon.backgroundColor });
    expect(labelElement).toHaveStyle({ backgroundColor: customStyles.label.backgroundColor });
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
    const classNamesFn: GetProp<CheckboxProps, 'classNames'> = ({
      props,
    }: {
      props: Pick<CheckboxProps, 'checked'>;
    }) => {
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
  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        checkbox={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        <Checkbox styles={semanticRootStylePriority.styles} style={semanticRootStylePriority.style}>
          Checkbox
        </Checkbox>
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-checkbox-wrapper'));
  });

  describe('Checkbox.Group', () => {
    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Pear', value: 'pear' },
    ];

    it('should support classNames and styles as objects', () => {
      const { container } = render(
        <Checkbox.Group
          options={options}
          classNames={{
            root: 'custom-group-root',
            item: 'custom-group-item',
            itemIcon: 'custom-group-item-icon',
            itemLabel: 'custom-group-item-label',
          }}
          styles={{
            root: { backgroundColor: 'rgb(0, 255, 0)' },
            item: { color: 'rgb(255, 0, 0)' },
            itemIcon: { borderColor: 'rgb(0, 0, 255)' },
            itemLabel: { fontWeight: 'bold' },
          }}
        />,
      );

      const group = container.querySelector('.ant-checkbox-group');
      const items = container.querySelectorAll('.ant-checkbox-wrapper');
      const icons = container.querySelectorAll('.ant-checkbox');
      const labels = container.querySelectorAll('.ant-checkbox-label');

      expect(group).toHaveClass('custom-group-root');
      expect(group).toHaveStyle({ backgroundColor: 'rgb(0, 255, 0)' });

      items.forEach((item) => {
        expect(item).toHaveClass('custom-group-item');
        expect(item).toHaveStyle({ color: 'rgb(255, 0, 0)' });
      });
      icons.forEach((icon) => {
        expect(icon).toHaveClass('custom-group-item-icon');
        expect(icon).toHaveStyle({ borderColor: 'rgb(0, 0, 255)' });
      });
      labels.forEach((label) => {
        expect(label).toHaveClass('custom-group-item-label');
        expect(label).toHaveStyle({ fontWeight: 'bold' });
      });
    });

    it('should support classNames and styles as functions', () => {
      const { container } = render(
        <Checkbox.Group
          disabled={false}
          options={options}
          classNames={({ props }) => ({
            root: props.disabled ? 'group-disabled' : 'group-enabled',
            item: props.value?.includes('apple') ? 'item-checked' : 'item-unchecked',
          })}
          styles={({ props }) => ({
            root: { padding: props.disabled ? '4px' : '8px' },
            itemLabel: { fontWeight: props.options?.length === 2 ? 'bold' : 'normal' },
          })}
          value={['apple']}
        />,
      );

      expect(container.querySelector('.ant-checkbox-group')).toHaveClass('group-enabled');
      expect(container.querySelector('.ant-checkbox-group')).toHaveStyle({ padding: '8px' });

      container.querySelectorAll('.ant-checkbox-wrapper').forEach((item) => {
        expect(item).toHaveClass('item-checked');
      });
      container.querySelectorAll('.ant-checkbox-label').forEach((label) => {
        expect(label).toHaveStyle({ fontWeight: 'bold' });
      });
    });

    it('should allow option style to override group item styles', () => {
      const { container } = render(
        <Checkbox.Group
          styles={{
            item: { color: 'rgb(255, 0, 0)', backgroundColor: 'rgb(0, 255, 0)' },
          }}
          options={[
            { label: 'Apple', value: 'apple', style: { color: 'rgb(0, 0, 255)' } },
            { label: 'Pear', value: 'pear' },
          ]}
        />,
      );

      const items = container.querySelectorAll<HTMLElement>('.ant-checkbox-wrapper');
      expect(items[0]).toHaveStyle({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
      });
      expect(items[1]).toHaveStyle({
        color: 'rgb(255, 0, 0)',
        backgroundColor: 'rgb(0, 255, 0)',
      });
    });

    it('should allow Checkbox styles to override group item styles', () => {
      const { container } = render(
        <Checkbox.Group
          styles={{
            item: { color: 'rgb(255, 0, 0)' },
            itemIcon: { borderColor: 'rgb(0, 255, 0)' },
          }}
        >
          <Checkbox value="A" styles={{ root: { color: 'rgb(0, 0, 255)' } }}>
            A
          </Checkbox>
          <Checkbox value="B">B</Checkbox>
        </Checkbox.Group>,
      );

      const items = container.querySelectorAll<HTMLElement>('.ant-checkbox-wrapper');
      const icons = container.querySelectorAll<HTMLElement>('.ant-checkbox');

      expect(items[0]).toHaveStyle({ color: 'rgb(0, 0, 255)' });
      expect(items[1]).toHaveStyle({ color: 'rgb(255, 0, 0)' });
      expect(icons[0]).toHaveStyle({ borderColor: 'rgb(0, 255, 0)' });
      expect(icons[1]).toHaveStyle({ borderColor: 'rgb(0, 255, 0)' });
    });

    it('should not apply item semantics when skipGroup is true', () => {
      const { container } = render(
        <Checkbox.Group classNames={{ item: 'custom-group-item' }}>
          <Checkbox value="A">A</Checkbox>
          <Checkbox value="B" skipGroup>
            B
          </Checkbox>
        </Checkbox.Group>,
      );

      const items = container.querySelectorAll('.ant-checkbox-wrapper');
      expect(items[0]).toHaveClass('custom-group-item');
      expect(items[1]).not.toHaveClass('custom-group-item');
    });

    it('should follow root style priority', () => {
      const { container } = render(
        <Checkbox.Group
          options={options}
          styles={semanticRootStylePriority.styles}
          style={semanticRootStylePriority.style}
        />,
      );

      const group = container.querySelector('.ant-checkbox-group');
      expect(group).toHaveStyle({
        backgroundColor: semanticRootStylePriority.style.backgroundColor,
        marginTop: semanticRootStylePriority.styles.root.marginTop,
      });
    });
  });
});
