import React from 'react';
import Popover from '../../popover';
import Popconfirm from '../../popconfirm';
import ColorPicker from '../../color-picker';

import Tooltip from '..';
import type { TooltipProps } from '..';
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

type TestCase = {
  name: string;
  config?: boolean;
  props?: Partial<TooltipProps>;
  inner?: ConfigProviderProps['tooltip'];
  destroy: boolean;
};

const cases: TestCase[] = [
  {
    name: 'legacy object overrides false',
    config: false,
    props: { destroyTooltipOnHide: { keepParent: false } },
    destroy: true,
  },
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
    props: { destroyTooltipOnHide: false },
    destroy: false,
  },
  {
    name: 'legacy true overrides false',
    config: false,
    props: { destroyTooltipOnHide: true },
    destroy: true,
  },
  {
    name: 'new false overrides legacy true',
    config: true,
    props: { destroyOnHidden: false, destroyTooltipOnHide: true },
    destroy: false,
  },
  {
    name: 'new true overrides legacy false',
    config: false,
    props: { destroyOnHidden: true, destroyTooltipOnHide: false },
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

describe('Tooltip ConfigProvider destroyOnHidden', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each(cases)('$name', async ({ config, props, inner, destroy }) => {
    const tree = (open: boolean) => (
      <ConfigProvider tooltip={config === undefined ? undefined : { destroyOnHidden: config }}>
        <ConfigProvider tooltip={inner}>
          <Tooltip open={open} title={<Content />} {...props}>
            <button type="button">Trigger</button>
          </Tooltip>
        </ConfigProvider>
      </ConfigProvider>
    );
    const { getByRole, queryByRole, rerender } = render(tree(true));
    await waitFakeTimer();
    fireEvent.change(getByRole('textbox', { name: 'Content state' }), {
      target: { value: 'edited' },
    });

    rerender(tree(false));
    await waitFakeTimer();
    const hiddenContent = queryByRole('textbox', { name: 'Content state', hidden: true });
    if (destroy) {
      expect(hiddenContent).toBeNull();
    } else {
      expect(hiddenContent).toHaveValue('edited');
    }

    rerender(tree(true));
    await waitFakeTimer();
    expect(getByRole('textbox', { name: 'Content state' })).toHaveValue(
      destroy ? 'initial' : 'edited',
    );
  });

  it.each([false, true])(
    'does not leak tooltip destroyOnHidden=%s into other overlays',
    async (destroyOnHidden) => {
      const tree = (open: boolean) => (
        <ConfigProvider tooltip={{ destroyOnHidden }}>
          <Popover
            open={open}
            content={<input aria-label="Popover state" defaultValue="initial" />}
          >
            <span>Popover</span>
          </Popover>
          <Popconfirm
            open={open}
            title={<input aria-label="Popconfirm state" defaultValue="initial" />}
          >
            <span>Popconfirm</span>
          </Popconfirm>
          <ColorPicker
            open={open}
            panelRender={() => <input aria-label="ColorPicker state" defaultValue="initial" />}
          />
        </ConfigProvider>
      );
      const { getByRole, rerender } = render(tree(true));
      await waitFakeTimer();
      const labels = ['Popover state', 'Popconfirm state', 'ColorPicker state'];
      labels.forEach((name) =>
        fireEvent.change(getByRole('textbox', { name }), { target: { value: 'edited' } }),
      );
      rerender(tree(false));
      await waitFakeTimer();
      labels.forEach((name) =>
        expect(getByRole('textbox', { name, hidden: true })).toHaveValue('edited'),
      );
    },
  );

  it.each([undefined, false, true])(
    'preserves the unique popup lifecycle with override %s',
    async (destroyOnHidden) => {
      const offsetParent = jest
        .spyOn(HTMLElement.prototype, 'offsetParent', 'get')
        .mockReturnValue(document.body);
      const styles = jest.fn(() => ({}));
      const tree = (open: boolean) => (
        <ConfigProvider tooltip={{ unique: true, destroyOnHidden: true }}>
          <Tooltip
            open={open}
            destroyOnHidden={destroyOnHidden}
            styles={styles}
            title={<Content />}
          >
            <span>Trigger</span>
          </Tooltip>
        </ConfigProvider>
      );
      const { getByRole, rerender, unmount } = render(tree(true));
      await waitFakeTimer();
      expect(styles).toHaveBeenLastCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({ destroyOnHidden: destroyOnHidden ?? true }),
        }),
      );
      fireEvent.change(getByRole('textbox', { name: 'Content state' }), {
        target: { value: 'edited' },
      });
      rerender(tree(false));
      await waitFakeTimer();
      // The existing unique provider retains its shared popup even for an instance-level true.
      expect(getByRole('textbox', { name: 'Content state', hidden: true })).toHaveValue('edited');
      expect(document.querySelector('.ant-tooltip-unique-container-visible')).toBeNull();
      rerender(tree(true));
      await waitFakeTimer();
      expect(getByRole('textbox', { name: 'Content state' })).toHaveValue('edited');
      unmount();
      offsetParent.mockRestore();
    },
  );
});
