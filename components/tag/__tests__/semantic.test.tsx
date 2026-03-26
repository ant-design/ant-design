import React from 'react';

import { CheckCircleOutlined } from '@ant-design/icons';
import Tag from '..';
import { render } from '../../../tests/utils';

describe('Tag.Semantic', () => {
  it('support classNames and styles as objects', () => {
    const { container } = render(
      <Tag
        icon={<CheckCircleOutlined />}
        classNames={{
          root: 'custom-tag-root',
          icon: 'custom-tag-icon',
          content: 'custom-tag-content',
          close: 'custom-tag-close',
        }}
        styles={{
          root: {
            backgroundColor: 'lightblue',
            border: '2px solid blue',
          },
          icon: {
            color: 'red',
            fontSize: '16px',
          },
          content: {
            backgroundColor: 'yellow',
            color: 'green',
          },
          close: {
            color: 'purple',
          },
        }}
        closeIcon
      >
        Test Tag
      </Tag>,
    );

    const tagElement = container.querySelector('.ant-tag');
    const iconElement = container.querySelector('.custom-tag-icon');
    const contentElement = container.querySelector('.custom-tag-content');
    const closeElement = container.querySelector('.custom-tag-close');

    expect(tagElement).toHaveClass('custom-tag-root');
    expect(tagElement).toHaveAttribute('style');
    const rootStyle = tagElement?.getAttribute('style');
    expect(rootStyle).toContain('background-color: lightblue');
    expect(rootStyle).toContain('border: 2px solid blue');

    expect(iconElement).toHaveAttribute('style');
    const iconStyle = iconElement?.getAttribute('style');
    expect(iconStyle).toContain('color: red');
    expect(iconStyle).toContain('font-size: 16px');

    expect(contentElement).toHaveClass('custom-tag-content');
    expect(contentElement).toHaveAttribute('style');
    const contentStyle = contentElement?.getAttribute('style');
    expect(contentStyle).toContain('background-color: yellow');
    expect(contentStyle).toContain('color: green');

    expect(closeElement).toHaveClass('custom-tag-close');
    expect(closeElement).toHaveStyle({ color: 'rgb(128, 0, 128)' });
  });
  it('support classNames and styles as functions', () => {
    const { container } = render(
      <Tag
        color="blue"
        variant="filled"
        disabled={false}
        icon={<CheckCircleOutlined />}
        classNames={(info) => ({
          root: info.props.variant === 'filled' ? 'filled-tag' : 'outlined-tag',
          icon: `icon-${info.props.color}`,
          content: `content-${info.props.disabled ? 'disabled' : 'enabled'}`,
          close: `close-${info.props.variant}`,
        })}
        styles={(info) => ({
          root: {
            backgroundColor: info.props.color === 'blue' ? 'lightblue' : 'lightgreen',
            borderRadius: info.props.variant === 'filled' ? '8px' : '4px',
          },
          icon: {
            color: info.props.color === 'blue' ? 'blue' : 'green',
            fontSize: '18px',
          },
          content: {
            fontWeight: info.props.disabled ? 'normal' : 'bold',
            color: info.props.color === 'blue' ? 'darkblue' : 'darkgreen',
          },
          close: {
            color: info.props.variant === 'filled' ? 'blue' : 'green',
          },
        })}
        closeIcon
      >
        Function Tag
      </Tag>,
    );

    const tagElement = container.querySelector('.ant-tag');
    const iconElement = container.querySelector('.icon-blue');
    const contentElement = container.querySelector('.content-enabled');
    const closeElement = container.querySelector('.close-filled');

    expect(tagElement).toHaveClass('filled-tag');
    expect(tagElement).toHaveAttribute('style');
    const rootStyle = tagElement?.getAttribute('style');
    expect(rootStyle).toContain('background-color: lightblue');
    expect(rootStyle).toContain('border-radius: 8px');

    expect(iconElement).toHaveAttribute('style');
    const iconStyle = iconElement?.getAttribute('style');
    expect(iconStyle).toContain('color: blue');
    expect(iconStyle).toContain('font-size: 18px');

    expect(contentElement).toHaveClass('content-enabled');
    expect(contentElement).toHaveAttribute('style');
    const contentStyle = contentElement?.getAttribute('style');
    expect(contentStyle).toContain('font-weight: bold');
    expect(contentStyle).toContain('color: darkblue');

    expect(closeElement).toHaveClass('close-filled');
    expect(closeElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });
  it('checkableTagGroup support classNames and styles as objects', () => {
    const { container } = render(
      <Tag.CheckableTagGroup
        classNames={{
          root: 'customize-root',
          item: 'customize-item',
        }}
        styles={{
          root: { backgroundColor: 'rgb(0, 255, 0)' },
          item: { color: 'rgb(255, 0, 0)' },
        }}
        options={['Bamboo']}
      />,
    );

    expect(container.querySelector('.ant-tag-checkable-group')).toHaveClass('customize-root');
    expect(container.querySelector('.ant-tag-checkable-group')).toHaveStyle({
      backgroundColor: 'rgb(0, 255, 0)',
    });

    expect(container.querySelector('.ant-tag-checkable')).toHaveClass('customize-item');
    expect(container.querySelector('.ant-tag-checkable')).toHaveStyle({
      color: 'rgb(255, 0, 0)',
    });
  });
  it('checkableTagGroup support classNames and styles as functions', () => {
    const { container } = render(
      <Tag.CheckableTagGroup
        multiple
        disabled={false}
        defaultValue={['option1']}
        options={['option1', 'option2', 'option3']}
        classNames={(info) => ({
          root: info.props.multiple ? 'multiple-group' : 'single-group',
          item: `item-${info.props.disabled ? 'disabled' : 'enabled'}`,
        })}
        styles={(info) => ({
          root: {
            padding: info.props.multiple ? '8px' : '4px',
            backgroundColor: info.props.disabled ? 'lightgray' : 'transparent',
          },
          item: {
            borderRadius: info.props.multiple ? '4px' : '2px',
            fontWeight: info.props.disabled ? 'normal' : 'bold',
          },
        })}
      />,
    );

    const groupElement = container.querySelector('.ant-tag-checkable-group');
    const itemElements = container.querySelectorAll('.ant-tag-checkable');

    expect(groupElement).toHaveClass('multiple-group');
    expect(groupElement).toHaveAttribute('style');
    const rootStyle = groupElement?.getAttribute('style');
    expect(rootStyle).toContain('padding: 8px');
    expect(rootStyle).toContain('background-color: transparent');

    itemElements.forEach((item) => {
      expect(item).toHaveClass('item-enabled');
      expect(item).toHaveStyle({
        borderRadius: '4px',
        fontWeight: 'bold',
      });
    });
  });
});
