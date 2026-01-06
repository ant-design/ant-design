import React from 'react';

import TimeLine from '..';
import { render } from '../../../tests/utils';
import type { StepsSemanticClassNames, StepsSemanticName, StepsSemanticStyles } from '../../steps';

describe('Timeline.Semantic', () => {
  it('semantic structure', () => {
    const classNames: StepsSemanticClassNames = {
      root: 'custom-root',
      item: 'custom-item',
      itemWrapper: 'custom-item-wrapper',
      itemIcon: 'custom-item-icon',
      itemSection: 'custom-item-section',
      itemHeader: 'custom-item-header',
      itemTitle: 'custom-item-title',
      itemContent: 'custom-item-content',
      itemRail: 'custom-item-rail',
    };

    const classNamesTargets: StepsSemanticClassNames = {
      root: 'ant-steps',
      item: 'ant-steps-item',
      itemWrapper: 'ant-steps-item-wrapper',
      itemIcon: 'ant-steps-item-icon',
      itemSection: 'ant-steps-item-section',
      itemHeader: 'ant-steps-item-header',
      itemTitle: 'ant-steps-item-title',
      itemContent: 'ant-steps-item-content',
      itemRail: 'ant-steps-item-rail',
    };

    const styles: StepsSemanticStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'rgb(0, 0, 255)' },
      itemWrapper: { color: 'rgb(0, 255, 0)' },
      itemIcon: { color: 'rgb(255, 255, 0)' },
      itemSection: { color: 'rgb(128, 0, 128)' },
      itemHeader: { color: 'rgb(255, 165, 0)' },
      itemTitle: { color: 'rgb(255, 192, 203)' },
      itemContent: { color: 'rgb(255, 0, 255)' },
      itemRail: { color: 'rgb(0, 255, 0)' },
    };

    const { container } = render(
      <TimeLine
        classNames={classNames}
        styles={styles}
        mode="left"
        items={[
          { label: '2015-09-01', children: 'Create a services' },
          { label: '2015-09-01 09:12:11', children: 'Solve initial network problems' },
          { children: 'Technical testing' },
          { label: '2015-09-01 09:12:11', children: 'Network problems being solved' },
        ]}
      />,
    );

    Object.keys(classNames).forEach((key) => {
      const className = classNames[key as StepsSemanticName];
      const oriClassName = classNamesTargets[key as StepsSemanticName];
      const style = styles[key as StepsSemanticName];
      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName as any);
      expect(element).toHaveStyle(style as any);
    });
  });

  it('support classNames and styles as functions', () => {
    const { container } = render(
      <TimeLine
        variant="filled"
        orientation="vertical"
        items={[
          { title: '项目启动', content: '开始新项目的规划和设计' },
          { title: '开发阶段', content: '进行核心功能的开发工作' },
        ]}
        classNames={(info) => ({
          root: info.props.variant === 'filled' ? 'filled-timeline' : 'outlined-timeline',
          item: `timeline-item-${info.props.orientation}`,
          itemIcon: info.props.variant === 'filled' ? 'filled-icon' : 'outlined-icon',
          itemTitle: `title-${info.props.orientation}`,
          itemContent: `content-${info.props.variant}`,
          itemRail: `rail-${info.props.orientation}-${info.props.variant}`,
        })}
        styles={(info) => ({
          root: {
            backgroundColor: info.props.variant === 'filled' ? '#e6f7ff' : '#fafafa',
            border: info.props.variant === 'filled' ? '2px solid #1890ff' : '1px solid #d9d9d9',
            borderRadius: info.props.orientation === 'vertical' ? '12px' : '8px',
          },
          item: {
            backgroundColor: info.props.variant === 'filled' ? '#fff' : 'transparent',
            padding: info.props.orientation === 'vertical' ? '12px' : '8px',
          },
          itemIcon: {
            backgroundColor: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
            borderColor: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
          },
          itemTitle: {
            color: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
            fontSize: info.props.orientation === 'vertical' ? '16px' : '14px',
          },
          itemContent: {
            color: info.props.variant === 'filled' ? '#333' : '#666',
            fontSize: '14px',
          },
          itemRail: {
            borderColor: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
            borderWidth: info.props.orientation === 'vertical' ? '3px' : '2px',
          },
        })}
      />,
    );

    const timelineElement = container.querySelector('.ant-timeline');
    const itemElements = container.querySelectorAll('.ant-timeline-item');
    const iconElements = container.querySelectorAll('.ant-timeline-item-icon');
    const titleElements = container.querySelectorAll('.ant-timeline-item-title');
    const contentElements = container.querySelectorAll('.ant-timeline-item-content');
    const railElements = container.querySelectorAll('.ant-timeline-item-rail');

    expect(timelineElement).toHaveClass('filled-timeline');
    expect(timelineElement).toHaveAttribute('style');
    const rootStyle = timelineElement?.getAttribute('style');
    expect(rootStyle).toContain('background-color: rgb(230, 247, 255)');
    expect(rootStyle).toContain('border: 2px solid rgb(24, 144, 255)');
    expect(rootStyle).toContain('border-radius: 12px');

    expect(itemElements[0]).toHaveClass('timeline-item-vertical');
    expect(iconElements[0]).toHaveClass('filled-icon');
    expect(titleElements[0]).toHaveClass('title-vertical');
    expect(contentElements[0]).toHaveClass('content-filled');
    expect(railElements[0]).toHaveClass('rail-vertical-filled');
  });
});
