import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Button from '../../button';
import message from '../../message';
import notification from '../../notification';
import Modal from '../../modal';
import { sleep } from '../../../tests/utils';

describe('prefixCls', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('prefixCls should work in nested ConfigProvider', () => {
    const wrapper = mount(
      <ConfigProvider prefixCls="bamboo">
        <ConfigProvider>
          <Button />
        </ConfigProvider>
      </ConfigProvider>,
    );

    expect(wrapper.find('button').props().className).toEqual('bamboo-btn');
  });

  it('support message.info', () => {
    const onClick = () => {
      message.info('info');
    };
    const wrapper = mount(
      <ConfigProvider prefixCls="my">
        <button type="button" onClick={onClick}>
          button
        </button>
      </ConfigProvider>,
    );
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.my-message').length).toBe(1);
    message.destroy();
    expect(document.querySelectorAll('.my-message').length).toBe(0);
    wrapper.setProps({
      prefixCls: 'your',
    });
    expect(document.querySelectorAll('.your-message').length).toBe(0);
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.your-message').length).toBe(1);
    message.destroy();
  });

  it('support notification.success', async () => {
    const onClick = () => {
      notification.success({
        title: 'title',
      });
    };
    const wrapper = mount(
      <ConfigProvider prefixCls="my">
        <button type="button" onClick={onClick}>
          button
        </button>
      </ConfigProvider>,
    );
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.my-notification').length).toBe(1);
    notification.destroy();
    await sleep(0);
    expect(document.querySelectorAll('.my-notification').length).toBe(0);
    wrapper.setProps({
      prefixCls: 'your',
    });
    expect(document.querySelectorAll('.your-notification').length).toBe(0);
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.your-notification').length).toBe(1);
    notification.destroy();
    await sleep(0);
  });

  it('support Modal.confirm', () => {
    const onClick = () => {
      Modal.confirm({
        title: 'title',
      });
    };
    const wrapper = mount(
      <ConfigProvider prefixCls="my">
        <button type="button" onClick={onClick}>
          button
        </button>
      </ConfigProvider>,
    );
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.my-modal-confirm').length).toBe(1);
    Modal.destroyAll();
    jest.runAllTimers();
    expect(document.querySelectorAll('.my-modal-confirm').length).toBe(0);
    wrapper.setProps({
      prefixCls: 'your',
    });
    expect(document.querySelectorAll('.your-modal-confirm').length).toBe(0);
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.your-modal-confirm').length).toBe(1);
  });

  it('support Modal.success', () => {
    const onClick = () => {
      Modal.success({
        title: 'title',
      });
    };
    const wrapper = mount(
      <ConfigProvider prefixCls="my">
        <button type="button" onClick={onClick}>
          button
        </button>
      </ConfigProvider>,
    );
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.my-modal-confirm-success').length).toBe(1);
    Modal.destroyAll();
    jest.runAllTimers();
    expect(document.querySelectorAll('.my-modal-confirm-success').length).toBe(0);
    wrapper.setProps({
      prefixCls: 'your',
    });
    expect(document.querySelectorAll('.your-modal-confirm-success').length).toBe(0);
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.your-modal-confirm-success').length).toBe(1);
  });
});
