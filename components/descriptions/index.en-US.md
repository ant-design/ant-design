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
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

### Descriptions

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to display the border | boolean | false |  |
| colon | Change default props `colon` value of Descriptions.Item | boolean | true |  |
| column | The number of `DescriptionItems` in a row,could be a number or a object like `{ xs: 8, sm: 16, md: 24}`,(Only set `bordered={true}` to take effect) | number | 3 |  |
| contentStyle | Customize content style | CSSProperties | - | 4.10.0 |
| extra | The action area of the description list, placed at the top-right | ReactNode | - | 4.5.0 |
| labelStyle | Customize label style | CSSProperties | - | 4.10.0 |
| layout | Define description layout | `horizontal` \| `vertical` | `horizontal` |  |
| size | Set the size of the list. Can be set to `middle`,`small`, or not filled | `default` \| `middle` \| `small` | - |  |
| title | The title of the description list, placed at the top | ReactNode | - |  |

### DescriptionItem

| Property     | Description                    | Type          | Default | Version |
| ------------ | ------------------------------ | ------------- | ------- | ------- |
| contentStyle | Customize content style        | CSSProperties | -       | 4.9.0   |
| label        | The description of the content | ReactNode     | -       |         |
| labelStyle   | Customize label style          | CSSProperties | -       | 4.9.0   |
| span         | The number of columns included | number        | 1       |         |

> The number of span Description.Item. Span={2} takes up the width of two DescriptionItems. When both `style` and `labelStyle`(or `contentStyle`) configured, both of them will work. And next one will overwrite first when conflict.

## Design Token

<ComponentTokenTable component="Descriptions"></ComponentTokenTable>
