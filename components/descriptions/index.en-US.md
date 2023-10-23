---
category: Components
group: Data Display
title: Descriptions
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*fHdlTpif6XQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*d27AQJrowGAAAAAAAAAAAAAADrJ8AQ/original
---

Display multiple read-only fields in groups.

## When To Use

Commonly displayed on the details page.

```tsx | pure
// works when >= 5.8.0, recommended ✅

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: 'Address',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];

<Descriptions title="User Info" items={items} />;

// works when <5.8.0 , deprecated when >=5.8.0 🙅🏻‍♀️

<Descriptions title="User Info">
  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
  <Descriptions.Item label="Remark">empty</Descriptions.Item>
  <Descriptions.Item label="Address">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </Descriptions.Item>
</Descriptions>;
```

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/border.tsx">border</code>
<code src="./demo/text.tsx" debug>border</code>
<code src="./demo/size.tsx">Custom size</code>
<code src="./demo/responsive.tsx">responsive</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/vertical-border.tsx">Vertical border</code>
<code src="./demo/style.tsx" debug>Customize label & wrapper style</code>
<code src="./demo/jsx.tsx" debug>JSX demo</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Descriptions

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to display the border | boolean | false |  |
| colon | Change default props `colon` value of Descriptions.Item | boolean | true |  |
| column | The number of `DescriptionItems` in a row,could be a number or a object like `{ xs: 8, sm: 16, md: 24}`,(Only set `bordered={true}` to take effect) | number \| [Record<Breakpoint, number>](https://github.com/ant-design/ant-design/blob/84ca0d23ae52e4f0940f20b0e22eabe743f90dca/components/descriptions/index.tsx#L111C21-L111C56) | 3 |  |
| contentStyle | Customize content style | CSSProperties | - | 4.10.0 |
| extra | The action area of the description list, placed at the top-right | ReactNode | - | 4.5.0 |
| items | Describe the contents of the list item | [DescriptionsItem](#descriptionitem)[] | - | 5.8.0 |
| labelStyle | Customize label style | CSSProperties | - | 4.10.0 |
| layout | Define description layout | `horizontal` \| `vertical` | `horizontal` |  |
| size | Set the size of the list. Can be set to `middle`,`small`, or not filled | `default` \| `middle` \| `small` | - |  |
| title | The title of the description list, placed at the top | ReactNode | - |  |

### DescriptionItem

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| contentStyle | Customize content style | CSSProperties | - | 4.9.0 |
| label | The description of the content | ReactNode | - |  |
| labelStyle | Customize label style | CSSProperties | - | 4.9.0 |
| span | The number of columns included | number \| [Screens](/components/grid#col) | 1 | `screens: 5.9.0` |

> The number of span Description.Item. Span={2} takes up the width of two DescriptionItems. When both `style` and `labelStyle`(or `contentStyle`) configured, both of them will work. And next one will overwrite first when conflict.

## Design Token

<ComponentTokenTable component="Descriptions"></ComponentTokenTable>
