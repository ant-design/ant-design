import React from 'react';
import { mount } from 'enzyme';
import Tooltip from '..';
import Button from '../../button';
import Switch from '../../switch';
import Checkbox from '../../checkbox';
import DatePicker from '../../date-picker';
import Input from '../../input';
import Group from '../../input/Group';
import { sleep } from '../../../tests/utils';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Tooltip', () => {
  mountTest(Tooltip);
  rtlTest(Tooltip);

  it('check `onVisibleChange` arguments', () => {
    const onVisibleChange = jest.fn();
    const ref = React.createRef();

    const wrapper = mount(
      <Tooltip
        title=""
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
        ref={ref}
      >
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );

    // `title` is empty.
    const div = wrapper.find('#hello').at(0);
    div.simulate('mouseenter');
    expect(onVisibleChange).not.toHaveBeenCalled();
    expect(ref.current.props.visible).toBe(false);

    div.simulate('mouseleave');
    expect(onVisibleChange).not.toHaveBeenCalled();
    expect(ref.current.props.visible).toBe(false);

    // update `title` value.
    wrapper.setProps({ title: 'Have a nice day!' });
    wrapper.find('#hello').simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    expect(ref.current.props.visible).toBe(true);

    wrapper.find('#hello').simulate('mouseleave');
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
    expect(ref.current.props.visible).toBe(false);

    // add `visible` props.
    wrapper.setProps({ visible: false });
    wrapper.find('#hello').simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true);
    const lastCount = onVisibleChange.mock.calls.length;
    expect(ref.current.props.visible).toBe(false);

    // always trigger onVisibleChange
    wrapper.simulate('mouseleave');
    expect(onVisibleChange.mock.calls.length).toBe(lastCount); // no change with lastCount
    expect(ref.current.props.visible).toBe(false);
  });

  it('should hide when mouse leave native disabled button', () => {
    const onVisibleChange = jest.fn();
    const ref = React.createRef();

    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
        ref={ref}
      >
        <button type="button" disabled>
          Hello world!
        </button>
      </Tooltip>,
    );

    expect(wrapper.find('span')).toHaveLength(1);
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    expect(ref.current.props.visible).toBe(true);

    button.simulate('mouseleave');
    expect(onVisibleChange).toHaveBeenCalledWith(false);
    expect(ref.current.props.visible).toBe(false);
  });

  describe('should hide when mouse leave antd disabled component', () => {
    function testComponent(name, Component) {
      it(name, () => {
        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        const wrapper = mount(
          <Tooltip
            title="xxxxx"
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            onVisibleChange={onVisibleChange}
            ref={ref}
          >
            <Component disabled />
          </Tooltip>,
        );

        expect(wrapper.render()).toMatchSnapshot();
        const button = wrapper.find('span').at(0);
        button.simulate('mouseenter');
        expect(onVisibleChange).toHaveBeenCalledWith(true);
        expect(ref.current.props.visible).toBe(true);

        button.simulate('mouseleave');
        expect(onVisibleChange).toHaveBeenCalledWith(false);
        expect(ref.current.props.visible).toBe(false);
      });
    }

    testComponent('Button', Button);
    testComponent('Switch', Switch);
    testComponent('Checkbox', Checkbox);
  });

  it('should render disabled Button style properly', () => {
    const wrapper1 = mount(
      <Tooltip title="xxxxx">
        <Button disabled>Hello world!</Button>
      </Tooltip>,
    );
    const wrapper2 = mount(
      <Tooltip title="xxxxx">
        <Button disabled style={{ display: 'block' }}>
          Hello world!
        </Button>
      </Tooltip>,
    );
    expect(wrapper1.find('span').first().getDOMNode().style.display).toBe('inline-block');
    expect(wrapper2.find('span').first().getDOMNode().style.display).toBe('block');
  });

  it('should works for arrowPointAtCenter', () => {
    const arrowWidth = 5;
    const horizontalArrowShift = 16;
    const triggerWidth = 200;

    const suit = () => {
      const wrapper = mount(
        <Tooltip
          title="xxxxx"
          trigger="click"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          placement="bottomLeft"
        >
          <button type="button" style={{ width: triggerWidth }}>
            Hello world!
          </button>
        </Tooltip>,
      );
      wrapper.find('button').at(0).simulate('click');
      const popupLeftDefault = parseInt(wrapper.instance().getPopupDomNode().style.left, 10);

      const wrapper2 = mount(
        <Tooltip
          title="xxxxx"
          trigger="click"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          placement="bottomLeft"
          arrowPointAtCenter
        >
          <button type="button" style={{ width: triggerWidth }}>
            Hello world!
          </button>
        </Tooltip>,
      );
      wrapper2.find('button').at(0).simulate('click');
      const popupLeftArrowPointAtCenter = parseInt(
        wrapper2.instance().getPopupDomNode().style.left,
        10,
      );
      expect(popupLeftArrowPointAtCenter - popupLeftDefault).toBe(
        triggerWidth / 2 - horizontalArrowShift - arrowWidth,
      );
    };

    jest.dontMock('rc-trigger', suit);
  });

  it('should works for date picker', async () => {
    const onVisibleChange = jest.fn();
    const ref = React.createRef();

    const wrapper = mount(
      <Tooltip title="date picker" onVisibleChange={onVisibleChange} ref={ref}>
        <DatePicker />
      </Tooltip>,
    );

    expect(wrapper.find('.ant-picker')).toHaveLength(1);
    const picker = wrapper.find('.ant-picker').at(0);
    picker.simulate('mouseenter');
    await sleep(100);
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    expect(ref.current.props.visible).toBe(true);

    picker.simulate('mouseleave');
    await sleep(100);
    expect(onVisibleChange).toHaveBeenCalledWith(false);
    expect(ref.current.props.visible).toBe(false);
  });

  it('should works for input group', async () => {
    const onVisibleChange = jest.fn();
    const ref = React.createRef();
    const wrapper = mount(
      <Tooltip title="hello" onVisibleChange={onVisibleChange} ref={ref}>
        <Group>
          <Input style={{ width: '50%' }} />
          <Input style={{ width: '50%' }} />
        </Group>
      </Tooltip>,
    );

    expect(wrapper.find('Group')).toHaveLength(1);
    const picker = wrapper.find('Group').at(0);
    picker.simulate('mouseenter');
    await sleep(100);
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    expect(ref.current.props.visible).toBe(true);

    picker.simulate('mouseleave');
    await sleep(100);
    expect(onVisibleChange).toHaveBeenCalledWith(false);
    expect(ref.current.props.visible).toBe(false);
  });

  // https://github.com/ant-design/ant-design/issues/20891
  it('should display zero', () => {
    const wrapper = mount(
      <Tooltip title={0} visible>
        <div />
      </Tooltip>,
    );
    expect(wrapper.find('.ant-tooltip-inner').getDOMNode().innerHTML).toBe('0');
  });

  it('autoAdjustOverflow should be object or undefined', () => {
    expect(() => {
      mount(
        <Tooltip title={0} visible autoAdjustOverflow={{ adjustX: 0, adjustY: 0 }}>
          <div />
        </Tooltip>,
      );
    }).not.toThrow();

    expect(() => {
      mount(
        <Tooltip title={0} visible autoAdjustOverflow={undefined}>
          <div />
        </Tooltip>,
      );
    }).not.toThrow();
  });

  it('support other placement', done => {
    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        placement="bottomLeft"
        transitionName=""
        mouseEnterDelay={0}
        afterVisibleChange={visible => {
          if (visible) {
            expect(wrapper.find('Trigger').props().popupPlacement).toBe('bottomLeft');
          }
          done();
        }}
      >
        <span>Hello world!</span>
      </Tooltip>,
    );
    expect(wrapper.find('span')).toHaveLength(1);
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
  });

  it('other placement when mouse enter', async () => {
    const ref = React.createRef();
    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        placement="topRight"
        transitionName=""
        popupTransitionName=""
        mouseEnterDelay={0}
        ref={ref}
      >
        <span>Hello world!</span>
      </Tooltip>,
    );

    expect(wrapper.find('span')).toHaveLength(1);
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
    await sleep(500);
    expect(ref.current.getPopupDomNode().className).toContain('placement-topRight');
  });

  it('should works for mismatch placement', async () => {
    const ref = React.createRef();
    const wrapper = mount(
      <Tooltip
        title="xxxxx"
        align={{
          points: ['bc', 'tl'],
        }}
        mouseEnterDelay={0}
        ref={ref}
      >
        <span>Hello world!</span>
      </Tooltip>,
    );
    const button = wrapper.find('span').at(0);
    button.simulate('mouseenter');
    await sleep(600);
    expect(ref.current.getPopupDomNode().className).toContain('ant-tooltip');
  });
});
