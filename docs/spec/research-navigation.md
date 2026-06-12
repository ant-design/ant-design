---
group: Design Patterns (Research)
type: Global Rules
order: 1
title: Navigation
skip: true
---

Navigation is used to display where the user is in the current product and where they can go.

## Design Goals

Make users clearly aware of their current position in the product and conveniently and quickly take them to where they want to go.

---

## Design Principles

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*7BUOQYDiEr0AAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Findability</h4>
      <p>Users can locate the information they want.</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NfLHQJfGmUQAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>Efficiency</h4>
      <p>1. Multiple entry points: Provide multiple links to the same destination;</p>
      <p>2. Shortcuts: Provide shortcuts to access content, such as related links;</p>
      <p>3. Escape hatch: Click the logo to return to the homepage and restart the information search.</p>
    </div>
  </div>
</div>

---

## Design Suggestions

### Information Architecture

• Keep the information architecture hierarchy shallow, flat, and wide as much as possible during design;

• Consider navigation from the user's usage path rather than just based on the hierarchical structure;

• Common organizational methods include:

1. By topic, such as the services or content categories provided by the product, which directly presents the site's content scope;

2. By audience, such as administrators, operators, users;

3. By task, such as understanding cooperation models, contacting cooperation specialists, signing process, cooperation coordination, business operation, customer service.

### Navigation Paths

A complete navigation should allow users to move along multiple paths:

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Q9WMS64xs2gAAAAAAAAAAABkARQnAQ">
</div>

**A - Lateral Move**: Jump to the same level

**B - Drill Down**: Enter lower-level content

**C - Return**: Browse back through history or higher-level content

**D - Associative Navigation**: Navigate to content based on relevance

---

## Types

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MU2BQpS51mMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Correct understanding and use of navigation components are crucial to the overall product experience.

We divide navigation into the following 5 types:

1. Global Navigation

2. Back Navigation

3. In-Page Navigation

4. Drill Down Navigation

5. Associative Navigation

### Global Navigation

Global navigation reflects the core organizational structure of the website.

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PgY8S6Mx3x8AAAAAAAAAAABkARQnAQ">
</div>

#### Sidebar Navigation

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*fNW0Rak8sL8AAAAAAAAAAABkARQnAQ">
</ImagePreview>

- Used when there are many menus, recommended for more than 6 menu items;

- Can carry multiple levels, but 1-3 levels are recommended;

- Enterprise products are recommended to use sidebar navigation, which has better visibility and is easier to scan. The importance of each menu is less affected by the menu order.

#### Top Navigation

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MmmnTKl0hO8AAAAAAAAAAABkARQnAQ">
</ImagePreview>

- The weight of each menu is often positively correlated with the order, meaning the order affects the frequency of user use;

- Recommended for 2~7 content items;

- Recommended for 1-2 levels; when more than 2 levels, pop-up navigation is recommended.

#### Pop-Up Navigation

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8lgCQb8copwAAAAAAAAAAABkARQnAQ" alt="Correct Example">
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_k8wR4PoOSsAAAAAAAAAAABkARQnAQ" alt="Incorrect Example">
</ImagePreview>

Used to expand the navigation bearing level, suitable for large websites.

Sitemap-style navigation allows users to see the available functions of the entire site at a glance.

1. Do not make users follow a narrow hover path to get navigation menus;

2. Do not make users open each layer of the menu step by step to find, inefficient and difficult;

> This suggestion is only for navigation menus, not for operational menus.

#### Utility Navigation

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*UXcoSYBXgOMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Usually placed in the upper right corner of the website, it is a habitual usage. Users are used to finding these contents in this position.

Content usually includes:

• Global search

• Notification center

• Site help

• Customer service information, shopping cart

• Favorites

• Login tools

• Language switch

<ImagePreview>
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DgCoRI0aFLcAAAAAAAAAAABkARQnAQ" alt="Incorrect Example">
</ImagePreview>

**Do not place in-page operations in utility tools.**

### Subsite Navigation

Enterprise products often adopt a mixed structure of hierarchy + database in information architecture. This structure usually has deep layers. To achieve a shallow, flat, and wide perception level for users, organize several deep layers into a subsite to reduce the number of levels in a single site and reduce user cognitive load.

Another subsite scenario is to face complex tasks that require a large workspace and handle tasks immersively as a subsite. The most common is the editor. In subsite mode, there is a low demand for full-site navigation functions, usually only needing to provide an exit to return to the upper level or homepage.

> Here, the database is a form of information architecture where the content of each page is independent but follows a consistent format.

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jYG0T7S-SjsAAAAAAAAAAABkARQnAQ">
</ImagePreview>

#### Immersive Navigation

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*vABzS5JNgocAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Used to handle complex tasks or those requiring a large workspace.

#### Multilevel Site Navigation

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*mXw5TIVLL-sAAAAAAAAAAABkARQnAQ">
</ImagePreview>

- Used for subsites with many menus;

- Subsite design should be significantly different from full-site navigation, requiring a significant transition to indicate entering a new space.

### In-Page Navigation

For content navigation at lower levels of the information architecture, use in-page navigation. If the page needs to be shared with others, add a location mark in the URL.

#### Page Header

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Ah4HQ6gPheQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

The page header is located above the page content, mainly for declaring the page theme, in-page information navigation, and page-level content operations.

#### Tree Control

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PJ2fTKBEZIoAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Displays a multi-level structure within the page.

#### Anchor

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*d6eDQZy-6gkAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Jumps between various page sections, used when the content displayed in a flat layout is too long.

#### Back to Top

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*-QkOT5KrcDwAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Quickly returns to the top of the page.

#### Carousel

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gVZZQIz6yw4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

Cycles through a series of content.

### Drill Down Navigation

Click to enter the lower-level content of the information architecture. Defaults to in-site navigation; opens a new tab for external sites. A typical scenario is drilling down from a list to details.

### Back Navigation

#### Breadcrumbs

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QcmiTLXUH1oAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Reflects the current page's position within the website structure. When there are fewer than three levels, there is no need to display breadcrumbs, as the global navigation can directly present the location. Users can return to the previous page through breadcrumbs.

#### Back Button

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*z1XdRrwsqgQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**Titles typically appear alongside breadcrumbs. When breadcrumbs are present, back buttons in titles are not recommended.**

The back button in the page header is equivalent to a short breadcrumb, used to return to the previous level. It is suitable for subsite scenarios where full-site navigation is hidden, and users need to return to the upper level through the back button.

### Associative Navigation

#### Step Bar

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jhNXQL5oRaMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Guides users step by step according to a predefined sequence.

Displays the step bar on each page of a series of pages, marking the current page's position on this linear path.

Suitable for:

• Linear user visit paths;

• Step bars break down complex tasks into easy-to-handle small tasks, reducing user errors and completing tasks faster.

#### Previous/Next

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*5Es3S4HJvrEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

Helps us move to other closely related web pages.

---

## How to Validate Design Results

To test the quality of the navigation system, conduct a stress test: parachute into the site, testing the navigation system's limits.

1. Ignore the homepage and go directly to a random page on the site;

2. Check if users can know their current position and its relation to other parts of the site. Which part of the site is this? What is the upper-level page?

3. Do they know where this page will take them? Does the link text explain the destination?

---

## Further Reading

### External Reference Articles

- [Alibaba Cloud - Console Navigation System](https://xconsole.aliyun-inc.com/spec/hxzewz)
- [Material Design Navigation](https://material.io/design/navigation/understanding-navigation.html#)
- [Predix Navigation](https://www.predix-ui.com/#/design/foundation/navigation)
- [Windows - UWP Navigation Design Basics](https://docs.microsoft.com/zh-cn/windows/uwp/design/basics/navigation-basics)
- [When You Should Use a Breadcrumb Navigation?](https://uxmovement.com/navigation/when-you-should-use-a-breadcrumb-navigation/)
- [Books: "Information Architecture for the World Wide Web" - Navigation Systems](https://www.oreilly.com/library/view/information-architecture-for/0596527349)
- [Books: "Designing Web Navigation"](https://www.oreilly.com/library/view/designing-web-navigation/9780596528102/)
