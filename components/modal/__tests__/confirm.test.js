import TestUtils, { act } from 'react-dom/test-utils';
import CSSMotion from 'rc-motion';
import { genCSSMotion } from 'rc-motion/lib/CSSMotion';
import KeyCode from 'rc-util/lib/KeyCode';
import Modal from '..';
import { destroyFns } from '../Modal';
import { sleep } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

const { confirm } = Modal;

jest.mock('rc-motion');

describe('Modal.confirm triggers callbacks correctly', () => {
  // Inject CSSMotion to replace with No transition support
  const MockCSSMotion = genCSSMotion(false);
  Object.keys(MockCSSMotion).forEach(key => {
    CSSMotion[key] = MockCSSMotion[key];
  });

  // Mock for rc-util raf
  window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = id => {
    window.clearTimeout(id);
  };

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

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

  afterEach(() => {
    errorSpy.mockReset();
    document.body.innerHTML = '';
    Modal.destroyAll();
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

  it('trigger onCancel once when click on cancel button', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();
    open({
      onCancel,
      onOk,
    });
    // first Modal
    $$('.ant-btn')[0].click();
    expect(onCancel.mock.calls.length).toBe(1);
    expect(onOk.mock.calls.length).toBe(0);
  });

  it('trigger onOk once when click on ok button', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();
    open({
      onCancel,
      onOk,
    });
    // second Modal
    $$('.ant-btn-primary')[0].click();
    expect(onCancel.mock.calls.length).toBe(0);
    expect(onOk.mock.calls.length).toBe(1);
  });

  it('should allow Modal.confirm without onCancel been set', () => {
    open();
    // Third Modal
    $$('.ant-btn')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should allow Modal.confirm without onOk been set', () => {
    open();
    // Fourth Modal
    $$('.ant-btn-primary')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should close confirm modal when press ESC', () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    Modal.confirm({
      title: 'title',
      content: 'content',
      onCancel,
    });
    jest.runAllTimers();
    expect($$(`.ant-modal-confirm-confirm`)).toHaveLength(1);
    TestUtils.Simulate.keyDown($$('.ant-modal')[0], {
      keyCode: KeyCode.ESC,
    });
    jest.runAllTimers();
    expect($$(`.ant-modal-confirm-confirm`)).toHaveLength(0);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('should not hide confirm when onOk return Promise.resolve', () => {
    open({
      onOk: () => Promise.resolve(''),
    });
    $$('.ant-btn-primary')[0].click();
    expect($$('.ant-modal-confirm')).toHaveLength(1);
  });

  it('should emit error when onOk return Promise.reject', async () => {
    const error = new Error('something wrong');
    open({
      onOk: () => Promise.reject(error),
    });
    $$('.ant-btn-primary')[0].click();

    // wait promise
    await sleep();

    expect(errorSpy).toHaveBeenCalledWith(error);
  });

  it('shows animation when close', () => {
    open();
    jest.useFakeTimers();
    expect($$('.ant-modal-confirm')).toHaveLength(1);
    $$('.ant-btn')[0].click();
    act(() => {
      jest.runAllTimers();
    });
    expect($$('.ant-modal-confirm')).toHaveLength(0);
    jest.useRealTimers();
  });

  it('ok only', () => {
    open({ okCancel: false });
    expect($$('.ant-btn')).toHaveLength(1);
    expect($$('.ant-btn')[0].innerHTML).toContain('OK');
  });

  it('allows extra props on buttons', () => {
    open({ okButtonProps: { disabled: true }, cancelButtonProps: { 'data-test': 'baz' } });
    expect($$('.ant-btn')).toHaveLength(2);
    expect($$('.ant-btn')[0].attributes['data-test'].value).toBe('baz');
    expect($$('.ant-btn')[1].disabled).toBe(true);
  });

  it('should close modals when click confirm button', () => {
    jest.useFakeTimers();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      Modal[type]({
        title: 'title',
        content: 'content',
      });
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      $$('.ant-btn')[0].click();
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(0);
    });
    jest.useRealTimers();
  });

  it('should close confirm modal when click cancel button', () => {
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
    act(() => {
      jest.runAllTimers();
    });
    expect($$(`.ant-modal-confirm-confirm`)).toHaveLength(0);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('should close confirm modal when click close button', () => {
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
    act(() => {
      jest.runAllTimers();
    });
    expect($$(`.ant-modal-close`)).toHaveLength(0);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('should not close modals when click confirm button when onOk has argument', () => {
    jest.useFakeTimers();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      Modal[type]({
        title: 'title',
        content: 'content',
        onOk: close => null, // eslint-disable-line no-unused-vars
      });
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      $$('.ant-btn')[0].click();
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
    });
    jest.useRealTimers();
  });

  it('could be update by new config', () => {
    jest.useFakeTimers();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      const instance = Modal[type]({
        title: 'title',
        content: 'content',
      });
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('title');
      expect($$('.ant-modal-confirm-content')[0].innerHTML).toBe('content');
      instance.update({
        title: 'new title',
        content: 'new content',
      });
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('new title');
      expect($$('.ant-modal-confirm-content')[0].innerHTML).toBe('new content');
      instance.destroy();
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it('could be update by call function', () => {
    jest.useFakeTimers();
    ['info', 'success', 'warning', 'error'].forEach(type => {
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
    });
    jest.useRealTimers();
  });

  it('could be destroy', () => {
    jest.useFakeTimers();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      const instance = Modal[type]({
        title: 'title',
        content: 'content',
      });
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      instance.destroy();
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(0);
    });
    jest.useRealTimers();
  });

  it('could be Modal.destroyAll', () => {
    jest.useFakeTimers();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      Modal[type]({
        title: 'title',
        content: 'content',
      });
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
    });
    Modal.destroyAll();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(0);
    });
    jest.useRealTimers();
  });

  it('prefixCls', () => {
    open({ prefixCls: 'custom-modal' });
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

  it('should warning when pass a string as icon props', () => {
    jest.useFakeTimers();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    confirm({
      content: 'some descriptions',
      icon: 'ab',
    });
    jest.runAllTimers();
    expect(warnSpy).not.toHaveBeenCalled();
    confirm({
      content: 'some descriptions',
      icon: 'question',
    });
    jest.runAllTimers();
    expect(warnSpy).toHaveBeenCalledWith(
      `Warning: [antd: Modal] \`icon\` is using ReactNode instead of string naming in v4. Please check \`question\` at https://ant.design/components/icon`,
    );
    warnSpy.mockRestore();
    jest.useRealTimers();
  });

  it('ok button should trigger onOk once when click it many times quickly', () => {
    const onOk = jest.fn();
    open({ onOk });
    $$('.ant-btn-primary')[0].click();
    $$('.ant-btn-primary')[0].click();
    expect(onOk).toHaveBeenCalledTimes(1);
  });

  // https://github.com/ant-design/ant-design/issues/23358
  it('ok button should trigger onOk multiple times when onOk has close argument', () => {
    const onOk = jest.fn();
    open({
      onOk: close => {
        onOk();
        (() => {})(close); // do nothing
      },
    });
    $$('.ant-btn-primary')[0].click();
    $$('.ant-btn-primary')[0].click();
    $$('.ant-btn-primary')[0].click();
    expect(onOk).toHaveBeenCalledTimes(3);
  });

  it('should be able to global config rootPrefixCls', () => {
    jest.useFakeTimers();
    ConfigProvider.config({ prefixCls: 'my' });
    confirm({ title: 'title' });
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-btn').length).toBe(0);
    expect(document.querySelectorAll('.my-btn').length).toBe(2);
    expect(document.querySelectorAll('.my-modal-confirm').length).toBe(1);
    ConfigProvider.config({ prefixCls: 'ant' });
    jest.useRealTimers();
  });

  it('should be able to config rootPrefixCls', () => {
    jest.useFakeTimers();
    Modal.config({
      rootPrefixCls: 'my',
    });
    confirm({
      title: 'title',
    });
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-btn').length).toBe(0);
    expect(document.querySelectorAll('.my-btn').length).toBe(2);
    expect(document.querySelectorAll('.my-modal-confirm').length).toBe(1);
    Modal.config({
      rootPrefixCls: 'your',
    });
    confirm({
      title: 'title',
    });
    jest.runAllTimers();
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
    $$('.ant-btn-primary')[0].click();
    expect(afterClose).not.toHaveBeenCalled();
    await sleep(500);
    expect(afterClose).toHaveBeenCalled();
  });
});
