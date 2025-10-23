import React from 'react';
import Popover from '..';
import { render } from '../../../tests/utils';

describe('Popover.Semantic', () => {
  it('should support static classNames and styles', () => {
    const { container } = render(
      <Popover
        title="Test"
        content="Content"
        open
        classNames={{ root: 'custom-root', container: 'custom-container' }}
        styles={{ root: { backgroundColor: 'red' }, container: { padding: '20px' } }}
      >
        <span>Static Test</span>
      </Popover>,
    );

    const popoverElement = container.querySelector('.ant-popover');
    const contentElement = container.querySelector('.ant-popover-container');

    expect(popoverElement).toHaveClass('custom-root');
    expect(contentElement).toHaveClass('custom-container');
    expect(window.getComputedStyle(popoverElement!).backgroundColor).toBe('rgb(255, 0, 0)');
    expect(window.getComputedStyle(contentElement!).padding).toBe('20px');
  });

  it('should support function-based classNames and styles', () => {
    const { container } = render(
      <Popover
        title="Test"
        content="Content"
        open
        placement="top"
        classNames={({ props }) => ({
          root: props.placement === 'top' ? 'top-root' : 'default-root',
          container: 'custom-container',
        })}
        styles={({ props }) => ({
          root: { backgroundColor: props.open ? 'blue' : 'transparent' },
          container: { padding: '16px' },
        })}
      >
        <span>Dynamic Test</span>
      </Popover>,
    );

    const popoverElement = container.querySelector('.ant-popover');
    const contentElement = container.querySelector('.ant-popover-container');

    expect(popoverElement).toHaveClass('top-root');
    expect(contentElement).toHaveClass('custom-container');
    expect(window.getComputedStyle(popoverElement!).backgroundColor).toBe('rgb(0, 0, 255)');
    expect(window.getComputedStyle(contentElement!).padding).toBe('16px');
  });
});
