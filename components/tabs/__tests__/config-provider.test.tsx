import React from 'react';

import Tabs from '..';
import type { TabsProps } from '..';
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
  props?: Partial<TabsProps>;
  inner?: ConfigProviderProps['tabs'];
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
    props: { destroyInactiveTabPane: false },
    destroy: false,
  },
  {
    name: 'legacy true overrides false',
    config: false,
    props: { destroyInactiveTabPane: true },
    destroy: true,
  },
  {
    name: 'new false overrides legacy true',
    config: true,
    props: { destroyOnHidden: false, destroyInactiveTabPane: true },
    destroy: false,
  },
  {
    name: 'new true overrides legacy false',
    config: false,
    props: { destroyOnHidden: true, destroyInactiveTabPane: false },
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

describe('Tabs ConfigProvider destroyOnHidden', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each(cases)('$name', async ({ config, props, inner, destroy }) => {
    const tree = (open: boolean) => (
      <ConfigProvider tabs={config === undefined ? undefined : { destroyOnHidden: config }}>
        <ConfigProvider tabs={inner}>
          <Tabs
            activeKey={open ? 'one' : 'two'}
            items={[
              { key: 'one', label: 'One', children: <Content /> },
              { key: 'two', label: 'Two', children: 'Second panel' },
            ]}
            {...props}
          />
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
    'item destroyOnHidden=%s overrides the component default',
    async (itemDestroy) => {
      const tree = (open: boolean) => (
        <ConfigProvider tabs={{ destroyOnHidden: !itemDestroy }}>
          <Tabs
            items={[
              { key: 'one', label: 'One', destroyOnHidden: itemDestroy, children: <Content /> },
              { key: 'two', label: 'Two' },
            ]}
            activeKey={open ? 'one' : 'two'}
          />
        </ConfigProvider>
      );
      const { queryByRole, getByRole, rerender } = render(tree(true));
      await waitFakeTimer();
      fireEvent.change(getByRole('textbox', { name: 'Content state' }), {
        target: { value: 'edited' },
      });
      rerender(tree(false));
      await waitFakeTimer();
      expect(!!queryByRole('textbox', { name: 'Content state', hidden: true })).toBe(!itemDestroy);
      rerender(tree(true));
      await waitFakeTimer();
      expect(getByRole('textbox', { name: 'Content state' })).toHaveValue(
        itemDestroy ? 'initial' : 'edited',
      );
    },
  );

  it.each([false, true])(
    'keeps explicit Tabs destroyOnHidden=%s precedence over items',
    async (destroyOnHidden) => {
      const tree = (open: boolean) => (
        <ConfigProvider tabs={{ destroyOnHidden: !destroyOnHidden }}>
          <Tabs
            destroyOnHidden={destroyOnHidden}
            activeKey={open ? 'one' : 'two'}
            items={[
              {
                key: 'one',
                label: 'One',
                destroyOnHidden: !destroyOnHidden,
                children: <Content />,
              },
              { key: 'two', label: 'Two' },
            ]}
          />
        </ConfigProvider>
      );
      const { queryByRole, rerender } = render(tree(true));
      await waitFakeTimer();
      rerender(tree(false));
      await waitFakeTimer();
      expect(!!queryByRole('textbox', { name: 'Content state', hidden: true })).toBe(
        !destroyOnHidden,
      );
    },
  );

  it.each([false, true])(
    'legacy TabPane destroyInactiveTabPane=%s overrides the ConfigProvider default',
    async (destroyInactiveTabPane) => {
      const tree = (open: boolean) => (
        <ConfigProvider tabs={{ destroyOnHidden: !destroyInactiveTabPane }}>
          <Tabs activeKey={open ? 'one' : 'two'}>
            <Tabs.TabPane key="one" tab="One" destroyInactiveTabPane={destroyInactiveTabPane}>
              <Content />
            </Tabs.TabPane>
            <Tabs.TabPane key="two" tab="Two">
              Second panel
            </Tabs.TabPane>
          </Tabs>
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
      if (destroyInactiveTabPane) {
        expect(hiddenContent).toBeNull();
      } else {
        expect(hiddenContent).toHaveValue('edited');
      }

      rerender(tree(true));
      await waitFakeTimer();
      expect(getByRole('textbox', { name: 'Content state' })).toHaveValue(
        destroyInactiveTabPane ? 'initial' : 'edited',
      );
    },
  );

  it('keeps a legacy item false ahead of the ConfigProvider default', async () => {
    const tree = (open: boolean) => (
      <ConfigProvider tabs={{ destroyOnHidden: true }}>
        <Tabs
          activeKey={open ? 'one' : 'two'}
          items={[
            { key: 'one', label: 'One', destroyInactiveTabPane: false, children: <Content /> },
            { key: 'two', label: 'Two' },
          ]}
        />
      </ConfigProvider>
    );
    const { getByRole, rerender } = render(tree(true));
    await waitFakeTimer();
    fireEvent.change(getByRole('textbox', { name: 'Content state' }), {
      target: { value: 'edited' },
    });
    rerender(tree(false));
    await waitFakeTimer();
    expect(getByRole('textbox', { name: 'Content state', hidden: true })).toHaveValue('edited');
  });
});
