---
category: Components
title: QRCode
cover: https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg
demo:
  cols: 2
group:
  title: Data Display
  order: 5
---

Components that can convert links into QR codes, and support custom color and logo.

<Alert message="If the QR code cannot be scanned for identification, it may be because the link address is too long, which leads to too dense pixels. You can configure the QR code to be larger through `size`, or shorten the link through short link services."></Alert>

## When To Use

Used when the link needs to be converted into a QR Code.

## Examples

<!-- prettier-ignore -->
<code src="./demo/base.tsx">base</code>
<code src="./demo/icon.tsx">With Icon</code>
<code src="./demo/download.tsx">Download QRCode</code>
<code src="./demo/errorlevel.tsx">Error Level</code>

## API

| Property | Description | Type | Default |
| :-- | :-- | :-- | :-- |
| value | scanned link | string | - |
| size | QRCode size | number | 128 |
| icon | include image url (only image link are supported) | string | - |
| iconSize | include image size | number | 32 |
| bgColor | QRCode Background Color | string | `#fff` |
| fgColor | QRCode Foreground Color | string | `#000` |
| errorLevel | Error Code Level | `'L' \| 'M' \| 'Q' \| 'H' ` | `L` |
