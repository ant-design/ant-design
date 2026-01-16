# Dropdown — 下拉菜单

## 功能概述

向下弹出的列表。

## 应用场景

- 当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。
- 用于收罗一组命令操作。
- Select 用于选择，而 Dropdown 是命令集合。

## 输入字段

### Dropdown 属性

#### 必填

- 无必填属性。

#### 可选

- `arrow`: boolean | { pointAtCenter: boolean }，下拉框箭头是否显示，默认 false。
- `autoAdjustOverflow`: boolean，下拉框被遮挡时自动调整位置，默认 true，版本 5.2.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，用于自定义 Dropdown 组件内部各语义化结构的 class，支持对象或函数。
- `disabled`: boolean，菜单是否禁用。
- `~~destroyPopupOnHide~~`: boolean，关闭后是否销毁 Dropdown，使用 `destroyOnHidden` 替换，默认 false。
- `destroyOnHidden`: boolean，关闭后是否销毁 Dropdown，默认 false，版本 5.25.0。
- `~~dropdownRender~~`: (menus: ReactNode) => ReactNode，自定义下拉框内容，使用 `popupRender` 替换，版本 4.24.0。
- `popupRender`: (menus: ReactNode) => ReactNode，自定义弹出框内容，版本 5.25.0。
- `getPopupContainer`: (triggerNode: HTMLElement) => HTMLElement，菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010)，默认 () => document.body。
- `menu`: [MenuProps](/components/menu-cn#api)，菜单配置项。
- `~~overlayClassName~~`: string，下拉根元素的类名称, 请使用 `classNames.root` 替换。
- `~~overlayStyle~~`: CSSProperties，下拉根元素的样式，请使用 `styles.root`。
- `placement`: string，菜单弹出位置：`bottom` `bottomLeft` `bottomRight` `top` `topLeft` `topRight`，默认 `bottomLeft`。
- `styles`: Record<[SemanticDOM](#semantic-dom) , CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties>，用于自定义 Dropdown 组件内部各语义化结构的行内 style，支持对象或函数。
- `trigger`: Array<`click`|`hover`|`contextMenu`>，触发下拉的行为，移动端不支持 hover，默认 \[`hover`]。
- `open`: boolean，菜单是否显示。
- `onOpenChange`: (open: boolean, info: { source: 'trigger' | 'menu' }) => void，菜单显示状态改变时调用，点击菜单按钮导致的消失不会触发，版本 `info.source`: 5.11.0。

## 方法

无公开方法。

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
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>

    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Click me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>

    <Dropdown.Button menu={{ items }} onClick={() => console.log('click left button')}>
      Dropdown
    </Dropdown.Button>

    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div style={{ padding: 20, background: '#f5f5f5' }}>Right Click on here</div>
    </Dropdown>

    <Dropdown menu={{ items }} arrow>
      <Button>With Arrow</Button>
    </Dropdown>
  </Space>
);
```

## 返回结果

渲染一个下拉菜单，用于收纳操作。
