---
category: Components
group: Data Display
title: Card
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VXtCTp93KPAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a-8zR6rrupgAAAAAAAAAAAAADrJ8AQ/original
---

Simple rectangular container.

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic card</code>
<code src="./demo/border-less.tsx" background="grey">No border</code>
<code src="./demo/simple.tsx">Simple card</code>
<code src="./demo/flexible-content.tsx">Customized content</code>
<code src="./demo/in-column.tsx" background="grey">Card in column</code>
<code src="./demo/loading.tsx">Loading card</code>
<code src="./demo/grid-card.tsx">Grid card</code>
<code src="./demo/inner.tsx">Inner card</code>
<code src="./demo/tabs.tsx">With tabs</code>
<code src="./demo/meta.tsx">Support more content configuration</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

```jsx
<Card title="Card title">Card content</Card>
```

### Card

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | The action list, shows at the bottom of the Card | Array&lt;ReactNode> | - |  |
| activeTabKey | Current TabPane's key | string | - |  |
| bodyStyle | Inline style to apply to the card content | CSSProperties | - |  |
| bordered | Toggles rendering of the border around the card | boolean | true |  |
| cover | Card cover | ReactNode | - |  |
| defaultActiveTabKey | Initial active TabPane's key, if `activeTabKey` is not set | string | - |  |
| extra | Content to render in the top-right corner of the card | ReactNode | - |  |
| headStyle | Inline style to apply to the card head | CSSProperties | - |  |
| hoverable | Lift up when hovering card | boolean | false |  |
| loading | Shows a loading indicator while the contents of the card are being fetched | boolean | false |  |
| size | Size of card | `default` \| `small` | `default` |  |
| tabBarExtraContent | Extra content in tab bar | ReactNode | - |  |
| tabList | List of TabPane's head | [TabItemType](/components/tabs#tabitemtype)[] | - |  |
| tabProps | [Tabs](/components/tabs/#tabs) | - | - |  |
| title | Card title | ReactNode | - |  |
| type | Card style type, can be set to `inner` or not set | string | - |  |
| onTabChange | Callback when tab is switched | (key) => void | - |  |

### Card.Grid

| Property  | Description                     | Type          | Default | Version |
| --------- | ------------------------------- | ------------- | ------- | ------- |
| className | The className of container      | string        | -       |         |
| hoverable | Lift up when hovering card grid | boolean       | true    |         |
| style     | The style object of container   | CSSProperties | -       |         |

### Card.Meta

| Property    | Description                   | Type          | Default | Version |
| ----------- | ----------------------------- | ------------- | ------- | ------- |
| avatar      | Avatar or icon                | ReactNode     | -       |         |
| className   | The className of container    | string        | -       |         |
| description | Description content           | ReactNode     | -       |         |
| style       | The style object of container | CSSProperties | -       |         |
| title       | Title content                 | ReactNode     | -       |         |

## Design Token

<ComponentTokenTable component="Card"></ComponentTokenTable>
