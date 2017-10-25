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

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| bodyStyle | Inline style to apply to the card content | object | - |
| bordered | Toggles rendering of the border around the card | boolean | `true` |
| extra | Content to render in the top-right corner of the card | string\|ReactNode | - |
| loading | Shows a loading indicator while the contents of the card are being fetched | boolean | `false` |
| noHovering | Whether to disable hover effect on mouse over | boolean | `false` |
| title | Card title | string\|ReactNode | - |

### Card.Grid

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| className | className of container | string | - |
| style | style object of container | object | - |
