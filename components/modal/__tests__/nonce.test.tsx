import * as React from 'react';
import Button from 'antd/es/button';

import Modal from '..';
import { resetWarned } from '../../_util/warning';
import { render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Modal.confirm CSP', () => {
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

  it('no nonce', async () => {
    const confirm = () =>
      Modal.confirm({
        content: <div className="light" />,
      });

    render(<Button onClick={confirm} />);

    const styleNodes = document.querySelectorAll('style');

    styleNodes.forEach((node) => {
      expect(node?.nonce).toEqual('');
    });
  });
  it('nonce', async () => {
    const confirm = () =>
      Modal.confirm({
        content: <div className="light" />,
      });

    render(
      <ConfigProvider csp={{ nonce: 'bamboo' }}>
        <Button onClick={confirm} />
      </ConfigProvider>,
    );

    const styleNodes = document.querySelectorAll('style');

    styleNodes.forEach((node) => {
      expect(node?.nonce).toEqual('bamboo');
    });
  });
});
