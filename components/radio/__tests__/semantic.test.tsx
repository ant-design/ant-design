import React from 'react';

import Radio from '..';
import type { RadioProps } from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';

describe('Radio.Semantic', () => {
  it('should merge semantic styles with context styles', () => {
    const customStyles = {
      root: { padding: '10px' },
    };
    const { container } = render(
      <Radio styles={customStyles} style={{ margin: '5px' }}>
        Test
      </Radio>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-radio-wrapper');
    expect(rootElement).toHaveStyle({ padding: '10px', margin: '5px' });
  });

  it('should apply semantic styles to radio without label', () => {
    const customStyles = {
      root: { backgroundColor: 'rgb(0, 0, 255)' },
      icon: { backgroundColor: 'rgb(0, 128, 0)' },
    };

    const { container } = render(<Radio styles={customStyles} />);

    const rootElement = container.querySelector<HTMLElement>('.ant-radio-wrapper');
    const iconElement = container.querySelector<HTMLElement>('.ant-radio');
    const labelElement = container.querySelector<HTMLElement>('.ant-radio-label');

    expect(rootElement).toHaveStyle({ backgroundColor: customStyles.root.backgroundColor });
    expect(iconElement).toHaveStyle({ backgroundColor: customStyles.icon.backgroundColor });
    expect(labelElement).toBeNull(); // No label element should exist
  });

  it('should get correct checked prop when value matches group value', () => {
    const classNamesFn: RadioProps['classNames'] = ({ props }) => {
      return {
        root: props.checked ? 'checked-radio' : 'unchecked-radio',
      };
    };

    const { container } = render(
      <Radio.Group value="A">
        <Radio value="A" classNames={classNamesFn}>
          Radio A
        </Radio>
        <Radio value="B" classNames={classNamesFn}>
          Radio B
        </Radio>
      </Radio.Group>,
    );

    const radioElements = container.querySelectorAll<HTMLElement>('.ant-radio-wrapper');
    expect(radioElements[0]).toHaveClass('checked-radio');
    expect(radioElements[1]).toHaveClass('unchecked-radio');
  });
  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        radio={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        <Radio styles={semanticRootStylePriority.styles} style={semanticRootStylePriority.style}>
          Radio
        </Radio>
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-radio-wrapper'));
  });

  describe('Radio.Group', () => {
    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Pear', value: 'pear' },
    ];

    it('support classNames and styles as objects', () => {
      const { container } = render(
        <Radio.Group
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

      const group = container.querySelector('.ant-radio-group');
      const items = container.querySelectorAll('.ant-radio-wrapper');
      const icons = container.querySelectorAll('.ant-radio');
      const labels = container.querySelectorAll('.ant-radio-label');

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

    it('should apply semantic classNames to children Radio', () => {
      const { container } = render(
        <Radio.Group
          classNames={{
            root: 'custom-group-root',
            item: 'custom-group-item',
            itemIcon: 'custom-group-item-icon',
            itemLabel: 'custom-group-item-label',
          }}
        >
          <Radio value="A">A</Radio>
          <Radio.Button value="B">B</Radio.Button>
        </Radio.Group>,
      );

      expect(container.querySelector('.ant-radio-group')).toHaveClass('custom-group-root');
      expect(container.querySelector('.ant-radio-wrapper')).toHaveClass('custom-group-item');
      expect(container.querySelector('.ant-radio')).toHaveClass('custom-group-item-icon');
      expect(container.querySelector('.ant-radio-label')).toHaveClass('custom-group-item-label');
      expect(container.querySelector('.ant-radio-button-wrapper')).toHaveClass('custom-group-item');
      expect(container.querySelector('.ant-radio-button')).toHaveClass('custom-group-item-icon');
      expect(container.querySelector('.ant-radio-button-label')).toHaveClass(
        'custom-group-item-label',
      );
    });

    it('support classNames and styles as functions with merged props', () => {
      const { container } = render(
        <Radio.Group
          options={options}
          classNames={(info) => ({
            root: info.props.disabled === false ? 'group-enabled' : 'group-disabled',
            item: `item-${info.props.optionType}-${info.props.orientation}`,
          })}
          styles={(info) => ({
            root: {
              padding: info.props.disabled ? '4px' : '8px',
            },
            itemLabel: {
              fontWeight: info.props.optionType === 'button' ? 'normal' : 'bold',
            },
          })}
        />,
      );

      const group = container.querySelector('.ant-radio-group');
      expect(group).toHaveClass('group-enabled');
      expect(group).toHaveStyle({ padding: '8px' });

      container.querySelectorAll('.ant-radio-wrapper').forEach((item) => {
        expect(item).toHaveClass('item-default-horizontal');
      });
      container.querySelectorAll('.ant-radio-label').forEach((label) => {
        expect(label).toHaveStyle({ fontWeight: 'bold' });
      });
    });

    it('should provide componentDisabled to semantic functions', () => {
      const { container } = render(
        <ConfigProvider componentDisabled>
          <Radio.Group
            options={options}
            classNames={({ props }) => ({
              root: props.disabled ? 'group-disabled' : 'group-enabled',
            })}
          />
        </ConfigProvider>,
      );

      expect(container.querySelector('.ant-radio-group')).toHaveClass('group-disabled');
    });

    it('should allow option style to override group item styles', () => {
      const { container } = render(
        <Radio.Group
          styles={{
            item: { color: 'rgb(255, 0, 0)', backgroundColor: 'rgb(0, 255, 0)' },
          }}
          options={[
            { label: 'Apple', value: 'apple', style: { color: 'rgb(0, 0, 255)' } },
            { label: 'Pear', value: 'pear' },
          ]}
        />,
      );

      const items = container.querySelectorAll<HTMLElement>('.ant-radio-wrapper');
      expect(items[0]).toHaveStyle({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
      });
      expect(items[1]).toHaveStyle({
        color: 'rgb(255, 0, 0)',
        backgroundColor: 'rgb(0, 255, 0)',
      });
    });

    it('should allow Radio styles to override group item styles', () => {
      const { container } = render(
        <Radio.Group
          styles={{
            item: { color: 'rgb(255, 0, 0)' },
            itemIcon: { borderColor: 'rgb(0, 255, 0)' },
          }}
        >
          <Radio value="A" styles={{ root: { color: 'rgb(0, 0, 255)' } }}>
            A
          </Radio>
          <Radio value="B">B</Radio>
        </Radio.Group>,
      );

      const items = container.querySelectorAll<HTMLElement>('.ant-radio-wrapper');
      const icons = container.querySelectorAll<HTMLElement>('.ant-radio');

      expect(items[0]).toHaveStyle({ color: 'rgb(0, 0, 255)' });
      expect(items[1]).toHaveStyle({ color: 'rgb(255, 0, 0)' });
      expect(icons[0]).toHaveStyle({ borderColor: 'rgb(0, 255, 0)' });
      expect(icons[1]).toHaveStyle({ borderColor: 'rgb(0, 255, 0)' });
    });

    it('should follow root style priority', () => {
      const { container } = render(
        <Radio.Group
          options={options}
          styles={semanticRootStylePriority.styles}
          style={semanticRootStylePriority.style}
        />,
      );

      const group = container.querySelector('.ant-radio-group');
      expect(group).toHaveStyle({
        backgroundColor: semanticRootStylePriority.style.backgroundColor,
        marginTop: semanticRootStylePriority.styles.root.marginTop,
      });
    });
  });
});
