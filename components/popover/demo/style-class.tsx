import React from 'react';
import { Button, Popover, Space } from 'antd';

const content = (
  <div>
    <p>这是内容</p>
    <p>这是更多内容</p>
  </div>
);

const App: React.FC = () => (
  <Space direction="vertical" size="large">
    {/* 对象形式的 classNames 和 styles */}
    <div>
      <h4>对象形式的 classNames 和 styles</h4>
      <Space wrap>
        <Popover
          title="标题"
          content={content}
          trigger="click"
          classNames={{
            root: 'custom-popover-root',
            body: 'custom-popover-body',
          }}
          styles={{
            root: {
              border: '2px solid #1890ff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            body: {
              padding: '16px',
              backgroundColor: '#f0f8ff',
              borderRadius: '6px',
            },
          }}
        >
          <Button type="primary">点击显示 Popover</Button>
        </Popover>

        <Popover
          title="不同样式"
          content="这是另一个 Popover"
          trigger="hover"
          placement="top"
          classNames={{
            root: 'custom-popover-hover',
            body: 'custom-popover-hover-body',
          }}
          styles={{
            root: {
              border: '2px solid #52c41a',
              borderRadius: '12px',
              backgroundColor: 'rgba(82, 196, 26, 0.1)',
            },
            body: {
              padding: '12px',
              color: '#52c41a',
              fontWeight: 'bold',
            },
          }}
        >
          <Button>悬停显示 Popover</Button>
        </Popover>
      </Space>
    </div>

    {/* 函数形式的 classNames 和 styles */}
    <div>
      <h4>函数形式的 classNames 和 styles</h4>
      <Space wrap>
        <Popover
          title="动态样式"
          content={content}
          trigger="click"
          placement="bottom"
          classNames={(info) => ({
            root: info.props.trigger === 'click' ? 'click-popover' : 'hover-popover',
            body: `dynamic-body-${info.props.placement}`,
          })}
          styles={(info) => ({
            root: {
              border: info.props.trigger === 'click' ? '2px solid #ff4d4f' : '2px solid #faad14',
              borderRadius: info.props.placement === 'bottom' ? '8px 8px 0 0' : '8px',
              backgroundColor:
                info.props.trigger === 'click'
                  ? 'rgba(255, 77, 79, 0.1)'
                  : 'rgba(250, 173, 20, 0.1)',
              transform: info.props.placement === 'bottom' ? 'translateY(-2px)' : 'none',
            },
            body: {
              padding: info.props.trigger === 'click' ? '20px' : '12px',
              color: info.props.trigger === 'click' ? '#ff4d4f' : '#faad14',
              fontSize: info.props.placement === 'bottom' ? '14px' : '12px',
              textAlign: info.props.placement === 'bottom' ? 'center' : 'left',
            },
          })}
        >
          <Button danger>点击触发动态样式</Button>
        </Popover>

        <Popover
          title="悬停动态样式"
          content="根据 props 动态变化的样式"
          trigger="hover"
          placement="right"
          classNames={(info) => ({
            root: `hover-dynamic-${info.props.placement}`,
            body: info.props.trigger === 'hover' ? 'hover-body' : 'click-body',
          })}
          styles={(info) => ({
            root: {
              border: `2px solid ${info.props.trigger === 'hover' ? '#722ed1' : '#13c2c2'}`,
              borderRadius: info.props.placement === 'right' ? '0 8px 8px 0' : '8px',
              backgroundColor:
                info.props.trigger === 'hover'
                  ? 'rgba(114, 46, 209, 0.1)'
                  : 'rgba(19, 194, 194, 0.1)',
              minWidth: info.props.placement === 'right' ? '200px' : 'auto',
            },
            body: {
              padding: '16px',
              color: info.props.trigger === 'hover' ? '#722ed1' : '#13c2c2',
              borderLeft: info.props.placement === 'right' ? '3px solid currentColor' : 'none',
              paddingLeft: info.props.placement === 'right' ? '20px' : '16px',
            },
          })}
        >
          <Button type="dashed">悬停触发动态样式</Button>
        </Popover>
      </Space>
    </div>

    {/* 不同位置的 Popover */}
    <div>
      <h4>不同位置的 Popover 样式</h4>
      <Space wrap>
        {(['top', 'left', 'right', 'bottom'] as const).map((placement) => (
          <Popover
            key={placement}
            title={`${placement} 位置`}
            content={`这是 ${placement} 位置的 Popover`}
            placement={placement}
            trigger="click"
            classNames={(info) => ({
              root: `placement-${info.props.placement}`,
              body: `body-${info.props.placement}`,
            })}
            styles={(info) => {
              const colors = {
                top: '#1890ff',
                right: '#52c41a',
                bottom: '#faad14',
                left: '#f5222d',
              };
              const color = colors[info.props.placement as keyof typeof colors] || '#1890ff';

              return {
                root: {
                  border: `2px solid ${color}`,
                  borderRadius: '6px',
                  backgroundColor: `${color}10`,
                },
                body: {
                  padding: '12px',
                  color,
                  fontWeight: '500',
                  textAlign: 'center',
                },
              };
            }}
          >
            <Button>{placement}</Button>
          </Popover>
        ))}
      </Space>
    </div>
  </Space>
);

export default App;
