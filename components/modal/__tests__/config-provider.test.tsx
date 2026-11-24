import React from 'react';

import Modal from '..';
import type { ModalProps } from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ConfigProviderProps } from '../../config-provider';

const Content = () => {
  const [value, setValue] = React.useState('initial');
  return (
    <input
      aria-label="Content state"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

async function finishMotion() {
  await waitFakeTimer();
  document.querySelectorAll('.ant-modal').forEach((element) => {
    fireEvent.transitionEnd(element);
  });
  await waitFakeTimer();
}

type TestCase = {
  name: string;
  config?: boolean;
  props?: Partial<ModalProps>;
  inner?: ConfigProviderProps['modal'];
  destroy: boolean;
};

const cases: TestCase[] = [
  { name: 'keeps content by default', destroy: false },
  { name: 'inherits true', config: true, destroy: true },
  { name: 'inherits false', config: false, destroy: false },
  {
    name: 'instance false overrides true',
    config: true,
    props: { destroyOnHidden: false },
    destroy: false,
  },
  {
    name: 'instance true overrides false',
    config: false,
    props: { destroyOnHidden: true },
    destroy: true,
  },
  {
    name: 'legacy false overrides true',
    config: true,
    props: { destroyOnClose: false },
    destroy: false,
  },
  {
    name: 'legacy true overrides false',
    config: false,
    props: { destroyOnClose: true },
    destroy: true,
  },
  {
    name: 'new false overrides legacy true',
    config: true,
    props: { destroyOnHidden: false, destroyOnClose: true },
    destroy: false,
  },
  {
    name: 'new true overrides legacy false',
    config: false,
    props: { destroyOnHidden: true, destroyOnClose: false },
    destroy: true,
  },
  {
    name: 'nested false overrides true',
    config: true,
    inner: { destroyOnHidden: false },
    destroy: false,
  },
  {
    name: 'nested true overrides false',
    config: false,
    inner: { destroyOnHidden: true },
    destroy: true,
  },
  {
    name: 'nested component config replaces the outer object',
    config: true,
    inner: {},
    destroy: false,
  },
];

describe('Modal ConfigProvider destroyOnHidden', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each(cases)('$name', async ({ config, props, inner, destroy }) => {
    const tree = (open: boolean) => (
      <ConfigProvider modal={config === undefined ? undefined : { destroyOnHidden: config }}>
        <ConfigProvider modal={inner}>
          <Modal open={open} {...props}>
            <Content />
          </Modal>
        </ConfigProvider>
      </ConfigProvider>
    );
    const { getByRole, queryByRole, rerender } = render(tree(true));
    await finishMotion();
    fireEvent.change(getByRole('textbox', { name: 'Content state' }), {
      target: { value: 'edited' },
    });

    rerender(tree(false));
    await finishMotion();
    const hiddenContent = queryByRole('textbox', { name: 'Content state', hidden: true });
    if (destroy) {
      expect(hiddenContent).toBeNull();
    } else {
      expect(hiddenContent).toHaveValue('edited');
    }

    rerender(tree(true));
    await finishMotion();
    expect(getByRole('textbox', { name: 'Content state' })).toHaveValue(
      destroy ? 'initial' : 'edited',
    );
  });

  it('finishes closing before destroying the content and reports completion', async () => {
    const afterOpenChange = jest.fn();
    const afterClose = jest.fn();
    const tree = (open: boolean) => (
      <ConfigProvider modal={{ destroyOnHidden: true }}>
        <Modal open={open} afterOpenChange={afterOpenChange} afterClose={afterClose}>
          <Content />
        </Modal>
      </ConfigProvider>
    );
    const { getByRole, queryByRole, rerender } = render(tree(true));
    await finishMotion();
    afterOpenChange.mockClear();
    rerender(tree(false));
    expect(getByRole('textbox', { name: 'Content state', hidden: true })).toBeTruthy();
    expect(afterOpenChange).not.toHaveBeenCalled();
    await finishMotion();
    expect(queryByRole('textbox', { name: 'Content state', hidden: true })).toBeNull();
    expect(afterOpenChange).toHaveBeenCalledTimes(1);
    expect(afterOpenChange).toHaveBeenCalledWith(false);
    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the imperative confirmation lifecycle', async () => {
    const afterClose = jest.fn();
    const Demo = () => {
      const [modal, holder] = Modal.useModal();
      return (
        <>
          {holder}
          <button type="button" onClick={() => modal.confirm({ content: <Content />, afterClose })}>
            Confirm
          </button>
        </>
      );
    };
    const { getByRole, queryByRole } = render(
      <ConfigProvider modal={{ destroyOnHidden: true }}>
        <Demo />
      </ConfigProvider>,
    );
    fireEvent.click(getByRole('button', { name: 'Confirm' }));
    await finishMotion();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));
    expect(getByRole('textbox', { name: 'Content state', hidden: true })).toBeTruthy();
    expect(afterClose).not.toHaveBeenCalled();
    await finishMotion();
    expect(queryByRole('textbox', { name: 'Content state', hidden: true })).toBeNull();
    expect(afterClose).toHaveBeenCalledTimes(1);
  });
});
