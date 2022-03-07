---
category: Components
type: Data Display
title: Segmented
cover: https://gw.alipayobjects.com/zos/alicdn/tX6-md4H6/Affix.svg
---

Segmented Controls.

## When To Use

- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit width to its parent\'s width | boolean | false |  |
| defaultValue | Default selected value | string \| number |  |  |
| disabled | Disable all segments | boolean | false |  |
| onChange | The callback function that is triggered when the state changes | function(e:Event) |  |  |
| options | Set children optional | string\[] \| number\[] \| Array<{ label: string value: string icon? ReactNode disabled?: boolean className?: string }> | [] |  |
| value | Currently selected value | string \| number |  |  |
