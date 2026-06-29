---
group: Design Patterns (Research)
type: Template Document
order: 2
title: Workbench
skip: true
---

The workbench is often used as the homepage of an application, providing a convenient hub for users. It offers common information entry points, navigating to various functional modules of the application in a hub-and-spoke manner; it presents information that the user currently needs to focus on, shortening the path to key information; and allows users to directly perform some high-frequency tasks on the workbench.

---

## Design Goals

User-side: Provide shortcuts for handling and viewing information and necessary help for users;<br/> Product-side: Communicate better with users, appropriately promote new trends and operational content of the product.

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*aFiGRbIvuH4AAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Findability</h4>
      <p>Can users locate the information they want?</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lTUuSKmd8WsAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Reduce Memory Load</h4>
      <p>Understand the core goals of users returning to the site and provide the shortest navigation paths to possible destinations.</p>
    </div>
  </div>
</div>

## How to Design

#### Template - Workbench

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8s67TL62WEoAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

- Shorten the navigation path for users returning to the site;
- Provide common navigation entry points for users.

**Involved Functions**

Help; Core Data; Shortcuts; To-Do List; Focus; Operational Modules.

**Design Suggestions**

- Display modules related to daily work, keeping the total number of modules between 5-9;
- Present the most frequently used content on the first screen whenever possible;
- Provide role-based differentiated views.

#### Template - New User Guide

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*LQBmQauTEAsAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**When to Use**

- When new users arrive at the platform and have not yet started any work, shorten the learning time for new users;
- When some modules have no content, refer to the "Empty State" guidelines.

**Involved Functions**

Help; Empty State Guide.

**Design Suggestions**

- Introduce the platform's purpose to users and guide them to start working;
- If users need to manage complex objects, provide a Demo preview entry;

### Design Suggestions

#### Choose the Right Navigation Method

This type of page generally provides two types of navigation forms.<br/>

① Users know the function they want to use and need to navigate to it. For example:

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*xlYoTIf8NpwAAAAAAAAAAABkARQnAQ">
</div>

② Discovery navigation, where users need to complete a task but do not know which function to use. For example:

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*9nKdRJBAu8sAAAAAAAAAAABkARQnAQ">
</div>

#### Arrange Content by Usage Frequency

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1tfiR5-xKUQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Arrange the content based on usage frequency in the daily work.

#### Consider Error States

See Error Page

> Additionally, whether to recommend personalized customization for users is still under exploration.
