import React from 'react';

import Calendar from '..';
import { render } from '../../../tests/utils';

describe('Calendar.Semantic', () => {
  it('support classNames and styles as functions', () => {
    const { container } = render(
      <Calendar
        fullscreen={false}
        mode="year"
        classNames={(info) => ({
          root: info.props.fullscreen ? 'fullscreen-calendar' : 'mini-calendar',
          header: `calendar-header-${info.props.mode}`,
          body: 'dynamic-calendar-body',
          content: 'dynamic-calendar-content',
          item: 'dynamic-calendar-item',
        })}
        styles={(info) => ({
          root: {
            backgroundColor: info.props.fullscreen ? 'white' : 'lightblue',
            width: info.props.fullscreen ? '100%' : '300px',
          },
          header: {
            fontSize: info.props.fullscreen ? '16px' : '14px',
            color: info.props.mode === 'year' ? 'red' : 'blue',
          },
          body: { padding: '12px' },
          content: { minHeight: '200px' },
          item: { borderRadius: '4px' },
        })}
      />,
    );

    const root = container.querySelector('.ant-picker-calendar');
    const header = container.querySelector('.ant-picker-calendar-header');
    const body = container.querySelector('.ant-picker-body');
    const content = container.querySelector('.ant-picker-content');
    const item = container.querySelector('.ant-picker-cell');

    expect(root).toHaveClass('mini-calendar');
    expect(header).toHaveClass('calendar-header-year');
    expect(body).toHaveClass('dynamic-calendar-body');
    expect(content).toHaveClass('dynamic-calendar-content');
    expect(item).toHaveClass('dynamic-calendar-item');

    expect(root).toHaveAttribute('style');
    const rootStyle = root?.getAttribute('style');
    expect(rootStyle).toContain('background-color: lightblue');
    expect(rootStyle).toContain('width: 300px');

    expect(header).toHaveAttribute('style');
    const headerStyle = header?.getAttribute('style');
    expect(headerStyle).toContain('font-size: 14px');
    expect(headerStyle).toContain('color: red');
  });
});
