import React from 'react';
import { mount } from 'enzyme';
import TimeLine from '..';

const { Item } = TimeLine;

const wrapperFactory = (timeLineProps = {}) => mount(
  <TimeLine type="editable-card" {...timeLineProps}>
    <Item key="1">foo</Item>
    <Item key="2">bar</Item>
    <Item key="3">baz</Item>
  </TimeLine>
);

describe('TimeLine', () => {
  describe('renders items correctly without passing any props', () => {
    const wrapper = wrapperFactory();

    it('has 3 timeline items', () => {
      expect(wrapper.find('li.ant-timeline-item')).toHaveLength(3);
    });

    it('marks only one timeline item as the last item', () => {
      expect(wrapper.find('li.ant-timeline-item-last')).toHaveLength(1);
    });

    it('marks its last timeline item as the last item', () => {
      expect(wrapper.find('li.ant-timeline-item').last().hasClass('ant-timeline-item-last')).toBe(true);
    });
  });

  describe('renders the pending item', () => {
    const pending = <div>pending...</div>;
    const pendingDot = <i>dot</i>;

    it('has one extra timeline item', () => {
      const wrapper = wrapperFactory({ pending });
      expect(wrapper.find('li.ant-timeline-item')).toHaveLength(4);
    });

    it('has one extra pending timeline item', () => {
      const wrapper = wrapperFactory({ pending });
      expect(wrapper.find('li.ant-timeline-item-pending')).toHaveLength(1);
    });

    it('has a pending timeline item as long as it receive a truthy value to \'pending\' prop', () => {
      const wrapper = wrapperFactory({ pending: true });
      expect(wrapper.find('li.ant-timeline-item-pending')).toBeTruthy();
    });

    it('marks its last timeline item as the pending item', () => {
      const wrapper = wrapperFactory({ pending });
      expect(wrapper.find('li.ant-timeline-item').last().hasClass('ant-timeline-item-pending')).toBe(true);
    });

    it('marks its second to last timeline item as the last item', () => {
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

    it('has no pending dot while without passing a truthy \'pending\' prop', () => {
      const wrapper = wrapperFactory({ pendingDot });
      expect(wrapper.find('li.ant-timeline-item-pending').contains(pendingDot)).toBe(false);
    });
  });

  describe('renders its timeline items in the order controlled by the \'reverse\' prop', () => {
    it('renders its timeline items in order when the \'reverse\' prop is false', () => {
      const wrapper = wrapperFactory({ reverse: false });
      expect(wrapper.find('.ant-timeline-item-content').map(w => w.text())).toEqual(['foo', 'bar', 'baz']);
    });

    it('renders its timeline items in reverse order when the \'reverse\' prop is true', () => {
      const wrapper = wrapperFactory({ reverse: true });
      expect(wrapper.find('.ant-timeline-item-content').map(w => w.text())).toEqual(['baz', 'bar', 'foo']);
    });
  });

  describe('renders its timeline items reversely and with the pending item', () => {
    const pending = <div>pending...</div>;
    const wrapper = wrapperFactory({ pending, reverse: true });

    it('marks its last timeline item as the last item', () => {
      expect(wrapper.find('li.ant-timeline-item').last().hasClass('ant-timeline-item-last')).toBe(true);
    });

    it('marks its first timeline item as the pending item', () => {
      expect(wrapper.find('li.ant-timeline-item').first().hasClass('ant-timeline-item-pending')).toBe(true);
    });
  });
});
