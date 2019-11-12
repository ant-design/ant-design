import React from 'react';
import { mount } from 'enzyme';
import TimeLine from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

const { Item } = TimeLine;

const wrapperFactory = (timeLineProps = {}) =>
  mount(
    <TimeLine type="editable-card" {...timeLineProps}>
      <Item key="1">foo</Item>
      <Item key="2">bar</Item>
      <Item key="3">baz</Item>
    </TimeLine>,
  );

describe('TimeLine', () => {
  mountTest(TimeLine);
  mountTest(TimeLine.Item);
  rtlTest(TimeLine);
  rtlTest(TimeLine.Item);

  describe('renders items without passing any props correctly', () => {
    const wrapper = wrapperFactory();

    it('has 3 timeline item', () => {
      expect(wrapper.find('li.ant-timeline-item')).toHaveLength(3);
    });

    it('has only 1 timeline item is marked as the last item', () => {
      expect(wrapper.find('li.ant-timeline-item-last')).toHaveLength(1);
    });

    it('its last item is marked as the last item', () => {
      expect(
        wrapper
          .find('li.ant-timeline-item')
          .last()
          .hasClass('ant-timeline-item-last'),
      ).toBe(true);
    });
  });

  describe('renders pending item', () => {
    const pending = <div>pending...</div>;
    const pendingDot = <i>dot</i>;

    it('has one extra timeline item', () => {
      const wrapper = wrapperFactory({ pending });
      expect(wrapper.find('li.ant-timeline-item')).toHaveLength(4);
    });

    it('has extra pending timeline item', () => {
      const wrapper = wrapperFactory({ pending });
      expect(wrapper.find('li.ant-timeline-item-pending')).toHaveLength(1);
    });

    it("renders the pending timeline item as long as it receive a truthy prop value to 'pending'", () => {
      const wrapper = wrapperFactory({ pending: true });
      expect(wrapper.find('li.ant-timeline-item-pending')).toBeTruthy();
    });

    it('its last item is marked as the pending item', () => {
      const wrapper = wrapperFactory({ pending });
      expect(
        wrapper
          .find('li.ant-timeline-item')
          .last()
          .hasClass('ant-timeline-item-pending'),
      ).toBe(true);
    });

    it('its second to last item is marked as the last item', () => {
      const wrapper = wrapperFactory({ pending });
      const items = wrapper.find('li.ant-timeline-item');
      expect(items.at(items.length - 2).hasClass('ant-timeline-item-last')).toBe(true);
    });

    it('has the correct pending node', () => {
      const wrapper = wrapperFactory({ pending });
      expect(wrapper.find('li.ant-timeline-item-pending').contains(pending)).toBe(true);
    });

    it('has the correct pending dot node', () => {
      const wrapper = wrapperFactory({ pending, pendingDot });
      expect(wrapper.find('li.ant-timeline-item-pending').contains(pendingDot)).toBe(true);
    });

    it("has no pending dot if without passing a truthy 'pending' prop", () => {
      const wrapper = wrapperFactory({ pendingDot });
      expect(wrapper.find('li.ant-timeline-item-pending').contains(pendingDot)).toBe(false);
    });
  });

  describe('the item rendering sequence is controlled by reverse', () => {
    it('items is in order when prop reverse is false', () => {
      const wrapper = wrapperFactory({ reverse: false });
      expect(wrapper.find('.ant-timeline-item-content').map(w => w.text())).toEqual([
        'foo',
        'bar',
        'baz',
      ]);
    });

    it('items is reversed when prop reverse is true', () => {
      const wrapper = wrapperFactory({ reverse: true });
      expect(wrapper.find('.ant-timeline-item-content').map(w => w.text())).toEqual([
        'baz',
        'bar',
        'foo',
      ]);
    });
  });

  describe('renders items reversely and with pending item', () => {
    const pending = <div>pending...</div>;

    it('its last item is marked as the last item', () => {
      const wrapper = wrapperFactory({ pending, reverse: true });
      expect(
        wrapper
          .find('li.ant-timeline-item')
          .last()
          .hasClass('ant-timeline-item-last'),
      ).toBe(true);
    });

    it('its first item is marked as the pending item', () => {
      const wrapper = wrapperFactory({ pending, reverse: true });
      expect(
        wrapper
          .find('li.ant-timeline-item')
          .first()
          .hasClass('ant-timeline-item-pending'),
      ).toBe(true);
    });
  });
});
