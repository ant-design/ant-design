---
order: 4
title: Icons
---

An icon is a graphical representation of meaning. Icons can be used to express actions, state, and even to categorize data. Ant Design's icons adhere to the following two principles and are designed for cross-platform consistency:

- Graphics that are clear, intuitive, and simple enjoy a higher degree of recognition and are more easily understood
- All icons in the user interface should be consistent in style (detail design, perspective, stroke weight, etc.)

---

## System icons

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/gcOflMziKUIdaeLlObPj.png">

System icons are often used to represent commonly used operations, such as: save, edit, delete. The library also includes icons to represent file types and state.

- [View the icon library](/components/icon/#Application-Icons)

### Key contour lines

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/psKuOznmgqzqQoumcAxT.png" alt="Ant Design's grid and key contour lines">

Contour lines play an important role in making various icons with the same visual effect. We recommend using a template following Ant Design's contour lines when creating new icons.

Please make all icons in the 1024×1024 resolution (16×16 64 times).

- [Illustrator tips](https://zos.alipayobjects.com/rmsportal/hmNuLjCkBssupcZgYAde.png)

<img class="preview-img no-padding inline" align="right" src="https://zos.alipayobjects.com/rmsportal/XzoySLGeUaMCOVymkyZq.png" alt="Square contour">
<img class="preview-img no-padding inline" align="right" src="https://zos.alipayobjects.com/rmsportal/fdWiCCIQiJIViSNhmcHo.png" alt="Horizontal rectangle contour">

<img class="preview-img no-padding inline" align="right" src="https://zos.alipayobjects.com/rmsportal/xEvvEZHaSlstcozKgoBd.png" alt="Circular contour">
<img class="preview-img no-padding inline" align="right" src="https://zos.alipayobjects.com/rmsportal/GyBKoeSnRDFPvJudEgOA.png" alt="Vertical rectangle contour">

### Design details

#### Stroke weight

<img class="preview-img no-padding good" align="right" src="https://zos.alipayobjects.com/rmsportal/WnOptTBWISNYeRpYnlcg.png" alt="Correct example" description="Line thickness is consistently 72px">
<img class="preview-img no-padding bad" align="right" src="https://zos.alipayobjects.com/rmsportal/pdLgzaadpHndkqAPLNmx.png" alt="Incorrect example" description="Line thickness is not uniform">

Consistent stroke weight is the key to maintaining the visual unity of the entire icon system. Ant Design's icons have a consistent line width of 72px.

#### Corners

<img class="preview-img no-padding good" align="right" src="https://zos.alipayobjects.com/rmsportal/FBhKrLDoNmfgwZRbfXRi.png" alt="Correct example" description="The icon's corners are properly rounded">
<img class="preview-img no-padding bad" align="right" src="https://zos.alipayobjects.com/rmsportal/NtrZWeUsfVWiOjRcWDqv.png" alt="Incorrect example" description="The icon's corners are not rounded">

Consistent rounding of corners and sizing of angles is also an important element in maintaining visual unity.

Icons that follow Ant Design should have rounded corners and edges using a 72px radius. Angles should be a multiple of 45°.

#### Visual correction

<img class="preview-img no-padding good" align="right" src="https://zos.alipayobjects.com/rmsportal/xOFtYOCPdCHNwAzYVqSJ.png" alt="Correct example" description="For the intricate “JPG” lettering, an outline is added for readability">
<img class="preview-img no-padding bad" align="right" src="https://zos.alipayobjects.com/rmsportal/pxpaZCbYqucHqnxyazta.png" alt="Incorrect example" description="The text in the icon is crowded and hard to read">

In certain special cases (for example, when the icon is too compact), adjustments to line width, outlines, or other subtle changes may be made to increase readability.

### Perspective

<img class="preview-img no-padding good" align="right" src="https://zos.alipayobjects.com/rmsportal/YqNpTvpCeBeRAPWSFJbz.png" alt="Correct example" description="Maintains a flat, simple style">
<img class="preview-img no-padding bad" align="right" src="https://zos.alipayobjects.com/rmsportal/tqMBxDQruzWhunynJaNC.png" alt="Incorrect example" description="Icons should not have depth nor varying perspectives">

Always keep a simple, flat style. Icons should not have a sense of depth nor a large amount of detail.

### Naming conventions

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/RjDmLIjLtUdoIQDIuVrw.png">

Uniform naming conventions make finding icons faster and easier. For example, icons with a surrounding outline have a uniform "-o" suffix.

### Icon sizing

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/nHFxbYpwlUHwOcrkvgGw.png">

Icons should be scaled according to the text size, according to the Ant Design specification.

For example, icons inline with 12pt font should be 12px in size with 8px of spacing.

### Color

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/uYhuxxiWZlgVwdmfqUli.png" description="Colors demonstrated - @Black = #000000、@White = #FFFFFF、@Blue-6 = #108EE9">

The color of the icon should be consistent the color of the surrounding copy, unless the icon is being used to express state (in which case it should be colored accordingly).

---

## Pictographs

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/tFBnAjChLpybfxtnotTx.png">

While certain icons may be used to express an action or to communicate state, other icons may act as pictographs which can be used to either communicate meaning or to help a user remember an abstract concept.

> Note: The design principles for system icons (stroke weight, etc.) also apply to pictographs.

### Pictograph sizing

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/ByDcWtCrgspVLqjTsFdu.png">

Conventionally, we recommend storing pictograph icons in three sizes: 32px, 48px, and 64px. That said, the physical dimensions of an icon should match the dimensions of where it is used.

### Colors

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/QfFDvJISCInKnjsshowY.png">

Pictographs should either be monochrome (using a neutral color) or consist of two colors (the neutral color + primary color), with the primary color not exceeding 40% of the pictograph's area.
