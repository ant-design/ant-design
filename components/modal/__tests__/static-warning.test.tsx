import * as React from 'react';
import Modal from '..';
import { render, waitFakeTimer } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';
import ConfigProvider from '../../config-provider';

describe('Modal.confirm warning', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetWarned();
  });

  afterEach(async () => {
    Modal.destroyAll();

    await waitFakeTimer();
    document.body.innerHTML = '';
    jest.clearAllTimers();
  });

  // Follow test need keep order
  it('no warning', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    Modal.confirm({
      content: <div className="bamboo" />,
    });
    await waitFakeTimer();

    expect(document.querySelector('.bamboo')).toBeTruthy();

    expect(errSpy).not.toHaveBeenCalled();
  });

  it('warning if use theme', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<ConfigProvider theme={{}} />);

    Modal.confirm({
      content: <div className="light" />,
    });
    await waitFakeTimer();

    expect(document.querySelector('.light')).toBeTruthy();

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [antd: Modal] Static function can not consume context like dynamic theme. Please use 'App' component instead.",
    );
  });
});
