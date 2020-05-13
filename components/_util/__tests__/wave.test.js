import React from 'react';
import { mount } from 'enzyme';
import Wave from '../wave';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';
import { sleep } from '../../../tests/utils';

describe('Wave component', () => {
  mountTest(Wave);

  afterEach(() => {
    const styles = document.getElementsByTagName('style');
    for (let i = 0; i < styles.length; i += 1) {
      styles[i].remove();
    }
  });

  it('isHidden works', () => {
    const TEST_NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const wrapper = mount(
      <Wave>
        <button type="button">button</button>
      </Wave>,
    );
    expect(wrapper.find('button').getDOMNode().className).toBe('');
    wrapper.find('button').getDOMNode().click();
    expect(
      wrapper.find('button').getDOMNode().hasAttribute('ant-click-animating-without-extra-node'),
    ).toBe(false);
    wrapper.unmount();
    process.env.NODE_ENV = TEST_NODE_ENV;
  });

  it('isHidden is mocked', () => {
    const wrapper = mount(
      <Wave>
        <button type="button">button</button>
      </Wave>,
    );
    expect(wrapper.find('button').getDOMNode().className).toBe('');
    wrapper.find('button').getDOMNode().click();
    expect(
      wrapper.find('button').getDOMNode().getAttribute('ant-click-animating-without-extra-node'),
    ).toBe('false');
    wrapper.unmount();
  });

  it('wave color is grey', async () => {
    const wrapper = mount(
      <Wave>
        <button type="button" style={{ borderColor: 'rgb(0, 0, 0)' }}>
          button
        </button>
      </Wave>,
    );
    wrapper.find('button').getDOMNode().click();
    await sleep(0);
    const styles = document.getElementsByTagName('style');
    expect(styles.length).toBe(0);
    wrapper.unmount();
  });

  it('wave color is not grey', async () => {
    const wrapper = mount(
      <Wave>
        <button type="button" style={{ borderColor: 'red' }}>
          button
        </button>
      </Wave>,
    );
    wrapper.find('button').getDOMNode().click();
    await sleep(200);
    const styles = document.getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: red;');
    wrapper.unmount();
  });

  it('read wave color from border-top-color', async () => {
    const wrapper = mount(
      <Wave>
        <div style={{ borderTopColor: 'blue' }}>button</div>
      </Wave>,
    );
    wrapper.find('div').getDOMNode().click();
    await sleep(0);
    const styles = document.getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: blue;');
    wrapper.unmount();
  });

  it('read wave color from background color', async () => {
    const wrapper = mount(
      <Wave>
        <div style={{ backgroundColor: 'green' }}>button</div>
      </Wave>,
    );
    wrapper.find('div').getDOMNode().click();
    await sleep(0);
    const styles = document.getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: green;');
    wrapper.unmount();
  });

  it('read wave color from border firstly', async () => {
    const wrapper = mount(
      <Wave>
        <div style={{ borderColor: 'yellow', backgroundColor: 'green' }}>button</div>
      </Wave>,
    );
    wrapper.find('div').getDOMNode().click();
    await sleep(0);
    const styles = document.getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: yellow;');
    wrapper.unmount();
  });

  it('hidden element with -leave className', async () => {
    const wrapper = mount(
      <Wave>
        <button type="button" className="xx-leave">
          button
        </button>
      </Wave>,
    );
    wrapper.find('button').getDOMNode().click();
    await sleep(0);
    const styles = document.getElementsByTagName('style');
    expect(styles.length).toBe(0);
    wrapper.unmount();
  });

  it('ConfigProvider csp', async () => {
    const wrapper = mount(
      <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
        <Wave>
          <button type="button">button</button>
        </Wave>
      </ConfigProvider>,
    );
    wrapper.find('button').getDOMNode().click();
    await sleep(0);
    const styles = document.getElementsByTagName('style');
    expect(styles[0].getAttribute('nonce')).toBe('YourNonceCode');
    wrapper.unmount();
  });
});
