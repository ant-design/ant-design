---
category: Components
type: Data Display
title: Tag
cover: https://gw.alipayobjects.com/zos/alicdn/cH1BOLfxC/Tag.svg
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## API

### Tag

| Property  | Description                          | Type        | Default | Version |
| --------- | ------------------------------------ | ----------- | ------- | ------- |
| closable  | Whether the Tag can be closed        | boolean     | false   |         |
| color     | Color of the Tag                     | string      | -       |         |
| closeIcon | Custom close icon                    | ReactNode   | -       | 4.4.0   |
| onClose   | Callback executed when tag is closed | (e) => void | -       |         |
| visible   | Whether the Tag is closed or not     | boolean     | true    |         |
| icon      | Set the icon of tag                  | ReactNode   | -       |         |

### Tag.CheckableTag

| Property | Description                                     | Type              | Default |
| -------- | ----------------------------------------------- | ----------------- | ------- |
| checked  | Checked status of Tag                           | boolean           | false   |
| onChange | Callback executed when Tag is checked/unchecked | (checked) => void | -       |
