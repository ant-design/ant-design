import React from 'react';
import { mount } from 'enzyme';
import Badge from '../index';
import Tooltip from '../../tooltip';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Badge', () => {
  mountTest(Badge);
  rtlTest(Badge);
  rtlTest(() => (
    <Badge count={5} offset={[10, 10]}>
      <a href="#" className="head-example">
        head
      </a>
    </Badge>
  ));

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('badge dot not scaling count > 9', () => {
    const badge = mount(<Badge count={10} dot />);
    expect(badge.find('.ant-card-multiple-words').length).toBe(0);
  });

  it('badge should support float number', () => {
    let wrapper = mount(<Badge count={3.5} />);
    expect(wrapper.render()).toMatchSnapshot();

    wrapper = mount(<Badge count="3.5" />);
    expect(wrapper.render()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('badge dot not showing count == 0', () => {
    const badge = mount(<Badge count={0} dot />);
    expect(badge.find('.ant-badge-dot').length).toBe(0);
  });

  it('should have an overriden title attribute', () => {
    const badge = mount(<Badge count={10} title="Custom title" />);
    expect(
      badge.find('.ant-scroll-number').getDOMNode().attributes.getNamedItem('title').value,
    ).toEqual('Custom title');
  });

  // https://github.com/ant-design/ant-design/issues/10626
  it('should be composable with Tooltip', () => {
    const ref = React.createRef();
    const wrapper = mount(
      <Tooltip title="Fix the error" ref={ref}>
        <Badge status="error" />
      </Tooltip>,
    );
    wrapper.find('Badge').simulate('mouseenter');
    jest.runAllTimers();
    expect(ref.current.props.visible).toBe(true);
  });

  it('should render when count is changed', () => {
    const wrapper = mount(<Badge count={9} />);
    wrapper.setProps({ count: 10 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 11 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 11 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 111 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    jest.runAllTimers();
    expect(wrapper).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.setProps({ count: 9 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should be compatible with borderColor style', () => {
    const wrapper = mount(
      <Badge
        count={4}
        style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/13694
  it('should support offset when count is a ReactNode', () => {
    const wrapper = mount(
      <Badge count={<span className="custom" style={{ color: '#f5222d' }} />} offset={[10, 20]}>
        <a href="#" className="head-example">
          head
        </a>
      </Badge>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/15349
  it('should color style  works on Badge', () => {
    const wrapper = mount(<Badge style={{ color: 'red' }} status="success" text="Success" />);
    expect(wrapper.find('.ant-badge-status-text').props().style.color).toBe('red');
  });

  // https://github.com/ant-design/ant-design/issues/15799
  it('render correct with negative number', () => {
    const wrapper = mount(
      <div>
        <Badge count="-10" />
        <Badge count={-10} />
      </div>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/21331
  it('render Badge status/color when contains children', () => {
    const wrapper = mount(
      <div>
        <Badge count={5} status="success">
          <a />
        </Badge>
        <Badge count={5} color="blue">
          <a />
        </Badge>
        <Badge count={5} color="#08c">
          <a />
        </Badge>
      </div>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('Badge should work when status/color is empty string', () => {
    const wrapper = mount(
      <>
        <Badge color="" text="text" />
        <Badge status="" text="text" />
      </>,
    );

    expect(wrapper.find('.ant-badge')).toHaveLength(2);
  });

  it('render Badge size when contains children', () => {
    const wrapper = mount(
      <div>
        <Badge size="default" count={5}>
          <a />
        </Badge>
        <Badge size="small" count={5}>
          <a />
        </Badge>
      </div>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});

describe('Ribbon', () => {
  mountTest(Badge.Ribbon);
  rtlTest(Badge.Ribbon);

  describe('placement', () => {
    it('works with `start` & `end` placement', () => {
      const wrapperStart = mount(
        <Badge.Ribbon placement="start">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperStart.find('.ant-ribbon-placement-start').length).toEqual(1);

      const wrapperEnd = mount(
        <Badge.Ribbon placement="end">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperEnd.find('.ant-ribbon-placement-end').length).toEqual(1);
    });
  });

  describe('color', () => {
    it('works with preset color', () => {
      const wrapper = mount(
        <Badge.Ribbon color="green">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapper.find('.ant-ribbon-color-green').length).toEqual(1);
    });
    it('works with custom color', () => {
      const wrapperLeft = mount(
        <Badge.Ribbon color="#888" placement="start">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperLeft.find('.ant-ribbon').prop('style').background).toEqual('#888');
      expect(wrapperLeft.find('.ant-ribbon-corner').prop('style').color).toEqual('#888');
      const wrapperRight = mount(
        <Badge.Ribbon color="#888" placement="end">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperRight.find('.ant-ribbon').prop('style').background).toEqual('#888');
      expect(wrapperRight.find('.ant-ribbon-corner').prop('style').color).toEqual('#888');
    });
  });

  describe('text', () => {
    it('works with string', () => {
      const wrapper = mount(
        <Badge.Ribbon text="cool">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapper.find('.ant-ribbon').text()).toEqual('cool');
    });
    it('works with element', () => {
      const wrapper = mount(
        <Badge.Ribbon text={<span className="cool" />}>
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapper.find('.cool').length).toEqual(1);
    });
  });
});
