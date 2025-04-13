import * as React from 'react';

import Modal from '..';
import { resetWarned } from '../../_util/warning';
import { render, waitFakeTimer, waitFakeTimer19 } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

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
    await waitFakeTimer19();

    expect(document.querySelector('.bamboo')).toBeTruthy();

    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
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
    errSpy.mockRestore();
  });
});
