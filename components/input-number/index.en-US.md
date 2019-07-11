---
category: Components
type: Data Entry
title: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false |  |
| defaultValue | initial value | number |  |  |
| disabled | disable the input | boolean | false |  |
| formatter | Specifies the format of the value presented | function(value: number \| string): string | - |  |
| max | max value | number | Infinity |  |
| min | min value | number | -Infinity |  |
| parser | Specifies the value extracted from formatter | function( string): number | - |  |
| precision | precision of input value | number | - |  |
| decimalSeparator | decimal separator | string | - | 3.10.1 |
| size | height of input box | string | - |  |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal. | number\|string | 1 |  |
| value | current value | number |  |  |
| onChange | The callback triggered when the value is changed. | function(value: number \| string) |  |  |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus |         |
| focus() | get focus    |         |
