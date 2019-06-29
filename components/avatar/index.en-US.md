---
category: Components
type: Data Display
title: Avatar
---

Avatars can be used to represent people or objects. It supports images, `Icon`s, or letters.

## API

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| icon | the `Icon` type for an icon avatar, see `Icon` Component | string | - | 3.0.0 |
| shape | the shape of avatar | `circle` \| `square` | `circle` | 3.0.0 |
| size | the size of the avatar | number \| string: `large` `small` `default` | `default` | 3.0.0 |
| src | the address of the image for an image avatar | string | - | 3.0.0 |
| srcSet | a list of sources to use for different screen resolutions | string | - | 3.11.0 |
| alt | This attribute defines the alternative text describing the image | string | - | 3.7.0 |
| onError | handler when img load error, return false to prevent default fallback behavior | () => boolean | - | 3.8.0 |
