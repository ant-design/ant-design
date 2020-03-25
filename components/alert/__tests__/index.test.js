import React from 'react';
import { mount } from 'enzyme';
import Alert from '..';
import Tooltip from '../../tooltip';
import Popconfirm from '../../popconfirm';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';

const { ErrorBoundary } = Alert;

describe('Alert', () => {
  rtlTest(Alert);

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
    expect(onClose).toHaveBeenCalled();
    jest.runAllTimers();
    expect(afterClose).toHaveBeenCalled();
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

  const testIt = process.env.REACT === '15' ? it.skip : it;
  testIt('ErrorBoundary', () => {
    const ThrowError = () => <NotExisted />; // eslint-disable-line
    const wrapper = mount(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    // eslint-disable-next-line jest/no-standalone-expect
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('could be used with Tooltip', async () => {
    jest.useRealTimers();
    const wrapper = mount(
      <Tooltip title="xxx" mouseEnterDelay={0}>
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Tooltip>,
    );
    wrapper.find('.ant-alert').simulate('mouseenter');
    await sleep(0);
    expect(
      wrapper
        .find(Tooltip)
        .instance()
        .getPopupDomNode(),
    ).toBeTruthy();
    jest.useFakeTimers();
  });

  it('could be used with Popconfirm', async () => {
    jest.useRealTimers();
    const wrapper = mount(
      <Popconfirm title="xxx">
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Popconfirm>,
    );
    wrapper.find('.ant-alert').simulate('click');
    await sleep(0);
    expect(
      wrapper
        .find(Popconfirm)
        .instance()
        .getPopupDomNode(),
    ).toBeTruthy();
    jest.useFakeTimers();
  });
});
