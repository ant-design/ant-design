import React from 'react';
import { render, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Col, Row } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import useBreakpoint from '../hooks/useBreakpoint';
import ResponsiveObserve from '../../_util/responsiveObserve';

describe('Grid', () => {
  mountTest(Row);
  mountTest(Col);

  rtlTest(Row);
  rtlTest(Col);

  it('should render Col', () => {
    const wrapper = render(<Col span={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Row', () => {
    const wrapper = render(<Row />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when typeof gutter is object', () => {
    const wrapper = mount(<Row gutter={{ xs: 8, sm: 16, md: 24 }} />);
    expect(wrapper.find('div').first().props().style).toEqual(
      expect.objectContaining({
        marginLeft: -4,
        marginRight: -4,
      }),
    );
  });

  it('when typeof gutter is object array', () => {
    const wrapper = mount(
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
        ]}
      />,
    );
    expect(wrapper.find('div').first().props().style).toEqual(
      expect.objectContaining({
        marginLeft: -4,
        marginRight: -4,
      }),
    );
  });

  it('when typeof gutter is object array in large screen', () => {
    const wrapper = render(
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
          { xs: 8, sm: 16, md: 24, lg: 100, xl: 400 },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders wrapped Col correctly', () => {
    const MyCol = () => <Col span={12} />;
    const wrapper = render(
      <Row gutter={20}>
        <div>
          <Col span={12} />
        </div>
        <MyCol />
      </Row>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('ResponsiveObserve.unsubscribe should be called when unmounted', () => {
    const Unmount = jest.spyOn(ResponsiveObserve, 'unsubscribe');
    const wrapper = mount(<Row gutter={{ xs: 20 }} />);
    act(() => {
      wrapper.unmount();
    });
    expect(Unmount).toHaveBeenCalled();
  });

  it('should work correct when gutter is object', () => {
    const wrapper = mount(<Row gutter={{ xs: 20 }} />);
    expect(wrapper.find('div').prop('style')).toEqual({
      marginLeft: -10,
      marginRight: -10,
    });
  });

  it('should work currect when gutter is array', () => {
    const wrapper = mount(<Row gutter={[16, 20]} />);
    expect(wrapper.find('div').prop('style')).toEqual({
      marginLeft: -8,
      marginRight: -8,
      marginTop: -10,
      marginBottom: -10,
    });
  });

  // By jsdom mock, actual jsdom not implemented matchMedia
  // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  it('should work with useBreakpoint', () => {
    function Demo() {
      const screens = useBreakpoint();

      return JSON.stringify(screens);
    }
    const wrapper = mount(<Demo />);

    expect(wrapper.text()).toEqual(
      JSON.stringify({
        xs: true,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
      }),
    );
  });
});
