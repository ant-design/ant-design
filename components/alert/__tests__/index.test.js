import React from 'react';
import { mount } from 'enzyme';
import Alert from '..';

describe('Alert', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('could be closed', () => {
    const onClose = jest.fn();
    const afterClose = jest.fn();
    const wrapper = mount(
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        onClose={onClose}
        afterClose={afterClose}
      />,
    );
    wrapper.find('.ant-alert-close-icon').simulate('click');
    expect(onClose).toBeCalled();
    jest.runAllTimers();
    expect(afterClose).toBeCalled();
  });

  it('deprecate prop iconType', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    mount(<Alert iconType="success" />);
    expect(errorSpy).toBeCalledWith(
      "Warning: The prop 'iconType' is deprecated and will be removed in next major release. Please use 'icon' instead."
    );
    errorSpy.mockRestore();
  });

  describe('data and aria props', () => {
    it('sets data attributes on input', () => {
      const wrapper = mount(<Alert data-test="test-id" data-id="12345" />);
      const input = wrapper.find('.ant-alert').getDOMNode();
      expect(input.getAttribute('data-test')).toBe('test-id');
      expect(input.getAttribute('data-id')).toBe('12345');
    });

    it('sets aria attributes on input', () => {
      const wrapper = mount(<Alert aria-describedby="some-label" />);
      const input = wrapper.find('.ant-alert').getDOMNode();
      expect(input.getAttribute('aria-describedby')).toBe('some-label');
    });

    it('sets role attribute on input', () => {
      const wrapper = mount(<Alert role="status" />);
      const input = wrapper.find('.ant-alert').getDOMNode();
      expect(input.getAttribute('role')).toBe('status');
    });
  });
});
