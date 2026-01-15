# Dropdown — 下拉菜单

## 功能概述

向下弹出的列表。当页面上的操作命令过多时，用此组件可以收纳操作元素。

## 输入字段

### 必填

- `menu`: MenuProps，菜单配置。

### MenuProps 结构

```tsx
interface MenuProps {
  items: MenuItem[]; // 菜单项
  onClick?: (info) => void; // 点击回调
  selectedKeys?: string[]; // 选中项
  selectable?: boolean; // 是否可选
  multiple?: boolean; // 多选
}

interface MenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  children?: MenuItem[]; // 子菜单
  type?: 'group' | 'divider';
}
```

### 可选

- `children`: ReactNode，触发元素。
- `trigger`: string[]，触发方式，可选 `click` | `hover` | `contextMenu`，默认 `['hover']`。
- `placement`: string，弹出位置，可选 `bottom` | `bottomLeft` | `bottomRight` | `top` | `topLeft` | `topRight`，默认 `bottomLeft`。
- `arrow`: boolean | { pointAtCenter }，箭头配置。
- `open`: boolean，是否显示（受控）。
- `disabled`: boolean，禁用。
- `autoFocus`: boolean，打开后自动聚焦。
- `autoAdjustOverflow`: boolean，自动调整位置，默认 `true`。
- `destroyPopupOnHide`: boolean，隐藏时销毁。
- `dropdownRender`: (menu) => ReactNode，自定义下拉内容。
- `overlayClassName`: string，下拉类名。
- `overlayStyle`: CSSProperties，下拉样式。
- `getPopupContainer`: (node) => HTMLElement，下拉容器。
- `onOpenChange`: (open, info) => void，显示状态变化回调。

### Dropdown.Button 属性

按钮下拉菜单，继承 Dropdown 属性，额外：

- `buttonsRender`: (buttons) => [ReactNode, ReactNode]，自定义按钮渲染。
- `loading`: boolean | { delay }，加载状态。
- `danger`: boolean，危险样式。
- `icon`: ReactNode，右侧按钮图标。
- `size`: string，按钮尺寸。
- `type`: string，按钮类型。
- `onClick`: (e) => void，左侧按钮点击回调。

## 使用建议

操作收纳使用 Dropdown；右键菜单使用 `trigger="contextMenu"`；带主操作使用 Dropdown.Button。

## 示例代码

```tsx
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
  { type: 'divider' },
  { key: '3', label: 'Action 3', disabled: true },
  { key: '4', danger: true, label: 'Delete' },
];

const App: React.FC = () => (
  <Space>
    {/* 基础用法 */}
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>

    {/* 点击触发 */}
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Click me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>

    {/* 带按钮 */}
    <Dropdown.Button menu={{ items }} onClick={() => console.log('click left button')}>
      Dropdown
    </Dropdown.Button>

    {/* 右键菜单 */}
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div style={{ padding: 20, background: '#f5f5f5' }}>Right Click on here</div>
    </Dropdown>

    {/* 带箭头 */}
    <Dropdown menu={{ items }} arrow>
      <Button>With Arrow</Button>
    </Dropdown>
  </Space>
);
```

## 返回结果

渲染一个下拉菜单，用于收纳操作。
