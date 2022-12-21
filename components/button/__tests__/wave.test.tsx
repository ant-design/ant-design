import userEvent from '@testing-library/user-event';
import React from 'react';
import Button from '..';
import { fireEvent, render } from '../../../tests/utils';

jest.mock('../../_util/wave', () => {
  const Wave: typeof import('../../_util/wave') = jest.requireActual('../../_util/wave');
  const WaveComponent = Wave.default;
  return {
    ...Wave,
    __esModule: true,
    default: (props: import('../../_util/wave').WaveProps) => <WaveComponent {...props} />,
  };
});

describe('click wave effect', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  async function clickButton(container: HTMLElement) {
    const element = container.firstChild;
    // https://github.com/testing-library/user-event/issues/833
    await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).click(element as Element);
    fireEvent(element!, new Event('transitionstart'));
    fireEvent(element!, new Event('animationend'));
  }

  it('should have click wave effect for primary button', async () => {
    const { container } = render(<Button type="primary">button</Button>);
    await clickButton(container);
    expect(container.querySelector('.ant-btn')).toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should have click wave effect for default button', async () => {
    const { container } = render(<Button>button</Button>);
    await clickButton(container);
    expect(container.querySelector('.ant-btn')).toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should not have click wave effect for link type button', async () => {
    const { container } = render(<Button type="link">button</Button>);
    await clickButton(container);
    expect(container.querySelector('.ant-btn')).not.toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should not have click wave effect for text type button', async () => {
    const { container } = render(<Button type="text">button</Button>);
    await clickButton(container);
    expect(container.querySelector('.ant-btn')).not.toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should handle transitionstart', async () => {
    const { container, unmount } = render(<Button type="primary">button</Button>);
    await clickButton(container);
    const buttonNode = container.querySelector('.ant-btn')!;
    fireEvent(buttonNode, new Event('transitionstart'));
    expect(container.querySelector('.ant-btn')).toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
    unmount();
    fireEvent(buttonNode, new Event('transitionstart'));
  });
});
