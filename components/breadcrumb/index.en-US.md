---
category: Components
type: Navigation
title: Breadcrumb
---

Breadcrumb displays the current page in the system hierarchy position, and can back to previous.

## When to use

- When the system has more than two hierarchy,
- When you need to inform the user, "where are you",
- When you need to back to previous.

## API

```html
<Breadcrumb>
  <Breadcrumb.Item>Home</Breadcrumb.Item>
  <Breadcrumb.Item>Application Center</Breadcrumb.Item>
  <Breadcrumb.Item>Application List</Breadcrumb.Item>
  <Breadcrumb.Item>An Application</Breadcrumb.Item>
</Breadcrumb>
```

| Property      | Description                              | Type              |  Optional | Default |
|-----------|-----------------------------------|-----------------|---------|--------|
| routes    | The routing stack information of router | Array             |         | -      |
| params    | Routing parameter                        | Object            |         | -      |
| separator | Custom separator                      | String or Element |         | '/'    |
| linkRender | Custom link function，and react-router configuration | Function(href, name) |         | -    |
| nameRender | Custom link function，and react-router configuration | Function(name) |         | -    |