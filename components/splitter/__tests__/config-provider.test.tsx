import React from 'react';

import Splitter from '..';
import type { SplitterProps } from '..';
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
  props?: Partial<SplitterProps>;
  inner?: ConfigProviderProps['splitter'];
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

describe('Splitter ConfigProvider destroyOnHidden', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it.each(cases)('$name', async ({ config, props, inner, destroy }) => {
    const tree = (open: boolean) => (
      <ConfigProvider splitter={config === undefined ? undefined : { destroyOnHidden: config }}>
        <ConfigProvider splitter={inner}>
          <Splitter {...props}>
            <Splitter.Panel size={open ? 100 : 0}>
              <Content />
            </Splitter.Panel>
            <Splitter.Panel size={open ? 100 : 200}>Second panel</Splitter.Panel>
          </Splitter>
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
        <ConfigProvider splitter={{ destroyOnHidden: !itemDestroy }}>
          <Splitter>
            <Splitter.Panel size={open ? 100 : 0} destroyOnHidden={itemDestroy}>
              <Content />
            </Splitter.Panel>
            <Splitter.Panel size={open ? 100 : 200}>Second</Splitter.Panel>
          </Splitter>
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
});
