import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import type { TimelineProps } from 'antd';

const App: React.FC = () => {
  const classNamesObject: TimelineProps['classNames'] = {
    root: 'custom-timeline-root',
    item: 'custom-timeline-item',
    itemIcon: 'custom-timeline-item-icon',
    itemTitle: 'custom-timeline-item-title',
    itemContent: 'custom-timeline-item-content',
    itemRail: 'custom-timeline-item-rail',
  };

  const stylesObject: TimelineProps['styles'] = {
    root: {
      backgroundColor: '#f5f5f5',
      padding: '16px',
      borderRadius: '8px',
    },
    item: {
      backgroundColor: '#fff',
      padding: '8px',
      margin: '4px 0',
      borderRadius: '4px',
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
  };

  const classNamesFunction: TimelineProps['classNames'] = (info) => ({
    root: info.props.variant === 'filled' ? 'filled-timeline' : 'outlined-timeline',
    item: `timeline-item-${info.props.orientation}`,
    itemIcon: info.props.variant === 'filled' ? 'filled-icon' : 'outlined-icon',
    itemTitle: `title-${info.props.orientation}`,
    itemContent: `content-${info.props.variant}`,
    itemRail: `rail-${info.props.orientation}-${info.props.variant}`,
  });

  const stylesFunction: TimelineProps['styles'] = (info) => ({
    root: {
      backgroundColor: info.props.variant === 'filled' ? '#e6f7ff' : '#fafafa',
      border: info.props.variant === 'filled' ? '2px solid #1890ff' : '1px solid #d9d9d9',
      borderRadius: info.props.orientation === 'vertical' ? '12px' : '8px',
      padding: '20px',
    },
    item: {
      backgroundColor: info.props.variant === 'filled' ? '#fff' : 'transparent',
      padding: info.props.orientation === 'vertical' ? '12px' : '8px',
      borderRadius: '6px',
      marginBottom: '8px',
    },
    itemIcon: {
      backgroundColor: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
      borderColor: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
      transform: info.props.orientation === 'vertical' ? 'scale(1.2)' : 'scale(1)',
    },
    itemTitle: {
      color: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
      fontSize: info.props.orientation === 'vertical' ? '16px' : '14px',
      fontWeight: 'bold',
    },
    itemContent: {
      color: info.props.variant === 'filled' ? '#333' : '#666',
      fontSize: '14px',
      lineHeight: '1.6',
    },
    itemRail: {
      borderColor: info.props.variant === 'filled' ? '#52c41a' : '#1890ff',
      borderWidth: info.props.orientation === 'vertical' ? '3px' : '2px',
      borderStyle: info.props.variant === 'filled' ? 'solid' : 'dashed',
    },
  });

  return (
    <>
      <h4>classNames and styles object</h4>
      <Timeline
        items={[
          {
            title: '2015-09-01',
            content: 'Create a services site',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Solve initial network problems',
          },
          {
            content: 'Technical testing',
          },
        ]}
        classNames={classNamesObject}
        styles={stylesObject}
      />

      <h4>classNames and styles function</h4>
      <Timeline
        variant="filled"
        orientation="vertical"
        items={[
          {
            title: '项目启动',
            content: '开始新项目的规划和设计',
            icon: <ClockCircleOutlined />,
          },
          {
            title: '开发阶段',
            content: '进行核心功能的开发工作',
          },
          {
            title: '测试阶段',
            content: '全面测试系统功能',
          },
          {
            title: '项目完成',
            content: '项目成功上线运行',
          },
        ]}
        classNames={classNamesFunction}
        styles={stylesFunction}
      />
    </>
  );
};

export default App;
