---
template: component
category: Design Fundamental
order: 4
cols: 1
title: Layout
---

Layout and Navigation is the backbone of productions, it is one of the most important design pattern of a page,
and it is also a base when you create a page, it will establish a interactive and visual style for a production.

The Layout and Navigation design specification for Ant Design are as follows:

### The specification of size

The first level of the navigation is placed near by a logo inclined left, and the secondary menu is placed inclined right. 

- Top Navigation (almost systems): the height of the first level navigation `64px`, the second level of navigation `48px`。
- Top Navigation(contents page): the height of the first level navigation `80px`,the second level of navigation `56px`。
- Calculation formula of a top navigation:`48+8n`.
- Calculation formula a aside navigation:`200+8n`.

### The principle of interaction

- The first level navigation and the last level navigation should be distincted by visualization;
- The current item should have the highest priority of visualization;
- When the current navigation item is collapsed, the stlye of the current navigation item will be applied to the parent level of it;
- The left side navigation bar support for both the according and the expanding style, you can choose the one of it case by case.

### The principle of visualization

 Style of a navigation should conform to the level of it.

- **Emphasis by colorblock**

  When background color is a deep color, you can use this pattern for the parent level navigation item of current page.

- **The highlight match stick**

  When background color is a light color, you can use this pattern for the current page navigation item, we recommed to use it for the last item of the navigation path.

- **Hightlighted font**

  From the visualization aspect, hightlighted font is stronger than colorblock, this pattern is often used for the parent level of the current item.

- **Enlarge the size of the font**

  `12px`、`14px` is a standard font size of navigations，14 is used for the first and the second level of the navigation. You can choose a approprigate font size in terms of the level of your navigation.

In almost middle-back systems,  Ant Design uses two general layouts of top navigation and aside navition, we collect some basic layouts of middle-back systems are designed by Ant Design as follows: