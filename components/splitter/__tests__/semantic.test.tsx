import React from 'react';

import Splitter from '..';
import type { GetProps, SplitterProps } from 'antd';
import { render } from '../../../tests/utils';

type PanelProps = GetProps<typeof Splitter.Panel>;
const SplitterDemo: React.FC<Readonly<{ items?: PanelProps[] } & SplitterProps>> = ({
  items = [{}, {}],
  ...props
}) => (
  <Splitter {...props}>
    {items?.map((item, idx) => {
      const key = `panel-${idx}`;
      return <Splitter.Panel key={key} {...item} />;
    })}
  </Splitter>
);

const resizeSplitter = async () => {
  // Simulate resize event
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('Splitter.Semantic', () => {
  it('should support classNames as function', async () => {
    const classNamesFn = jest.fn(({ props }) => ({
      root: `custom-root-${props.orientation}`,
      panel: 'custom-panel',
      dragger: 'custom-dragger',
    }));

    const { container } = render(
      <SplitterDemo orientation="horizontal" classNames={classNamesFn} items={[{}, {}]} />,
    );

    await resizeSplitter();

    expect(classNamesFn).toHaveBeenCalledWith({
      props: expect.objectContaining({
        orientation: 'horizontal',
      }),
    });

    const splitterElement = container.querySelector('.ant-splitter');
    expect(splitterElement).toHaveClass('custom-root-horizontal');

    const panelElements = container.querySelectorAll('.ant-splitter-panel');
    panelElements.forEach((panel) => {
      expect(panel).toHaveClass('custom-panel');
    });

    const draggerElement = container.querySelector('.ant-splitter-bar-dragger');
    expect(draggerElement).toHaveClass('custom-dragger');
  });

  it('should support styles as function', async () => {
    const stylesFn = jest.fn(({ props }) => ({
      root: { backgroundColor: props.orientation === 'horizontal' ? 'red' : 'blue' },
      panel: { padding: '10px' },
      dragger: { width: '8px' },
    }));

    const { container } = render(
      <SplitterDemo orientation="vertical" styles={stylesFn} items={[{}, {}]} />,
    );

    await resizeSplitter();

    expect(stylesFn).toHaveBeenCalledWith({
      props: expect.objectContaining({
        orientation: 'vertical',
      }),
    });

    const splitterElement = container.querySelector('.ant-splitter') as HTMLElement;
    expect(splitterElement.style.backgroundColor).toBe('blue');

    const panelElements = container.querySelectorAll('.ant-splitter-panel');
    panelElements.forEach((panel) => {
      expect((panel as HTMLElement).style.padding).toBe('10px');
    });

    const draggerElement = container.querySelector('.ant-splitter-bar-dragger') as HTMLElement;
    expect(draggerElement.style.width).toBe('8px');
  });

  it('should support both function and object classNames/styles', async () => {
    const classNamesFn = jest.fn(() => ({
      root: 'fn-root',
      panel: 'fn-panel',
    }));

    const stylesFn = jest.fn(() => ({
      root: { color: 'red' },
      panel: { margin: '5px' },
    }));

    const { container } = render(
      <SplitterDemo classNames={classNamesFn} styles={stylesFn} items={[{}, {}]} />,
    );

    await resizeSplitter();

    expect(classNamesFn).toHaveBeenCalled();
    expect(stylesFn).toHaveBeenCalled();

    const splitterElement = container.querySelector('.ant-splitter') as HTMLElement;
    expect(splitterElement).toHaveClass('fn-root');
    expect(splitterElement.style.color).toBe('red');

    const panelElements = container.querySelectorAll('.ant-splitter-panel');
    panelElements.forEach((panel) => {
      expect(panel).toHaveClass('fn-panel');
      expect((panel as HTMLElement).style.margin).toBe('5px');
    });
  });

  it('should work with complex dragger classNames as function', async () => {
    const classNamesFn = jest.fn(() => ({
      dragger: {
        default: 'custom-dragger-default',
        active: 'custom-dragger-active',
      },
    }));

    const { container } = render(<SplitterDemo classNames={classNamesFn} items={[{}, {}]} />);

    await resizeSplitter();

    expect(classNamesFn).toHaveBeenCalled();

    const draggerElement = container.querySelector('.ant-splitter-bar-dragger');
    expect(draggerElement).toHaveClass('custom-dragger-default');
  });
});
