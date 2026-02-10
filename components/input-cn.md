---
category: Components
group: 数据录入
title: Input
subtitle: 输入框
description: 通过鼠标或键盘输入内容，是最基础的表单域的包装。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y3R0RowXHlAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sBqqTatJ-AkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 代码演示 {#examples}

### 基本使用

基本使用。

```tsx
import React from 'react';
import { Input } from 'antd';

const App: React.FC = () => <Input placeholder="Basic usage" />;

export default App;
```

### 三种大小

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。

```tsx
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Flex, Input } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
    <Input placeholder="default size" prefix={<UserOutlined />} />
    <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
  </Flex>
);

export default App;
```

### 形态变体

Input 形态变体，可选 `outlined` `filled` `borderless` `underlined` 四种形态。

```tsx
import React from 'react';
import { Flex, Input } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Input placeholder="Outlined" />
    <Input placeholder="Filled" variant="filled" />
    <Input placeholder="Borderless" variant="borderless" />
    <Input placeholder="Underlined" variant="underlined" />
    <Input.Search placeholder="Filled" variant="filled" />
  </Flex>
);

export default App;
```



### 紧凑模式

使用 Space.Compact 创建紧凑模式，更多请查看 [Space.Compact](/components/space-cn#spacecompact) 文档。

```tsx
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';

const { Search } = Input;

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
  },
];

const App: React.FC = () => (
  <Space vertical size="middle">
    <Space.Compact>
      <Input defaultValue="26888888" />
    </Space.Compact>
    <Space.Compact>
      <Input style={{ width: '20%' }} defaultValue="0571" />
      <Input style={{ width: '80%' }} defaultValue="26888888" />
    </Space.Compact>
    <Space.Compact>
      <Space.Addon>https://</Space.Addon>
      <Search placeholder="input search text" allowClear />
    </Space.Compact>
    <Space.Compact style={{ width: '100%' }}>
      <Input defaultValue="Combine input and button" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact>
      <Select defaultValue="Zhejiang" options={options} />
      <Input defaultValue="Xihu District, Hangzhou" />
    </Space.Compact>
    <Space.Compact size="large">
      <Space.Addon>
        <SearchOutlined />
      </Space.Addon>
      <Input placeholder="large size" />
      <Input placeholder="another input" />
    </Space.Compact>
  </Space>
);

export default App;
```


### 搜索框

带有搜索按钮的输入框。

```tsx
import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const suffix = <AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const App: React.FC = () => (
  <Space vertical>
    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
    <Space.Compact>
      <Space.Addon>https://</Space.Addon>
      <Search placeholder="input search text" allowClear onSearch={onSearch} />
    </Space.Compact>

    <Search placeholder="input search text" onSearch={onSearch} enterButton />
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />
  </Space>
);

export default App;
```

### 搜索框 loading

用于 `onSearch` 的时候展示 `loading`。

```tsx
import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const App: React.FC = () => (
  <>
    <Search placeholder="input search loading default" loading />
    <br />
    <br />
    <Search placeholder="input search loading with enterButton" loading enterButton />
    <br />
    <br />
    <Search placeholder="input search text" enterButton="Search" size="large" loading />
  </>
);

export default App;
```

### 文本域

用于多行输入。

```tsx
import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const App: React.FC = () => (
  <>
    <TextArea rows={4} />
    <br />
    <br />
    <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
  </>
);

export default App;
```

### 适应文本高度的文本域

`autoSize` 属性适用于 `textarea` 节点，并且只有高度会自动变化。另外 `autoSize` 可以设定为一个对象，指定最小行数和最大行数。

```tsx
import React, { useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const App: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <TextArea placeholder="Autosize height based on content lines" autoSize />
      <div style={{ margin: '24px 0' }} />
      <TextArea
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <div style={{ margin: '24px 0' }} />
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled autosize"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </>
  );
};

export default App;
```

### 一次性密码框

一次性密码输入框。

```tsx
import React from 'react';
import { Flex, Input, Typography } from 'antd';
import type { GetProps } from 'antd';

type OTPProps = GetProps<typeof Input.OTP>;

const { Title } = Typography;

const App: React.FC = () => {
  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    console.log('onInput:', value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  return (
    <Flex gap="middle" align="flex-start" vertical>
      <Title level={5}>With formatter (Upcase)</Title>
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      <Title level={5}>With Disabled</Title>
      <Input.OTP disabled {...sharedProps} />
      <Title level={5}>With Length (8)</Title>
      <Input.OTP length={8} {...sharedProps} />
      <Title level={5}>With variant</Title>
      <Input.OTP variant="filled" {...sharedProps} />
      <Title level={5}>With custom display character</Title>
      <Input.OTP mask="🔒" {...sharedProps} />
      <Title level={5}>With custom ReactNode separator</Title>
      <Input.OTP separator={<span>/</span>} {...sharedProps} />
      <Title level={5}>With custom function separator</Title>
      <Input.OTP
        separator={(i) => <span style={{ color: i & 1 ? 'red' : 'blue' }}>—</span>}
        {...sharedProps}
      />
    </Flex>
  );
};

export default App;
```

### 输入时格式化展示

结合 [Tooltip](/components/tooltip-cn) 组件，实现一个数值输入框，方便内容超长时的全量展现。

```tsx
import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';

interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'Input a number'
  );

  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      classNames={{ root: 'numeric-input' }}
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
      />
    </Tooltip>
  );
};

const App: React.FC = () => {
  const [value, setValue] = useState('');

  return <NumericInput style={{ width: 120 }} value={value} onChange={setValue} />;
};

export default App;
```

### 前缀和后缀

在输入框上添加前缀或后缀图标。注意：Input.Password 的 `suffix` 属性在 `>=5.27.0` 版本支持。

```tsx
import React from 'react';
import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';

const App: React.FC = () => (
  <>
    <Input
      placeholder="Enter your username"
      prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
    <br />
    <br />
    <Input prefix="￥" suffix="RMB" />
    <br />
    <br />
    <Input prefix="￥" suffix="RMB" disabled />
    <br />
    <br />
    <Input.Password
      suffix={<LockOutlined />} // `suffix` available since `5.27.0`
      placeholder="input password support suffix"
    />
  </>
);

export default App;
```

### 密码框

密码框。

```tsx
import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const App: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Space vertical>
      <Input.Password placeholder="input password" />
      <Input.Password
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Space>
        <Input.Password
          placeholder="input password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        />
        <Button style={{ width: 80 }} onClick={() => setPasswordVisible((prevState) => !prevState)}>
          {passwordVisible ? 'Hide' : 'Show'}
        </Button>
      </Space>
      <Input.Password disabled placeholder="disabled input password" />
    </Space>
  );
};

export default App;
```

### 带移除图标

带移除图标的输入框，点击图标删除所有内容。

```tsx
import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log(e);
};

const App: React.FC = () => (
  <>
    <Input placeholder="input with clear icon" allowClear onChange={onChange} />
    <br />
    <br />
    <TextArea placeholder="textarea with clear icon" allowClear onChange={onChange} />
  </>
);

export default App;
```

### 带字数提示

展示字数提示。

```tsx
import React from 'react';
import { Flex, Input } from 'antd';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const App: React.FC = () => (
  <Flex vertical gap={32}>
    <Input showCount maxLength={20} onChange={onChange} />
    <TextArea showCount maxLength={100} onChange={onChange} placeholder="can resize" />
    <TextArea
      showCount
      maxLength={100}
      onChange={onChange}
      placeholder="disable resize"
      style={{ height: 120, resize: 'none' }}
    />
  </Flex>
);

export default App;
```

### = 5.10.0">定制计数能力

在某些场景下，需要定制计数能力（例如 emoji 长度以 1 计算），可以通过 `count` 属性来实现。在该模式下，通过 `count.max` 属性来超出原生 `maxLength` 的限制。

```tsx
import React from 'react';
import { Flex, Input, Typography } from 'antd';
import { runes } from 'runes2';

const App: React.FC = () => (
  <Flex vertical gap={16}>
    <div>
      <Typography.Title level={5}>Exceed Max</Typography.Title>
      <Input
        count={{
          show: true,
          max: 10,
        }}
        defaultValue="Hello, antd!"
      />
    </div>

    <div>
      <Typography.Title level={5}>Emoji count as length 1</Typography.Title>
      <Input
        count={{
          show: true,
          strategy: (txt) => runes(txt).length,
        }}
        defaultValue="🔥🔥🔥"
      />
    </div>

    <div>
      <Typography.Title level={5}>Not exceed max</Typography.Title>
      <Input
        count={{
          show: true,
          max: 6,
          strategy: (txt) => runes(txt).length,
          exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
        }}
        defaultValue="🔥 antd"
      />
    </div>
  </Flex>
);

export default App;
```

### 自定义状态

使用 `status` 为 Input 添加状态，可选 `error` 或者 `warning`。

```tsx
import React from 'react';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { Input, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical style={{ width: '100%' }}>
    <Input status="error" placeholder="Error" />
    <Input status="warning" placeholder="Warning" />
    <Input status="error" prefix={<ClockCircleOutlined />} placeholder="Error with prefix" />
    <Input status="warning" prefix={<ClockCircleOutlined />} placeholder="Warning with prefix" />
  </Space>
);

export default App;
```

### 聚焦

聚焦额外配置属性。

```tsx
import React, { useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Input, Space, Switch } from 'antd';

const App: React.FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [input, setInput] = useState(true);

  const sharedProps = {
    style: { width: '100%' },
    defaultValue: 'Ant Design love you!',
    ref: inputRef,
  };

  return (
    <Space vertical style={{ width: '100%' }}>
      <Space wrap>
        <Button
          onClick={() => {
            inputRef.current!.focus({
              cursor: 'start',
            });
          }}
        >
          Focus at first
        </Button>
        <Button
          onClick={() => {
            inputRef.current!.focus({
              cursor: 'end',
            });
          }}
        >
          Focus at last
        </Button>
        <Button
          onClick={() => {
            inputRef.current!.focus({
              cursor: 'all',
            });
          }}
        >
          Focus to select all
        </Button>
        <Button
          onClick={() => {
            inputRef.current!.focus({
              preventScroll: true,
            });
          }}
        >
          Focus prevent scroll
        </Button>
        <Switch
          checked={input}
          checkedChildren="Input"
          unCheckedChildren="TextArea"
          onChange={() => {
            setInput(!input);
          }}
        />
      </Space>
      <br />
      {input ? <Input {...sharedProps} /> : <Input.TextArea {...sharedProps} />}
    </Space>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Input 的[语义化结构](#semantic-input)样式。

```tsx
import React from 'react';
import { Flex, Input } from 'antd';
import type { GetProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const styles = createStaticStyles(({ css, cssVar }) => ({
  focusEffect: css`
    border-width: ${cssVar.lineWidth};
    border-radius: ${cssVar.borderRadius};
    transition: box-shadow ${cssVar.motionDurationMid};
    &:hover {
      border: 1px solid #d9d9d9;
    }
    &:focus-visible {
      border-color: lab(66.128% 0 0);
      box-shadow: 0 0 0 4px color-mix(in oklab, lab(66.128% 0 0) 50%, transparent);
    }
  `,
}));

type InputProps = GetProps<typeof Input>;
type PasswordProps = GetProps<typeof Input.Password>;
type TextAreaProps = GetProps<typeof Input.TextArea>;
type OTPProps = GetProps<typeof Input.OTP>;
type SearchProps = GetProps<typeof Input.Search>;

const { Search, TextArea, OTP, Password } = Input;

const stylesFn: InputProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      root: {
        borderColor: '#696FC7',
      },
    } satisfies InputProps['styles'];
  }
  return {};
};

const stylesFnTextArea: TextAreaProps['styles'] = (info) => {
  if (info.props.showCount) {
    return {
      root: { borderColor: '#BDE3C3' },
      textarea: { resize: 'none' },
      count: { color: '#BDE3C3' },
    } satisfies TextAreaProps['styles'];
  }
  return {};
};

const stylesFnPassword: PasswordProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      root: {
        borderColor: '#F5D3C4',
      },
    } satisfies PasswordProps['styles'];
  }
  return {};
};

const stylesFnOTP: OTPProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      input: {
        borderColor: '#6E8CFB',
        width: 32,
      },
    } satisfies OTPProps['styles'];
  }
  return {};
};

const stylesFnSearch: SearchProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: { color: '#4DA8DA' },
      input: { color: '#4DA8DA', borderColor: '#4DA8DA' },
      prefix: { color: '#4DA8DA' },
      suffix: { color: '#4DA8DA' },
      count: { color: '#4DA8DA' },
      button: {
        root: { color: '#4DA8DA', borderColor: '#4DA8DA' },
        icon: { color: '#4DA8DA' },
      },
    } satisfies SearchProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const classNames = styles;
  return (
    <Flex vertical gap="large">
      <Input
        classNames={{ root: classNames.focusEffect }}
        placeholder="Object"
        name="input-object"
      />
      <Input
        classNames={classNames}
        styles={stylesFn}
        placeholder="Function"
        size="middle"
        name="input-fn"
      />
      <TextArea
        classNames={classNames}
        styles={stylesFnTextArea}
        value="TextArea"
        showCount
        name="textarea-fn"
      />
      <Password
        classNames={classNames}
        styles={stylesFnPassword}
        value="Password"
        size="middle"
        name="password-fn"
      />
      <OTP classNames={classNames} styles={stylesFnOTP} size="middle" length={6} separator="*" />
      <Search
        classNames={classNames}
        styles={stylesFnSearch}
        size="large"
        placeholder="Search"
        name="search-fn"
      />
    </Flex>
  );
};

export default App;
```







## API

通用属性参考：[通用属性](/docs/react/common-props)

### Input

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| ~~addonAfter~~ | 带标签的 input，设置后置标签，请使用 Space.Compact 替换 | ReactNode | - |  |
| ~~addonBefore~~ | 带标签的 input，设置前置标签，请使用 Space.Compact 替换 | ReactNode | - |  |
| allowClear | 可以点击清除图标删除内容 | boolean \| { clearIcon: ReactNode } | - |  |
| ~~bordered~~ | 是否有边框, 请使用 `variant` 替换 | boolean | true | 4.5.0 |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-input), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-input), string> | - |  |
| count | 字符计数配置 | [CountConfig](#countconfig) | - | 5.10.0 |
| defaultValue | 输入框默认内容 | string | - |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |  |
| id | 输入框的 id | string | - |  |
| maxLength | 最大长度 | number | - |  |
| prefix | 带有前缀图标的 input | ReactNode | - |  |
| showCount | 是否展示字数 | boolean \| { formatter: (info: { value: string, count: number, maxLength?: number }) => ReactNode } | false | 4.18.0 info.value: 4.23.0 |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-input), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-input), CSSProperties> | - |  |
| size | 控件大小。注：标准表单内的输入框大小限制为 `middle` | `large` \| `middle` \| `small` | - |  |
| suffix | 带有后缀图标的 input | ReactNode | - |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`) | string | `text` |  |
| value | 输入框内容 | string | - |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onChange | 输入框内容变化时的回调 | function(e) | - |  |
| onPressEnter | 按下回车的回调 | function(e) | - |  |
| onClear | 按下清除按钮的回调 | () => void | - | 5.20.0 |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://zh-hans.react.dev/reference/react-dom/components/input) 一致。

#### CountConfig

```tsx
interface CountConfig {
  // 最大字符数，不同于原生 `maxLength`，超出后标红但不会截断
  max?: number;
  // 自定义字符计数，例如标准 emoji 长度大于 1，可以自定义计数策略将其改为 1
  strategy?: (value: string) => number;
  // 同 `showCount`
  show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => ReactNode);
  // 当字符数超出 `count.max` 时的自定义裁剪逻辑，不配置时不进行裁剪
  exceedFormatter?: (value: string, config: { max: number }) => string;
}
```

### Input.TextArea

同 Input 属性，外加：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoSize | 自适应内容高度，可设置为 true \| false 或对象：{ minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-textarea), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-textarea), string> | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-textarea) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-textarea) , CSSProperties> | - |  |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

### Input.Search

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-search), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-search), string> | - |  |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 `addonAfter` 冲突。 | ReactNode | false |  |
| loading | 搜索 loading | boolean | false |  |
| onSearch | 点击搜索图标、清除图标，或按下回车键时的回调 | function(value, event, { source: "input" \| "clear" }) | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-search) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-search) , CSSProperties> | - |  |

其余属性和 Input 一致。

### Input.Password

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 语义化结构 class | Record<[SemanticDOM](#semantic-password), string> | - |  |
| iconRender | 自定义切换按钮 | (visible) => ReactNode | (visible) => (visible ? &lt;EyeOutlined /> : &lt;EyeInvisibleOutlined />) | 4.3.0 |
| styles | 语义化结构 style | Record<[SemanticDOM](#semantic-password), CSSProperties> | - |  |
| visibilityToggle | 是否显示切换按钮或者控制密码显隐 | boolean \| [VisibilityToggle](#visibilitytoggle) | true |  |

### Input.OTP

`5.16.0` 新增。

> 开发者注意事项：
>
> 当 `mask` 属性的类型为 string 时，我们强烈推荐接收单个字符或单个 emoji，如果传入多个字符或多个 emoji，则会在控制台抛出警告。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoComplete | 输入元素的 autocomplete 属性，例如 `one-time-code` 可用于 OTP 自动填充 | string | - | 6.3.0 |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-otp), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-otp), string> | - |  |
| defaultValue | 默认值 | string | - |  |
| disabled | 是否禁用 | boolean | false |  |
| formatter | 格式化展示，留空字段会被 ` ` 填充 | (value: string) => string | - |  |
| separator | 分隔符，在指定索引的输入框后渲染分隔符 | ReactNode \|((i: number) => ReactNode) | - | 5.24.0 |
| mask | 自定义展示，和 `formatter` 的区别是不会修改原始值 | boolean \| string | `false` | `5.17.0` |
| length | 输入元素数量 | number | 6 |  |
| status | 设置校验状态 | 'error' \| 'warning' | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-otp) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-otp) , CSSProperties> | - |  |
| size | 输入框大小 | `small` \| `middle` \| `large` | `middle` |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | `underlined`: 5.24.0 |
| value | 输入框内容 | string | - |  |
| onChange | 当输入框内容全部填充时触发回调 | (value: string) => void | - |  |
| onInput | 输入值变化时触发的回调 | (value: string[]) => void | - | `5.22.0` |

#### VisibilityToggle

| 参数            | 说明                 | 类型              | 默认值 | 版本 |
| --------------- | -------------------- | ----------------- | ------ | ---- |
| visible         | 用于手动控制密码显隐 | boolean           | false  | 4.24 |
| onVisibleChange | 显隐密码的回调       | (visible) => void | -      | 4.24 |

#### Input Methods

| 名称 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| blur | 取消焦点 | - |  |
| focus | 获取焦点 | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | option - 4.10.0 |

## Semantic DOM

### Input {#semantic-input}

https://ant.design/components/input-cn/semantic_input.md

### Input.TextArea {#semantic-textarea}

https://ant.design/components/input-cn/semantic_textarea.md

### Input.Search {#semantic-search}

https://ant.design/components/input-cn/semantic_search.md

### Input.Password {#semantic-password}

https://ant.design/components/input-cn/semantic_password.md

### Input.OTP {#semantic-otp}

https://ant.design/components/input-cn/semantic_otp.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Input)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeBg | 输入框激活状态时背景颜色 | string | #ffffff |
| activeBorderColor | 激活态边框色 | string | #1677ff |
| activeShadow | 激活态阴影 | string | 0 0 0 2px rgba(5,145,255,0.1) |
| addonBg | 前/后置标签背景色 | string | rgba(0,0,0,0.02) |
| errorActiveShadow | 错误状态时激活态阴影 | string | 0 0 0 2px rgba(255,38,5,0.06) |
| hoverBg | 输入框hover状态时背景颜色 | string | #ffffff |
| hoverBorderColor | 悬浮态边框色 | string | #4096ff |
| inputFontSize | 字体大小 | number | 14 |
| inputFontSizeLG | 大号字体大小 | number | 16 |
| inputFontSizeSM | 小号字体大小 | number | 14 |
| paddingBlock | 输入框纵向内边距 | number | 4 |
| paddingBlockLG | 大号输入框纵向内边距 | number | 7 |
| paddingBlockSM | 小号输入框纵向内边距 | number | 0 |
| paddingInline | 输入框横向内边距 | number | 11 |
| paddingInlineLG | 大号输入框横向内边距 | number | 11 |
| paddingInlineSM | 小号输入框横向内边距 | number | 7 |
| warningActiveShadow | 警告状态时激活态阴影 | string | 0 0 0 2px rgba(255,215,5,0.1) |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorErrorBg | 错误色的浅色背景颜色 | string |  |
| colorErrorText | 错误色的文本默认态 | string |  |
| colorFillTertiary | 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorWarning | 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。 | string |  |
| colorWarningBg | 警戒色的浅色背景颜色 | string |  |
| colorWarningText | 警戒色的文本默认态 | string |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlHeightSM | 较小的组件高度 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |



## FAQ

### 为什么我动态改变 `prefix/suffix/showCount` 时，Input 会失去焦点？ {#faq-lose-focus}

当 Input 动态添加或者删除 `prefix/suffix/showCount` 时，React 会重新创建 DOM 结构而新的 input 是没有焦点的。你可以预设一个空的 `<span />` 来保持 DOM 结构不变：

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```

### 为何 TextArea 受控时，`value` 可以超过 `maxLength`？ {#faq-textarea-exceed-max}

受控时，组件应该按照受控内容展示。以防止在表单组件内使用时显示值和提交值不同的问题。
