---
category: Components
group: Other
title: FloatButton
cover: https://gw.alipayobjects.com/zos/bmw-prod/9b1b62fe-e677-4afc-b9fe-1b2993662611.svg
demo:
  cols: 2
---

FloatButton. Available since `5.0.0`.

## When To Use

- For global functionality on the site.
- Buttons that can be seen wherever you browse.

## Examples

<code src="./demo/basic.tsx" iframe>Basic</code>
<code src="./demo/type.tsx" iframe>Type</code>
<code src="./demo/shape.tsx" iframe>Shape</code>
<code src="./demo/description.tsx" iframe>Description</code>
<code src="./demo/tooltip.tsx" iframe>FloatButton with tooltip</code>
<code src="./demo/group.tsx" iframe="300">FloatButton Group</code>
<code src="./demo/group-menu.tsx" iframe>Menu mode</code>
<code src="./demo/back-top.tsx" iframe>BackTop</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

### common API

| Property    | Description                               | Type                         | Default   | Version |
| ----------- | ----------------------------------------- | ---------------------------- | --------- | ------- |
| icon        | Set the icon component of button          | ReactNode                    | -         |         |
| description | Text and other                            | ReactNode                    | -         |         |
| tooltip     | The text shown in the tooltip             | ReactNode \| () => ReactNode |           |         |
| type        | Setting button type                       | `default` \| `primary`       | `default` |         |
| shape       | Setting button shape                      | `circle` \| `square`         | `circle`  |         |
| onClick     | Set the handler to handle `click` event   | (event) => void              | -         |         |
| href        | The target of hyperlink                   | string                       | -         |         |
| target      | Specifies where to display the linked URL | string                       | -         |         |

### FloatButton.Group

| Property     | Description                                   | Type                    | Default  | Version |
| ------------ | --------------------------------------------- | ----------------------- | -------- | ------- |
| shape        | Setting button shape of children              | `circle` \| `square`    | `circle` |         |
| trigger      | Which action can trigger menu open/close      | `click` \| `hover`      | -        |         |
| open         | Whether the menu is visible or not            | boolean                 | -        |         |
| onOpenChange | Callback executed when active menu is changed | (open: boolean) => void | -        |         |

### FloatButton.BackTop

| Property         | Description                                                                 | Type              | Default      | Version |
| ---------------- | --------------------------------------------------------------------------- | ----------------- | ------------ | ------- |
| duration         | Time to return to top（ms）                                                 | number            | 450          |         |
| target           | Specifies the scrollable area dom node                                      | () => HTMLElement | () => window |         |
| visibilityHeight | The BackTop button will not show until the scroll height reaches this value | number            | 400          |         |
| onClick          | A callback function, which can be executed when you click the button        | () => void        | -            |         |
