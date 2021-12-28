import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Button from '../../button';
import Tooltip from '../../tooltip';
import Popconfirm from '../../popconfirm';
import rtlTest from '../../../tests/shared/rtlTest';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import { sleep } from '../../../tests/utils';
import Alert from '..';

const { ErrorBoundary } = Alert;

describe('Alert', () => {
  rtlTest(Alert);
  accessibilityTest(Alert);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('could be closed', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        onClose={onClose}
      />,
    );
    act(() => {
      jest.useFakeTimers();
      wrapper.find('.ant-alert-close-icon').simulate('click');
      jest.runAllTimers();
      jest.useRealTimers();
    });
    expect(onClose).toHaveBeenCalled();
  });

  describe('action of Alert', () => {
    it('custom action', () => {
      const wrapper = mount(
        <Alert
          message="Success Tips"
          type="success"
          showIcon
          action={
            <Button size="small" type="text">
              UNDO
            </Button>
          }
          closable
        />,
      );
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('support closeIcon', () => {
    const wrapper = mount(
      <Alert
        closable
        closeIcon={<span>close</span>}
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('data and aria props', () => {
    it('sets data attributes on input', () => {
      const wrapper = mount(<Alert data-test="test-id" data-id="12345" message={null} />);
      const input = wrapper.find('.ant-alert').getDOMNode();
      expect(input.getAttribute('data-test')).toBe('test-id');
      expect(input.getAttribute('data-id')).toBe('12345');
    });

    it('sets aria attributes on input', () => {
      const wrapper = mount(<Alert aria-describedby="some-label" message={null} />);
      const input = wrapper.find('.ant-alert').getDOMNode();
      expect(input.getAttribute('aria-describedby')).toBe('some-label');
    });

    it('sets role attribute on input', () => {
      const wrapper = mount(<Alert role="status" message={null} />);
      const input = wrapper.find('.ant-alert').getDOMNode();
      expect(input.getAttribute('role')).toBe('status');
    });
  });

  it('ErrorBoundary', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalledTimes(0);
    // @ts-expect-error
    // eslint-disable-next-line react/jsx-no-undef
    const ThrowError = () => <NotExisted />;
    const wrapper = mount(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    // eslint-disable-next-line jest/no-standalone-expect
    expect(wrapper.text()).toContain('ReferenceError: NotExisted is not defined');
    // eslint-disable-next-line no-console
    (console.error as any).mockRestore();
  });

  it('could be used with Tooltip', async () => {
    const ref = React.createRef<any>();
    jest.useRealTimers();
    const wrapper = mount(
      <Tooltip title="xxx" mouseEnterDelay={0} ref={ref}>
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Tooltip>,
    );
    wrapper.find('.ant-alert').simulate('mouseenter');
    await sleep(0);
    expect(ref.current.getPopupDomNode()).toBeTruthy();
    jest.useFakeTimers();
  });

  it('could be used with Popconfirm', async () => {
    const ref = React.createRef<any>();
    jest.useRealTimers();
    const wrapper = mount(
      <Popconfirm ref={ref} title="xxx">
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Popconfirm>,
    );
    wrapper.find('.ant-alert').simulate('click');
    await sleep(0);
    expect(ref.current.getPopupDomNode()).toBeTruthy();
    jest.useFakeTimers();
  });

  it('could accept none react element icon', () => {
    const wrapper = mount(<Alert message="Success Tips" type="success" showIcon icon="icon" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should not render message div when no message', () => {
    const wrapper = mount(<Alert description="description" />);
    expect(wrapper.exists('.ant-alert-message')).toBe(false);
  });
});
