import React from 'react';
import { Col, Row } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import ResponsiveObserve from '../../_util/responsiveObserve';
import useBreakpoint from '../hooks/useBreakpoint';
import { render, act } from '../../../tests/utils';

describe('Grid', () => {
  mountTest(Row);
  mountTest(Col);

  rtlTest(Row);
  rtlTest(Col);

  it('should render Col', () => {
    const { asFragment } = render(<Col span={2} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render Row', () => {
    const { asFragment } = render(<Row />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('when typeof gutter is object', () => {
    const { container } = render(<Row gutter={{ xs: 8, sm: 16, md: 24 }} />);
    expect(container.querySelector('div')!.style.marginLeft).toEqual('-4px');
    expect(container.querySelector('div')!.style.marginRight).toEqual('-4px');
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
    expect(container.querySelector('div')!.style.marginLeft).toEqual('-4px');
    expect(container.querySelector('div')!.style.marginRight).toEqual('-4px');
  });

  it('when typeof gutter is object array in large screen', () => {
    const { asFragment } = render(
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
          { xs: 8, sm: 16, md: 24, lg: 100, xl: 400 },
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders wrapped Col correctly', () => {
    const MyCol = () => <Col span={12} />;
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

  it('ResponsiveObserve.unsubscribe should be called when unmounted', () => {
    const Unmount = jest.spyOn(ResponsiveObserve, 'unsubscribe');
    const { unmount } = render(<Row gutter={{ xs: 20 }} />);
    act(() => {
      unmount();
    });
    expect(Unmount).toHaveBeenCalled();
  });

  it('should work correct when gutter is object', () => {
    const { container } = render(<Row gutter={{ xs: 20 }} />);
    expect(container.querySelector('div')!.style.marginLeft).toEqual('-10px');
    expect(container.querySelector('div')!.style.marginRight).toEqual('-10px');
  });

  it('should work current when gutter is array', () => {
    const { container } = render(<Row gutter={[16, 20]} />);
    expect(container.querySelector('div')!.style.marginLeft).toEqual('-8px');
    expect(container.querySelector('div')!.style.marginRight).toEqual('-8px');
    expect(container.querySelector('div')!.style.marginTop).toEqual('-10px');
    expect(container.querySelector('div')!.style.marginBottom).toEqual('-10px');
  });

  // By jsdom mock, actual jsdom not implemented matchMedia
  // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  it('should work with useBreakpoint', () => {
    let screensVar;
    function Demo() {
      const screens = useBreakpoint();
      screensVar = screens;
      return <div>{JSON.stringify(screens)}</div>;
    }
    render(<Demo />);

    expect(screensVar).toEqual({
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      xxl: false,
    });
  });
});
