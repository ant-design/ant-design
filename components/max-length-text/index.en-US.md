---
category: Components
type: Other
title: Max Length Text
cols: 2
cover: https://allenai.org/favicon.ico
---

A custom component for rendering text with a configurable limit. The
text is broken in a fashion that avoids breaking mid-word, and controls are provided to
the user that allow them to show more or less text.

## When To Use

When there is too much text for the given area and/or the text is possibly large and comes
from a datasource.

## API

| Property      | Description                                   | Type    | Default |
| ------------- | --------------------------------------------- | ------- | ------- |
| expanded      | sets control to be initially expanded         | boolean | false   |
| maxLength     | sets character limit to truncation            | number  | 60      |
| showMoreText  | text to display on the expand button          | string  | 'more'  |
| showLessText  | text to show on the contract button           | string  | 'less'  |
