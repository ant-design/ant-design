---
category: Components
group: Data Display
title: Popover
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XhL3QpRw92kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*RMP_TrdZ3nsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/triggerType.tsx">Three ways to trigger</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/arrow.tsx">Arrow</code>
<code src="./demo/control.tsx">Controlling the close of the dialog</code>
<code src="./demo/hover-with-click.tsx">Hover with click popover</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

| Param   | Description         | Type                         | Default value | Version |
| ------- | ------------------- | ---------------------------- | ------------- | ------- |
| content | Content of the card | ReactNode \| () => ReactNode | -             |         |
| title   | Title of the card   | ReactNode \| () => ReactNode | -             |         |

Consult [Tooltip's documentation](/components/tooltip/#api) to find more APIs.

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.

## Design Token

<ComponentTokenTable component="Popover"></ComponentTokenTable>
