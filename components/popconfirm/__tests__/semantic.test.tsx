import React from 'react';
import { spyElementPrototype } from '@rc-component/util/lib/test/domHook';
import Popconfirm from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('Popconfirm.semantic', () => {
  mountTest(() => <Popconfirm title="test" />);
  rtlTest(() => <Popconfirm title="test" />);

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
        classNames={{ root: 'custom-root', container: 'custom-container' }}
        styles={{ root: { backgroundColor: 'red' }, container: { padding: '20px' } }}
      >
        <span>Static Test</span>
      </Popconfirm>,
    );

    const popconfirmElement = container.querySelector('.ant-popover');
    const contentElement = container.querySelector('.ant-popover-container');

    expect(popconfirmElement).toHaveClass('custom-root');
    expect(contentElement).toHaveClass('custom-container');
    expect(window.getComputedStyle(popconfirmElement!).backgroundColor).toBe('rgb(255, 0, 0)');
    expect(window.getComputedStyle(contentElement!).padding).toBe('20px');
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
        })}
        styles={({ props }) => ({
          root: { backgroundColor: props.placement === 'top' ? 'blue' : 'transparent' },
          container: { padding: '16px' },
        })}
      >
        <span>Dynamic Test</span>
      </Popconfirm>,
    );

    const popconfirmElement = container.querySelector('.ant-popover');
    const contentElement = container.querySelector('.ant-popover-container');

    expect(popconfirmElement).toHaveClass('top-root');
    expect(contentElement).toHaveClass('custom-container');
    expect(window.getComputedStyle(popconfirmElement!).backgroundColor).toBe('rgb(0, 0, 255)');
    expect(window.getComputedStyle(contentElement!).padding).toBe('16px');
  });
});
