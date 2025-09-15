import React from 'react';

import { resetWarned } from '../../_util/warning';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Collapse', () => {
  const Collapse = require('..').default;

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // fix React concurrent
  function triggerAllTimer() {
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }
  }

  beforeEach(() => {
    resetWarned();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('should support remove expandIcon', () => {
    const { asFragment } = render(
      <Collapse expandIcon={() => null}>
        <Collapse.Panel header="header" />
      </Collapse>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should be able to config size', () => {
    const { container: small } = render(<Collapse size="small" />);
    const { container: large } = render(<Collapse size="large" />);

    expect(small.querySelector('.ant-collapse')).toHaveClass('ant-collapse-small');
    expect(large.querySelector('.ant-collapse')).toHaveClass('ant-collapse-large');
  });

  it('should keep the className of the expandIcon', () => {
    const { container } = render(
      <Collapse
        expandIcon={() => (
          <button type="button" className="custom-expandicon-classname">
            action
          </button>
        )}
      >
        <Collapse.Panel header="header" />
      </Collapse>,
    );

    expect(container.querySelectorAll('.custom-expandicon-classname').length).toBe(1);
  });

  it('should render extra node of panel', () => {
    const { asFragment } = render(
      <Collapse>
        <Collapse.Panel header="header" extra={<button type="button">action</button>} />
        <Collapse.Panel header="header" extra={<button type="button">action</button>} />
      </Collapse>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('could be expand and collapse', async () => {
    jest.useFakeTimers();
    const { container } = render(
      <Collapse>
        <Collapse.Panel header="This is panel header 1" key="1">
          content
        </Collapse.Panel>
      </Collapse>,
    );
    expect(
      container.querySelector('.ant-collapse-item')?.classList.contains('ant-collapse-item-active'),
    ).toBe(false);
    fireEvent.click(container.querySelector('.ant-collapse-header')!);
    await waitFakeTimer();
    expect(
      container.querySelector('.ant-collapse-item')?.classList.contains('ant-collapse-item-active'),
    ).toBe(true);
    jest.useRealTimers();
  });

  it('could override default openMotion', () => {
    const { container, asFragment } = render(
      <Collapse openMotion={{}}>
        <Collapse.Panel header="This is panel header 1" key="1">
          content
        </Collapse.Panel>
      </Collapse>,
    );
    fireEvent.click(container.querySelector('.ant-collapse-header')!);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should not trigger warning when using items instead of children', () => {
    render(
      <Collapse
        items={[
          {
            key: '1',
            label: 'This is panel header 1',
            children: <p>aaa</p>,
          },
          {
            key: '2',
            label: 'This is panel header 2',
            children: <p>bbb</p>,
          },
          {
            key: '3',
            label: 'This is panel header 3',
            children: <p>ccc</p>,
          },
        ]}
      />,
    );

    expect(errorSpy).not.toHaveBeenCalledWith(
      'Warning: `children` will be removed in next major version. Please use `items` instead.',
    );
  });

  it('should end motion when set activeKey while hiding', async () => {
    jest.useFakeTimers();
    const spiedRAF = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => setTimeout(cb, 1000 / 60));

    let setActiveKeyOuter: React.Dispatch<React.SetStateAction<React.Key | undefined>>;
    const Test: React.FC = () => {
      const [activeKey, setActiveKey] = React.useState<React.Key>();
      setActiveKeyOuter = setActiveKey;
      return (
        <div hidden>
          <Collapse activeKey={activeKey}>
            <Collapse.Panel header="header" key="1">
              content
            </Collapse.Panel>
          </Collapse>
        </div>
      );
    };

    const { container } = render(<Test />);

    await act(async () => {
      setActiveKeyOuter('1');
      await Promise.resolve();
    });

    triggerAllTimer();

    expect(container.querySelectorAll('.ant-motion-collapse').length).toBe(0);

    spiedRAF.mockRestore();
    jest.useRealTimers();
  });

  it('ref should work', () => {
    const ref = React.createRef<HTMLDivElement>();
    const panelRef1 = React.createRef<HTMLDivElement>();
    const panelRef2 = React.createRef<HTMLDivElement>();

    const { container } = render(
      <Collapse ref={ref}>
        <Collapse.Panel ref={panelRef1} header="panel header 1" key="1">
          1
        </Collapse.Panel>
        <Collapse.Panel ref={panelRef2} header="panel header 2" key="2">
          2
        </Collapse.Panel>
        <Collapse.Panel header="panel header 3" key="3">
          2
        </Collapse.Panel>
      </Collapse>,
    );

    expect(ref.current).toBe(container.firstChild);
    expect(panelRef1.current).toBe(document.querySelectorAll('.ant-collapse-item')[0]);
    expect(panelRef2.current).toBe(document.querySelectorAll('.ant-collapse-item')[1]);
  });

  it('Collapse.Panel usage', () => {
    const { container } = render(
      <Collapse bordered={false}>
        <Collapse.Panel key="test panel1" header="test panel1">
          test1
        </Collapse.Panel>
        <Collapse.Panel key="test panel2" header="test panel2">
          test2
        </Collapse.Panel>
      </Collapse>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Check expandIcon aria-label value', () => {
    const { container, rerender } = render(
      <Collapse activeKey="1">
        <Collapse.Panel header="header" key="1" />
      </Collapse>,
    );

    expect(container.querySelector('.ant-collapse-arrow')).toHaveAttribute(
      'aria-label',
      'expanded',
    );

    rerender(
      <Collapse>
        <Collapse.Panel header="header" key="1" />
      </Collapse>,
    );

    expect(container.querySelector('.ant-collapse-arrow')).toHaveAttribute(
      'aria-label',
      'collapsed',
    );
  });

  it('should support borderlessContentBg component token', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          cssVar: {
            key: 'collapse',
          },
          components: {
            Collapse: {
              borderlessContentBg: 'rgb(255, 0, 0)',
            },
          },
        }}
      >
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Collapse.Panel header="This is panel header 1" key="1">
            content
          </Collapse.Panel>
        </Collapse>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-collapse-panel')).toHaveStyle({
      backgroundColor: 'var(--ant-collapse-borderless-content-bg)',
    });
  });

  it('should support borderlessContentPadding component token', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          cssVar: {
            key: 'collapse',
          },
          components: {
            Collapse: {
              borderlessContentPadding: '10px',
            },
          },
        }}
      >
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Collapse.Panel header="This is panel header 1" key="1">
            content
          </Collapse.Panel>
        </Collapse>
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-collapse-body')).toHaveStyle({
      padding: 'var(--ant-collapse-borderless-content-padding)',
    });
  });

  it('should support styles and classNames', () => {
    const customClassNames = {
      root: 'custom-root',
      header: 'custom-header',
      title: 'custom-title',
      body: 'custom-body',
      icon: 'custom-icon',
    };
    const customStyles = {
      root: { color: 'red' },
      header: { color: 'blue' },
      title: { color: 'green' },
      body: { color: 'yellow' },
      icon: { color: 'purple' },
    };
    const { container } = render(
      <Collapse
        activeKey={['1']}
        styles={customStyles}
        classNames={customClassNames}
        items={[
          {
            key: '1',
            label: 'title',
          },
        ]}
      />,
    );

    const rootElement = container.querySelector('.ant-collapse') as HTMLElement;
    const headerElement = container.querySelector('.ant-collapse-header') as HTMLElement;
    const titleElement = container.querySelector('.ant-collapse-title') as HTMLElement;
    const bodyElement = container.querySelector('.ant-collapse-body') as HTMLElement;
    const iconElement = container.querySelector('.ant-collapse-expand-icon') as HTMLElement;

    // check classNames
    expect(rootElement.classList).toContain('custom-root');
    expect(headerElement.classList).toContain('custom-header');
    expect(titleElement.classList).toContain('custom-title');
    expect(bodyElement.classList).toContain('custom-body');
    expect(iconElement.classList).toContain('custom-icon');

    // check styles
    expect(rootElement.style.color).toBe('red');
    expect(headerElement.style.color).toBe('blue');
    expect(titleElement.style.color).toBe('green');
    expect(bodyElement.style.color).toBe('yellow');
    expect(iconElement.style.color).toBe('purple');
  });

  describe('expandIconPlacement and expandIconPosition behavior', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });
    it.each([
      { props: {}, expectedClass: 'ant-collapse-icon-placement-start', shouldWarn: false },
      {
        props: { expandIconPlacement: 'start' },
        expectedClass: 'ant-collapse-icon-placement-start',
        shouldWarn: false,
      },
      {
        props: { expandIconPlacement: 'end' },
        expectedClass: 'ant-collapse-icon-placement-end',
        shouldWarn: false,
      },
      {
        props: { expandIconPosition: 'start' },
        expectedClass: 'ant-collapse-icon-placement-start',
        shouldWarn: true,
      },
      {
        props: { expandIconPosition: 'end' },
        expectedClass: 'ant-collapse-icon-placement-end',
        shouldWarn: true,
      },
      {
        props: { expandIconPosition: 'start', expandIconPlacement: 'end' },
        expectedClass: 'ant-collapse-icon-placement-end',
        shouldWarn: true,
      },
      {
        props: { expandIconPosition: 'end', expandIconPlacement: 'start' },
        expectedClass: 'ant-collapse-icon-placement-start',
        shouldWarn: true,
      },
    ])('should render with $expectedClass for %j', ({ props, expectedClass, shouldWarn }) => {
      const { container } = render(
        <Collapse
          {...props}
          items={[{ children: '1', key: '1', label: 'This is panel header 1' }]}
        />,
      );

      expect(container.querySelector('.ant-collapse')).toHaveClass(expectedClass);

      if (shouldWarn) {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Warning: [antd: Collapse] `expandIconPosition` is deprecated. Please use `expandIconPlacement` instead.',
        );
      } else {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      }
    });
  });
});
