import Modal from '..';
import { destroyFns } from '../Modal';

const { confirm } = Modal;

describe('Modal.confirm triggers callbacks correctly', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
    document.body.innerHTML = '';
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function open(args) {
    confirm({
      title: 'Want to delete these items?',
      content: 'some descriptions',
      ...args,
    });
  }

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

  it('should allow Modal.comfirm without onCancel been set', () => {
    open();
    // Third Modal
    $$('.ant-btn')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should allow Modal.comfirm without onOk been set', () => {
    open();
    // Fourth Modal
    $$('.ant-btn-primary')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should emit error when onOk return Promise.reject', () => {
    const error = new Error('something wrong');
    open({
      onOk: () => Promise.reject(error),
    });
    // Fifth Modal
    $$('.ant-btn-primary')[0].click();
    // wait promise
    return Promise.resolve().then(() => {
      expect(errorSpy).toHaveBeenCalledWith(error);
    });
  });

  if (process.env.REACT !== '15') {
    it('shows animation when close', () => {
      jest.useFakeTimers();
      open();
      $$('.ant-btn')[0].click();
      expect($$('.ant-modal-confirm')).toHaveLength(1);
      jest.runAllTimers();
      expect($$('.ant-modal-confirm')).toHaveLength(0);
      jest.useRealTimers();
    });
  }

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
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      $$('.ant-btn')[0].click();
      jest.runAllTimers();
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(0);
    });
    jest.useRealTimers();
  });

  it('could be update', () => {
    jest.useFakeTimers();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      const instance = Modal[type]({
        title: 'title',
        content: 'content',
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('title');
      expect($$('.ant-modal-confirm-content')[0].innerHTML).toBe('content');
      instance.update({
        title: 'new title',
        content: 'new content',
      });
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      expect($$('.ant-modal-confirm-title')[0].innerHTML).toBe('new title');
      expect($$('.ant-modal-confirm-content')[0].innerHTML).toBe('new content');
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
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
      instance.destroy();
      jest.runAllTimers();
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
      expect($$(`.ant-modal-confirm-${type}`)).toHaveLength(1);
    });
    Modal.destroyAll();
    ['info', 'success', 'warning', 'error'].forEach(type => {
      jest.runAllTimers();
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
      instances.push(instance);
    });
    const { length } = instances;
    instances.forEach((instance, index) => {
      expect(destroyFns.length).toBe(length - index);
      instance.destroy();
      jest.runAllTimers();
      expect(destroyFns.length).toBe(length - index - 1);
    });
    jest.useRealTimers();
  });
});
