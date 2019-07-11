---
category: Components
type: Data Display
title: Card
cols: 1
---

Simple rectangular container.

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## API

```html
<Card title="Card title">Card content</Card>
```

### Card

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | The action list, shows at the bottom of the Card. | Array&lt;ReactNode> | - |  |
| activeTabKey | Current TabPane's key | string | - | 3.3.0 |
| headStyle | Inline style to apply to the card head | object | - | 3.8.0 |
| bodyStyle | Inline style to apply to the card content | object | - |  |
| bordered | Toggles rendering of the border around the card | boolean | `true` |  |
| cover | Card cover | ReactNode | - |  |
| defaultActiveTabKey | Initial active TabPane's key, if `activeTabKey` is not set. | string | - | 3.3.0 |
| extra | Content to render in the top-right corner of the card | string\|ReactNode | - |  |
| hoverable | Lift up when hovering card | boolean | false |  |
| loading | Shows a loading indicator while the contents of the card are being fetched | boolean | false |  |
| tabList | List of TabPane's head. | Array&lt;{key: string, tab: ReactNode}> | - |  |
| size | Size of card | `default` \| `small` | `default` | 3.12.0 |
| title | Card title | string\|ReactNode | - |  |
| type | Card style type, can be set to `inner` or not set | string | - |  |
| onTabChange | Callback when tab is switched | (key) => void | - |  |

### Card.Grid

| Property  | Description               | Type   | Default | Version |
| --------- | ------------------------- | ------ | ------- | ------- |
| className | className of container    | string | -       |         |
| style     | style object of container | object | -       |         |

### Card.Meta

| Property    | Description               | Type      | Default | Version |
| ----------- | ------------------------- | --------- | ------- | ------- |
| avatar      | avatar or icon            | ReactNode | -       |         |
| className   | className of container    | string    | -       |         |
| description | description content       | ReactNode | -       |         |
| style       | style object of container | object    | -       |         |
| title       | title content             | ReactNode | -       |         |
