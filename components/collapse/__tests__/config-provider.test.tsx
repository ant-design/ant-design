import React from 'react';

import Collapse from '..';
import type { CollapseProps } from '..';
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
  props?: Partial<CollapseProps>;
  inner?: ConfigProviderProps['collapse'];
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
    props: { destroyInactivePanel: false },
    destroy: false,
  },
  {
    name: 'legacy true overrides false',
    config: false,
    props: { destroyInactivePanel: true },
    destroy: true,
  },
  {
    name: 'new false overrides legacy true',
    config: true,
    props: { destroyOnHidden: false, destroyInactivePanel: true },
    destroy: false,
  },
  {
    name: 'new true overrides legacy false',
    config: false,
    props: { destroyOnHidden: true, destroyInactivePanel: false },
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

describe('Collapse ConfigProvider destroyOnHidden', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each(cases)('$name', async ({ config, props, inner, destroy }) => {
    const tree = (open: boolean) => (
      <ConfigProvider collapse={config === undefined ? undefined : { destroyOnHidden: config }}>
        <ConfigProvider collapse={inner}>
          <Collapse
            activeKey={open ? ['one'] : []}
            items={[{ key: 'one', label: 'One', children: <Content /> }]}
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

  it('preserves forceRender behavior', async () => {
    const tree = (open: boolean) => (
      <ConfigProvider collapse={{ destroyOnHidden: true }}>
        <Collapse
          items={[{ key: 'one', label: 'One', forceRender: true, children: <Content /> }]}
          activeKey={open ? ['one'] : []}
        />
      </ConfigProvider>
    );
    const { getByRole, rerender } = render(tree(false));
    await waitFakeTimer();
    fireEvent.change(getByRole('textbox', { name: 'Content state', hidden: true }), {
      target: { value: 'edited' },
    });
    rerender(tree(true));
    await waitFakeTimer();
    rerender(tree(false));
    await waitFakeTimer();
    expect(getByRole('textbox', { name: 'Content state', hidden: true })).toHaveValue('edited');
  });
});
