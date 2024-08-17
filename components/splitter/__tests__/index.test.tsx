/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Splitter } from 'antd';
import type { GetProps } from 'antd';

import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

type PanelProps = GetProps<typeof Splitter.Panel>;

// jsdom 不执行任何布局，因此不会计算值 https://github.com/jsdom/jsdom/issues/1590
global.HTMLElement.prototype.getBoundingClientRect = () =>
  ({
    height: 400,
    width: 400,
  }) as DOMRect;

const SplitterDemo = ({ items = [{}, {}] }: { items?: PanelProps[] }) => (
  <Splitter style={{ width: 400, height: 400 }}>
    {items?.map((item, idx) =>
      item ? (
        <Splitter.Panel key={idx} {...item}>
          {idx}
        </Splitter.Panel>
      ) : (
        <Splitter.Panel key={idx}>{idx}</Splitter.Panel>
      ),
    )}
  </Splitter>
);

describe('Splitter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should correct render', () => {
    const { container } = render(<SplitterDemo />);
    expect(container?.querySelector('.ant-splitter')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')?.length).toBe(2);
    expect(container?.querySelector('.ant-splitter-bar')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should correct render panel size', async () => {
    const { container } = render(
      <SplitterDemo
        items={[{ defaultSize: 20 }, { defaultSize: '45%' }, { defaultSize: '39.4px' }, {}]}
      />,
    );

    await waitFakeTimer();

    expect(container?.querySelectorAll('.ant-splitter-panel')?.[0]).toHaveStyle(
      'flex-basis: calc(20% - 1.5px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')?.[1]).toHaveStyle(
      'flex-basis: calc(45% - 1.5px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')?.[2]).toHaveStyle(
      'flex-basis: calc(10% - 1.5px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')?.[3]).toHaveStyle(
      'flex-basis: calc(25% - 1.5px)',
    );
  });

  it('should resizable', () => {
    const { container } = render(
      <SplitterDemo items={[{ defaultSize: 20 }, { resizable: false }, {}]} />,
    );

    expect(container?.querySelectorAll('.ant-splitter-bar-resizable')?.length).toBe(1);
  });

  it('should collapsible', () => {
    const { container, rerender } = render(
      <SplitterDemo items={[{ defaultSize: 20, collapsible: true }, {}]} />,
    );

    expect(container?.querySelectorAll('.ant-splitter-bar-collapse-icon')?.length).toBe(2);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();

    // support collapsible is object
    rerender(
      <SplitterDemo
        items={[
          {
            defaultSize: 20,
            collapsible: {
              prev: true,
            },
          },
          {
            collapsible: {
              next: true,
            },
          },
          {},
        ]}
      />,
    );
    const barNodes = container?.querySelectorAll('.ant-splitter-bar');

    expect(barNodes?.[0]?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(barNodes?.[0]?.querySelector('.ant-splitter-bar-collapse-next')).toBeFalsy();

    expect(barNodes?.[1]?.querySelector('.ant-splitter-bar-collapse-previous')).toBeFalsy();
    expect(barNodes?.[1]?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
  });

  it('should collapsible click work', () => {
    // previous click
    const { container, rerender } = render(
      <SplitterDemo
        items={[
          {
            size: 20,
            collapsible: {
              prev: true,
            },
          },
          {},
        ]}
      />,
    );
    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeFalsy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();

    // next click
    rerender(
      <SplitterDemo
        items={[
          {
            size: 60,
            collapsible: {
              next: true,
            },
          },
          {},
        ]}
      />,
    );
    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeFalsy();

    // collapsible is boolean
    rerender(
      <SplitterDemo
        items={[
          {
            size: 10,
            collapsible: true,
          },
          {},
        ]}
      />,
    );
    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeFalsy();

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeFalsy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
  });
});
