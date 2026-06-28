import * as React from 'react';
import { vi } from 'vitest';

import Modal from '..';
import { resetWarned } from '../../_util/warning';
import { render, waitFakeTimer, waitFakeTimer19 } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

// TODO: Remove this. Mock for React 19
vi.mock('react-dom', async () => {
  const realReactDOM = await vi.importActual<typeof import('react-dom')>('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient =
      await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
    (
      realReactDOM as typeof realReactDOM & { createRoot: typeof realReactDOMClient.createRoot }
    ).createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('Modal.confirm warning', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetWarned();
  });

  afterEach(async () => {
    Modal.destroyAll();

    await waitFakeTimer();
    document.body.innerHTML = '';
    vi.clearAllTimers();
  });

  // Follow test need keep order
  it('no warning', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    Modal.confirm({
      content: <div className="bamboo" />,
    });
    await waitFakeTimer19();

    expect(document.querySelector('.bamboo')).toBeTruthy();

    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('warning if use theme', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
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
