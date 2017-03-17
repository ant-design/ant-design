---
category: Principles
order: 5
title: Make it Direct
---

As Alan Cooper states：『Where there is output, let there be input』. This is the principle of direct manipulation. eg：Instead of editing content on a separate page, do it directly in context.

---

## In-Page Editing

<img class="preview-img" align="right" alt="Example of click to edit" description="Status 1: Common browsing mode, do not distinguish between editable  and  non-editable lines；<br>Status 2: On mouse hover, the background is backlit with yellow. A tool tip invites the user to “Click to edit”；<br>Status 3: Once the user clicks on the title, the form elements 『Input box』, 『Ok』 and 『Cancel』 appear, and the cursor is positioned in the 『input box』." src="https://os.alipayobjects.com/rmsportal/PmVuUUKeamHdveT.png">

Single-Field Inline Edit

If 『readability』 is more important than 『editability』, 『click to edit』 can be used.

<br>

<img class="preview-img" align="right" alt="Example of Text link/Icon Edit" description="Status 1: Text link/icon appears near the editable line.；<br>Status 2: Once the mouse clicks 『edit』,the form elements 『Input box』, 『Ok』 and 『Cancel』 appear, and the cursor is positioned in the 『input box』.
" src="https://os.alipayobjects.com/rmsportal/ZmRlahliUbCurhu.png">

If the priority is given to 『readability』 and the 『editability』 of operation lines need to be highlighted at the same time, 『text link/icon edit』can be used.

<br>

<img class="preview-img" align="right" alt="Example of Multi-Field Inline Edit" description="Edit mode without destroying integrity can enlarge the space in order to put down the 『Input box』 and other form elements. Besides, when switching the edit mode in the Table, it is necessary to ensure that each column does not beat." src="https://os.alipayobjects.com/rmsportal/hGXGErepBnrwqzj.png">

Multi-Field Inline Edit

>Note：In『Multi-Field Inline Edit』，there are huge different between the content and required field，So it is more needed to use the [『Explain What Just Happened』](../spec/transition#解释刚刚发生了什么) in 『Use Transition』to eliminate this visual effects.


<br>

More mode of 『In-page Edit』 ，please visit [『Mode／Table／Interaction』](/docs/pattern/table#模块编辑)


<br>

---

## Drag and Drop

<img class="preview-img" align="right" alt="Example of Drag and Drop List" description="Status 1: On mouse hover,a removable 『icon』 appears.；<br>Status 2： When hovering over the 『icon』，the pointer changes into a 『hand』， click-and-drag operation can be used；<br>Status 3：Drag  target to the placeable block. When  blue stroke appears, inform  user that object can be placed in the block." src="https://os.alipayobjects.com/rmsportal/DjMFcqSxZrulbGF.png">

Drag and Drop List

Drag and Drop can only limited in one dimension（upper/down or left/right）

<br>

<img class="preview-img" align="right" alt="Example of Drag and Drop picture/file" src="https://os.alipayobjects.com/rmsportal/KVhqdSoLUjXPXuN.png">

Drag and Drop picture/file

<br>
