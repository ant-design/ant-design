import React from 'react';

import Dropdown from '..';
import type { DropdownProps } from '..';
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
  document.querySelectorAll('.ant-dropdown').forEach((element) => fireEvent.animationEnd(element));
  await waitFakeTimer();
}

type TestCase = {
  name: string;
  config?: boolean;
  props?: Partial<DropdownProps>;
  inner?: ConfigProviderProps['dropdown'];
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
    props: { destroyPopupOnHide: false },
    destroy: false,
  },
  {
    name: 'legacy true overrides false',
    config: false,
    props: { destroyPopupOnHide: true },
    destroy: true,
  },
  {
    name: 'new false overrides legacy true',
    config: true,
    props: { destroyOnHidden: false, destroyPopupOnHide: true },
    destroy: false,
  },
  {
    name: 'new true overrides legacy false',
    config: false,
    props: { destroyOnHidden: true, destroyPopupOnHide: false },
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

describe('Dropdown ConfigProvider destroyOnHidden', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each(cases)('$name', async ({ config, props, inner, destroy }) => {
    const tree = (open: boolean) => (
      <ConfigProvider dropdown={config === undefined ? undefined : { destroyOnHidden: config }}>
        <ConfigProvider dropdown={inner}>
          <Dropdown open={open} menu={{ items: [] }} popupRender={() => <Content />} {...props}>
            <button type="button">Trigger</button>
          </Dropdown>
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

  it.each([undefined, false, true])(
    'Dropdown.Button inherits with instance override %s',
    async (destroyOnHidden) => {
      const tree = (open: boolean) => (
        <ConfigProvider dropdown={{ destroyOnHidden: true }}>
          <Dropdown.Button
            open={open}
            destroyOnHidden={destroyOnHidden}
            menu={{ items: [] }}
            popupRender={() => <Content />}
          >
            Actions
          </Dropdown.Button>
        </ConfigProvider>
      );
      const { queryByRole, rerender } = render(tree(true));
      await finishMotion();
      expect(queryByRole('textbox', { name: 'Content state' })).toBeTruthy();
      rerender(tree(false));
      await finishMotion();
      expect(!!queryByRole('textbox', { name: 'Content state', hidden: true })).toBe(
        destroyOnHidden === false,
      );
    },
  );
});
