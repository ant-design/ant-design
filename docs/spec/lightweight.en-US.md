---
category: Design Patterns
type: Principles
order: 7
title: Keep it Lightweight
---

Fitts's Law is an ergonomic principle that ties the size of a target and its contextual proximity to ease of use. In other words, if a tool is close at hand and large enough to target, then we can improve the user's interaction. Putting tools in context makes for lightweight interaction.

> <img src="https://os.alipayobjects.com/rmsportal/wAcbQmeqTWDqsnu.png" width="150" />
> **Fitts's Law**: The time to acquire a target is a function of the distance to and size of the target. It is proportional to the distance to the target and inversely proportional to the width of the target.

---

## Always-Visible Tools

<img class="preview-img" align="right" alt="example of Always-Visible Tools, from Zhihu" description="Status No.1: A clear clickable area makes it easier to highlight the button on the page.<br>Status No.2: As hovering over the button, the mouse pointer turns into a hand symbol, and the fill color of the button changes to a dark color, which provides a clear call to action.<br>Status No.3: The style of the button obviously changes once clicked." src="https://gw.alipayobjects.com/zos/rmsportal/ofpeZpgdrqXcRpTlVXTp.png">

If an action is critical, expose it directly in the interface and keep it always visible.

<br>

---

## Hover-Reveal Tools

<img class="preview-img" align="right" alt="example of Hover-Reveal Tools" description="On mouse hover, the tools are revealed." src="https://gw.alipayobjects.com/zos/rmsportal/XzKWrNfqIMNnIrwWNJYg.png">

Instead of making Contextual Tools always visible, we can show them on demand. One way to do this is to reveal the tools when the user pauses the mouse over an object.

<br>

---

## Toggle-Reveal Tools

<img class="preview-img" align="right" alt="example of Toggle-Reveal Tools" description="The table reveals an input box from the text only when the edit mode is turned on for the area." src="https://gw.alipayobjects.com/zos/rmsportal/iLilpTYKqogBNlwpmVGw.png">

Toggle a tool mode for an area or page when the actions are not the main flow. The tools to accomplish this are revealed on the activation of the toggle.

<br>

---

## Visible Area ≠ Clickable Area

<img class="preview-img" align="right" alt="example of hypertext hot spot" description="When hovering on the cell in which the hypertext is positioned, the mouse turns from a cursor to a hand symbol. Click it and jump to another page." src="https://gw.alipayobjects.com/zos/rmsportal/lhOpWlaOzwsuHGxqHgPg.png">

The clickable area of hypertext is affected by the length of the string in a cell. The whole cell can be set to a hot spot in order to be triggered easier.

<br>

<img class="preview-img" align="right" alt="example of button hot spot" description="Move the mouse near the button and activate the hover state." src="https://gw.alipayobjects.com/zos/rmsportal/BlUnqNCHsgUnhnRjMTnX.png">

Increase the clickable hot spot to strengthen the responsiveness rather than increase the size of the button.

> Note that it is especially suited for Mobile.
