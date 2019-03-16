---
category: Patterns
order: 10
title: Data Display
---

The suitable way to display data helps users quickly locate and browse data, and work together more efficiently. There are the following points to note when designing:


- Organize the order of presentations according to the importance level of the information, the frequency of operation, and the degree of association.
- Pay attention to the guidance in extreme situations. For example, the data information is too long, and the initial state when content is empty.

---

## Table

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/PetAXSByOolFbtmLazQz.png">

The table is recognized as one of the clearest and most efficient forms of presentation data. It is often used in conjunction with other interface elements such as sorting, searching, filtering, and paging, and is suitable for information collection and display, data analysis and induction, and manipulation of structured data. It's structure is simple, it's separation and induction are clear, the information is easier to compare, and the user's receiving efficiency and understanding of the information is greatly improved.

> Note:
> 1. The time, status, and action bar in the table need to keep the words intact without occupying multiple lines.
> 2. When the data is empty, use "- -" to indicate that there is no data.

## Collapse

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/ypeOSafZJYqVJUHcJeef.png">

Collapse guides the user to obtain information in a progressive manner by folding and arranging information, so that the interface is kept clean and the space is effectively utilized.

These components are used extensively in navigation and are also suitable for lengthy, irregular content management.

> Note:
> If the collapsed content has little conjunction to each other, you can use the more space-saving "accordion" mode - "accordion" is a special collapse that allows only a single content area to be unfolded.

---

## Card

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/xtIGZmqUHAovPPKjwyVT.png" description="If the content of the page is too slow, you can use &quot;preload&quot; or &quot;step-by-step&quot; to alleviate the user's anxiety during waiting time.">

A card is a container for carrying information. There is not too much limit to the types of content that can be carried. It makes a type of information centralized, enhances the sense of block and is easier to operate. Cards are usually arranged in a grid or matrix to convey the hierarchical relationship between each other. Cards are suitable for lighter and more personalized information block display.

> Note:
> 1. Cards are usually arranged according to the grid, and a maximum of four lines is recommended.
> 2. In the limited card space, you need to pay attention to the spacing between the information. If the information is too long, you can cut off the information. For example, "Ant Design is suitable for the middle station..."

---

## Carousel

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/FaAbGkTwlhykSDSBqWbW.png">

As a set of same hierarchy content parallel display mode, often used for picture or card carousel, can be triggered by the user or the system automatically rotates. It is suitable for display blocks such as the official website home page and product introduction page.

> Note:
> 1. The number of carousels should not be too much to avoid user boredom, it is best to control between 3 and 5.
> 2. It is recommended to provide hints on the design to allow users to maintain a clear understanding of the number and direction of the carousel.

---

## Tree

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/QZyxnLWUkbIuTqGYxTQs.png">

"Tree" displays the hierarchical relationship of information in the form of a step-by-step outline, which is efficient and has excellent visual visibility, making the overall information framework clear at a glance.

Users can view and process multiple tree-level content at the same time. Tree is applicable to any information scenarios that need to be organized through a hierarchy, such as folders, organizational structures, taxonomy, country regions, and more.

---

## Timeline

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/WmQeylAyWUNKmQIyoQGH.png">

Timeline is used to display time-flow information vertically, generally recording events in time by flashback, tracking what the user is doing now and what he has done in the past.

Each piece of information is time-based, and the content can cover topics, types, related additional content, and so on. Suitable for including events, tasks, calendar annotations, and other related data presentations.
