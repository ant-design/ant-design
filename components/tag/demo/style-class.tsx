import React from 'react';
import { Tag, Space, Divider } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const App: React.FC = () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    {/* 对象形式的 classNames 和 styles */}
    <div>
      <h4>对象形式的 classNames 和 styles</h4>
      <Space wrap>
        <Tag
          classNames={{
            root: 'custom-tag-root',
            icon: 'custom-tag-icon',
            content: 'custom-tag-content',
          }}
          styles={{
            root: {
              backgroundColor: '#f0f8ff',
              border: '2px solid #1890ff',
              borderRadius: '8px',
              padding: '4px 12px',
            },
            icon: {
              color: '#52c41a',
              fontSize: '16px',
            },
            content: {
              fontWeight: 'bold',
              color: '#1890ff',
            },
          }}
          icon={<CheckCircleOutlined />}
        >
          成功标签
        </Tag>

        <Tag
          color="red"
          classNames={{
            root: 'custom-error-tag',
            icon: 'custom-error-icon',
            content: 'custom-error-content',
          }}
          styles={{
            root: {
              backgroundColor: '#fff2f0',
              border: '2px solid #ff4d4f',
              borderRadius: '12px',
              padding: '6px 16px',
              boxShadow: '0 2px 8px rgba(255, 77, 79, 0.2)',
            },
            icon: {
              color: '#ff4d4f',
              fontSize: '14px',
            },
            content: {
              color: '#ff4d4f',
              fontWeight: '500',
            },
          }}
          icon={<CloseCircleOutlined />}
        >
          错误标签
        </Tag>
      </Space>
    </div>

    <Divider />

    {/* 函数形式的 classNames 和 styles */}
    <div>
      <h4>函数形式的 classNames 和 styles</h4>
      <Space wrap>
        <Tag
          variant="filled"
          color="blue"
          icon={<SyncOutlined />}
          classNames={(info) => ({
            root: info.props.variant === 'filled' ? 'filled-tag' : 'outlined-tag',
            icon: `icon-${info.props.color}`,
            content: `content-${info.props.variant}`,
          })}
          styles={(info) => ({
            root: {
              backgroundColor: info.props.color === 'blue' ? '#e6f7ff' : '#f6ffed',
              border: `2px solid ${info.props.color === 'blue' ? '#1890ff' : '#52c41a'}`,
              borderRadius: info.props.variant === 'filled' ? '16px' : '4px',
              padding: '8px 16px',
              transform: 'scale(1.05)',
            },
            icon: {
              color: info.props.color === 'blue' ? '#1890ff' : '#52c41a',
              fontSize: '18px',
              marginRight: '8px',
            },
            content: {
              color: info.props.color === 'blue' ? '#1890ff' : '#52c41a',
              fontWeight: info.props.variant === 'filled' ? 'bold' : 'normal',
            },
          })}
        >
          动态样式标签
        </Tag>

        <Tag
          variant="outlined"
          color="orange"
          disabled={false}
          icon={<ExclamationCircleOutlined />}
          classNames={(info) => ({
            root: `tag-${info.props.variant}-${info.props.disabled ? 'disabled' : 'enabled'}`,
            icon: `icon-${info.props.color}-${info.props.disabled ? 'muted' : 'bright'}`,
            content: 'dynamic-content',
          })}
          styles={(info) => ({
            root: {
              backgroundColor: info.props.disabled ? '#f5f5f5' : '#fff7e6',
              border: `2px ${info.props.variant === 'outlined' ? 'dashed' : 'solid'} ${
                info.props.disabled ? '#d9d9d9' : '#fa8c16'
              }`,
              borderRadius: '6px',
              padding: '6px 14px',
              opacity: info.props.disabled ? 0.6 : 1,
            },
            icon: {
              color: info.props.disabled ? '#bfbfbf' : '#fa8c16',
              fontSize: '16px',
            },
            content: {
              color: info.props.disabled ? '#bfbfbf' : '#fa8c16',
              fontStyle: info.props.disabled ? 'italic' : 'normal',
            },
          })}
        >
          警告标签
        </Tag>
      </Space>
    </div>

    <Divider />

    {/* 不同变体的标签样式 */}
    <div>
      <h4>不同变体的标签样式</h4>
      <Space wrap>
        {(['filled', 'solid', 'outlined'] as const).map((variant) => (
          <Tag
            key={variant}
            variant={variant}
            color="purple"
            icon={<CheckCircleOutlined />}
            classNames={(info) => ({
              root: `variant-${info.props.variant}`,
              icon: `icon-variant-${info.props.variant}`,
              content: `content-variant-${info.props.variant}`,
            })}
            styles={(info) => {
              const variantStyles = {
                filled: {
                  backgroundColor: '#f9f0ff',
                  border: '2px solid #722ed1',
                  color: '#722ed1',
                },
                solid: {
                  backgroundColor: '#722ed1',
                  border: '2px solid #722ed1',
                  color: '#fff',
                },
                outlined: {
                  backgroundColor: 'transparent',
                  border: '2px solid #722ed1',
                  color: '#722ed1',
                },
              };

              const currentStyle = variantStyles[info.props.variant || 'filled'];

              return {
                root: {
                  ...currentStyle,
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: 'bold',
                },
                icon: {
                  color: currentStyle.color,
                  fontSize: '16px',
                },
                content: {
                  color: currentStyle.color,
                },
              };
            }}
          >
            {variant} 标签
          </Tag>
        ))}
      </Space>
    </div>

    <Divider />

    {/* 可关闭标签的样式 */}
    <div>
      <h4>可关闭标签的样式</h4>
      <Space wrap>
        <Tag
          closable
          color="green"
          icon={<CheckCircleOutlined />}
          onClose={(e) => {
            e.preventDefault();
            console.log('关闭标签');
          }}
          classNames={() => ({
            root: 'closable-tag',
            icon: 'closable-icon',
            content: 'closable-content',
          })}
          styles={() => ({
            root: {
              backgroundColor: '#f6ffed',
              border: '2px solid #52c41a',
              borderRadius: '20px',
              padding: '6px 16px',
              position: 'relative',
              paddingRight: '32px',
            },
            icon: {
              color: '#52c41a',
              fontSize: '14px',
            },
            content: {
              color: '#52c41a',
              fontWeight: '500',
            },
          })}
        >
          可关闭标签
        </Tag>

        <Tag
          closable
          variant="solid"
          color="red"
          classNames={(info) => ({
            root: `solid-closable-${info.props.color}`,
            icon: 'solid-icon',
            content: 'solid-content',
          })}
          styles={() => ({
            root: {
              backgroundColor: '#ff4d4f',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 32px 8px 16px',
              color: '#fff',
            },
            icon: {
              color: '#fff',
              fontSize: '16px',
            },
            content: {
              color: '#fff',
              fontWeight: 'bold',
            },
          })}
          icon={<ExclamationCircleOutlined />}
        >
          实心可关闭
        </Tag>
      </Space>
    </div>

    <Divider />

    {/* 链接标签的样式 */}
    <div>
      <h4>链接标签的样式</h4>
      <Space wrap>
        <Tag
          href="https://ant.design"
          target="_blank"
          color="blue"
          icon={<CheckCircleOutlined />}
          classNames={(info) => ({
            root: info.props.href ? 'link-tag' : 'normal-tag',
            icon: 'link-icon',
            content: 'link-content',
          })}
          styles={() => ({
            root: {
              backgroundColor: '#e6f7ff',
              border: '2px solid #1890ff',
              borderRadius: '8px',
              padding: '8px 16px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#bae7ff',
                transform: 'translateY(-2px)',
              },
            },
            icon: {
              color: '#1890ff',
              fontSize: '16px',
            },
            content: {
              color: '#1890ff',
              fontWeight: '500',
            },
          })}
        >
          链接标签
        </Tag>
      </Space>
    </div>
  </Space>
);

export default App;
