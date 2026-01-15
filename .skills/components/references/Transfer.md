# Transfer — 穿梭框

## 功能概述

双栏穿梭选择框，用于在两个集合之间进行数据转移。支持搜索、排序、自定义渲染等功能。

## 核心概念

### 数据转移流程

```
dataSource（完整数据源）
     ↓
 ┌─────────────────────────┐
 │ 左侧框（未选）  右侧框（已选） │
 │ targetKeys 控制  │
 └─────────────────────────┘
     ↓
 点击转移按钮
     ↓
 onChange 回调（新的 targetKeys）
     ↓
 更新状态
```

### 关键数据结构

```tsx
// 穿梭框数据项
interface TransferItem {
  key: string; // 唯一标识（必须）
  title: string; // 显示标题
  description?: string; // 描述（可选）
  disabled?: boolean; // 禁用
  icon?: ReactNode; // 自定义图标
}

// onChange 事件信息
interface TransferChangeInfo {
  targetKeys: string[]; // 右侧框的 key 数组
  direction: 'left' | 'right'; // 转移方向
  moveKeys: string[]; // 本次转移的 key
}

// 选择信息
interface TransferSelectInfo {
  sourceSelectedKeys: string[]; // 左侧选中
  targetSelectedKeys: string[]; // 右侧选中
}

// 搜索匹配项
interface FilterOption {
  inputValue: string;
  item: TransferItem;
}
```

## 输入字段

### 必填

- `dataSource`: TransferItem[]，数据源数组。

### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `targetKeys` | string[] | - | 右侧框数据的 key（受控） |
| `selectedKeys` | string[] | - | 选中项的 key（受控） |
| `titles` | [ReactNode, ReactNode] | `['', '']` | 左右框标题 |
| `operations` | [string, string] | - | 操作按钮文字 |
| `showSearch` | boolean | false | 显示搜索框 |
| `filterOption` | (inputValue, item) => boolean | - | 搜索过滤函数 |
| `searchPlaceholder` | string | - | 搜索框占位（已废弃） |
| `disabled` | boolean | false | 禁用状态 |
| `showSelectAll` | boolean | true | 显示全选勾选框 |
| `selectAllLabels` | ((checked, filtered) => ReactNode)[] | - | 全选标签 |
| `listStyle` | CSSProperties | - | 列表样式 |
| `rowKey` | (record) => string | - | 自定义行 key |
| `footer` | (props, direction) => ReactNode | - | 底部渲染 |
| `render` | (record) => ReactNode \| { label, value } | - | 每行渲染 |
| `oneWay` | boolean | false | 单向模式（只能右转） |
| `pagination` | boolean \| { pageSize, simple } | - | 分页配置 |
| `locale` | object | - | 本地化文本 |
| `status` | `'error'` \| `'warning'` | - | 校验状态 |

### 事件回调

- `onChange`: (targetKeys, direction, moveKeys) => void，选中项变化回调。
- `onSelectChange`: (sourceSelectedKeys, targetSelectedKeys) => void，选中变化回调。
- `onSearch`: (direction, value) => void，搜索变化回调。
- `onScroll`: (direction, event) => void，滚动回调。

### 高级用法：自定义渲染

```tsx
<Transfer {...props}>
  {({ direction, filteredItems, onItemSelect, onItemSelectAll }) => (
    <YourCustomComponent {...} />
  )}
</Transfer>
```

## 常见场景示例

### 场景 1: 基础穿梭框

```tsx
import { useState } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3']);

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['Available', 'Selected']}
      targetKeys={targetKeys}
      onChange={onChange}
      render={(item) => item.title}
    />
  );
};
```

### 场景 2: 带搜索功能

```tsx
import { useState } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';

interface Item {
  key: string;
  title: string;
  description: string;
}

const mockData: Item[] = Array.from({ length: 30 }).map((_, i) => ({
  key: i.toString(),
  title: `User ${i + 1}`,
  description: `User ${i + 1} description`,
}));

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const filterOption = (inputValue: string, option: any) => {
    return option.title.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['Source', 'Target']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      filterOption={filterOption}
      render={(item) => item.title}
      showSearch
    />
  );
};
```

### 场景 3: 受控和批量操作

```tsx
import { useState } from 'react';
import { Button, Space, Transfer } from 'antd';
import type { TransferProps } from 'antd';

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: i.toString(),
  title: `Item ${i + 1}`,
}));

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  // 全选到右侧
  const selectAll = () => {
    setTargetKeys(mockData.map((item) => item.key));
  };

  // 全部清除
  const clearAll = () => {
    setTargetKeys([]);
  };

  // 反向选择
  const reverse = () => {
    const newKeys = mockData
      .filter((item) => !targetKeys.includes(item.key))
      .map((item) => item.key);
    setTargetKeys(newKeys);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={selectAll}>全选</Button>
        <Button onClick={clearAll}>清除</Button>
        <Button onClick={reverse}>反向</Button>
      </Space>

      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={onChange}
        titles={['Source', 'Target']}
        render={(item) => item.title}
      />
    </>
  );
};
```

### 场景 4: 自定义渲染和样式

```tsx
import { useState } from 'react';
import { Avatar, Transfer } from 'antd';
import type { TransferProps } from 'antd';

interface UserItem {
  key: string;
  title: string;
  avatar: string;
}

const mockUsers: UserItem[] = Array.from({ length: 10 }).map((_, i) => ({
  key: i.toString(),
  title: `User ${i + 1}`,
  avatar: `https://api.realworld.io/images/demo-avatar-${(i % 6) + 1}.jpg`,
}));

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Transfer
      dataSource={mockUsers}
      titles={['Available Users', 'Selected Users']}
      targetKeys={targetKeys}
      onChange={onChange}
      render={(item: UserItem) => (
        <span>
          <Avatar src={item.avatar} size="small" style={{ marginRight: 8 }} />
          {item.title}
        </span>
      )}
    />
  );
};
```

### 场景 5: 带分页的穿梭框

```tsx
import { useState } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';

const mockData = Array.from({ length: 100 }).map((_, i) => ({
  key: i.toString(),
  title: `Item ${i + 1}`,
}));

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['Source', 'Target']}
      targetKeys={targetKeys}
      onChange={onChange}
      render={(item) => item.title}
      pagination={{ pageSize: 5 }}
      showSearch
    />
  );
};
```

### 场景 6: 单向穿梭框

```tsx
import { useState } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';

const mockData = Array.from({ length: 10 }).map((_, i) => ({
  key: i.toString(),
  title: `Item ${i + 1}`,
}));

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['Available', 'Selected']}
      targetKeys={targetKeys}
      onChange={onChange}
      render={(item) => item.title}
      oneWay={true} // 单向：只能从左转右
      showSearch
    />
  );
};
```

## AI 生成指引

### 场景判断表

| 用户需求     | 选择方案                  | 关键属性                         |
| ------------ | ------------------------- | -------------------------------- |
| 简单穿梭     | Transfer 基础             | dataSource, targetKeys, onChange |
| 搜索功能     | showSearch + filterOption | showSearch, filterOption         |
| 自定义显示   | render                    | render 函数                      |
| 自定义行渲染 | render + 返回 ReactNode   | render 函数                      |
| 受控模式     | targetKeys + onChange     | targetKeys, onChange             |
| 单向穿梭     | oneWay                    | oneWay={true}                    |
| 大数据分页   | pagination                | pagination={ pageSize: 10 }      |
| 自定义标签   | selectAllLabels           | selectAllLabels                  |
| 禁用某些项   | disabled                  | dataSource 中 disabled 属性      |
| 自定义底部   | footer                    | footer 函数                      |
| 响应式       | listStyle                 | listStyle 对象                   |

### 类型导入

```tsx
import type {
  TransferDirection, // 转移方向类型
  TransferItem, // 数据项类型
  TransferProps, // Transfer 组件 props 类型
} from 'antd';
```

## 使用建议

数据量大时使用 `pagination` 或虚拟滚动；使用 `showSearch` 提升查找效率；复杂场景使用自定义渲染；受控模式使用 `targetKeys` + `onChange`；关键展示信息使用 `render` 自定义；单向穿梭使用 `oneWay={true}`；禁用特定项在 dataSource 中设置 `disabled: true`。

## 示例代码

```tsx
import { useState } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['Source', 'Target']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={(item) => item.title}
      showSearch
    />
  );
};
```

## 返回结果

渲染一个穿梭框，用于在两个集合之间转移数据。
