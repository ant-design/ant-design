import React from 'react';
import userEvent from '@testing-library/user-event';
import Alert from '..';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep, act, screen } from '../../../tests/utils';
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

  it('should show close button and could be closed', async () => {
    const onClose = jest.fn();
    render(
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        onClose={onClose}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /close/i }));

    act(() => {
      jest.runAllTimers();
    });

    expect(onClose).toBeCalledTimes(1);
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

  describe('data and aria props', () => {
    it('should sets data attributes on alert when pass attributes to props', () => {
      render(
        <Alert data-test="test-id" data-id="12345" aria-describedby="some-label" message={null} />,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-test', 'test-id');
      expect(alert).toHaveAttribute('data-id', '12345');
      expect(alert).toHaveAttribute('aria-describedby', 'some-label');
    });

    it('sets role attribute on input', () => {
      render(<Alert role="status" message={null} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  it('should show error as ErrorBoundary when children have error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalledTimes(0);
    // @ts-expect-error
    // eslint-disable-next-line react/jsx-no-undef
    const ThrowError = () => <NotExisted />;
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'ReferenceError: NotExisted is not defined',
    );
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
