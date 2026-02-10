---
category: Components
group: Data Entry
title: Mentions
description: Used to mention someone or something in an input.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e4bXT7Uhi9YAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*pxR2S53P_xoAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

When you need to mention someone or something.

## Examples

### Basic

Basic usage.

```tsx
import React from 'react';
import { Mentions } from 'antd';
import type { GetProp, MentionProps } from 'antd';

type MentionsOptionProps = GetProp<MentionProps, 'options'>[number];

const onChange = (value: string) => {
  console.log('Change:', value);
};

const onSelect = (option: MentionsOptionProps) => {
  console.log('select', option);
};

const App: React.FC = () => (
  <Mentions
    style={{ width: '100%' }}
    onChange={onChange}
    onSelect={onSelect}
    defaultValue="@afc163"
    options={[
      {
        value: 'afc163',
        label: 'afc163',
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
      {
        value: 'yesmeck',
        label: 'yesmeck',
      },
    ]}
  />
);

export default App;
```

### Size

Configure size via `size` property.

```tsx
import React from 'react';
import { Flex, Mentions } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Mentions size="large" placeholder="large size" />
    <Mentions placeholder="default size" />
    <Mentions size="small" placeholder="small size" />
  </Flex>
);

export default App;
```

### Variants

Variants of Mentions, there are four variants: `outlined` `filled` `borderless` and `underlined`.

```tsx
import React from 'react';
import { Flex, Mentions } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Mentions placeholder="Outlined" />
    <Mentions placeholder="Filled" variant="filled" />
    <Mentions placeholder="Borderless" variant="borderless" />
    <Mentions placeholder="Underlined" variant="underlined" />
  </Flex>
);

export default App;
```

### Asynchronous loading

async.

<style>
.antd-demo-dynamic-option img {
  width: 20px;
  height: 20px;
  margin-inline-end: 8px;
}
</style>

```tsx
import React, { useCallback, useRef, useState } from 'react';
import { Mentions } from 'antd';
import debounce from 'lodash/debounce';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<{ login: string; avatar_url: string }[]>([]);
  const ref = useRef<string>(null);

  const loadGithubUsers = (key: string) => {
    if (!key) {
      setUsers([]);
      return;
    }

    fetch(`https://api.github.com/search/users?q=${key}`)
      .then((res) => res.json())
      .then(({ items = [] }) => {
        if (ref.current !== key) {
          return;
        }
        setLoading(false);
        setUsers(items.slice(0, 10));
      });
  };

  const debounceLoadGithubUsers = useCallback(debounce(loadGithubUsers, 800), []);

  const onSearch = (search: string) => {
    console.log('Search:', search);
    ref.current = search;
    setLoading(!!search);
    setUsers([]);

    debounceLoadGithubUsers(search);
  };

  return (
    <Mentions
      style={{ width: '100%' }}
      loading={loading}
      onSearch={onSearch}
      options={users.map(({ login, avatar_url: avatar }) => ({
        key: login,
        value: login,
        className: 'antd-demo-dynamic-option',
        label: (
          <>
            <img draggable={false} src={avatar} alt={login} />
            <span>{login}</span>
          </>
        ),
      }))}
    />
  );
};

export default App;
```

### With Form

Controlled mode, for example, to work with `Form`.

```tsx
import React from 'react';
import { Button, Form, Mentions, Space } from 'antd';

const { getMentions } = Mentions;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Submit:', values);
    } catch (errInfo) {
      console.log('Error:', errInfo);
    }
  };

  const checkMention = async (_: any, value: string) => {
    const mentions = getMentions(value);

    if (mentions.length < 2) {
      throw new Error('More than one must be selected!');
    }
  };

  return (
    <Form form={form} layout="horizontal" onFinish={onFinish} {...formItemLayout}>
      <Form.Item name="coders" label="Top coders" rules={[{ validator: checkMention }]}>
        <Mentions
          rows={1}
          options={[
            {
              value: 'afc163',
              label: 'afc163',
            },
            {
              value: 'zombieJ',
              label: 'zombieJ',
            },
            {
              value: 'yesmeck',
              label: 'yesmeck',
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="bio" label="Bio" rules={[{ required: true }]}>
        <Mentions
          rows={3}
          placeholder="You can use @ to ref user here"
          options={[
            {
              value: 'afc163',
              label: 'afc163',
            },
            {
              value: 'zombieJ',
              label: 'zombieJ',
            },
            {
              value: 'yesmeck',
              label: 'yesmeck',
            },
          ]}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Space wrap>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
```

### Customize Trigger Token

Customize Trigger Token by `prefix` props. Default to `@`, `Array<string>` also supported.

```tsx
import React, { useState } from 'react';
import { Mentions } from 'antd';
import type { MentionsProps } from 'antd';

const MOCK_DATA = {
  '@': ['afc163', 'zombiej', 'yesmeck'],
  '#': ['1.0', '2.0', '3.0'],
};

type PrefixType = keyof typeof MOCK_DATA;

const App: React.FC = () => {
  const [prefix, setPrefix] = useState<PrefixType>('@');

  const onSearch: MentionsProps['onSearch'] = (_, newPrefix) => {
    setPrefix(newPrefix as PrefixType);
  };

  return (
    <Mentions
      style={{ width: '100%' }}
      placeholder="input @ to mention people, # to mention tag"
      prefix={['@', '#']}
      onSearch={onSearch}
      options={(MOCK_DATA[prefix] || []).map((value) => ({
        key: value,
        value,
        label: value,
      }))}
    />
  );
};

export default App;
```

### disabled or readOnly

Configure `disabled` and `readOnly`.

```tsx
import React from 'react';
import { Mentions } from 'antd';

const options = ['afc163', 'zombiej', 'yesmeck'].map((value) => ({
  value,
  key: value,
  label: value,
}));

const App: React.FC = () => (
  <>
    <div style={{ marginBottom: 10 }}>
      <Mentions
        style={{ width: '100%' }}
        placeholder="this is disabled Mentions"
        disabled
        options={options}
      />
    </div>
    <Mentions
      style={{ width: '100%' }}
      placeholder="this is readOnly Mentions"
      readOnly
      options={options}
    />
  </>
);

export default App;
```

### Placement

Change the suggestions placement.

```tsx
import React from 'react';
import { Mentions } from 'antd';

const App: React.FC = () => (
  <Mentions
    style={{ width: '100%' }}
    placement="top"
    options={[
      {
        value: 'afc163',
        label: 'afc163',
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
      {
        value: 'yesmeck',
        label: 'yesmeck',
      },
    ]}
  />
);

export default App;
```

### With clear icon

Customize clear button.

```tsx
import React, { useState } from 'react';
import { CloseSquareFilled } from '@ant-design/icons';
import { Mentions } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState('hello world');
  return (
    <>
      <Mentions value={value} onChange={setValue} allowClear />
      <br />
      <br />
      <Mentions
        value={value}
        onChange={setValue}
        allowClear={{ clearIcon: <CloseSquareFilled /> }}
      />
      <br />
      <br />
      <Mentions value={value} onChange={setValue} allowClear rows={3} />
    </>
  );
};

export default App;
```

### autoSize

Height autoSize.

```tsx
import React from 'react';
import { Mentions } from 'antd';

const App: React.FC = () => (
  <Mentions
    autoSize
    style={{ width: '100%' }}
    options={[
      {
        value: 'afc163',
        label: 'afc163',
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
      {
        value: 'yesmeck',
        label: 'yesmeck',
      },
    ]}
  />
);

export default App;
```


### Status

Add status to Mentions with `status`, which could be `error` or `warning`.

```tsx
import React from 'react';
import { Mentions, Space } from 'antd';
import type { GetProp, MentionProps } from 'antd';

type MentionsOptionProps = GetProp<MentionProps, 'options'>[number];

const onChange = (value: string) => {
  console.log('Change:', value);
};

const onSelect = (option: MentionsOptionProps) => {
  console.log('select', option);
};

const App: React.FC = () => {
  const options = [
    {
      value: 'afc163',
      label: 'afc163',
    },
    {
      value: 'zombieJ',
      label: 'zombieJ',
    },
    {
      value: 'yesmeck',
      label: 'yesmeck',
    },
  ];

  return (
    <Space vertical>
      <Mentions
        onChange={onChange}
        onSelect={onSelect}
        defaultValue="@afc163"
        status="error"
        options={options}
      />
      <Mentions
        onChange={onChange}
        onSelect={onSelect}
        defaultValue="@afc163"
        status="warning"
        options={options}
      />
    </Space>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Mentions by passing objects/functions through `classNames` and `styles`. For example, set the textarea to be resizable.

```tsx
import React from 'react';
import { Flex, Mentions } from 'antd';
import type { MentionsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: 8,
    width: 300,
  },
}));

const options: MentionsProps['options'] = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
  { value: 'meet-student', label: 'meet-student' },
  { value: 'thinkasany', label: 'thinkasany' },
];

const stylesObject: MentionsProps['styles'] = {
  textarea: {
    fontSize: 14,
    resize: 'vertical',
    fontWeight: 200,
  },
};

const stylesFunction: MentionsProps['styles'] = (info) => {
  if (info.props.variant === 'filled') {
    return {
      root: {
        border: '1px solid #722ed1',
      },
      popup: {
        border: '1px solid #722ed1',
      },
    } satisfies MentionsProps['styles'];
  }
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const sharedProps: MentionsProps = {
    options,
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Mentions {...sharedProps} styles={stylesObject} placeholder="Object" rows={2} />
      <Mentions {...sharedProps} styles={stylesFunction} variant="filled" placeholder="Function" />
    </Flex>
  );
};

export default App;
```




## API

Common props ref：[Common props](/docs/react/common-props)

### Mention

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | If allow to remove mentions content with clear icon | boolean \| { clearIcon?: ReactNode } | false | 5.13.0 |
| autoSize | Textarea height autosize feature, can be set to true \| false or an object { minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultValue | Default value | string | - |  |
| filterOption | Customize filter option logic | false \| (input: string, option: OptionProps) => boolean | - |  |
| getPopupContainer | Set the mount HTML node for suggestions | () => HTMLElement | - |  |
| notFoundContent | Set mentions content when not match | ReactNode | `Not Found` |  |
| placement | Set popup placement | `top` \| `bottom` | `bottom` |  |
| prefix | Set trigger prefix keyword | string \| string\[] | `@` |  |
| split | Set split string before and after selected mention | string | ` ` |  |
| status | Set validation status | 'error' \| 'warning' \| 'success' \| 'validating' | - | 4.19.0 |
| validateSearch | Customize trigger search logic | (text: string, props: MentionsProps) => void | - |  |
| value | Set value of mentions | string | - |  |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onBlur | Trigger when mentions lose focus | () => void | - |  |
| onChange | Trigger when value changed | (text: string) => void | - |  |
| onClear | Callback when click the clear button | () => void | - | 5.20.0 |
| onFocus | Trigger when mentions get focus | () => void | - |  |
| onResize | The callback function that is triggered when textarea resize | function({ width, height }) | - |  |
| onSearch | Trigger when prefix hit | (text: string, prefix: string) => void | - |  |
| onSelect | Trigger when user select the option | (option: OptionProps, prefix: string) => void | - |  |
| onPopupScroll | Trigger when mentions scroll | (e: Event) => void | - | 5.23.0 |
| options | Option Configuration | [Options](#option) | \[] | 5.1.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

### Mention methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

### Option

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| label | Title of the option | React.ReactNode | - |
| key | The key value of the option | string | - |
| disabled | Optional | boolean | - |
| className | className | string | - |
| style | The style of the option | React.CSSProperties | - |

## Semantic DOM

https://ant.design/components/mentions/semantic.md

## Design Token



## Component Token (Mentions)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| activeBg | Background color when the input box is activated | string | #ffffff |
| activeBorderColor | Active border color | string | #1677ff |
| activeShadow | Box-shadow when active | string | 0 0 0 2px rgba(5,145,255,0.1) |
| addonBg | Background color of addon | string | rgba(0,0,0,0.02) |
| controlItemWidth | Height of menu item | string \| number | 100 |
| dropdownHeight | Height of popup | string \| number | 250 |
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
| zIndexPopup | z-index of popup | number | 1050 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| boxShadowSecondary | Control the secondary box shadow style of an element. | string |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBgHover | The hover state background color of the error state. | string |  |
| colorErrorBorderHover | The hover state border color of the error state. | string |  |
| colorErrorText | The default state of the text in the error color. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextPlaceholder | Control the color of placeholder text. | string |  |
| colorTextQuaternary | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| colorWarningBg | The background color of the warning state. | string |  |
| colorWarningBgHover | The hover state background color of the warning state. | string |  |
| colorWarningBorderHover | The hover state border color of the warning state. | string |  |
| colorWarningText | The default state of the text in the warning color. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlItemBgHover | Control the background color of control component item when hovering. | string |  |
| controlPaddingHorizontal | Control the horizontal padding of an element. | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


