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
      />
    );
    wrapper.find('.ant-alert-close-icon').simulate('click');
    expect(onClose).toBeCalled();
    jest.runAllTimers();
    expect(afterClose).toBeCalled();
  });
});
