import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';
import Button from '../../button/index';

const testMethod = typeof window !== 'undefined' ? it : xit;

describe('Card', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  function fakeResizeWindowTo(wrapper, width) {
    Object.defineProperties(wrapper.instance().container, {
      offsetWidth: {
        get() {
          return width;
        },
        configurable: true,
      },
    });
    window.resizeTo(width);
  }

  testMethod('resize card will trigger different padding', () => {
    const wrapper = mount(<Card title="xxx">xxx</Card>);
    fakeResizeWindowTo(wrapper, 1000);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-card-wider-padding').length).toBe(1);
    fakeResizeWindowTo(wrapper, 800);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-card-wider-padding').length).toBe(0);
  });

  it('should still have padding when card which set padding to 0 is loading', () => {
    const wrapper = mount(
      <Card loading bodyStyle={{ padding: 0 }}>
        xxx
      </Card>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('title should be vertically aligned', () => {
    const wrapper = mount(
      <Card title="Card title" extra={<Button>Button</Button>} style={{ width: 300 }}>
        <p>Card content</p>
      </Card>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
