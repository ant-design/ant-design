import React from 'react';
import { act } from 'react-dom/test-utils';
import Alert from '..';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep } from '../../../tests/utils';
import Button from '../../button';
import Popconfirm from '../../popconfirm';
import Tooltip from '../../tooltip';

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
    const { container } = render(
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        onClose={onClose}
      />,
    );

    act(() => {
      jest.useFakeTimers();
      fireEvent.click(container.querySelector('.ant-alert-close-icon')!);
      jest.runAllTimers();
      jest.useRealTimers();
    });
    expect(onClose).toHaveBeenCalled();
  });

  describe('action of Alert', () => {
    it('custom action', () => {
      const { container } = render(
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
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('support closeIcon', () => {
    const { container } = render(
      <Alert
        closable
        closeIcon={<span>close</span>}
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('data and aria props', () => {
    it('sets data attributes on input', () => {
      const { container } = render(<Alert data-test="test-id" data-id="12345" message={null} />);
      const input = container.querySelector('.ant-alert')!;
      expect(input.getAttribute('data-test')).toBe('test-id');
      expect(input.getAttribute('data-id')).toBe('12345');
    });

    it('sets aria attributes on input', () => {
      const { container } = render(<Alert aria-describedby="some-label" message={null} />);
      const input = container.querySelector('.ant-alert')!;
      expect(input.getAttribute('aria-describedby')).toBe('some-label');
    });

    it('sets role attribute on input', () => {
      const { container } = render(<Alert role="status" message={null} />);
      const input = container.querySelector('.ant-alert')!;
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
    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    // eslint-disable-next-line jest/no-standalone-expect
    expect(container.textContent).toContain('ReferenceError: NotExisted is not defined');
    // eslint-disable-next-line no-console
    (console.error as any).mockRestore();
  });

  it('could be used with Tooltip', async () => {
    const ref = React.createRef<any>();
    jest.useRealTimers();
    const { container } = render(
      <Tooltip title="xxx" mouseEnterDelay={0} ref={ref}>
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Tooltip>,
    );
    // wrapper.find('.ant-alert').simulate('mouseenter');
    fireEvent.mouseEnter(container.querySelector('.ant-alert')!);
    await sleep(0);
    expect(ref.current.getPopupDomNode()).toBeTruthy();
    jest.useFakeTimers();
  });

  it('could be used with Popconfirm', async () => {
    const ref = React.createRef<any>();
    jest.useRealTimers();
    const { container } = render(
      <Popconfirm ref={ref} title="xxx">
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Popconfirm>,
    );
    fireEvent.click(container.querySelector('.ant-alert')!);
    await sleep(0);
    expect(ref.current.getPopupDomNode()).toBeTruthy();
    jest.useFakeTimers();
  });

  it('could accept none react element icon', () => {
    const { container } = render(
      <Alert message="Success Tips" type="success" showIcon icon="icon" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render message div when no message', () => {
    const { container } = render(<Alert description="description" />);
    expect(!!container.querySelector('.ant-alert-message')).toBe(false);
  });
});
