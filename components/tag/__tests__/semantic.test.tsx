import React from 'react';

import { CheckCircleOutlined } from '@ant-design/icons';
import Tag from '..';
import { render } from '../../../tests/utils';

describe('Tag.Semantic', () => {
  it('semantic classNames and styles', () => {
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
        })}
      >
        Function Tag
      </Tag>,
    );

    const tagElement = container.querySelector('.ant-tag');
    const iconElement = container.querySelector('.icon-blue');
    const contentElement = container.querySelector('.content-enabled');

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
  });
});
