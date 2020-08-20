---
category: Components
type: Data Display
title: Image
cols: 2
---

Previewable image.

## When To Use

- Need preview.
- Large image need display loading or load failure fault tolerance.

## API

| Property       | Description                     | Type        | Default | Version |
| -------------- | ------------------------------- | ----------- | ------- | ------- |
| fallback       | Load failure fault-tolerant src | string      | -       | 4.6.0   |
| onPreviewClose | Preview close callback          | function(e) | -       | 4.6.0   |
| placeholder    | Load placeholder                | ReactNode   | -       | 4.6.0   |
| preview        | Whether to enable the preview   | boolean     | true    | 4.6.0   |
