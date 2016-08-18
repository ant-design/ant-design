---
category: Components
type: Views
title: Card
cols: 1
---

Simple rectangular container

## When to use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

## API

```html
<Card title="Card title">Card content</Card>
```

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| title    | Card title | React.Element   |  -  |
| extra    | Content to render in the top-right corner of the card | React.Element   | - |
| bordered | Toggles rendering of the border around the card | Boolean   |  true  |
| bodyStyle | Inline style to apply to the card content | Object   |  -  |
