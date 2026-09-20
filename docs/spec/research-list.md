---
group: Design Patterns (Research)
type: Template Document
order: 3
title: List Page
skip: true
---

A list page allows viewing and handling a large number of entries, often with navigation to detailed pages. Users can filter, compare, add, analyze entries, and drill down to complete detail pages from the list page.

---

## Design Goals

Help users view, handle, and find entries more efficiently.

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*TZ7wT6tvulkAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Scannability</h4>
      <p>Use a consistent format to highlight key information that aids in object recognition. Utilize rich interactive layered information to reduce cognitive load.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Findability</h4>
      <p>Organize lists in a logically browsable order. Provide suitable search components to help users quickly find information.</p>
    </div>
  </div>
</div>

## How to Design

### Basic Layout

#### Single Column Layout

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*c0iNQIBusPMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Stack from top to bottom, with the data filtering module at the top. After filtering the data, users can browse and analyze from the general to the specific.

#### Two-Column Layout

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*h8MsSr8UXCEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Place the data filtering module in the sidebar when there are many filtering conditions and ample horizontal space.

#### [Template - Query Table](https://preview.pro.ant.design/list/table-list)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*uAGRTY5EMvIAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

When each entry needs to expose many fields; use when users have an accurate query scope when searching for entries.

#### Template - Standard List

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3KMbRrbjvzkAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

Provide an overview of each entry, with navigation to entry details by clicking the list. The page often provides statistical functions for users to understand the overall progress. It can be used as a simplified version of a workbench.

#### [Template - Card List](https://preview.pro.ant.design/list/card-list)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*coEVT7uElCUAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

When users do not need to browse entries in a specific order, present each entry attractively.

#### Template - Search List

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*yW4QQKNi_0QAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

Primarily used for searching specific entry information, search results across many topics using keywords. Suitable for searching and filtering a large number of different types of content, meeting the needs of finding vague targets.

**Involves Operations**

Filter, search

#### Template - Member Management

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*aJxDR6oP19gAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

Member management is used to display and manage the basic information and permissions of members within an object. Management operations usually include adding members, deleting members, assigning member roles and permissions, etc.

**Involves Operations**

Filter, delete, etc.

## Design Suggestions

#### Batch Operations

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NvPKR5HZQ9MAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Page-level batch operations affect the entire page and can be placed at the bottom of the page.

## Further Reading

#### External Reference Articles

- [Canvas Filters](https://canvas.hubspot.com/patterns/filters)
- [Canvas Search](https://canvas.hubspot.com/patterns/search)
- [Fiori Analytical List Page](https://experience.sap.com/fiori-design-web/analytical-list-page/)
- [QuickBook Table Design Rules](https://designsystem.quickbooks.com/component/tables/)
- [Article: Data Table Design](https://medium.com/@taras.bakusevych/data-tables-design-3c705b106a64)
- [Article: Designing Tables for Reusability](https://uxdesign.cc/designing-tables-for-reusability-490a3760533)
- [Article: Affordances in Design](http://www.woshipm.com/pd/1479.html)
