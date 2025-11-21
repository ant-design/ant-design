import React, { useState } from 'react';

import Space from '..';
import type { Orientation } from '../../_util/hooks';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Space', () => {
  mountTest(Space);
  rtlTest(Space);

  it('should render width empty children', () => {
    const { container } = render(<Space />);

    expect(container.children.length).toBe(0);
  });

  it('should render width ConfigProvider', () => {
    const { container } = render(
      <ConfigProvider space={{ size: 'large' }}>
        <Space>
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="middle">
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="large">
          <span>1</span>
          <span>2</span>
        </Space>
      </ConfigProvider>,
    );

    expect(container.children).toMatchSnapshot();
  });

  it('should render width ConfigProvider support 0', () => {
    const { container } = render(
      <ConfigProvider space={{ size: 0 }}>
        <Space>
          <span>1</span>
          <span>2</span>
        </Space>
      </ConfigProvider>,
    );

    const item = container.querySelector('.ant-space-gap-row-small.ant-space-gap-col-small');
    expect(item).toBe(null);
  });

  it('should render width rtl', () => {
    const { container } = render(
      <ConfigProvider direction="rtl">
        <Space>
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="middle">
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="large">
          <span>1</span>
          <span>2</span>
        </Space>
      </ConfigProvider>,
    );

    expect(container.children).toMatchSnapshot();
  });

  it('should render width customize size', () => {
    const { container } = render(
      <Space size={10}>
        <span>1</span>
        <span>2</span>
      </Space>,
    );

    const items = container.querySelectorAll<HTMLDivElement>('div.ant-space-item');
    expect(items[0]).toHaveStyle({ marginRight: '' });
    expect(items[1]).toHaveStyle({ marginRight: '' });
  });

  it('should render vertical space width customize size', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <Space size={10} direction="vertical">
        <span>1</span>
        <span>2</span>
      </Space>,
    );
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: [antd: Space] `direction` is deprecated. Please use `orientation` instead.',
    );
    warnSpy.mockRestore();
    const items = container.querySelectorAll<HTMLDivElement>('div.ant-space-item');
    expect(items[0]).toHaveStyle({ marginBottom: '' });
    expect(items[1]).toHaveStyle({ marginBottom: '' });
  });

  it('should render correct with children', () => {
    const { container } = render(
      <Space>
        text1<span>text1</span>
        <>text3</>
      </Space>,
    );

    expect(container.children[0]).toMatchSnapshot();
  });

  it('should render with invalidElement', () => {
    const { container } = render(
      <Space>
        text1<span>text1</span>
        text1
      </Space>,
    );

    expect(container.querySelectorAll('div.ant-space-item').length).toBe(3);
  });

  it('should be keep store', () => {
    function Demo() {
      const [state, setState] = React.useState(1);

      return (
        <div
          id="demo"
          onClick={() => {
            setState((value) => value + 1);
          }}
        >
          {state}
        </div>
      );
    }
    function SpaceDemo() {
      const [visible, setVisible] = useState(true);
      function onChange() {
        setVisible(!visible);
      }
      return (
        <Space>
          {visible && <div>space</div>}
          <Demo />
          <p onClick={onChange}>Three</p>
        </Space>
      );
    }
    const { container } = render(<SpaceDemo />);

    expect(container.querySelector('#demo')).toHaveTextContent('1');

    fireEvent.click(container.querySelector('#demo')!);

    expect(container.querySelector('#demo')).toHaveTextContent('2');

    fireEvent.click(container.querySelector('p')!);

    expect(container.querySelector('#demo')).toHaveTextContent('2');
  });

  it('separator', () => {
    const { container } = render(
      <Space separator="-">
        text1<span>text1</span>
        <>text3</>
      </Space>,
    );

    expect(container.children[0]).toMatchSnapshot();
  });

  it('legacy split', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Space split="-">
        text1<span>text1</span>
        <>text3</>
      </Space>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Space] `split` is deprecated. Please use `separator` instead.',
    );

    errorSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/35305
  it('should not throw duplicated key warning', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Space>
        <div key="1" />
        <div />
        <div key="3" />
        <div />
      </Space>,
    );
    expect(spy).not.toHaveBeenCalledWith(
      expect.stringContaining('Encountered two children with the same key'),
      expect.anything(),
      expect.anything(),
    );
    spy.mockRestore();
  });

  it('should render the hidden empty item wrapper', () => {
    const Null: React.FC = () => null;
    const { container } = render(
      <Space>
        <Null />
      </Space>,
    );
    const element = container.querySelector<HTMLDivElement>('div.ant-space-item')!;
    expect(element).toBeEmptyDOMElement();
    expect(element).toHaveStyle({ display: 'none' });
  });

  it('should ref work', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Space ref={ref}>
        <span>Text1</span>
        <span>Text2</span>
      </Space>,
    );

    expect(ref.current).toBe(container.firstChild);
  });

  it('should apply classNames and styles correctly', () => {
    const customClassNames = {
      root: 'custom-root',
      item: 'custom-item',
      separator: 'custom-separator',
    };

    const customStyles = {
      root: { color: 'rgb(0, 128, 0)' },
      item: { color: 'rgb(255, 0, 0)' },
      separator: { color: 'rgb(0, 0, 255)' },
    };

    const { container } = render(
      <Space classNames={customClassNames} styles={customStyles} separator="-">
        <span>Text1</span>
        <span>Text2</span>
      </Space>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-space');
    const itemElement = container.querySelector<HTMLElement>('.ant-space-item');
    const separatorElement = container.querySelector<HTMLElement>('.ant-space-item-separator');

    // Check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(itemElement).toHaveClass('custom-item');
    expect(separatorElement).toHaveClass('custom-separator');

    // Check styles
    expect(rootElement).toHaveStyle({ color: customStyles.root.color });
    expect(itemElement).toHaveStyle({ color: customStyles.item.color });
    expect(separatorElement).toHaveStyle({ color: customStyles.separator.color });
  });

  // ============================= orientation =============================
  describe('orientation attribute', () => {
    const testCases: Array<[params: [undefined | Orientation, undefined | Orientation], string]> = [
      [[undefined, undefined], 'horizontal'],
      [[undefined, 'vertical'], 'vertical'],
      [['vertical', 'horizontal'], 'vertical'],
      [['vertical', undefined], 'vertical'],
      [['horizontal', 'vertical'], 'horizontal'],
    ];
    it.each(testCases)('with args %j should have %s node', (params, expected) => {
      const { container } = render(
        <Space orientation={params[0]} direction={params[1]}>
          <button type="button">1</button>
          <button type="button">2</button>
        </Space>,
      );

      expect(container.querySelector<HTMLDivElement>(`.ant-space-${expected}`)).toBeTruthy();
    });
    it.each(testCases)('with args %j should have %s node', (params, expected) => {
      const { container } = render(
        <Space.Compact orientation={params[0]} direction={params[1]}>
          <button type="button">1</button>
          <button type="button">2</button>
        </Space.Compact>,
      );
      if (expected === 'vertical') {
        expect(
          container.querySelector<HTMLDivElement>(`.ant-space-compact-${expected}`),
        ).toBeTruthy();
      } else {
        expect(container.querySelector<HTMLDivElement>(`.ant-space-compact-vertical`)).toBeFalsy();
        expect(
          container.querySelector<HTMLDivElement>(`.ant-space-compact-horizontal`),
        ).toBeFalsy();
      }
    });
  });
});
