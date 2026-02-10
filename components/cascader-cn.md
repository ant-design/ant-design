---
category: Components
group: 数据录入
title: Cascader
subtitle: 级联选择
description: 级联选择框。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ngTnQZNOcK0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Nt8xR7afyr0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## 代码演示 {#examples}

### 基本

省市区级联。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import type { HTMLAriaDataAttributes } from 'antd/es/_util/aria-data-attrs';

type Option = {
  value: string;
  label: string;
  children?: Option[];
} & HTMLAriaDataAttributes;

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    'aria-label': 'Zhejiang',
    'data-title': 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        'aria-label': 'Hangzhou',
        'data-title': 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            'aria-label': 'West Lake',
            'data-title': 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    'aria-label': 'Jiangsu',
    'data-title': 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        'aria-label': 'Nanjing',
        'data-title': 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            'aria-label': 'Zhong Hua Men',
            'data-title': 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <Cascader options={options} onChange={onChange} placeholder="Please select" />
);

export default App;
```

### 默认值

默认值通过数组的方式指定。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} onChange={onChange} />
);

export default App;
```

### 可以自定义显示

切换按钮和结果分开。

```tsx
import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
      },
    ],
  },
];

const App: React.FC = () => {
  const [text, setText] = useState('Unselect');

  const onChange: CascaderProps<Option>['onChange'] = (_, selectedOptions) => {
    setText(selectedOptions.map((o) => o.label).join(', '));
  };

  return (
    <span>
      {text}
      &nbsp;
      <Cascader options={options} onChange={onChange}>
        <a>Change city</a>
      </Cascader>
    </span>
  );
};

export default App;
```

### 移入展开

通过移入展开下级菜单，点击完成选择。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

// Just show the latest item.
const displayRender = (labels: string[]) => labels[labels.length - 1];

const App: React.FC = () => (
  <Cascader
    options={options}
    expandTrigger="hover"
    displayRender={displayRender}
    onChange={onChange}
  />
);

export default App;
```

### 禁用选项

通过指定 options 里的 `disabled` 字段。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    disabled: true,
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => <Cascader options={options} onChange={onChange} />;

export default App;
```

### 选择即改变

这种交互允许只选中父级选项。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hanzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => <Cascader options={options} onChange={onChange} changeOnSelect />;

export default App;
```

### 多选

一次性选择多个选项。通过添加 `disableCheckbox` 属性,选择具体某一个`checkbox`禁用 。可以通过类名修改禁用的样式。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disableCheckbox?: boolean;
}

const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: Array.from({ length: 20 }).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
            disableCheckbox: true,
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option, 'value', true>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <Cascader
    style={{ width: '100%' }}
    options={options}
    onChange={onChange}
    multiple
    maxTagCount="responsive"
  />
);

export default App;
```

### 自定义回填方式

通过设置 `showCheckedStrategy` 选择回填方式。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

const { SHOW_CHILD } = Cascader;

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: Array.from({ length: 20 }).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const onChange: CascaderProps<Option, 'value', true>['onChange'] = (value) => {
    console.log(value);
  };
  return (
    <>
      <Cascader
        style={{ width: '100%' }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        defaultValue={[
          ['bamboo', 'little', 'fish'],
          ['bamboo', 'little', 'cards'],
          ['bamboo', 'little', 'bird'],
        ]}
      />
      <br />
      <br />
      <Cascader
        style={{ width: '100%' }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        defaultValue={[['bamboo']]}
      />
    </>
  );
};

export default App;
```

### 大小

不同大小的级联选择器。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <>
    <Cascader size="large" options={options} onChange={onChange} />
    <br />
    <br />
    <Cascader options={options} onChange={onChange} />
    <br />
    <br />
    <Cascader size="small" options={options} onChange={onChange} />
    <br />
    <br />
  </>
);

export default App;
```

### 自定义已选项

例如给最后一项加上邮编链接。

```tsx
import React from 'react';
import { Cascader } from 'antd';
import type { CascaderProps, GetProp } from 'antd';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface Option {
  value: string;
  label: string;
  children?: Option[];
  code?: number;
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            code: 752100,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            code: 453400,
          },
        ],
      },
    ],
  },
];

const handleAreaClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  label: string,
  option: DefaultOptionType,
) => {
  e.stopPropagation();
  console.log('clicked', label, option);
};

const displayRender: CascaderProps<Option>['displayRender'] = (labels, selectedOptions = []) =>
  labels.map((label, i) => {
    const option = selectedOptions[i];
    if (i === labels.length - 1) {
      return (
        <span key={option.value}>
          {label} (<a onClick={(e) => handleAreaClick(e, label, option)}>{option.code}</a>)
        </span>
      );
    }
    return <span key={option.value}>{label} / </span>;
  });

const App: React.FC = () => (
  <Cascader
    options={options}
    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
    displayRender={displayRender}
    style={{ width: '100%' }}
    // `optionRender` is supported since 5.16.0
    optionRender={(option) => (
      <>
        {option.label} ({option.value})
      </>
    )}
  />
);

export default App;
```

### 搜索

可以直接搜索选项并选择。

> `Cascader[showSearch]` 暂不支持服务端搜索，更多信息见 [#5547](https://github.com/ant-design/ant-design/issues/5547)

```tsx
import React from 'react';
import { Cascader } from 'antd';
import type { CascaderProps, GetProp } from 'antd';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface Option {
  value: string;
  label: string;
  children?: Option[];
  disabled?: boolean;
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value, selectedOptions) => {
  console.log(value, selectedOptions);
};

const filter = (inputValue: string, path: DefaultOptionType[]) =>
  path.some((option) => (option.label as string).toLowerCase().includes(inputValue.toLowerCase()));

const App: React.FC = () => (
  <Cascader
    options={options}
    onChange={onChange}
    placeholder="Please select"
    showSearch={{ filter, onSearch: (value) => console.log(value) }}
  />
);

export default App;
```

### 动态加载选项

使用 `loadData` 实现动态加载选项。

> 注意：`loadData` 与 `showSearch` 无法一起使用。

```tsx
import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const optionLists: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];

const App: React.FC = () => {
  const [options, setOptions] = useState<Option[]>(optionLists);

  const onChange: CascaderProps<Option>['onChange'] = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // load options lazily
    setTimeout(() => {
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  return <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />;
};

export default App;
```

### 自定义字段名

自定义字段名。

```tsx
import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  code: string;
  name: string;
  items?: Option[];
}

const options: Option[] = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        items: [
          {
            code: 'xihu',
            name: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        items: [
          {
            code: 'zhonghuamen',
            name: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <Cascader
    fieldNames={{ label: 'name', value: 'code', children: 'items' }}
    options={options}
    onChange={onChange}
    placeholder="Please select"
  />
);

export default App;
```

### 前后缀

通过 `prefix` 自定前缀，通过 `suffixIcon` 自定义选择框后缀图标，通过 `expandIcon` 自定义次级菜单展开图标。

```tsx
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <>
    <Cascader
      suffixIcon={<SmileOutlined />}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    />
    <br />
    <br />
    <Cascader suffixIcon="ab" options={options} onChange={onChange} placeholder="Please select" />
    <br />
    <br />
    <Cascader
      expandIcon={<SmileOutlined />}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    />
    <br />
    <br />
    <Cascader expandIcon="ab" options={options} onChange={onChange} placeholder="Please select" />
    <br />
    <br />
    <Cascader
      prefix={<SmileOutlined />}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    />
  </>
);

export default App;
```

### 扩展菜单

使用 `popupRender` 对下拉菜单进行自由扩展。

```tsx
import React from 'react';
import { Cascader, Divider } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const popupRender = (menus: React.ReactNode) => (
  <div>
    {menus}
    <Divider style={{ margin: 0 }} />
    <div style={{ padding: 8 }}>The footer is not very short.</div>
  </div>
);

const App: React.FC = () => (
  <Cascader options={options} popupRender={popupRender} placeholder="Please select" />
);

export default App;
```

### 弹出位置

可以通过 `placement` 手动指定弹出的位置。

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Cascader, Radio } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [placement, SetPlacement] = useState<'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'>(
    'topLeft',
  );

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Cascader options={options} placeholder="Please select" placement={placement} />
    </>
  );
};

export default App;
```

### 形态变体

Cascader 形态变体，可选 `outlined` `filled` `borderless` `underlined` 四种形态。

```tsx
import React from 'react';
import { Cascader, Flex } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Cascader placeholder="Please select" variant="borderless" />
    <Cascader placeholder="Please select" variant="filled" />
    <Cascader placeholder="Please select" variant="outlined" />
    <Cascader placeholder="Please select" variant="underlined" />
  </Flex>
);

export default App;
```

### 自定义状态

使用 `status` 为 Cascader 添加状态，可选 `error` 或者 `warning`。

```tsx
import React from 'react';
import { Cascader, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <Cascader status="error" placeholder="Error" />
    <Cascader status="warning" multiple placeholder="Warning multiple" />
  </Space>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Cascader 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Cascader, Flex } from 'antd';
import type { CascaderProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    root: {
      borderRadius: token.borderRadiusLG,
    },
  };
});

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'meet-student',
    label: 'meet-student',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const stylesObject: CascaderProps['styles'] = {
  prefix: {
    color: '#ccc',
  },
  suffix: {
    color: '#ccc',
  },
};

const stylesFn: CascaderProps['styles'] = (info) => {
  if (info.props.variant === 'filled') {
    return {
      prefix: {
        color: '#1890ff',
      },
      suffix: {
        color: '#1890ff',
      },
      popup: {
        listItem: {
          color: '#1890ff',
        },
      },
    } satisfies CascaderProps['styles'];
  }
  return {};
};

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Object styles"
        classNames={classNames}
        styles={stylesObject}
        prefix="🏠"
      />
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Function  styles"
        variant="filled"
        classNames={classNames}
        styles={stylesFn}
        prefix="✅"
      />
    </Flex>
  );
};

export default App;
```

### = 5.10.0">面板使用

适用于一些需要内嵌适用的场景。

```tsx
import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import { Cascader, Flex, Switch } from 'antd';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const onMultipleChange: CascaderProps<Option, 'value', true>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Flex vertical gap="small" align="flex-start">
      <Switch
        checked={disabled}
        checkedChildren="Enabled"
        unCheckedChildren="Disabled"
        onChange={setDisabled}
        aria-label="disabled switch"
      />
      <Cascader.Panel options={options} onChange={onChange} disabled={disabled} />
      <Cascader.Panel multiple options={options} onChange={onMultipleChange} disabled={disabled} />
      <Cascader.Panel />
    </Flex>
  );
};

export default App;
```




## API

通用属性参考：[通用属性](/docs/react/common-props)

```jsx
<Cascader options={options} onChange={onChange} />
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean \| { clearIcon?: ReactNode } | true | 5.8.0: 支持对象形式 |
| ~~autoClearSearchValue~~ | 是否在选中项后清空搜索框，只在 `multiple` 为 `true` 时有效 | boolean | true | 5.9.0 |
| changeOnSelect | 单选时生效（multiple 下始终都可以选择），点选每级菜单选项值都会发生变化。 | boolean | false |  |
| className | 自定义类名 | string | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultOpen | 是否默认展示浮层 | boolean | - |  |
| defaultValue | 默认的选中项 | string\[] \| number\[] | \[] |  |
| disabled | 禁用 | boolean | false |  |
| displayRender | 选择后展示的渲染函数 | (label, selectedOptions) => ReactNode | label => label.join(`/`) | `multiple`: 4.18.0 |
| tagRender | 自定义 tag 内容 render，仅在多选时生效 | ({ label: string, onClose: function, value: string }) => ReactNode | - |  |
| ~~popupClassName~~ | 自定义浮层类名，使用 `classNames.popup.root` 替换 | string | - | 4.23.0 |
| ~~dropdownRender~~ | 自定义下拉框内容，请使用 `popupRender` 替换 | (menus: ReactNode) => ReactNode | - | 4.4.0 |
| popupRender | 自定义下拉框内容 | (menus: ReactNode) => ReactNode | - |  |
| ~~dropdownStyle~~ | 下拉菜单的 style 属性，使用 `styles.popup.root` 替换 | CSSProperties | - |  |
| expandIcon | 自定义次级菜单展开图标 | ReactNode | - | 4.4.0 |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | string | `click` |  |
| fieldNames | 自定义 options 中 label value children 的字段 | object | { label: `label`, value: `value`, children: `children` } |  |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | function(triggerNode) | () => document.body |  |
| loadData | 用于动态加载选项，无法与 `showSearch` 一起使用 | (selectedOptions) => void | - |  |
| loadingIcon | 自定义的加载图标 | ReactNode | - |  |
| maxTagCount | 最多显示多少个 tag，响应式模式会对性能产生损耗 | number \| `responsive` | - | 4.17.0 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode \| function(omittedValues) | - | 4.17.0 |
| maxTagTextLength | 最大显示的 tag 文本长度 | number | - | 4.17.0 |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `Not Found` |  |
| open | 控制浮层显隐 | boolean | - | 4.17.0 |
| options | 可选项数据源 | [Option](#option)\[] | - |  |
| placeholder | 输入框占位文本 | string | - |  |
| placement | 浮层预设位置 | `bottomLeft` `bottomRight` `topLeft` `topRight` | `bottomLeft` | 4.17.0 |
| prefix | 自定义前缀 | ReactNode | - | 5.22.0 |
| showSearch | 在选择框中显示搜索框 | boolean \| [Object](#showsearch) | false |  |
| size | 输入框大小 | `large` \| `middle` \| `small` | - |  |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - |  |
| value | 指定选中项 | string\[] \| number\[] | - |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onChange | 选择完成后的回调 | (value, selectedOptions) => void | - |  |
| ~~onDropdownVisibleChange~~ | 显示/隐藏浮层的回调，请使用 `onOpenChange` 替换 | (value) => void | - | 4.17.0 |
| onOpenChange | 显示/隐藏浮层的回调 | (value) => void | - |  |
| multiple | 支持多选节点 | boolean | - | 4.17.0 |
| showCheckedStrategy | 定义选中项回填的方式（仅在 `multiple` 为 `true` 时生效）。`Cascader.SHOW_CHILD`: 只显示选中的子节点。`Cascader.SHOW_PARENT`: 只显示父节点（当父节点下所有子节点都选中时）。 | `Cascader.SHOW_PARENT` \| `Cascader.SHOW_CHILD` | `Cascader.SHOW_PARENT` | 4.20.0 |
| removeIcon | 自定义的多选框清除图标 | ReactNode | - |  |
| ~searchValue~ | 设置搜索的值，需要与 `showSearch` 配合使用 | string | - | 4.17.0 |
| ~onSearch~ | 监听搜索，返回输入的值 | (search: string) => void | - | 4.17.0 |
| ~~dropdownMenuColumnStyle~~ | 下拉菜单列的样式，请使用 `popupMenuColumnStyle` 替换 | CSSProperties | - |  |
| popupMenuColumnStyle | 下拉菜单列的样式 | CSSProperties | - |  |
| optionRender | 自定义渲染下拉选项 | (option: Option) => React.ReactNode | - | 5.16.0 |

### showSearch

`showSearch` 为对象时，其中的字段：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoClearSearchValue | 是否在选中项后清空搜索框，只在 `multiple` 为 `true` 时有效 | boolean | true | 5.9.0 |
| filter | 接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false | function(inputValue, path): boolean | - |  |
| limit | 搜索结果展示数量 | number \| false | 50 |  |
| matchInputWidth | 搜索结果列表是否与输入框同宽（[效果](https://github.com/ant-design/ant-design/issues/25779)） | boolean | true |  |
| render | 用于渲染 filter 后的选项 | function(inputValue, path): ReactNode | - |  |
| sort | 用于排序 filter 后的选项 | function(a, b, inputValue) | - |  |
| searchValue | 设置搜索的值，需要与 `showSearch` 配合使用 | string | - | 4.17.0 |
| onSearch | 监听搜索，返回输入的值 | (search: string) => void | - | 4.17.0 |

### Option

```typescript
interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
  // 标记是否为叶子节点，设置了 `loadData` 时有效
  // 设为 `false` 时会强制标记为父节点，即使当前节点没有 children，也会显示展开图标
  isLeaf?: boolean;
}
```

## 方法 {#methods}

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

> 注意，如果需要获得中国省市区数据，可以参考 [china-division](https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17)。

## Semantic DOM

https://ant.design/components/cascader-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Cascader)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| controlItemWidth | 选项宽度 | string \| number | 111 |
| controlWidth | 选择器宽度 | string \| number | 184 |
| dropdownHeight | 下拉菜单高度 | string \| number | 180 |
| menuPadding | 选项菜单（单列）内间距 | Padding<string \| number> \| undefined | 4 |
| optionPadding | 选项内间距 | Padding<string \| number> \| undefined | 5px 12px |
| optionSelectedBg | 选项选中时背景色 | string | #e6f4ff |
| optionSelectedColor | 选项选中时文本颜色 | string | rgba(0,0,0,0.88) |
| optionSelectedFontWeight | 选项选中时字重 | FontWeight \| undefined | 600 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorHighlight | 控制页面元素高亮时的颜色。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorPrimaryHover | 主色梯度下的悬浮态。 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorWhite | 不随主题变化的纯白色 | string |  |
| controlInteractiveSize | 控制组件的交互大小。 | number |  |
| controlItemBgHover | 控制组件项在鼠标悬浮时的背景颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthBold | 描边类组件的默认线宽，如 Button、Input、Select 等输入类控件。 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationFast | 动效播放速度，快速。用于小型元素动画交互 | string |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInBack | 预设动效曲率 | string |  |
| motionEaseOutBack | 预设动效曲率 | string |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |


