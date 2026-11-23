import React from 'react';

import Popconfirm from '..';
import type { PopconfirmProps } from '..';
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
  props?: Partial<PopconfirmProps>;
  inner?: ConfigProviderProps['popconfirm'];
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

describe('Popconfirm ConfigProvider destroyOnHidden', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each(cases)('$name', async ({ config, props, inner, destroy }) => {
    const tree = (open: boolean) => (
      <ConfigProvider popconfirm={config === undefined ? undefined : { destroyOnHidden: config }}>
        <ConfigProvider popconfirm={inner}>
          <Popconfirm open={open} title={<Content />} {...props}>
            <button type="button">Trigger</button>
          </Popconfirm>
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
});
