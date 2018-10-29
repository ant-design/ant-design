---
category: Components
type: Data Display
title: Avatar
---

Avatars can be used to represent people or objects. It supports images, `Icon`s, or letters.

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| icon | Set `Icon` for an icon avatar, see `Icon` Component | ReactNode | - |
| shape | the shape of avatar | `circle` \| `square` | `circle` |
| size | the size of the avatar | number \| string: `large` `small` `default` | `default` |
| src | the address of the image for an image avatar | string | - |
| srcSet | a list of sources to use for different screen resolutions | string | - |
| alt | This attribute defines the alternative text describing the image | string | - |
| onError | handler when img load error, return false to prevent default fallback behavior | () => boolean | - |
