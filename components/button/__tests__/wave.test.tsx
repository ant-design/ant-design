import React from 'react';
import Button from '..';
import { fireEvent, render, sleep } from '../../../tests/utils';

// Mock Wave ref
let waveInstanceMock: any;
jest.mock('../../_util/wave', () => {
  const Wave = jest.requireActual('../../_util/wave');
  const WaveComponent = Wave.default;
  return {
    ...Wave,
    __esModule: true,
    default: (props: any) => (
      <WaveComponent
        ref={(node: any) => {
          waveInstanceMock = node;
        }}
        {...props}
      />
    ),
  };
});

describe('click wave effect', () => {
  async function clickButton(wrapper: any) {
    const element = wrapper.container.firstChild;
    fireEvent.click(element);
    fireEvent(element, new Event('transitionstart'));
    await sleep(20);
    fireEvent(element, new Event('animationend'));
    await sleep(20);
  }

  it('should have click wave effect for primary button', async () => {
    const wrapper = render(<Button type="primary">button</Button>);
    await clickButton(wrapper);
    expect(wrapper.container.querySelector('.ant-btn')).toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should have click wave effect for default button', async () => {
    const wrapper = render(<Button>button</Button>);
    await clickButton(wrapper);
    expect(wrapper.container.querySelector('.ant-btn')).toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should not have click wave effect for link type button', async () => {
    const wrapper = render(<Button type="link">button</Button>);
    await clickButton(wrapper);
    expect(wrapper.container.querySelector('.ant-btn')).not.toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should not have click wave effect for text type button', async () => {
    const wrapper = render(<Button type="text">button</Button>);
    await clickButton(wrapper);
    expect(wrapper.container.querySelector('.ant-btn')).not.toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
  });

  it('should handle transitionstart', async () => {
    const wrapper = render(<Button type="primary">button</Button>);
    await clickButton(wrapper);
    const buttonNode = wrapper.container.querySelector('.ant-btn')!;
    fireEvent(buttonNode, new Event('transitionstart'));
    expect(wrapper.container.querySelector('.ant-btn')).toHaveAttribute(
      'ant-click-animating-without-extra-node',
    );
    wrapper.unmount();
    fireEvent(buttonNode, new Event('transitionstart'));
  });

  it('should run resetEffect in transitionstart', async () => {
    const wrapper = render(<Button type="primary">button</Button>);
    const resetEffect = jest.spyOn(waveInstanceMock, 'resetEffect');
    await clickButton(wrapper);
    expect(resetEffect).toHaveBeenCalledTimes(1);
    fireEvent.click(wrapper.container.querySelector('.ant-btn')!);
    await sleep(10);
    expect(resetEffect).toHaveBeenCalledTimes(2);
    waveInstanceMock.animationStart = false;
    fireEvent(wrapper.container.querySelector('.ant-btn')!, new Event('transitionstart'));
    expect(resetEffect).toHaveBeenCalledTimes(3);
    resetEffect.mockRestore();
  });

  it('should handle transitionend', async () => {
    const wrapper = render(<Button type="primary">button</Button>);
    const resetEffect = jest.spyOn(waveInstanceMock, 'resetEffect');
    await clickButton(wrapper);
    expect(resetEffect).toHaveBeenCalledTimes(1);
    const event = new Event('animationend');
    Object.assign(event, { animationName: 'fadeEffect' });
    fireEvent(wrapper.container.querySelector('.ant-btn')!, event);
    expect(resetEffect).toHaveBeenCalledTimes(2);
    resetEffect.mockRestore();
  });

  it('Wave on falsy element', async () => {
    const { default: Wave } = jest.requireActual('../../_util/wave');
    let waveInstance: any;
    render(
      <Wave
        ref={(node: any) => {
          waveInstance = node;
        }}
      />,
    );
    waveInstance.resetEffect();
  });
});
