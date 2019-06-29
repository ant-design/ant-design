---
category: Components
type: Data Entry
title: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

## API

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| defaultValue | initial value | number |  | 3.0.0 |
| disabled | disable the input | boolean | false | 3.0.0 |
| formatter | Specifies the format of the value presented | function(value: number \| string): string | - | 3.0.0 |
| max | max value | number | Infinity | 3.0.0 |
| min | min value | number | -Infinity | 3.0.0 |
| parser | Specifies the value extracted from formatter | function( string): number | - | 3.0.0 |
| precision | precision of input value | number | - | 3.0.0 |
| decimalSeparator | decimal separator | string | - | 3.10.1 |
| size | height of input box | string | - | 3.0.0 |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal. | number\|string | 1 | 3.0.0 |
| value | current value | number |  | 3.0.0 |
| onChange | The callback triggered when the value is changed. | function(value: number \| string) |  | 3.0.0 |

## Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |
