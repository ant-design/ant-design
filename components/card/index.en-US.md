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

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| actions | The action list, shows at the bottom of the Card. | Array&lt;ReactNode> | - | 3.0.0 |
| activeTabKey | Current TabPane's key | string | - | 3.3.0 |
| headStyle | Inline style to apply to the card head | object | - | 3.8.0 |
| bodyStyle | Inline style to apply to the card content | object | - | 3.0.0 |
| bordered | Toggles rendering of the border around the card | boolean | `true` | 3.0.0 |
| cover | Card cover | ReactNode | - | 3.0.0 |
| defaultActiveTabKey | Initial active TabPane's key, if `activeTabKey` is not set. | string | - | 3.3.0 |
| extra | Content to render in the top-right corner of the card | string\|ReactNode | - | 3.0.0 |
| hoverable | Lift up when hovering card | boolean | false | 3.0.0 |
| loading | Shows a loading indicator while the contents of the card are being fetched | boolean | false | 3.0.0 |
| tabList | List of TabPane's head. | Array&lt;{key: string, tab: ReactNode}> | - | 3.0.0 |
| size | Size of card | `default` \| `small` | `default` | 3.12.0 |
| title | Card title | string\|ReactNode | - | 3.0.0 |
| type | Card style type, can be set to `inner` or not set | string | - | 3.0.0 |
| onTabChange | Callback when tab is switched | (key) => void | - | 3.0.0 |

### Card.Grid

| Property  | Description               | Type   | Default | Version Added |
| --------- | ------------------------- | ------ | ------- | ------------- |
| className | className of container    | string | -       | 3.0.0         |
| style     | style object of container | object | -       | 3.0.0         |

### Card.Meta

| Property    | Description               | Type      | Default | Version Added |
| ----------- | ------------------------- | --------- | ------- | ------------- |
| avatar      | avatar or icon            | ReactNode | -       | 3.0.0         |
| className   | className of container    | string    | -       | 3.0.0         |
| description | description content       | ReactNode | -       | 3.0.0         |
| style       | style object of container | object    | -       | 3.0.0         |
| title       | title content             | ReactNode | -       | 3.0.0         |
