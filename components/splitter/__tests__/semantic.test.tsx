import React from 'react';
import type { GetProps, SplitterProps } from 'antd';

import Splitter from '..';
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
    const classNamesFn: SplitterProps['classNames'] = jest.fn(({ props }) => ({
      root: `custom-root-${props.orientation}`,
      panel: 'custom-panel',
      dragger: { default: 'custom-dragger' },
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
    const stylesFn: SplitterProps['styles'] = jest.fn(({ props }) => ({
      root: {
        backgroundColor:
          props.orientation === 'horizontal' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)',
      },
      panel: { padding: '10px' },
      dragger: { width: '8px' },
    }));

    const { container } = render(
      <SplitterDemo orientation="vertical" styles={stylesFn} items={[{}, {}]} />,
    );

    await resizeSplitter();

    expect(stylesFn).toHaveBeenCalledWith({
      props: expect.objectContaining({ orientation: 'vertical' }),
    });

    const splitterElement = container.querySelector<HTMLElement>('.ant-splitter');
    expect(splitterElement).toHaveStyle({ backgroundColor: 'rgba(0, 0, 255, 0.5)' });

    const panelElements = container.querySelectorAll<HTMLElement>('.ant-splitter-panel');
    panelElements.forEach((panel) => {
      expect(panel).toHaveStyle({ padding: '10px' });
    });

    const draggerElement = container.querySelector<HTMLElement>('.ant-splitter-bar-dragger');
    expect(draggerElement).toHaveStyle({ width: '8px' });
  });

  it('should support both function and object classNames/styles', async () => {
    const classNamesFn = jest.fn(() => ({
      root: 'fn-root',
      panel: 'fn-panel',
    }));

    const stylesFn = jest.fn(() => ({
      root: { color: 'rgb(255, 0, 0)' },
      panel: { margin: '5px' },
    }));

    const { container } = render(
      <SplitterDemo classNames={classNamesFn} styles={stylesFn} items={[{}, {}]} />,
    );

    await resizeSplitter();

    expect(classNamesFn).toHaveBeenCalled();
    expect(stylesFn).toHaveBeenCalled();

    const splitterElement = container.querySelector<HTMLElement>('.ant-splitter');
    expect(splitterElement).toHaveClass('fn-root');
    expect(splitterElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    const panelElements = container.querySelectorAll<HTMLElement>('.ant-splitter-panel');

    panelElements.forEach((panel) => {
      expect(panel).toHaveClass('fn-panel');
      expect(panel).toHaveStyle({ margin: '5px' });
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
