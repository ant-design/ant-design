---
type: Feedback
category: Components
title: Result
cols: 1
subtitle:
---

Used to feed back the results of a series of operational tasks.

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| title | title string | ReactNode | - | 3.20.0 |
| subTitle | subTitle string | ReactNode | - | 3.20.0 |
| status | result status,decide icons and colors | `'success' | 'error' | 'info' | 'warning'| '404' | '403' | '500'` | 'info' | 3.20.0 |
| icon | custom back icon | string \| ReactNode | - | 3.20.0 |
| extra | operating area | ReactNode | - | 3.20.0 |
