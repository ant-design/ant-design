---
category: Components
type: Feedback
title: Spin
---

A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## API

Property | Description | Type | Default Value
---------|-------------|------|--------------
size | size of spin, available in `small`, `default` and `large` | string | 'default'
spinning | whether Spin is spinning | boolean | true
tip | customize description content when spin has children | string | -
delay | specifies a delay millisecond for loading state (prevent flush) | number (millisecond) | -
wrapperClassName | className of wrapper when Spin has children | string | -
