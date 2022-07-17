import { SmileOutlined } from '@ant-design/icons';
import CSSMotion from 'rc-motion';
import { genCSSMotion } from 'rc-motion/lib/CSSMotion';
import KeyCode from 'rc-util/lib/KeyCode';
import { resetWarned } from 'rc-util/lib/warning';
import * as React from 'react';
import TestUtils, { act } from 'react-dom/test-utils';
import Modal from '..';
import { sleep } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import destroyFns from '../destroyFns';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const { confirm } = Modal;

jest.mock('rc-motion');

describe('Modal.confirm triggers callbacks correctly', () => {
  // Inject CSSMotion to replace with No transition support
  const MockCSSMotion = genCSSMotion(false);
  Object.keys(MockCSSMotion).forEach(key => {
    CSSMotion[key] = MockCSSMotion[key];
  });

  // // Mock for rc-util raf
  // window.requestAnimationFrame = callback => {
  //   const ret = window.setTimeout(callback, 16);
  //   return ret;
  // };
  // window.cancelAnimationFrame = id => {
  //   window.clearTimeout(id);
  // };

  // jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
  //   const id = window.setTimeout(callback);
  //   console.log('Mock Raf:', id);
  //   return id;
  // });
  // jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => window.clearTimeout(id));

  const errorSpy = jest.spyOn(console, 'error');

  /* eslint-disable no-console */
  // Hack error to remove act warning
  const originError = console.error;
  console.error = (...args) => {
    const errorStr = String(args[0]);
    if (errorStr.includes('was not wrapped in act(...)')) {
      return;
    }

    originError(...args);
  };
  /* eslint-enable */

  afterEach(async () => {
    jest.clearAllTimers();
    errorSpy.mockReset();
    Modal.destroyAll();

    await sleep();
    document.body.innerHTML = '';
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function open(args) {
    jest.useFakeTimers();
    confirm({
      title: 'Want to delete these items?',
      content: 'some descriptions',
      ...args,
    });
    jest.runAllTimers();
    jest.useRealTimers();
  }

  it('should not render title when title not defined', () => {
    jest.useFakeTimers();
    confirm({
      content: 'some descriptions',
    });
    jest.runAllTimers();
    expect(document.querySelector('.ant-modal-confirm-title')).toBe(null);
    jest.useRealTimers();
  });

  it('trigger onCancel once when click on cancel button', async () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();
    open({
      onCancel,
      onOk,
    });

    // first Modal
    await sleep();
    $$('.ant-btn')[0].click();
    expect(onCancel.mock.calls.length).toBe(1);
    expect(onOk.mock.calls.length).toBe(0);
  });

  it('trigger onOk once when click on ok button', async () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();
    open({
      onCancel,
      onOk,
    });

    // second Modal
    await sleep();
    $$('.ant-btn-primary')[0].click();
    expect(onCancel.mock.calls.length).toBe(0);
    expect(onOk.mock.calls.length).toBe(1);
  });

  it('should allow Modal.confirm without onCancel been set', async () => {
    open();
    await sleep();

    // Third Modal
    $$('.ant-btn')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should allow Modal.confirm without onOk been set', async () => {
    open();

    // Fourth Modal
    await sleep();
    $$('.ant-btn-primary')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should close confirm modal when press ESC', async () => {
    jest.useFakeTimers();
    jest.clearAllTimers();
    const onCancel = jest.fn();
    Modal.confirm({
      title: 'title',
      content: 'content',
      onCancel,
    });

    jest.runAllTimers();
    await sleep();
    jest.runAllTimers();

    expect($$(`.ant-modal-confirm-confirm`)).toHaveLength(1);
    TestUtils.Simulate.keyDown($$('.ant-modal')[0], {
      keyCode: KeyCode.ESC,
    });

    jest.runAllTimers();
    await sleep(0);
    jest.runAllTimers();

    expect($$(`.ant-modal-confirm-confirm`)).toHaveLength(0);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('should not hide confirm when onOk return Promise.resolve', async () => {
    open({
      onOk: () => Promise.resolve(''),
    });

    await sleep();
    $$('.ant-btn-primary')[0].click();
    expect($$('.ant-modal-confirm')).toHaveLength(1);
  });

  it('should emit error when onOk return Promise.reject', async () => {
    const error = new Error('something wrong');
    open({
      onOk: () => Promise.reject(error),
    });

    await sleep();
    $$('.ant-btn-primary')[0].click();

    // wait promise
    await sleep();

    expect(errorSpy).toHaveBeenCalledWith(error);
  });

  it('shows animation when close', async () => {
    open();

    jest.useFakeTimers();
    jest.runAllTimers();
    await sleep();
    jest.runAllTimers();

    expect($$('.ant-modal-confirm')).toHaveLength(1);

    await sleep();
    $$('.ant-btn')[0].click();

    jest.runAllTimers();
    await sleep();
    jest.runAllTimers();

    expect($$('.ant-modal-confirm')).toHaveLength(0);
    jest.useRealTimers();
  });

  it('ok only', async () => {
    open({ okCancel: false });
    await sleep();
    expect($$('.ant-btn')).toHaveLength(1);
    expect($$('.ant-btn')[0].innerHTML).toContain('OK');
  });

  it('allows extra props on buttons', async () => {
    open({ okButtonProps: { disabled: true }, cancelButtonProps: { 'data-test': 'baz' } });

    await sleep();
    expect($$('.ant-btn')).toHaveLength(2);
    expect($$('.ant-btn')[0].attributes['data-test'].value).toBe('baz');
    expect($$('.ant-btn')[1].disabled).toBe(true);
  });

  describe('should close modals when click confirm button', () => {
    ['info', 'success', 'warning', 'error'].forEach(type => {
      it(type, async () => {
        jest.useFakeTimers();
        Modal[type]({
          title: 'title',
          content: 'content',
        });

        await act(async () => {
          jest.runAllTimers();
          await sleep();
          jest.runAllTimers();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);

        $$('.ant-btn')[0].click();
        await act(async () => {
          jest.runAllTimers();
          await sleep();
          jest.runAllTimers();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(0);
        jest.useRealTimers();
      });
    });
  });

  it('should close confirm modal when click cancel button', async () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    Modal.confirm({
      title: 'title',
      content: 'content',
      onCancel,
    });
    act(() => {
      jest.runAllTimers();
    });
    expect($$(`.ant-modal-confirm-confirm`)).toHaveLength(1);
    $$('.ant-btn')[0].click();
    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });
    expect($$(`.ant-modal-confirm-confirm`)).toHaveLength(0);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('should close confirm modal when click close button', async () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    Modal.confirm({
      title: 'title',
      content: 'content',
      closable: true,
      closeIcon: 'X',
      onCancel,
    });
    act(() => {
      jest.runAllTimers();
    });
    expect($$(`.ant-modal-close`)).toHaveLength(1);
    $$('.ant-btn')[0].click();
    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });
    expect($$(`.ant-modal-close`)).toHaveLength(0);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  describe('should not close modals when click confirm button when onOk has argument', () => {
    ['info', 'success', 'warning', 'error'].forEach(type => {
      it(type, async () => {
        jest.useFakeTimers();
        Modal[type]({
          title: 'title',
          content: 'content',
          onOk: close => null, // eslint-disable-line no-unused-vars
        });
        await act(async () => {
          jest.runAllTimers();
          await sleep();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
        $$('.ant-btn')[0].click();

        await act(async () => {
          jest.runAllTimers();
          await sleep();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
        jest.useRealTimers();
      });
    });
  });

  describe('could be update by new config', () => {
    ['info', 'success', 'warning', 'error'].forEach(type => {
      it(type, async () => {
        jest.useFakeTimers();
        const instance = Modal[type]({
          title: 'title',
          content: 'content',
        });
        await act(async () => {
          jest.runAllTimers();
          await sleep();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
        expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('title');
        expect($$('.ant-modal-confirm-content')[0].innerHTML).toBe('content');
        instance.update({
          title: 'new title',
          content: 'new content',
        });

        await act(async () => {
          jest.runAllTimers();
          await sleep();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
        expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('new title');
        expect($$('.ant-modal-confirm-content')[0].innerHTML).toBe('new content');
        instance.destroy();
        jest.runAllTimers();
        jest.useRealTimers();
      });
    });
  });

  describe('could be update by call function', () => {
    ['info', 'success', 'warning', 'error'].forEach(type => {
      it(type, () => {
        jest.useFakeTimers();
        const instance = Modal[type]({
          title: 'title',
          okButtonProps: {
            loading: true,
            style: {
              color: 'red',
            },
          },
        });
        act(() => {
          jest.runAllTimers();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
        expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('title');
        expect($$('.ant-modal-confirm-btns .ant-btn-primary')[0].classList).toContain(
          'ant-btn-loading',
        );
        expect($$('.ant-modal-confirm-btns .ant-btn-primary')[0].style.color).toBe('red');
        instance.update(prevConfig => ({
          ...prevConfig,
          okButtonProps: {
            ...prevConfig.okButtonProps,
            loading: false,
          },
        }));
        act(() => {
          jest.runAllTimers();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
        expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('title');
        expect($$('.ant-modal-confirm-btns .ant-btn-primary')[0].classList).not.toContain(
          'ant-btn-loading',
        );
        expect($$('.ant-modal-confirm-btns .ant-btn-primary')[0].style.color).toBe('red');
        instance.destroy();
        jest.runAllTimers();
        jest.useRealTimers();
      });
    });
  });

  describe('could be destroy', () => {
    ['info', 'success', 'warning', 'error'].forEach(type => {
      jest.useFakeTimers();
      it(type, async () => {
        const instance = Modal[type]({
          title: 'title',
          content: 'content',
        });
        await act(async () => {
          jest.runAllTimers();
          await sleep();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);

        instance.destroy();
        await act(async () => {
          jest.runAllTimers();
          await sleep();
        });
        expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(0);
      });
      jest.useRealTimers();
    });
  });

  it('could be Modal.destroyAll', async () => {
    jest.useFakeTimers();

    // Show
    ['info', 'success', 'warning', 'error'].forEach(type => {
      Modal[type]({
        title: 'title',
        content: 'content',
      });
    });

    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    ['info', 'success', 'warning', 'error'].forEach(type => {
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
    });

    // Destroy
    Modal.destroyAll();

    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    ['info', 'success', 'warning', 'error'].forEach(type => {
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(0);
    });
    jest.useRealTimers();
  });

  it('prefixCls', async () => {
    open({ prefixCls: 'custom-modal' });

    await sleep();
    expect($$('.custom-modal-mask')).toHaveLength(1);
    expect($$('.custom-modal-wrap')).toHaveLength(1);
    expect($$('.custom-modal-confirm')).toHaveLength(1);
    expect($$('.custom-modal-confirm-body-wrapper')).toHaveLength(1);
  });

  it('should be Modal.confirm without mask', () => {
    open({ mask: false });
    expect($$('.ant-modal-mask')).toHaveLength(0);
  });

  it('destroyFns should reduce when instance.destroy', () => {
    jest.useFakeTimers();

    Modal.destroyAll(); // clear destroyFns
    jest.runAllTimers();

    const instances = [];
    ['info', 'success', 'warning', 'error'].forEach(type => {
      const instance = Modal[type]({
        title: 'title',
        content: 'content',
      });

      // Render modal
      act(() => {
        jest.runAllTimers();
      });

      instances.push(instance);
    });
    const { length } = instances;
    instances.forEach((instance, index) => {
      expect(destroyFns.length).toBe(length - index);

      act(() => {
        instance.destroy();
        jest.runAllTimers();
      });
      expect(destroyFns.length).toBe(length - index - 1);
    });

    jest.useRealTimers();
  });

  it('should warning when pass a string as icon props', async () => {
    jest.useFakeTimers();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    confirm({
      content: 'some descriptions',
      icon: 'ab',
    });

    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    expect(warnSpy).not.toHaveBeenCalled();
    confirm({
      content: 'some descriptions',
      icon: 'question',
    });

    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    expect(warnSpy).toHaveBeenCalledWith(
      `Warning: [antd: Modal] \`icon\` is using ReactNode instead of string naming in v4. Please check \`question\` at https://ant.design/components/icon`,
    );
    warnSpy.mockRestore();
    jest.useRealTimers();
  });

  it('ok button should trigger onOk once when click it many times quickly', async () => {
    const onOk = jest.fn();
    open({ onOk });

    await sleep();
    $$('.ant-btn-primary')[0].click();
    $$('.ant-btn-primary')[0].click();
    expect(onOk).toHaveBeenCalledTimes(1);
  });

  // https://github.com/ant-design/ant-design/issues/23358
  it('ok button should trigger onOk multiple times when onOk has close argument', async () => {
    const onOk = jest.fn();
    open({
      onOk: close => {
        onOk();
        (() => {})(close); // do nothing
      },
    });

    await sleep();
    $$('.ant-btn-primary')[0].click();
    $$('.ant-btn-primary')[0].click();
    $$('.ant-btn-primary')[0].click();
    expect(onOk).toHaveBeenCalledTimes(3);
  });

  it('should be able to global config rootPrefixCls', async () => {
    jest.useFakeTimers();
    ConfigProvider.config({ prefixCls: 'my', iconPrefixCls: 'bamboo' });
    confirm({ title: 'title', icon: <SmileOutlined /> });

    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    expect(document.querySelectorAll('.ant-btn').length).toBe(0);
    expect(document.querySelectorAll('.my-btn').length).toBe(2);
    expect(document.querySelectorAll('.bamboo-smile').length).toBe(1);
    expect(document.querySelectorAll('.my-modal-confirm').length).toBe(1);
    ConfigProvider.config({ prefixCls: 'ant', iconPrefixCls: null });
    jest.useRealTimers();
  });

  it('should be able to config rootPrefixCls', async () => {
    resetWarned();

    jest.useFakeTimers();

    Modal.config({
      rootPrefixCls: 'my',
    });
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Modal] Modal.config is deprecated. Please use ConfigProvider.config instead.',
    );

    confirm({
      title: 'title',
    });

    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    expect(document.querySelectorAll('.ant-btn').length).toBe(0);
    expect(document.querySelectorAll('.my-btn').length).toBe(2);
    expect(document.querySelectorAll('.my-modal-confirm').length).toBe(1);
    Modal.config({
      rootPrefixCls: 'your',
    });
    confirm({
      title: 'title',
    });

    await act(async () => {
      jest.runAllTimers();
      await sleep();
    });

    expect(document.querySelectorAll('.ant-btn').length).toBe(0);
    expect(document.querySelectorAll('.my-btn').length).toBe(2);
    expect(document.querySelectorAll('.my-modal-confirm').length).toBe(1);
    expect(document.querySelectorAll('.your-btn').length).toBe(2);
    expect(document.querySelectorAll('.your-modal-confirm').length).toBe(1);
    Modal.config({
      rootPrefixCls: '',
    });
    jest.useRealTimers();
  });

  it('trigger afterClose once when click on cancel button', async () => {
    const afterClose = jest.fn();
    open({
      afterClose,
    });
    // first Modal
    await sleep();
    $$('.ant-btn')[0].click();
    expect(afterClose).not.toHaveBeenCalled();
    await sleep(500);
    expect(afterClose).toHaveBeenCalled();
  });

  it('trigger afterClose once when click on ok button', async () => {
    const afterClose = jest.fn();
    open({
      afterClose,
    });

    // second Modal
    await sleep();
    $$('.ant-btn-primary')[0].click();
    expect(afterClose).not.toHaveBeenCalled();
    await sleep(500);
    expect(afterClose).toHaveBeenCalled();
  });

  it('bodyStyle', async () => {
    open({ bodyStyle: { width: 500 } });

    await sleep();
    const { width } = $$('.ant-modal-body')[0].style;
    expect(width).toBe('500px');
  });
});
