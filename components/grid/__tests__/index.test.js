import React from 'react';
import { render, mount } from 'enzyme';
import { Col, Row } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import useBreakpoint from '../hooks/useBreakpoint';

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
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').prop('style')).toEqual({
      marginLeft: -4,
      marginRight: -4,
    });
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
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').prop('style')).toEqual({
      marginTop: -4,
      marginRight: -4,
      marginBottom: 4,
      marginLeft: -4,
    });
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
      marginBottom: 10,
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
