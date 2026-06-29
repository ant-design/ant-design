import React from 'react';
import { spyElementPrototype } from '@rc-component/util';

import Popconfirm from '..';
import { render } from '../../../tests/utils';

describe('Popconfirm.semantic', () => {
  beforeAll(() => {
    spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => ({}),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('should support static classNames and styles', () => {
    const { container } = render(
      <Popconfirm
        title="Test"
        description="Content"
        open
        classNames={{ root: 'custom-root', container: 'custom-container', icon: 'custom-icon' }}
        styles={{
          root: { backgroundColor: 'red' },
          container: { padding: '20px' },
          icon: { color: 'blue' },
        }}
      >
        <span>Static Test</span>
      </Popconfirm>,
    );

    const popconfirmElement = container.querySelector('.ant-popover');
    const contentElement = container.querySelector('.ant-popover-container');
    const iconElement = container.querySelector('.ant-popconfirm-message-icon');

    expect(popconfirmElement).toHaveClass('custom-root');
    expect(contentElement).toHaveClass('custom-container');
    expect(iconElement).toHaveClass('custom-icon');
    expect(popconfirmElement).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    expect(contentElement).toHaveStyle({ padding: '20px' });
    expect(iconElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('should support function-based classNames and styles', () => {
    const { container } = render(
      <Popconfirm
        title="Test"
        description="Content"
        open
        placement="top"
        classNames={({ props }) => ({
          root: props.placement === 'top' ? 'top-root' : 'default-root',
          container: 'custom-container',
          icon: 'dynamic-icon',
        })}
        styles={({ props }) => ({
          root: { backgroundColor: props.placement === 'top' ? 'blue' : 'transparent' },
          container: { padding: '16px' },
          icon: { color: props.placement === 'top' ? 'green' : 'transparent' },
        })}
      >
        <span>Dynamic Test</span>
      </Popconfirm>,
    );

    const popconfirmElement = container.querySelector('.ant-popover');
    const contentElement = container.querySelector('.ant-popover-container');
    const iconElement = container.querySelector('.ant-popconfirm-message-icon');

    expect(popconfirmElement).toHaveClass('top-root');
    expect(contentElement).toHaveClass('custom-container');
    expect(iconElement).toHaveClass('dynamic-icon');
    expect(popconfirmElement).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
    expect(contentElement).toHaveStyle({ padding: '16px' });
    expect(iconElement).toHaveStyle({ color: 'rgb(0, 128, 0)' });
  });
});
