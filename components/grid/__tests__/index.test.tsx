import React, { useState } from 'react';

import { Col, Row } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import useBreakpoint from '../hooks/useBreakpoint';

const createImplFn = (value: string | number) => {
  return (query: string) => {
    return {
      matches: query === value,
      addEventListener: (type: string, cb: (e: { matches: boolean }) => void) => {
        if (type === 'change') {
          cb({ matches: query === value });
        }
      },
      removeEventListener: jest.fn(),
    };
  };
};

const mockMatchMedia = (query: string) => {
  jest.spyOn(window, 'matchMedia').mockImplementation(createImplFn(query) as any);
};

// Mock for `responsiveObserve` to test `unsubscribe` call
jest.mock('../../_util/responsiveObserver', () => {
  const modules = jest.requireActual('../../_util/responsiveObserver');
  const originHook = modules.default;

  const useMockResponsiveObserver = (...args: any[]) => {
    const entity = originHook(...args);
    if (!entity.unsubscribe.mocked) {
      const originUnsubscribe = entity.unsubscribe;
      entity.unsubscribe = (...uArgs: any[]) => {
        const inst = global as any;
        inst.unsubscribeCnt = (inst.unsubscribeCnt || 0) + 1;

        originUnsubscribe.call(entity, ...uArgs);
      };
      entity.unsubscribe.mocked = true;
    }

    return entity;
  };

  return {
    ...modules,
    __esModule: true,
    default: useMockResponsiveObserver,
  };
});

describe('Grid', () => {
  mountTest(Row);
  mountTest(Col);

  rtlTest(Row);
  rtlTest(Col);

  beforeEach(() => {
    (global as any).unsubscribeCnt = 0;
  });

  it('should render Col', () => {
    const { asFragment } = render(<Col span={2} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support zero flex', () => {
    const { container } = render(<Col flex={0} />);
    expect(container.firstElementChild).toHaveStyle({ flex: '0 0 auto' });
  });

  it('should support responsive zero flex', () => {
    const { container } = render(<Col xs={{ flex: 0 }} />);
    expect(container.firstElementChild).toHaveClass('ant-col-xs-flex');
    expect(container.firstElementChild).toHaveStyle({ '--ant-col-xs-flex': '0 0 auto' });
  });

  it('should render Row', () => {
    const { asFragment } = render(<Row />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('when typeof gutter is object', () => {
    const { container, unmount } = render(<Row gutter={{ xs: 8, sm: 16, md: 24 }}>test</Row>);
    expect(container.querySelector('div')).toHaveStyle({ marginInline: '-4px' });
    unmount();
  });

  it('should work correct when gutter is object', () => {
    const { container, unmount } = render(<Row gutter={{ xs: 20 }}>test</Row>);
    expect(container.querySelector('div')).toHaveStyle({ marginInline: '-10px' });
    unmount();
  });

  it('when typeof gutter is object array', () => {
    const { container } = render(
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
        ]}
      />,
    );
    expect(container.querySelector('div')).toHaveStyle({ marginInline: '-4px' });
  });

  it(`when typeof gutter is object array in large screen`, () => {
    mockMatchMedia('(min-width: 1200px)');
    const { container, asFragment } = render(
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
          { xs: 8, sm: 16, md: 24, lg: 100, xl: 400 },
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();

    expect(container.querySelector('div')).toHaveStyle({
      marginInline: '-20px',
      marginTop: '',
      marginBottom: '',
    });
  });

  it('renders wrapped Col correctly', () => {
    const MyCol: React.FC = () => <Col span={12} />;
    const { asFragment } = render(
      <Row gutter={20}>
        <div>
          <Col span={12} />
        </div>
        <MyCol />
      </Row>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('useResponsiveObserver.unsubscribe should be called when unmounted', () => {
    const { unmount } = render(<Row gutter={{ xs: 20 }} />);
    const called: number = (global as any).unsubscribeCnt;

    unmount();
    expect((global as any).unsubscribeCnt).toBe(called + 1);
  });

  it('should work correct when gutter is string', () => {
    const { container } = render(<Row gutter={['2rem', '4rem']} />);
    expect(container.querySelector('div')).toHaveStyle({
      marginInline: 'calc(2rem / -2)',
      rowGap: '4rem',
    });
  });

  it('should work current when gutter is array', () => {
    const { container } = render(<Row gutter={[16, 20]} />);
    expect(container.querySelector('div')).toHaveStyle({
      marginInline: '-8px',
      marginTop: '',
      marginBottom: '',
    });
  });

  // By jsdom mock, actual jsdom not implemented matchMedia
  // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  it(`should work with useBreakpoint`, () => {
    mockMatchMedia('(max-width: 575px)');
    let screensVar: any = null;
    const Demo: React.FC = () => {
      const screens = useBreakpoint();
      // eslint-disable-next-line react-hooks/globals
      screensVar = screens;
      return null;
    };
    render(<Demo />);
    expect(screensVar).toEqual({
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      xxl: false,
      xxxl: false,
    });
  });

  it(`should align by responsive align prop`, () => {
    mockMatchMedia('(max-width: 575px)');
    const { container } = render(<Row align="middle" />);
    expect(container.innerHTML).toContain('ant-row-middle');
    const { container: container2 } = render(<Row align={{ xs: 'middle' }} />);
    expect(container2.innerHTML).toContain('ant-row-middle');
    const { container: container3 } = render(<Row align={{ lg: 'middle' }} />);
    expect(container3.innerHTML).not.toContain('ant-row-middle');
  });

  it(`should justify by responsive justify prop`, () => {
    mockMatchMedia('(max-width: 575px)');
    const { container } = render(<Row justify="center" />);
    expect(container.innerHTML).toContain('ant-row-center');
    const { container: container2 } = render(<Row justify={{ xs: 'center' }} />);
    expect(container2.innerHTML).toContain('ant-row-center');
    const { container: container3 } = render(<Row justify={{ lg: 'center' }} />);
    expect(container3.innerHTML).not.toContain('ant-row-center');
  });

  it('should clear align and justify when props are removed or no breakpoint matches', () => {
    mockMatchMedia('(max-width: 575px)');
    const { container, rerender } = render(<Row align="middle" justify="center" />);
    const row = container.firstElementChild;

    expect(row).toHaveClass('ant-row-middle', 'ant-row-center');

    rerender(<Row />);
    expect(row).not.toHaveClass('ant-row-middle');
    expect(row).not.toHaveClass('ant-row-center');

    rerender(<Row align={{ xs: 'middle' }} justify={{ xs: 'center' }} />);
    expect(row).toHaveClass('ant-row-middle', 'ant-row-center');

    rerender(<Row align={{ lg: 'middle' }} justify={{ lg: 'center' }} />);
    expect(row).not.toHaveClass('ant-row-middle');
    expect(row).not.toHaveClass('ant-row-center');
  });

  it('should clear align and justify before parent layout effects', () => {
    let classesInLayoutEffect: string | undefined;

    const ReactiveTest: React.FC = () => {
      const [aligned, setAligned] = useState(true);
      const rowRef = React.useRef<HTMLDivElement>(null);

      React.useLayoutEffect(() => {
        if (!aligned) {
          classesInLayoutEffect = rowRef.current?.className;
        }
      }, [aligned]);

      return (
        <>
          <Row
            ref={rowRef}
            align={aligned ? 'middle' : undefined}
            justify={aligned ? 'center' : undefined}
          />
          <button type="button" onClick={() => setAligned(false)} />
        </>
      );
    };

    const { container } = render(<ReactiveTest />);
    fireEvent.click(container.querySelector('button')!);

    expect(classesInLayoutEffect).toBeDefined();
    expect(classesInLayoutEffect).not.toContain('ant-row-middle');
    expect(classesInLayoutEffect).not.toContain('ant-row-center');
  });

  // https://github.com/ant-design/ant-design/issues/39690
  it('Justify and align properties should reactive for Row', () => {
    const ReactiveTest: React.FC = () => {
      const [justify, setJustify] = useState<any>('start');
      return (
        <>
          <Row justify={justify} align="bottom">
            <div>button1</div>
            <div>button</div>
          </Row>
          <span onClick={() => setJustify('end')} />
        </>
      );
    };
    const { container } = render(<ReactiveTest />);
    expect(container.innerHTML).toContain('ant-row-start');
    fireEvent.click(container.querySelector('span')!);
    expect(container.innerHTML).toContain('ant-row-end');
  });

  it('The column spacing should be evenly spaced', () => {
    const { container } = render(
      <Row justify="space-evenly">
        <Col span={4}>col-1</Col>
        <Col span={4}>col-2</Col>
      </Row>,
    );
    const row = container.querySelector('.ant-row-space-evenly');
    expect(row).toBeTruthy();
    expect(row).toHaveStyle({ justifyContent: 'space-evenly' });
  });

  // Grid mode tests
  it('should support grid mode with gap', () => {
    const { container } = render(
      <Row grid gutter={[16, 20]}>
        test
      </Row>,
    );
    const gridEle = container.querySelector('.ant-row-grid');
    expect(gridEle).toHaveClass('ant-row-grid');
    expect(gridEle).toHaveStyle({
      columnGap: '16px',
      rowGap: '20px',
    });
  });
});

describe('Grid Col', () => {
  it('should apply gridColumn from span in grid mode', () => {
    const { container } = render(
      <Row grid columns={4}>
        <Col span={4}>test</Col>
      </Row>,
    );
    expect(container.querySelector('.ant-col-grid')).toBeTruthy();
    const col = container.querySelector<HTMLElement>('.ant-col-grid');
    expect(col).toHaveStyle({
      gridColumn: 'span 4',
    });
  });

  it('should default to 24 columns when columns is omitted', () => {
    const { container } = render(
      <Row grid>
        <Col span={6}>test</Col>
      </Row>,
    );
    const row = container.querySelector<HTMLElement>('.ant-row-grid');
    expect(row).toHaveStyle({
      gridTemplateColumns: 'repeat(24, 1fr)',
    });
    const col = container.querySelector<HTMLElement>('.ant-col-grid');
    expect(col).toHaveStyle({
      gridColumn: 'span 6',
    });
  });

  it('should map columns number to repeat(N, 1fr)', () => {
    const { container } = render(
      <Row grid columns={4}>
        <Col span={1}>test</Col>
      </Row>,
    );
    expect(container.querySelector('.ant-row-grid')).toHaveStyle({
      gridTemplateColumns: 'repeat(4, 1fr)',
    });
  });

  it('should pass columns string through as gridTemplateColumns', () => {
    const { container } = render(
      <Row grid columns="repeat(auto-fit, minmax(120px, 1fr))">
        <Col span={1}>test</Col>
      </Row>,
    );
    expect(container.querySelector('.ant-row-grid')).toHaveStyle({
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    });
  });

  it('should support rowSpan and area in grid mode', () => {
    const { container } = render(
      <Row grid>
        <Col rowSpan={2} area="header">
          test
        </Col>
      </Row>,
    );
    const col = container.querySelector<HTMLElement>('.ant-col-grid');
    expect(col).toHaveStyle({
      gridRow: 'span 2',
      gridArea: 'header',
    });
  });

  it('should join areas 2D array into grid-template-areas', () => {
    const { container } = render(
      <Row
        grid
        areas={[
          ['header', 'header'],
          ['sider', 'content'],
        ]}
      >
        <Col area="header">h</Col>
      </Row>,
    );
    expect(container.querySelector('.ant-row-grid')).toHaveStyle({
      gridTemplateAreas: '"header header" "sider content"',
    });
  });

  it('should pass areas string through as grid-template-areas', () => {
    const { container } = render(
      <Row grid areas='"a a" "b b"'>
        <Col area="a">a</Col>
      </Row>,
    );
    expect(container.querySelector('.ant-row-grid')).toHaveStyle({
      gridTemplateAreas: '"a a" "b b"',
    });
  });

  it('should set display none when span is 0', () => {
    const { container } = render(
      <Row grid columns={4}>
        <Col span={0}>test</Col>
      </Row>,
    );
    expect(container.querySelector('.ant-col-grid')).toHaveStyle({
      display: 'none',
    });
  });

  it('span={0} should still hide even when area is provided', () => {
    const { container } = render(
      <Row grid columns={4}>
        <Col span={0} area="header">
          test
        </Col>
      </Row>,
    );
    // 新语义下 area 不覆盖 span={0} 的隐藏行为
    expect(container.querySelector('.ant-col-grid')).toHaveStyle({
      display: 'none',
    });
  });

  it('should resolve responsive columns by current screen', () => {
    mockMatchMedia('(min-width: 768px)');
    const { container } = render(
      <Row grid columns={{ xs: 1, sm: 2, md: 4, lg: 8 }}>
        <Col span={1}>test</Col>
      </Row>,
    );
    // md matches -> 4 columns
    expect(container.querySelector('.ant-row-grid')).toHaveStyle({
      gridTemplateColumns: 'repeat(4, 1fr)',
    });
  });

  it('should fall back to 24 columns when no responsive breakpoint matches', () => {
    mockMatchMedia('(min-width: 2000px)');
    const { container } = render(
      <Row grid columns={{ lg: 8 }}>
        <Col span={1}>test</Col>
      </Row>,
    );
    // large screen query not matched -> fallback to 24
    expect(container.querySelector('.ant-row-grid')).toHaveStyle({
      gridTemplateColumns: 'repeat(24, 1fr)',
    });
  });

  it('style should override span/rowSpan/area produced values', () => {
    const { container } = render(
      <Row grid columns={4}>
        <Col span={2} style={{ gridColumn: '2 / span 3' }}>
          test
        </Col>
      </Row>,
    );
    const col = container.querySelector<HTMLElement>('.ant-col-grid');
    expect(col).toHaveStyle({
      gridColumn: '2 / span 3',
    });
  });

  // flex/wrap should not leak into grid mode inline styles (see RFC Grid 模式下不生效的 Props)
  it('should not apply flex or minWidth in grid mode even if flex is provided', () => {
    const { container } = render(
      <Row grid columns={4} wrap={false}>
        <Col flex={2} span={4}>
          test
        </Col>
      </Row>,
    );
    const col = container.querySelector<HTMLElement>('.ant-col-grid');
    // grid 模式下 flex 不泄漏进行内样式,见 RFC「Grid 模式下不生效的 Props」
    expect(col).not.toHaveStyle({ flex: '2 2 auto' });
    expect(col).not.toHaveStyle({ minWidth: 0 });
  });
});
