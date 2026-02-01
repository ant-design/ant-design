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
    jest.spyOn(window, 'matchMedia').mockImplementation(createImplFn('(min-width: 1200px)') as any);
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
    expect((global as any).unsubscribeCnt).toEqual(called + 1);
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
    jest.spyOn(window, 'matchMedia').mockImplementation(createImplFn('(max-width: 575px)') as any);
    let screensVar: any = null;
    const Demo: React.FC = () => {
      const screens = useBreakpoint();
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
    jest.spyOn(window, 'matchMedia').mockImplementation(createImplFn('(max-width: 575px)') as any);
    const { container } = render(<Row align="middle" />);
    expect(container.innerHTML).toContain('ant-row-middle');
    const { container: container2 } = render(<Row align={{ xs: 'middle' }} />);
    expect(container2.innerHTML).toContain('ant-row-middle');
    const { container: container3 } = render(<Row align={{ lg: 'middle' }} />);
    expect(container3.innerHTML).not.toContain('ant-row-middle');
  });

  it(`should justify by responsive justify prop`, () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(createImplFn('(max-width: 575px)') as any);
    const { container } = render(<Row justify="center" />);
    expect(container.innerHTML).toContain('ant-row-center');
    const { container: container2 } = render(<Row justify={{ xs: 'center' }} />);
    expect(container2.innerHTML).toContain('ant-row-center');
    const { container: container3 } = render(<Row justify={{ lg: 'center' }} />);
    expect(container3.innerHTML).not.toContain('ant-row-center');
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
});
