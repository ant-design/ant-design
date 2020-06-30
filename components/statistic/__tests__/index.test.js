import React from 'react';
import MockDate from 'mockdate';
import moment from 'moment';
import { mount } from 'enzyme';
import Statistic from '..';
import { formatTimeStr } from '../utils';
import { sleep } from '../../../tests/utils';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Statistic', () => {
  mountTest(Statistic);
  mountTest(Statistic.Countdown);
  rtlTest(Statistic);

  beforeAll(() => {
    MockDate.set(moment('2018-11-28 00:00:00').valueOf());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('`-` is not a number', () => {
    const wrapper = mount(<Statistic value="-" />);
    expect(wrapper.find('.ant-statistic-content').text()).toEqual('-');
  });

  it('customize formatter', () => {
    const formatter = jest.fn(() => 93);
    const wrapper = mount(<Statistic value={1128} formatter={formatter} />);
    expect(formatter).toHaveBeenCalledWith(1128);
    expect(wrapper.find('.ant-statistic-content-value').text()).toEqual('93');
  });

  it('groupSeparator', () => {
    const wrapper = mount(<Statistic value={1128} groupSeparator="__TEST__" />);
    expect(wrapper.find('.ant-statistic-content-value').text()).toEqual('1__TEST__128');
  });

  it('not a number', () => {
    const wrapper = mount(<Statistic value="bamboo" />);
    expect(wrapper.find('.ant-statistic-content-value').text()).toEqual('bamboo');
  });

  it('support negetive number', () => {
    const wrapper = mount(
      <Statistic title="Account Balance (CNY)" value={-112893.12345} precision={2} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('Countdown', () => {
    it('render correctly', () => {
      const now = moment().add(2, 'd').add(11, 'h').add(28, 'm').add(9, 's').add(3, 'ms');

      [
        ['H:m:s', '59:28:9'],
        ['HH:mm:ss', '59:28:09'],
        ['HH:mm:ss:SSS', '59:28:09:003'],
        ['DD-HH:mm:ss', '02-11:28:09'],
      ].forEach(([format, value]) => {
        const wrapper = mount(<Statistic.Countdown format={format} value={now} />);
        expect(wrapper.find('.ant-statistic-content-value').text()).toEqual(value);
      });
    });

    it('time going', async () => {
      const now = Date.now() + 1000;
      const onFinish = jest.fn();
      const wrapper = mount(<Statistic.Countdown value={now} onFinish={onFinish} />);
      wrapper.update();

      // setInterval should work
      const instance = wrapper.instance();
      expect(instance.countdownId).not.toBe(undefined);

      await sleep(10);

      wrapper.unmount();
      expect(instance.countdownId).toBe(undefined);
      expect(onFinish).not.toHaveBeenCalled();
    });

    it('responses hover events', () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();
      const wrapper = mount(<Statistic onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);
      wrapper.simulate('mouseenter');
      expect(onMouseEnter).toHaveBeenCalled();
      wrapper.simulate('mouseleave');
      expect(onMouseLeave).toHaveBeenCalled();
    });

    it('responses hover events for Countdown', () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();
      const wrapper = mount(<Statistic.Countdown onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);
      wrapper.simulate('mouseenter');
      expect(onMouseEnter).toHaveBeenCalled();
      wrapper.simulate('mouseleave');
      expect(onMouseLeave).toHaveBeenCalled();
    });

    describe('time finished', () => {
      it('not call if time already passed', () => {
        const now = Date.now() - 1000;

        const onFinish = jest.fn();
        const wrapper = mount(<Statistic.Countdown value={now} onFinish={onFinish} />);
        wrapper.update();

        const instance = wrapper.instance();
        expect(instance.countdownId).toBe(undefined);
        expect(onFinish).not.toHaveBeenCalled();
      });

      it('called if finished', async () => {
        jest.useFakeTimers();
        const now = Date.now() + 10;
        const onFinish = jest.fn();
        const wrapper = mount(<Statistic.Countdown value={now} onFinish={onFinish} />);
        wrapper.update();

        MockDate.set(moment('2019-11-28 00:00:00').valueOf());
        jest.runAllTimers();

        expect(onFinish).toHaveBeenCalled();
        jest.useFakeTimers();
      });
    });
  });

  describe('utils', () => {
    it('format should support escape', () => {
      expect(formatTimeStr(1000 * 60 * 60 * 24, 'D [Day]')).toBe('1 Day');
    });
  });
});
