import React from 'react';
import { mount } from 'enzyme';
import Badge from '../index';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

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
      expect(wrapperLeft.find('.ant-ribbon').prop('style')?.background).toEqual('#888');
      expect(wrapperLeft.find('.ant-ribbon-corner').prop('style')?.color).toEqual('#888');
      const wrapperRight = mount(
        <Badge.Ribbon color="#888" placement="end">
          <div />
        </Badge.Ribbon>,
      );
      expect(wrapperRight.find('.ant-ribbon').prop('style')?.background).toEqual('#888');
      expect(wrapperRight.find('.ant-ribbon-corner').prop('style')?.color).toEqual('#888');
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
