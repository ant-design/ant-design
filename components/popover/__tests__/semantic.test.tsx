import React from 'react';

import Popover from '..';
import { render } from '../../../tests/utils';

describe('Popover.Semantic', () => {
  it('should support static classNames and styles', () => {
    const { container } = render(
      <Popover
        open
        title="Test"
        content="Content"
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
    expect(popoverElement).toHaveStyle({ backgroundColor: ' rgb(255, 0, 0)' });
    expect(contentElement).toHaveStyle({ padding: '20px' });
  });

  it('should support function-based classNames and styles', () => {
    const { container } = render(
      <Popover
        open
        title="Test"
        content="Content"
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
    expect(popoverElement).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
    expect(contentElement).toHaveStyle({ padding: '16px' });
  });
});
