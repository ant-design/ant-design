---
category: Components
group: Data Entry
title: Input
description: Through mouse or keyboard input content, it is the most basic form field wrapper.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y3R0RowXHlAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sBqqTatJ-AkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- A user input in a form field is needed.
- A search input is required.

## Examples

### Basic usage

Basic usage example.

```tsx
import React from 'react';
import { Input } from 'antd';

const App: React.FC = () => <Input placeholder="Basic usage" />;

export default App;
```

### Three sizes of Input

There are three sizes of an Input box: `large` (40px), `default` (32px) and `small` (24px).

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

### Variants

Variants of Input, there are four variants: `outlined` `filled` `borderless` and `underlined`.

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



### Compact Style

Use Space.Compact create compact style, See the [Space.Compact](/components/space#spacecompact) documentation for more.

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


### Search box

Example of creating a search box by grouping a standard input with a search button.

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

### Search box with loading

Search loading when onSearch.

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

### TextArea

For multi-line input.

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

### Autosizing the height to fit the content

`autoSize` prop for a `textarea` type of `Input` makes the height to automatically adjust based on the content. An option object can be provided to `autoSize` to specify the minimum and maximum number of lines the textarea will automatically adjust.

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

### OTP

One time password input.

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

### Format Tooltip Input

You can use the Input in conjunction with [Tooltip](/components/tooltip) component to create a Numeric Input, which can provide a good experience for extra-long content display.

```css
/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
.numeric-input .ant-tooltip-container {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input .numeric-input-title {
  font-size: 14px;
}
```

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

### prefix and suffix

Add a prefix or suffix icons inside input. Note: The `suffix` prop for Input.Password is supported starting from version `5.27.0`.

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

### Password box

Input type of password.

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

### With clear icon

Input box with the remove icon, click the icon to delete everything.

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

### With character counting

Show character counting.

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

### = 5.10.0">Custom count logic

It is necessary to customize the counting ability in some scenarios (such as emoji length is counted as 1), which can be achieved through the `count` attribute. Use `count.max` attribute exceeds the limit of the native `maxLength`.

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

### Status

Add status to Input with `status`, which could be `error` or `warning`.

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

### Focus

Focus with additional option.

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-input) style of Input by passing objects/functions through `classNames` and `styles`.

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

Common props ref：[Common props](/docs/react/common-props)

### Input

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| ~~addonAfter~~ | The label text displayed after (on the right side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| ~~addonBefore~~ | The label text displayed before (on the left side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| allowClear | If allow to remove input content with clear icon | boolean \| { clearIcon: ReactNode } | false |  |
| ~~bordered~~ | Whether has border style, please use `variant` instead | boolean | true | 4.5.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-input), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-input), string> | - |  |
| count | Character count config | [CountConfig](#countconfig) | - | 5.10.0 |
| defaultValue | The initial input content | string | - |  |
| disabled | Whether the input is disabled | boolean | false |  |
| id | The ID for input | string | - |  |
| maxLength | The maximum number of characters in Input | number | - |  |
| prefix | The prefix icon for the Input | ReactNode | - |  |
| showCount | Whether to show character count | boolean \| { formatter: (info: { value: string, count: number, maxLength?: number }) => ReactNode } | false | 4.18.0 info.value: 4.23.0 |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-input), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-input), CSSProperties> | - |  |
| size | The size of the input box. Note: in the context of a form, the `middle` size is used | `large` \| `middle` \| `small` | - |  |
| suffix | The suffix icon for the Input | ReactNode | - |  |
| type | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)( use `Input.TextArea` instead of `type="textarea"`) | string | `text` |  |
| value | The input content value | string | - |  |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onChange | Callback when user input | function(e) | - |  |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - |  |
| onClear | Callback when click the clear button | () => void | - | 5.20.0 |

> When `Input` is used in a `Form.Item` context, if the `Form.Item` has the `id` props defined then `value`, `defaultValue`, and `id` props of `Input` are automatically set.

The rest of the props of Input are exactly the same as the original [input](https://react.dev/reference/react-dom/components/input).

#### CountConfig

```tsx
interface CountConfig {
  // Max character count. Different from the native `maxLength`, it will be marked warning but not truncated
  max?: number;
  // Custom character count, for example, the standard emoji length is greater than 1, you can customize the counting strategy to change it to 1
  strategy?: (value: string) => number;
  // Same as `showCount`
  show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => ReactNode);
  // Custom clipping logic when the number of characters exceeds `count.max`, no clipping when not configured
  exceedFormatter?: (value: string, config: { max: number }) => string;
}
```

### Input.TextArea

Same as Input, and more:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoSize | Height auto size feature, can be set to true \| false or an object { minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-textarea), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-textarea), string> | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-textarea), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-textarea), CSSProperties> | - |  |

The rest of the props of `Input.TextArea` are the same as the original [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

### Input.Search

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-search), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-search), string> | - |  |
| enterButton | false displays the default button color, true uses the primary color, or you can provide a custom button. Conflicts with addonAfter. | ReactNode | false |  |
| loading | Search box with loading | boolean | false |  |
| onSearch | The callback function triggered when you click on the search-icon, the clear-icon or press the Enter key | function(value, event, { source: "input" \| "clear" }) | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-search), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-search), CSSProperties> | - |  |

Supports all props of `Input`.

### Input.Password

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Semantic DOM class | Record<[SemanticDOM](#semantic-password), string> | - |  |
| iconRender | Custom toggle button | (visible) => ReactNode | (visible) => (visible ? &lt;EyeOutlined /> : &lt;EyeInvisibleOutlined />) | 4.3.0 |
| styles | Semantic DOM style | Record<[SemanticDOM](#semantic-password), CSSProperties> | - |  |
| visibilityToggle | Whether show toggle button or control password visible | boolean \| [VisibilityToggle](#visibilitytoggle) | true |  |

### Input.OTP

Added in `5.16.0`.

> Notes for developers
>
> When the `mask` prop is string, we recommend receiving a single character or a single emoji. If multiple characters or multiple emoji are passed, a warning will be thrown.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoComplete | The autocomplete attribute for input elements, e.g. `one-time-code` for OTP autofill | string | - | 6.3.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-otp), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-otp), string> | - |  |
| defaultValue | Default value | string | - |  |
| disabled | Whether the input is disabled | boolean | false |  |
| formatter | Format display, blank fields will be filled with ` ` | (value: string) => string | - |  |
| separator | render the separator after the input box of the specified index | ReactNode \|((i: number) => ReactNode) | - | 5.24.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-otp), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-otp), CSSProperties> | - |  |
| mask | Custom display, the original value will not be modified | boolean \| string | `false` | `5.17.0` |
| length | The number of input elements | number | 6 |  |
| status | Set validation status | 'error' \| 'warning' | - |  |
| size | The size of the input box | `small` \| `middle` \| `large` | `middle` |  |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | `underlined`: 5.24.0 |
| value | The input content value | string | - |  |
| onChange | Trigger when all the fields are filled | (value: string) => void | - |  |
| onInput | Trigger when the input value changes | (value: string[]) => void | - | `5.22.0` |

#### VisibilityToggle

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| visible | Whether the password is show or hide | boolean | false | 4.24.0 |
| onVisibleChange | Callback executed when visibility of the password is changed | (visible) => void | - | 4.24.0 |

#### Input Methods

| Name | Description | Parameters | Version |
| --- | --- | --- | --- |
| blur | Remove focus | - |  |
| focus | Get focus | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | option - 4.10.0 |

## Semantic DOM

### Input {#semantic-input}

https://ant.design/components/input/semantic_input.md

### Input.TextArea {#semantic-textarea}

https://ant.design/components/input/semantic_textarea.md

### Input.Search {#semantic-search}

https://ant.design/components/input/semantic_search.md

### Input.Password {#semantic-password}

https://ant.design/components/input/semantic_password.md

### Input.OTP {#semantic-otp}

https://ant.design/components/input/semantic_otp.md

## Design Token



## Component Token (Input)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| activeBg | Background color when the input box is activated | string | #ffffff |
| activeBorderColor | Active border color | string | #1677ff |
| activeShadow | Box-shadow when active | string | 0 0 0 2px rgba(5,145,255,0.1) |
| addonBg | Background color of addon | string | rgba(0,0,0,0.02) |
| errorActiveShadow | Box-shadow when active in error status | string | 0 0 0 2px rgba(255,38,5,0.06) |
| hoverBg | Background color when the input box hovers | string | #ffffff |
| hoverBorderColor | Hover border color | string | #4096ff |
| inputFontSize | Font size | number | 14 |
| inputFontSizeLG | Font size of large | number | 16 |
| inputFontSizeSM | Font size of small | number | 14 |
| paddingBlock | Vertical padding of input | number | 4 |
| paddingBlockLG | Vertical padding of large input | number | 7 |
| paddingBlockSM | Vertical padding of small input | number | 0 |
| paddingInline | Horizontal padding of input | number | 11 |
| paddingInlineLG | Horizontal padding of large input | number | 11 |
| paddingInlineSM | Horizontal padding of small input | number | 7 |
| warningActiveShadow | Box-shadow when active in warning status | string | 0 0 0 2px rgba(255,215,5,0.1) |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorText | The default state of the text in the error color. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| colorWarningBg | The background color of the warning state. | string |  |
| colorWarningText | The default state of the text in the warning color. | string |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |



## FAQ

### Why Input loses focus when change `prefix/suffix/showCount` {#faq-lose-focus}

When Input dynamic add or remove `prefix/suffix/showCount` will make React recreate the dom structure and new input will be not focused. You can set an empty `<span />` element to keep the dom structure:

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```

### Why TextArea in control can make `value` exceed `maxLength`? {#faq-textarea-exceed-max}

When in control, component should show as what it set to avoid submit value not align with store value in Form.
