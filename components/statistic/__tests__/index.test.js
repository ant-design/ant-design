import React from 'react';
import MockDate from 'mockdate';
import moment from 'moment';
import { mount } from 'enzyme';
import Statistic from '..';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Statistic', () => {
  beforeAll(() => {
    MockDate.set(moment('2018-11-28 00:00:00'));
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('customize formatter', () => {
    const formatter = jest.fn(() => 93);
    const wrapper = mount(<Statistic value={1128} formatter={formatter} />);
    expect(formatter).toBeCalledWith(1128);
    expect(wrapper.find('.ant-statistic-content-value').text()).toEqual('93');
  });

  it('not a number', () => {
    const wrapper = mount(<Statistic value="bamboo" />);
    expect(wrapper.find('.ant-statistic-content-value').text()).toEqual('bamboo');
  });

  describe('Countdown', () => {
    it('render correctly', () => {
      const now = moment()
        .add(2, 'd')
        .add(11, 'h')
        .add(28, 'm')
        .add(9, 's')
        .add(3, 'ms');

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
      const wrapper = mount(<Statistic.Countdown value={now} />);
      wrapper.update();

      // setInterval should work
      const instance = wrapper.instance();
      expect(instance.countdownId).not.toBe(undefined);

      await delay(50);

      wrapper.unmount();
      expect(instance.countdownId).toBe(undefined);
    });
  });
});
