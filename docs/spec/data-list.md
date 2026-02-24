---
group: Design Patterns
type: Global Rules
order: 7
skip: true
title: Data List
---

## Design goals

- Make lists easy to scan.
- Quickly find objects in the list.

## List type

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*60WRRKpliSIAAAAAAAAAAABkARQnAQ" />
</div>

### Table

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*VrOkRbo_Uc4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

Emphasis on browsing. The matrix layout tends to display complex data, and the data is aligned according to the matrix layout, which is convenient for browsing data horizontally and vertically, and studying the relationship between data. Tables are used especially when the user would benefit from more data exposure without having to go into the details of the object.

### List

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*D-8wTbCA1REAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Consider both browsing and presentation. Arranged vertically, it tends to show the basic overview of the object, and the content is displayed hierarchically, which is suitable for quick scanning. Especially when the display space is limited, such as smaller pop-up windows, sidebars, drop-down panels and other containers, use lists.

### Card list

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*fu2gQ6DQaGgAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Emphasis on presentation. The grid layout has no specific browsing order, and each object has a more equal display opportunity. The grid layout is more attractive on the page and is suitable for highlighting objects.

## Operation Behavior

### Search data

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*pEyLSJsDgYIAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Select the appropriate search component.

**1）Identify the main search patterns of users.**

- Known Items Exploration: Start the search with verbally describable known items.
- Exploratory query: search for a target with a defined but broad scope.

**2）The higher the search frequency, the higher the efficiency requirements.**

**3）Communicate well with developers to understand system performance and select appropriate components.**

#### Inquire

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gHgBRofoBDQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

According to the preset conditions, select multiple query conditions and submit the acquisition query at one time.

#### Filter

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*oECHSpfxwPAAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Users adjust the filters and the results adjust accordingly.

### Search

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*agcCS5eHy2UAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Smarter search, enter keywords to query in multiple data attributes at one time, and display the results.

### Paging

By default, page loading is used to reduce user waiting. The user's browsing position in the original list should be cached, and the browsed items in the list should be marked. When the user returns to the previous page, the user returns to the original browsing position.

#### Pagination

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1sIoQKjspJIAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Recommended by default. When used, when the content of the page is less than one page, the pager will not be displayed.

#### same page load

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ejtTTo4E0A4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

This mode can be considered when users can often find the desired item at the top of the list and there is no need to locate a specific list item, such as dynamics and emails.

#### view all

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*cgIlQJUC2_kAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Use when you need to jump to the page to view the complete list.

### Navigate to details

<div>
  <img alt="mainly" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*nSsBTZlxihsAAAAAAAAAAABkARQnAQ">
</div>

#### By default, click on the title to navigate to the details, and you can judge how to open the details from the following angles:

- From the perspective of natural interaction, **Expand the list on the same page** is more natural, and it should be noted that the height of the expanded content area should not exceed one screen;
- From the perspective of the amount of information in the details, if the information display exceeds one screen, it is not convenient for the user to use the unfolding method. At this time, it is better to use **Drawer Expand**;
- Details need to be shared with others separately, or complex immersive tasks, **jump to independent page** is more suitable;
- There may be content that the user is interested in in each item of detail, so as to facilitate switching navigation, quickly view and process different items, you can use the ** double column display. **

### Batch operations

<ImagePreview>
<img class="preview-img no-padding" src="https://github.com/ant-design/ant-design/assets/10286961/0ed9e155-488b-4114-a3ea-9c9de78d7899">
</ImagePreview>

When the user checks the item, the batch operation mode is triggered, and the list toolbar calls out the batch operation toolbar.

### New

#### New button in the upper right corner

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*HeQwR4Dc5aEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Click to trigger a new form pop-up window, drawer, page, etc. After the creation is completed, the newly created content appears in the first item of the list and is briefly highlighted.

#### Dashed New Button

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*2OsyRpOCCIYAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Click New, and the object editing area will appear at the button position, and the newly created object will be displayed at this position after the creation is completed. The dotted new button position is placed at the beginning or end of the list.

### delete

#### Delete directly

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*rPUVTqeMzzgAAAAAAAAAAABkARQnAQ">
</ImagePreview>

After deletion, allow user to undo.

#### Second Confirmation

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kYkSRKhHbIoAAAAAAAAAAABkARQnAQ">
</ImagePreview>

When clicking the delete operation, a second confirmation is required.

#### Security check

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*vkUuTYWLRCMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Destructive operations require high-level security verification to confirm operations.

### List Toolbar

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*cPBwQ74TTFQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Common features needed to integrate lists in a small space, highly recommended.

## layout

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y6PZQpyrFXUAAAAAAAAAAABkARQnAQ">
</ImagePreview>

List layouts are usually tiled from top to bottom, in the following order. Among them, the exclusive area provides an expansion space for solving complex data search and data statistics content that cannot be integrated in the toolbar.

## Empty state

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8iBER4YJmdQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

When the list has no data or no search results, an empty state should be displayed.
