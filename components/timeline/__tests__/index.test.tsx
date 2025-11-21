import React from 'react';

import type { TimelineProps } from '..';
import TimeLine from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

const renderFactory = (timeLineProps: TimelineProps) =>
  render(
    <TimeLine
      items={[{ content: 'foo' }, { content: 'bar' }, { content: 'baz' }]}
      {...timeLineProps}
    />,
  );

describe('TimeLine', () => {
  mountTest(TimeLine);
  mountTest(TimeLine.Item);
  rtlTest(TimeLine);
  rtlTest(TimeLine.Item);

  beforeEach(() => {
    resetWarned();
  });

  describe('render TimeLine.Item', () => {
    it('TimeLine.Item should correctly', () => {
      const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(
        <TimeLine reverse>
          <TimeLine.Item>foo</TimeLine.Item>
          <TimeLine.Item>bar</TimeLine.Item>
          <TimeLine.Item>baz</TimeLine.Item>
        </TimeLine>,
      );

      // has 3 timeline item
      expect(container.querySelectorAll('li.ant-timeline-item')).toHaveLength(3);

      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Timeline] `Timeline.Item` is deprecated. Please use `items` instead.',
      );
      errSpy.mockRestore();
    });

    it('legacy pending', () => {
      const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(
        <TimeLine pending="Little" pendingDot={'bamboo'} mode="alternate">
          <TimeLine.Item>foo</TimeLine.Item>
          <TimeLine.Item position="right">bar</TimeLine.Item>
          <TimeLine.Item position="left">baz</TimeLine.Item>
        </TimeLine>,
      );

      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Timeline] `Timeline.Item` is deprecated. Please use `items` instead.',
      );
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Timeline] `pending` is deprecated. Please use `items` instead. You can create a `item` as pending node directly.',
      );
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Timeline] `pendingDot` is deprecated. Please use `items` instead. You can create a `item` as pending node directly.',
      );

      expect(container.querySelectorAll('.ant-timeline-item')).toHaveLength(4);

      errSpy.mockRestore();
    });

    it("has no pending dot if without passing a truthy 'pending' prop", () => {
      const { queryByText } = render(
        <TimeLine pendingDot={<i>dot</i>} reverse>
          <TimeLine.Item>foo</TimeLine.Item>
          <TimeLine.Item>bar</TimeLine.Item>
          <TimeLine.Item position="right">baz</TimeLine.Item>
        </TimeLine>,
      );
      expect(queryByText('dot')).toBeFalsy();
    });
  });

  it('loading status', () => {
    const { container } = renderFactory({
      items: [
        {
          loading: true,
        },
      ],
    });
    expect(container.querySelector('li.ant-timeline-item')).toHaveClass('ant-steps-item-process');
  });

  describe('the item rendering sequence is controlled by reverse', () => {
    const getTextContents = (nodeList: NodeListOf<HTMLDivElement>) =>
      Array.from(nodeList).map((node) => node?.textContent);

    it('items is in order when prop reverse is false', () => {
      const { container } = renderFactory({ reverse: false });
      const textContents = getTextContents(
        container.querySelectorAll('.ant-timeline-item-content'),
      );
      expect(textContents).toEqual(['foo', 'bar', 'baz']);
    });

    it('items is reversed when prop reverse is true', () => {
      const { container } = renderFactory({ reverse: true });
      const textContents = getTextContents(
        container.querySelectorAll('.ant-timeline-item-content'),
      );
      expect(textContents).toEqual(['baz', 'bar', 'foo']);
    });
  });

  it('renders Timeline item with label correctly', () => {
    const label = '2020-01-01';
    const { container } = render(
      <TimeLine
        items={[
          {
            label,
            children: 'foo',
          },
          {
            children: 'bar',
          },
          {
            children: 'baz',
          },
        ]}
      />,
    );
    expect(container.querySelectorAll('.ant-timeline-item-title')).toHaveLength(1);
    expect(container.querySelector('.ant-timeline-item-title')).toHaveTextContent(label);
  });

  it('TimeLine className should correctly', () => {
    const { container } = renderFactory({ className: 'timelineBox' });

    expect(container.querySelector('.ant-timeline')).toHaveClass('timelineBox');

    expect(container.querySelectorAll('li.ant-timeline-item')[0]).not.toHaveClass('timelineBox');
  });

  it('TimeLineItem className should correctly', () => {
    const { container } = render(
      <TimeLine
        items={[
          {
            className: 'test',
            children: 'foo',
          },
        ]}
      />,
    );

    expect(container.querySelector('.test')).not.toBeNull();
  });

  describe('prop: color', () => {
    const presetColors = ['blue', 'red', 'green', 'gray'];

    presetColors.forEach((color) => {
      it(`className should have a preset color ${color}`, () => {
        const { container } = render(
          <TimeLine
            items={[
              {
                color,
                children: 'foo',
              },
            ]}
          />,
        );
        expect(container.querySelector('.ant-timeline-item')).toHaveClass(
          `ant-timeline-item-color-${color}`,
        );
      });
    });

    // other non-preset colors
    const nonPresetColors = ['rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)', '#ff0000', '#f00'].filter(
      (color) => !presetColors.includes(color),
    );

    // https://github.com/ant-design/ant-design/issues/39386
    nonPresetColors.forEach((color) => {
      it(`className should not have a non-preset color ${color}`, () => {
        const { container } = render(
          <TimeLine
            items={[
              {
                color,
                children: 'foo',
              },
            ]}
          />,
        );
        expect(container.querySelector('.ant-timeline-item')).not.toHaveClass(
          `ant-timeline-item-color-${color}`,
        );
      });
    });
  });

  it('legacy mode', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Left
    const { container, rerender } = render(
      <TimeLine items={[{ content: 'Create a services' }]} mode="left" />,
    );
    expect(container.querySelector('.ant-timeline-item-placement-start')).toBeTruthy();

    // Right
    rerender(<TimeLine items={[{ content: 'Create a services' }]} mode="right" />);
    expect(container.querySelector('.ant-timeline-item-placement-end')).toBeTruthy();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Timeline] `mode=left|right` is deprecated. Please use `mode=start|end` instead.',
    );

    errSpy.mockRestore();
  });
  describe('Timeline placement compatibility', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockClear();
    });

    afterAll(() => {
      consoleErrorSpy.mockRestore();
    });

    const renderTimeline = (props: any = {}) => (
      <TimeLine items={[{ content: 'Create a services', ...props }]} />
    );

    it.each([
      // [description, props, expectedClass, shouldWarn]
      ['should use placement=end', { placement: 'end' }, '.ant-timeline-item-placement-end', false],
      [
        'should use placement=start',
        { placement: 'start' },
        '.ant-timeline-item-placement-start',
        false,
      ],
      [
        'should convert position=end to end',
        { position: 'end' },
        '.ant-timeline-item-placement-end',
        true,
      ],
      [
        'should prioritize placement over position',
        { placement: 'end', position: 'start' },
        '.ant-timeline-item-placement-end',
        true,
      ],
      ['should default to no placement class', {}, '.ant-timeline-item-placement-start', false],
    ])('%s', (_, props, expectedClass, shouldWarn) => {
      const { container } = render(renderTimeline(props));

      expect(container.querySelector(expectedClass)).toBeTruthy();
      if (shouldWarn) {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Warning: [antd: Timeline] `items.position` is deprecated. Please use `items.placement` instead.',
        );
      } else {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      }
    });
  });

  it('support classNames and styles as objects', () => {
    const { container } = render(
      <TimeLine
        items={[
          {
            title: '2015-09-01',
            content: 'Create a services site',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Solve initial network problems',
          },
        ]}
        classNames={{
          root: 'custom-timeline-root',
          item: 'custom-timeline-item',
          itemIcon: 'custom-timeline-item-icon',
          itemTitle: 'custom-timeline-item-title',
          itemContent: 'custom-timeline-item-content',
          itemRail: 'custom-timeline-item-rail',
        }}
        styles={{
          root: {
            backgroundColor: '#f5f5f5',
            padding: '16px',
          },
          item: {
            backgroundColor: '#fff',
            margin: '4px 0',
          },
          itemIcon: {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
          },
          itemTitle: {
            color: '#1890ff',
            fontWeight: 'bold',
          },
          itemContent: {
            color: '#666',
            fontStyle: 'italic',
          },
          itemRail: {
            borderColor: '#1890ff',
            borderWidth: '2px',
          },
        }}
      />,
    );

    const timelineElement = container.querySelector('.ant-timeline');
    const itemElements = container.querySelectorAll('.ant-timeline-item');
    const iconElements = container.querySelectorAll('.ant-timeline-item-icon');
    const titleElements = container.querySelectorAll('.ant-timeline-item-title');
    const contentElements = container.querySelectorAll('.ant-timeline-item-content');
    const railElements = container.querySelectorAll('.ant-timeline-item-rail');

    expect(timelineElement).toHaveClass('custom-timeline-root');
    expect(timelineElement).toHaveAttribute('style');
    const rootStyle = timelineElement?.getAttribute('style');
    expect(rootStyle).toContain('background-color: rgb(245, 245, 245)');
    expect(rootStyle).toContain('padding: 16px');

    expect(itemElements[0]).toHaveClass('custom-timeline-item');
    expect(itemElements[0]).toHaveAttribute('style');
    const itemStyle = itemElements[0]?.getAttribute('style');
    expect(itemStyle).toContain('background-color: rgb(255, 255, 255)');
    expect(itemStyle).toContain('margin: 4px 0px');

    expect(iconElements[0]).toHaveClass('custom-timeline-item-icon');
    expect(titleElements[0]).toHaveClass('custom-timeline-item-title');
    expect(contentElements[0]).toHaveClass('custom-timeline-item-content');
    expect(railElements[0]).toHaveClass('custom-timeline-item-rail');
  });
});
