---
category: Components
type: Data Display
title: Card
cols: 1
---

Simple rectangular container

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

## API

```html
<Card title="Card title">Card content</Card>
```

### Card

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| title    | Card title | string\|ReactNode   |  -  |
| extra    | Content to render in the top-right corner of the card | string\|ReactNode   | - |
| bordered | Toggles rendering of the border around the card | boolean   |  true  |
| bodyStyle | Inline style to apply to the card content | object   |  -  |
| noHovering | Whether to be disable hovering when mouse over | boolean | false |
| loading | Shows a loading indicator while the contents of the card are being fetched | boolean   |  false  |
| type | Card style type, can be set to `inner` or not set | string   |  -  |
| cover | Card cover | ReactNode   |  -  |
| actions | The action list, shows at the bottom of the Card. | Array<ReactNode>   |  -  |
| avatar | Avatar or Icon, available only in the [built-in mode](/components/card/#components-card-demo-built-in). | ReactNode |  -  |
| description | Description content, available only in the [built-in mode](/components/card/#components-card-demo-built-in). | ReactNode   |  -  |
| extraContent | Extra content, available only in the [built-in mode](/components/card/#components-card-demo-built-in). | ReactNode   |  -  |

> Note: When the Card component does not contain any child elements, it automatically turns into the built-in mode.

### Card.Grid

Property | Description | Type | Default
---------|-------------|------|---------
className | className of container | string | -
style | style object of container | object | -
