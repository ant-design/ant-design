# Transfer — 穿梭框

## 功能概述

双栏穿梭选择框。

## 应用场景

- 需要在多个可选项中进行多选时。
- 比起 Select 和 TreeSelect，穿梭框占据更大的空间，可以展示可选项的更多信息。
- 穿梭选择框用直观的方式在两栏中移动元素，完成选择行为。
- 选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。其中，左边一栏为 `source`，右边一栏为 `target`，API 的设计也反映了这两个概念。

## 输入字段

### Transfer 属性

#### 必填

- 无必填属性。

#### 可选

- `actions`: ReactNode\[]，操作文案集合，顺序从上至下。当为字符串数组时使用默认的按钮，当为 ReactNode 数组时直接使用自定义元素，默认 \[`>`, `<`]，版本 6.0.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `dataSource`: [RecordType extends TransferItem = TransferItem](https://github.com/ant-design/ant-design/blob/1bf0bab2a7bc0a774119f501806e3e0e3a6ba283/components/transfer/index.tsx#L12)\[]，数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外，默认 \[]。
- `disabled`: boolean，是否禁用，默认 false。
- `selectionsIcon`: React.ReactNode，自定义下拉菜单图标，版本 5.8.0。
- `filterOption`: (inputValue, option, direction: `left` | `right`): boolean，根据搜索内容进行筛选，接收 `inputValue` `option` `direction` 三个参数，(`direction` 自5.9.0+支持)，当 `option` 符合筛选条件时，应返回 true，反之则返回 false。
- `footer`: (props, { direction }) => ReactNode，底部渲染函数，版本 direction: 4.17.0。
- `~~listStyle~~`: object|({direction: `left` | `right`}) => object，两个穿梭框的自定义样式，使用 `styles.section` 代替。
- `locale`: { itemUnit: string; itemsUnit: string; searchPlaceholder: string; notFoundContent: ReactNode | ReactNode[]; }，各种语言，默认 { itemUnit: `项`, itemsUnit: `项`, searchPlaceholder: `请输入搜索内容` }。
- `oneWay`: boolean，展示为单向样式，默认 false，版本 4.3.0。
- `~~operations~~`: string\[]，操作文案集合，顺序从上至下。使用 `actions` 代替，默认 \[`>`, `<`]。
- `~~operationStyle~~`: CSSProperties，操作栏的自定义样式，使用 `styles.actions` 代替。
- `pagination`: boolean | { pageSize: number, simple: boolean, showSizeChanger?: boolean, showLessItems?: boolean }，使用分页样式，自定义渲染列表下无效，默认 false，版本 4.3.0。
- `render`: (record) => ReactNode，每行数据渲染函数，该函数的入参为 `dataSource` 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 `label` 字段为 ReactElement，`value` 字段为 title。
- `selectAllLabels`: (ReactNode | (info: { selectedCount: number, totalCount: number }) => ReactNode)\[]，自定义顶部多选框标题的集合。
- `selectedKeys`: string\[] | number\[]，设置哪些项应该被选中，默认 \[]。
- `showSearch`: boolean | { placeholder:string,defaultValue:string }，是否显示搜索框，或可对两侧搜索框进行配置，默认 false。
- `showSelectAll`: boolean，是否展示全选勾选框，默认 true。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `targetKeys`: string\[] | number\[]，显示在右侧框数据的 key 集合，默认 \[]。
- `titles`: ReactNode\[]，标题集合，顺序从左至右。
- `onChange`: (targetKeys, direction, moveKeys): void，选项在两栏之间转移时的回调函数。
- `onScroll`: (direction, event): void，选项列表滚动时的回调函数。
- `onSearch`: (direction: `left` | `right`, value: string): void，搜索框内容时改变时的回调函数。
- `onSelectChange`: (sourceSelectedKeys, targetSelectedKeys): void，选中项发生改变时的回调函数。

### children 属性

#### 必填

- 无必填属性。

#### 可选

- `direction`: `left` | `right`，渲染列表的方向。
- `disabled`: boolean，是否禁用列表。
- `filteredItems`: RecordType\[]，过滤后的数据。
- `selectedKeys`: string\[] | number\[]，选中的条目。
- `onItemSelect`: (key: string | number, selected: boolean)，勾选条目。
- `onItemSelectAll`: (keys: string\[] | number\[], selected: boolean)，勾选一组条目。

## 方法

无公开方法。

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

  const selectAll = () => {
    setTargetKeys(mockData.map((item) => item.key));
  };

  const clearAll = () => {
    setTargetKeys([]);
  };

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
