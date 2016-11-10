---
category: Components
type: Data Display
title: Tag
---

Tag for categorizing or markuping.

## When To Use

- It can be used to tag by dimension or property.

- categorizing

## API

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| color        | The background color of Tag | string | - |
| closable     | Tag can be closed.    | boolean  | false        |
| onClose      | Callback when tag was closed | (e) => void| - |
| afterClose   | Callback when closed animation is complete | () => void | - |
