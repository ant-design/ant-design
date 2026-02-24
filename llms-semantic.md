# Ant Design Semantic Documentation

This file contains aggregated semantic descriptions for all components.

> Total 70 components contain semantic descriptions

# alert Semantic

Source: https://ant.design/components/alert/semantic.md

## Alert

### Semantic Parts

- root（`semantic-mark-root`）: Root element with border, background, padding, border-radius, and positioning styles for the alert container
- section（`semantic-mark-section`）: Content element with flex layout controlling content area typography and minimum width
- icon（`semantic-mark-icon`）: Icon element with color, line-height, and margin styles, supporting different status icon types
- title（`semantic-mark-title`）: Title element with text color and font styling for the alert title
- description（`semantic-mark-description`）: Description element with font-size and line-height styles for additional content
- actions（`semantic-mark-actions`）: Actions element with layout and spacing styles for action buttons
- close（`semantic-mark-close`）: Close button element with basic button styling

### Usage Example

```tsx
<Alert
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    icon: "semantic-mark-icon",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    actions: "semantic-mark-actions",
    close: "semantic-mark-close"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-alert ant-alert-info ant-alert-with-description semantic-mark-root css-var-test-id" data-show="true" role="alert">
        <span class="ant-alert-icon semantic-mark-icon">
          <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
            <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
            </svg>
          </span>
        </span>
        <div class="ant-alert-section semantic-mark-section">
          <div class="ant-alert-title semantic-mark-title">
            Info Text
          </div>
          <div class="ant-alert-description semantic-mark-description">
            Info Description Info Description Info Description Info Description
          </div>
        </div>
        <div class="ant-alert-actions semantic-mark-actions">
          <div class="ant-space ant-space-vertical ant-space-gap-row-small ant-space-gap-col-small css-var-test-id">
            <div class="ant-space-item">
              <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                <span>
                  Accept
                </span>
              </button>
            </div>
            <div class="ant-space-item">
              <button class="ant-btn css-var-test-id ant-btn-default ant-btn-dangerous ant-btn-color-dangerous ant-btn-variant-outlined ant-btn-sm ant-btn-background-ghost" type="button">
                <span>
                  Decline
                </span>
              </button>
            </div>
          </div>
        </div>
        <button class="ant-alert-close-icon semantic-mark-close" tabindex="0" type="button">
          <span aria-label="close" class="anticon anticon-close" role="img">
            <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
            </svg>
          </span>
        </button>
      </div>
```

---

# anchor Semantic

Source: https://ant.design/components/anchor/semantic.md

## Anchor

### Semantic Parts

- root（`semantic-mark-root`）: Root element with layout positioning, padding, margin, background color and other basic styles
- item（`semantic-mark-item`）: Link item element with padding, text color, hover states, transition animations and other styles
- itemTitle（`semantic-mark-itemTitle`）: Title text element with font styles, color changes, text decoration, transition effects and other styles
- indicator（`semantic-mark-indicator`）: Indicator element with width, height, background color, position changes, transition animations and other styles

### Usage Example

```tsx
<Anchor
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemTitle: "semantic-mark-itemTitle",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="css-var-test-id ant-anchor-css-var ant-anchor-wrapper semantic-mark-root" style="max-height: 100vh;">
        <div class="ant-anchor ant-anchor-fixed">
          <span class="ant-anchor-ink semantic-mark-indicator">
          <div class="ant-anchor-link semantic-mark-item">
            <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#api" title="API">
              API
            </a>
            <div class="ant-anchor-link semantic-mark-item">
              <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#anchor-props" title="Anchor Props">
                Anchor Props
              </a>
            </div>
            <div class="ant-anchor-link semantic-mark-item">
              <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#link-props" title="Link Props">
                Link Props
              </a>
            </div>
          </div>
          <div class="ant-anchor-link semantic-mark-item">
            <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#anchor-demo-basic" title="Basic demo">
              Basic demo
            </a>
          </div>
          <div class="ant-anchor-link semantic-mark-item">
            <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#anchor-demo-static" title="Static demo">
              Static demo
            </a>
          </div>
        </span></div>
      </div>
```

---

# auto-complete Semantic

Source: https://ant.design/components/auto-complete/semantic.md

## AutoComplete

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-flex layout, cursor styles, transitions, border and other basic selector container styles
- prefix（`semantic-mark-prefix`）: Prefix element with layout and styling for prefix content
- input（`semantic-mark-input`）: Input element with search input styling, cursor control, font inheritance and other search-related styles. Remove border styles
- content（`semantic-mark-content`）: Multiple selection container with layout, spacing, and wrapping styles for selected items
- clear（`semantic-mark-clear`）: Clear button element with layout, styling and interactive effects for clear button
- placeholder（`semantic-mark-placeholder`）: Placeholder element with font styles and colors for placeholder text
- popup.root（`semantic-mark-popup-root`）: Popup element with popup layer positioning, z-index, background, border, box-shadow and other popup container styles
- popup.list（`semantic-mark-popup-list`）: Popup list element with option list layout, scrolling, max-height and other list container styles
- popup.listItem（`semantic-mark-popup-listItem`）: Popup item element with option item padding, hover effects, selected states, disabled states and other option interactive styles

### Usage Example

```tsx
<AutoComplete
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    input: "semantic-mark-input",
    content: "semantic-mark-content",
    clear: "semantic-mark-clear",
    placeholder: "semantic-mark-placeholder",
    popup.root: "semantic-mark-popup-root",
    popup.list: "semantic-mark-popup-list",
    popup.listItem: "semantic-mark-popup-listItem"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="position: absolute; margin-bottom: 80px;">
        <div class="ant-select ant-select-outlined ant-select-auto-complete semantic-mark-root css-var-test-id ant-select-css-var ant-select-single ant-select-open ant-select-show-search" style="width: 200px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content semantic-mark-content">
            <div class="ant-select-placeholder semantic-mark-placeholder" style="visibility: visible;">
              Please select
            </div>
            <input aria-activedescendant="test-id_list_-1" aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="off" class="ant-select-input semantic-mark-input" id="test-id" role="combobox" type="text" value="">
          </div>
        </div>
        <div class="ant-select-dropdown ant-slide-up-appear ant-slide-up-appear-prepare ant-slide-up semantic-mark-popup-root css-var-test-id ant-select-css-var ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div>
            <div id="test-id_list" role="listbox" style="height: 0px; width: 0px; overflow: hidden;">
              <div aria-label="aojunhao123" aria-selected="false" id="test-id_list_0" role="option">
                aojunhao123
              </div>
            </div>
            <div class="rc-virtual-list semantic-mark-popup-list" style="position: relative;">
              <div class="rc-virtual-list-holder" style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
                <div>
                  <div class="rc-virtual-list-holder-inner" style="display: flex; flex-direction: column;">
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="aojunhao123">
                      <div class="ant-select-item-option-content">
                        aojunhao123
                      </div>
                      <span aria-hidden="true" class="ant-select-item-option-state" style="user-select: none;" unselectable="on">
                    </span></div>
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="thinkasany">
                      <div class="ant-select-item-option-content">
                        thinkasany
                      </div>
                      <span aria-hidden="true" class="ant-select-item-option-state" style="user-select: none;" unselectable="on">
                    </span></div>
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="meet-student">
                      <div class="ant-select-item-option-content">
                        meet-student
                      </div>
                      <span aria-hidden="true" class="ant-select-item-option-state" style="user-select: none;" unselectable="on">
                    </span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
```

---

# badge Ribbon Semantic

Source: https://ant.design/components/badge/semantic_ribbon.md

## Badge.Ribbon

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set relative positioning and wrapper container styles
- indicator（`semantic-mark-indicator`）: Indicator element, set absolute positioning, padding, background color, border radius and ribbon styles
- content（`semantic-mark-content`）: Content element, set text color and ribbon content display styles

### Usage Example

```tsx
<Badge.Ribbon
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    indicator: "semantic-mark-indicator",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%;">
        <div class="ant-ribbon-wrapper css-var-test-id semantic-mark-root">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id">
            <div class="ant-card-head">
              <div class="ant-card-head-wrapper">
                <div class="ant-card-head-title">
                  Pushes open the window
                </div>
              </div>
            </div>
            <div class="ant-card-body">
              and raises the spyglass.
            </div>
          </div>
          <div class="ant-ribbon ant-ribbon-placement-end ant-ribbon-color-pink semantic-mark-indicator">
            <span class="ant-ribbon-content semantic-mark-content">
              Hippies
            </span>
            <div class="ant-ribbon-corner">
          </div>
        </div>
      </div>
    </div>
```

---

# badge Semantic

Source: https://ant.design/components/badge/semantic.md

## Badge

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-block display, and fit-content width for basic layout
- indicator（`semantic-mark-indicator`）: Indicator element with positioning, z-index, dimensions, colors, fonts, text alignment, background, border-radius, box-shadow, and transition animations for complete badge styling

### Usage Example

```tsx
<Badge
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-badge semantic-mark-root css-var-test-id">
        <span class="ant-avatar ant-avatar-lg ant-avatar-square css-var-test-id ant-avatar-css-var">
          <span class="ant-avatar-string" style="-webkit-transform: scale(1); transform: scale(1);">
        </span>
        <sup class="ant-scroll-number semantic-mark-indicator ant-badge-count" data-show="true" title="5">
          <bdi>
            <span class="ant-scroll-number-only" style="transition: none;">
              <span class="ant-scroll-number-only-unit current">
                5
              </span>
            </span>
          </bdi>
        </sup>
      </span>
    </span>
```

---

# blog -beauty Semantic

Source: https://ant.design/docs/blog/semantic-beauty.md

---
title: Discover the Delicate Beauty of Components with Semantic Design
date: 2025-11-22
author: meet-student,thinkasany
---

Before Ant Design v6, the experience of customizing styles based on open tokens was already great, but there were still some pain points that were difficult to solve. Ant Design v6 made many changes and improvements to address this. Today, let’s talk about how semantic design helps you discover the delicate beauty of components.

---

## Before v6

In the past, how did we typically adjust component styles?

### Method 1 (props)

- Write extensive conditional logic for combinations in `className` and `style` attributes
- Use numerous props like `wrapClassName` when modifying styles of different component regions

The code might look like this:

```tsx
<Button className={variant === 'filled' ? 'btn-filled' : 'btn-outline'}>
  Submit
</Button>

<Modal wrapClassName="wrap-class" style={{ backgroundColor: '#fff' }}>
  Modal
</Modal>

<Menu style={{ backgroundColor: mode === 'horizontal' ? '#fff' : '#000' }}>
  <Menu.SubMenu popupClassName="popup-class">
    <Menu.Item >
      MenuItem
    </Menu.Item>
  </Menu.SubMenu>
</Menu>
```

### Method 2 (ConfigProvider)

Using the theme Design Token design introduced in Ant Design v5:

```tsx
<ConfigProvider
  theme={{
    components: {
      Notification: {
        colorTextHeading: token.blue,
        colorText: token.colorTextSecondary,
      },
    },
  }}
>
  {children}
</ConfigProvider>
```

### Method 3 (CSS)

Apart from these two methods, you might also have written less recommended CSS overrides:

```css
.wrapper-class .ant-table {
  border-radius: 4px;
  overflow: hidden;
}
.wrapper-class .ant-table .ant-table-thead {
  background-color: #f9fafc;
  color: #8b97b6;
}
```

All of the above approaches have various pain points:

- Limited available `props` make it impossible to modify certain regions, and logic is not well-organized
- Limited `Design Token` configuration prevents differentiated styling based on different types/variants
- CSS overrides introduce high cognitive load and maintenance costs, with poor maintainability and semantics

## Now in v6

To avoid token proliferation and the addition of numerous API props — which would increase maintenance costs — these elements were consolidated into a more semantic structure.

- The DOM structure has been greatly simplified and refined.
- Styles and themes can now be customized more flexibly and in a more maintainable way based on different props.
- It’s possible to define styles or class names for specific semantic regions, making it easier to customize local styles or themes.

```tsx
const classNamesFn: ButtonProps['classNames'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      root: 'demo-btn-root--primary',
    } satisfies ButtonProps['classNames'];
  }
  return {
    root: 'demo-btn-root--default',
  } satisfies ButtonProps['classNames'];
};

const styles: ButtonProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  content: { fontStyle: 'italic' },
  icon: { opacity: 0.85 },
};

return (
  <Button styles={styles} classNames={classNamesFn}>
    Button
  </Button>
);
```

### Combining with Tailwind CSS

What's more exciting is that the `classNames` property integrates perfectly with atomic CSS frameworks like [Tailwind CSS](https://tailwindcss.com/). This provides developers with unprecedented freedom: you can enjoy the preset behavior and semantic structure of antd components while leveraging Tailwind's utility classes to quickly build any visual style you want. Semantic design + Tailwind CSS, makes component customization extremely flexible.

```tsx
return (
  <Button
    classNames={{
      root: 'bg-black text-white border-none hover:bg-[#2e2e2e]',
      icon: 'text-white/90',
    }}
    icon={<GiftOutlined />}
  >
    Ant Design
  </Button>
);
```

<video src="https://gw.alipayobjects.com/v/huamei_iwk9zp/afts/video/Ok8fTIm1TLIAAAAAgCAAAAgAfoeUAQBr" autoplay="true" muted="true" loop="true" playsinline="true" controls="true"></video>

## Discover the Delicate Beauty of Components

Users can give components refined designs for different states based on their preferred color schemes. Let your imagination run wild and make your pages more vibrant and expressive. If you encounter any issues or have better ideas during use, feel free to share feedback — let’s make Ant Design even better together.

---

### demos.tsx



```tsx
import React from 'react';
import { Button, Drawer, Flex, Modal, Switch } from 'antd';

import BreadcrumbPreview from '../../../components/breadcrumb/demo/style-class';
import InputPreview from '../../../components/input/demo/style-class';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDrawer } = Drawer;

const SwitchNode = (
  <Flex orientation="horizontal" gap="middle">
    <Switch styles={{ root: { width: 40, backgroundColor: '#F5D2D2' } }} />
    <Switch styles={{ root: { width: 40, backgroundColor: '#BDE3C3' } }} />
  </Flex>
);

const ModalNode = (
  <InternalPanel
    footer={
      <>
        <Button
          styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          styles={{
            root: { backgroundColor: '#171717', boxShadow: '0 2px 0 rgba(23,23,23,0.31)' },
          }}
        >
          Submit
        </Button>
      </>
    }
    title="Custom Function Modal"
    styles={{
      container: { borderRadius: 14, border: '1px solid #ccc', padding: 0, overflow: 'hidden' },
      header: { padding: 16, margin: 0 },
      body: { padding: '0 16px' },
      footer: { padding: 10, backgroundColor: 'rgba(250,250,250, 0.8)' },
    }}
  >
    <div>🌈 Following the Ant Design specification.</div>
  </InternalPanel>
);

const DrawerNode = (
  <InternalDrawer
    title="Drawer"
    style={{ height: '100%', borderRadius: '10px 0 0 10px', overflow: 'hidden' }}
    styles={{
      header: { padding: 16 },
      body: { padding: 16 },
      footer: { padding: '16px 10px', backgroundColor: 'rgba(250,250,250, 0.8)' },
    }}
    footer={
      <Flex gap="middle" justify="flex-end">
        <Button
          styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          styles={{
            root: { backgroundColor: '#171717', boxShadow: '0 2px 0 rgba(23,23,23,0.31)' },
          }}
        >
          Submit
        </Button>
      </Flex>
    }
  >
    <div>
      🌈 Following the Ant Design specification, we developed a React UI library antd, interactive
      user interfaces.
    </div>
  </InternalDrawer>
);

const h1Style: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 2,
  fontWeight: 'bold',
};

const Demo: React.FC = () => {
  return (
    <Flex orientation="horizontal" gap="middle" style={{ padding: 10 }}>
      <div style={{ width: '35%' }}>
        <h1 style={h1Style}>Input</h1>
        <InputPreview />
      </div>
      <div style={{ width: '35%' }}>
        <h1 style={h1Style}>Switch</h1>
        {SwitchNode}
        <h1 style={h1Style}>Breadcrumb</h1>
        <BreadcrumbPreview />
        <h1 style={h1Style}>Modal</h1>
        {ModalNode}
      </div>
      <div style={{ width: '30%' }}>{DrawerNode}</div>
    </Flex>
  );
};

export default Demo;
```


## The Relationship Between Tokens and Semantic Styling

In Ant Design’s design system, tokens are positioned as design variables — the atomic materials of the design language. Semantic styles, on the other hand, define how those materials are used. They are created by combining design tokens with component-level customizations, allowing for more flexible and expressive styling scenarios. Since semantic styles operate at the component level, they provide better control over styling scope. If you aim to design a fully customized Ant Design theme, the combination of tokens and semantic styling will be your most powerful tool — together, they enable you to craft a more refined and precisely tailored theme.

---

# breadcrumb Semantic

Source: https://ant.design/components/breadcrumb/semantic.md

## Breadcrumb

### Semantic Parts

- root（`semantic-mark-root`）: Root element with text color, font size, icon size and other basic styles, using flex layout with ordered list
- item（`semantic-mark-item`）: Item element with text color, link color transitions, hover effects, padding, border-radius, height, and margin styles
- separator（`semantic-mark-separator`）: Separator element with margin and color styles for the divider

### Usage Example

```tsx
<Breadcrumb
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    separator: "semantic-mark-separator"
  }}
/>
```

### Abstract DOM Structure

```html
<nav class="ant-breadcrumb semantic-mark-root css-var-test-id">
        <ol>
          <li class="ant-breadcrumb-item semantic-mark-item">
            <a class="ant-breadcrumb-link" href="">
              <span aria-label="home" class="anticon anticon-home" role="img">
                <svg aria-hidden="true" data-icon="home" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                </svg>
              </span>
            </a>
          </li>
          <li aria-hidden="true" class="ant-breadcrumb-separator semantic-mark-separator">
            /
          </li>
          <li class="ant-breadcrumb-item semantic-mark-item">
            <a class="ant-breadcrumb-link" href="">
              <span aria-label="user" class="anticon anticon-user" role="img">
                <svg aria-hidden="true" data-icon="user" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                </svg>
              </span>
              <span>
                Application List
              </span>
            </a>
          </li>
          <li aria-hidden="true" class="ant-breadcrumb-separator semantic-mark-separator">
            /
          </li>
          <li class="ant-breadcrumb-item semantic-mark-item">
            <span class="ant-breadcrumb-link">
              Application
            </span>
          </li>
        </ol>
      </nav>
```

---

# button Semantic

Source: https://ant.design/components/button/semantic.md

## Button

### Semantic Parts

- root（`semantic-mark-root`）: Root element with comprehensive button styling including border, background, padding, border-radius, box-shadow, transitions, cursor, font-weight, alignment, and layout properties
- content（`semantic-mark-content`）: Content element that wraps button text with typography styles including nowrap, text-align center, and Chinese character spacing optimization
- icon（`semantic-mark-icon`）: Icon element with font-size, color inheritance, and SVG style reset for proper icon display

### Usage Example

```tsx
<Button
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid semantic-mark-root" type="button">
        <span class="ant-btn-icon semantic-mark-icon">
          <span aria-label="ant-design" class="anticon anticon-ant-design" role="img">
            <svg aria-hidden="true" data-icon="ant-design" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M716.3 313.8c19-18.9 19-49.7 0-68.6l-69.9-69.9.1.1c-18.5-18.5-50.3-50.3-95.3-95.2-21.2-20.7-55.5-20.5-76.5.5L80.9 474.2a53.84 53.84 0 000 76.4L474.6 944a54.14 54.14 0 0076.5 0l165.1-165c19-18.9 19-49.7 0-68.6a48.7 48.7 0 00-68.7 0l-125 125.2c-5.2 5.2-13.3 5.2-18.5 0L189.5 521.4c-5.2-5.2-5.2-13.3 0-18.5l314.4-314.2c.4-.4.9-.7 1.3-1.1 5.2-4.1 12.4-3.7 17.2 1.1l125.2 125.1c19 19 49.8 19 68.7 0zM408.6 514.4a106.3 106.2 0 10212.6 0 106.3 106.2 0 10-212.6 0zm536.2-38.6L821.9 353.5c-19-18.9-49.8-18.9-68.7.1a48.4 48.4 0 000 68.6l83 82.9c5.2 5.2 5.2 13.3 0 18.5l-81.8 81.7a48.4 48.4 0 000 68.6 48.7 48.7 0 0068.7 0l121.8-121.7a53.93 53.93 0 00-.1-76.4z"></path>
            </svg>
          </span>
        </span>
        <span class="semantic-mark-content">
          Ant Design
        </span>
      </button>
```

---

# calendar Semantic

Source: https://ant.design/components/calendar/semantic.md

## Calendar

### Semantic Parts

- root（`semantic-mark-root`）: Root element containing background, border, border-radius and overall layout structure of the calendar component
- header（`semantic-mark-header`）: Header element with layout and style control for year selector, month selector and mode switcher
- body（`semantic-mark-body`）: Body element with padding and layout control for the calendar table that contains the calendar grid
- content（`semantic-mark-content`）: Content element with width, height and table styling control for the calendar table
- item（`semantic-mark-item`）: Item element with background, border, hover state, selected state and other interactive styles for calendar cells

### Usage Example

```tsx
<Calendar
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    body: "semantic-mark-body",
    content: "semantic-mark-content",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-picker-calendar ant-picker-calendar-full semantic-mark-root css-var-test-id">
        <div class="ant-picker-calendar-header semantic-mark-header">
          <div class="ant-select ant-select-outlined ant-picker-calendar-year-select css-var-test-id ant-select-css-var ant-select-single ant-select-show-arrow">
            <div class="ant-select-content ant-select-content-has-value" title="2016">
              2016
              <input aria-autocomplete="list" aria-expanded="false" aria-haspopup="listbox" autocomplete="off" class="ant-select-input" id="test-id" readonly="" role="combobox" type="search" value="">
            </div>
            <div class="ant-select-suffix">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="ant-select ant-select-outlined ant-picker-calendar-month-select css-var-test-id ant-select-css-var ant-select-single ant-select-show-arrow">
            <div class="ant-select-content ant-select-content-has-value" title="Nov">
              Nov
              <input aria-autocomplete="list" aria-expanded="false" aria-haspopup="listbox" autocomplete="off" class="ant-select-input" id="test-id" readonly="" role="combobox" type="search" value="">
            </div>
            <div class="ant-select-suffix">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="ant-radio-group ant-radio-group-outline ant-picker-calendar-mode-switch css-var-test-id ant-radio-css-var" role="radiogroup">
            <label class="ant-radio-button-wrapper ant-radio-button-wrapper-checked css-var-test-id ant-radio-css-var">
              <span class="ant-radio-button ant-radio-button-checked">
                <input checked="" class="ant-radio-button-input" name="test-id" type="radio" value="month">
              </span>
              <span class="ant-radio-button-label">
                Month
              </span>
            </label>
            <label class="ant-radio-button-wrapper css-var-test-id ant-radio-css-var">
              <span class="ant-radio-button">
                <input class="ant-radio-button-input" name="test-id" type="radio" value="year">
              </span>
              <span class="ant-radio-button-label">
                Year
              </span>
            </label>
          </div>
        </div>
        <div class="ant-picker-panel" tabindex="0">
          <div class="ant-picker-date-panel">
            <div class="ant-picker-body semantic-mark-body">
              <table class="ant-picker-content semantic-mark-content">
                <thead>
                  <tr>
                    <th>
                      Su
                    </th>
                    <th>
                      Mo
                    </th>
                    <th>
                      Tu
                    </th>
                    <th>
                      We
                    </th>
                    <th>
                      Th
                    </th>
                    <th>
                      Fr
                    </th>
                    <th>
                      Sa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-10-30">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          30
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-10-31">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          31
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-01">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          01
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-02">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          02
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-03">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          03
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-04">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          04
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-05">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          05
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-06">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          06
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-07">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          07
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-08">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          08
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-09">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          09
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-10">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          10
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-11">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          11
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-12">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          12
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-13">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          13
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-14">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          14
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-15">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          15
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-16">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          16
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-17">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          17
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-18">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          18
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-19">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          19
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-20">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          20
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-21">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          21
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-selected ant-picker-cell-in-view ant-picker-cell-today" title="2016-11-22">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date ant-picker-calendar-date-today">
                        <div class="ant-picker-calendar-date-value">
                          22
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-23">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          23
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-24">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          24
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-25">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          25
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-26">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          26
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-27">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          27
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-28">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          28
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-29">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          29
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-30">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          30
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-01">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          01
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-02">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          02
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-03">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          03
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-04">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          04
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-05">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          05
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-06">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          06
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-07">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          07
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-08">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          08
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-09">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          09
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-10">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          10
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
```

---

# card Meta Semantic

Source: https://ant.design/components/card/semantic_meta.md

## Card.Meta

### Semantic Parts

- root（`semantic-mark-root`）: set `root` of Card.Meta
- section（`semantic-mark-section`）: set `section` of Card.Meta
- avatar（`semantic-mark-avatar`）: set `avatar` of Card.Meta
- title（`semantic-mark-title`）: set `title` of Card.Meta
- description（`semantic-mark-description`）: set `description` of Card.Meta

### Usage Example

```tsx
<Card.Meta
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    avatar: "semantic-mark-avatar",
    title: "semantic-mark-title",
    description: "semantic-mark-description"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute;">
        <div class="ant-card ant-card-bordered css-var-test-id" style="width: 300px;">
          <div class="ant-card-body">
            <div class="ant-card-meta semantic-mark-root">
              <div class="ant-card-meta-avatar semantic-mark-avatar">
                <span class="ant-avatar ant-avatar-circle ant-avatar-image css-var-test-id ant-avatar-css-var">
                  <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=8">
                </span>
              </div>
              <div class="ant-card-meta-section semantic-mark-section">
                <div class="ant-card-meta-title semantic-mark-title">
                  Card Meta title
                </div>
                <div class="ant-card-meta-description semantic-mark-description">
                  This is the description
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
```

---

# card Semantic

Source: https://ant.design/components/card/semantic.md

## Card

### Semantic Parts

- root（`semantic-mark-root`）: Card root element with positioning, background, border, border-radius, box-shadow, padding and other container styles
- header（`semantic-mark-header`）: Card header area with flex layout, min-height, padding, text color, font-weight, font-size, background, bottom border and top border-radius
- body（`semantic-mark-body`）: Card content area with padding, font-size and other content display styles
- extra（`semantic-mark-extra`）: Card extra operation area in top-right corner with text color and layout styles for additional content
- title（`semantic-mark-title`）: Card title with inline-block display, flex-grow, text ellipsis and other title display styles
- actions（`semantic-mark-actions`）: Card bottom action group with flex layout, list-style reset, background, top border and bottom border-radius for action buttons container
- cover（`semantic-mark-cover`）: Title cover with styles for cover image display and layout

### Usage Example

```tsx
<Card
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    body: "semantic-mark-body",
    extra: "semantic-mark-extra",
    title: "semantic-mark-title",
    actions: "semantic-mark-actions",
    cover: "semantic-mark-cover"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute;">
        <div class="ant-card ant-card-bordered css-var-test-id semantic-mark-root" style="width: 300px;">
          <div class="ant-card-head semantic-mark-header">
            <div class="ant-card-head-wrapper">
              <div class="ant-card-head-title semantic-mark-title">
                Card title
              </div>
              <div class="ant-card-extra semantic-mark-extra">
                More
              </div>
            </div>
          </div>
          <div class="ant-card-cover semantic-mark-cover">
            <img alt="example" draggable="false" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png">
          </div>
          <div class="ant-card-body semantic-mark-body">
            <div class="ant-card-meta">
              <div class="ant-card-meta-avatar">
                <span class="ant-avatar ant-avatar-circle ant-avatar-image css-var-test-id ant-avatar-css-var">
                  <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=8">
                </span>
              </div>
              <div class="ant-card-meta-section">
                <div class="ant-card-meta-title">
                  Card Meta title
                </div>
                <div class="ant-card-meta-description">
                  This is the description
                </div>
              </div>
            </div>
          </div>
          <ul class="ant-card-actions semantic-mark-actions">
            <li style="width: 33.333333333333336%;">
              <span>
                <span aria-label="setting" class="anticon anticon-setting" role="img">
                  <svg aria-hidden="true" data-icon="setting" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"></path>
                  </svg>
                </span>
              </span>
            </li>
            <li style="width: 33.333333333333336%;">
              <span>
                <span aria-label="edit" class="anticon anticon-edit" role="img">
                  <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                  </svg>
                </span>
              </span>
            </li>
            <li style="width: 33.333333333333336%;">
              <span>
                <span aria-label="ellipsis" class="anticon anticon-ellipsis" role="img">
                  <svg aria-hidden="true" data-icon="ellipsis" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                  </svg>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
```

---

# cascader Semantic

Source: https://ant.design/components/cascader/semantic.md

## Cascader

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-flex layout, cursor styles, transitions, border and other basic selector container styles
- prefix（`semantic-mark-prefix`）: Prefix element with layout and styling for prefix content
- suffix（`semantic-mark-suffix`）: Suffix element with layout and styling for suffix content like clear button, arrow icon, etc.
- input（`semantic-mark-input`）: Input element with search input styling, cursor control, font inheritance and other search-related styles. Remove border styles
- content（`semantic-mark-content`）: Multiple selection container with layout, spacing, and wrapping styles for selected items
- clear（`semantic-mark-clear`）: Clear button element with layout, styling and interactive effects for clear button
- item（`semantic-mark-item`）: Multiple selection item element with border, background, padding, and margin styles
- itemContent（`semantic-mark-itemContent`）: Multiple selection item content area with text ellipsis styles
- itemRemove（`semantic-mark-itemRemove`）: Multiple selection item remove button with font-related styles
- placeholder（`semantic-mark-placeholder`）: Placeholder element with font styles and colors for placeholder text
- popup.root（`semantic-mark-popup-root`）: Popup element with popup layer positioning, z-index, background, border, box-shadow and other popup container styles
- popup.list（`semantic-mark-popup-list`）: Popup list element with option list layout, scrolling, max-height and other list container styles
- popup.listItem（`semantic-mark-popup-listItem`）: Popup item element with option item padding, hover effects, selected states, disabled states and other option interactive styles

### Usage Example

```tsx
<Cascader
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    input: "semantic-mark-input",
    content: "semantic-mark-content",
    clear: "semantic-mark-clear",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemRemove: "semantic-mark-itemRemove",
    placeholder: "semantic-mark-placeholder",
    popup.root: "semantic-mark-popup-root",
    popup.list: "semantic-mark-popup-list",
    popup.listItem: "semantic-mark-popup-listItem"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="position: absolute; margin-bottom: 80px;">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Single">
                Single
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Multiple">
                Multiple
              </div>
            </label>
          </div>
        </div>
        <div class="ant-select ant-cascader ant-select-outlined semantic-mark-root ant-select-css-var ant-cascader-css-var css-var-test-id ant-select-multiple ant-select-allow-clear ant-select-show-arrow ant-select-open" style="width: 200px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content semantic-mark-content">
            <div class="ant-select-content-item" style="opacity: 1;">
              <span class="ant-select-selection-item semantic-mark-item" title="thinkasany">
                <span class="ant-select-selection-item-content semantic-mark-itemContent">
                  thinkasany
                </span>
                <span aria-hidden="true" class="ant-select-selection-item-remove semantic-mark-itemRemove" style="user-select: none;" unselectable="on">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </span>
              </span>
            </div>
            <div class="ant-select-content-item ant-select-content-item-suffix" style="opacity: 1;">
              <input aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="off" class="ant-select-input semantic-mark-input" id="test-id" readonly="" role="combobox" style="--select-input-width: 0;" type="search" value="">
            </div>
          </div>
          <div class="ant-select-suffix semantic-mark-suffix">
            <span aria-label="down" class="anticon anticon-down" role="img">
              <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
          </div>
          <div class="ant-select-clear semantic-mark-clear">
            <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
              <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div class="ant-select-dropdown ant-cascader-dropdown ant-select-css-var semantic-mark-popup-root ant-cascader-css-var css-var-test-id ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; min-width: auto;">
          <div>
            <div class="ant-cascader-menus">
              <ul class="ant-cascader-menu semantic-mark-popup-list" role="menu">
                <li aria-checked="false" class="ant-cascader-menu-item semantic-mark-popup-listItem ant-cascader-menu-item-expand ant-cascader-menu-item-active" data-path-key="contributors" role="menuitemcheckbox" title="contributors">
                  <span class="ant-cascader-checkbox ant-cascader-checkbox-indeterminate">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    contributors
                  </div>
                  <div class="ant-cascader-menu-item-expand-icon">
                    <span aria-label="right" class="anticon anticon-right" role="img">
                      <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                      </svg>
                    </span>
                  </div>
                </span></li>
              </ul>
              <ul class="ant-cascader-menu semantic-mark-popup-list" role="menu">
                <li aria-checked="false" class="ant-cascader-menu-item semantic-mark-popup-listItem" data-path-key="contributors__RC_CASCADER_SPLIT__aojunhao123" role="menuitemcheckbox" title="aojunhao123">
                  <span class="ant-cascader-checkbox">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    aojunhao123
                  </div>
                </span></li>
                <li aria-checked="true" class="ant-cascader-menu-item semantic-mark-popup-listItem ant-cascader-menu-item-active" data-path-key="contributors__RC_CASCADER_SPLIT__thinkasany" role="menuitemcheckbox" title="thinkasany">
                  <span class="ant-cascader-checkbox ant-cascader-checkbox-checked">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    thinkasany
                  </div>
                </span></li>
                <li aria-checked="false" class="ant-cascader-menu-item semantic-mark-popup-listItem" data-path-key="contributors__RC_CASCADER_SPLIT__meet-student" role="menuitemcheckbox" title="meet-student">
                  <span class="ant-cascader-checkbox">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    meet-student
                  </div>
                </span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
```

---

# checkbox Semantic

Source: https://ant.design/components/checkbox/semantic.md

## Checkbox

### Semantic Parts

- root（`semantic-mark-root`）: Root element with inline-flex layout, baseline alignment, cursor style, reset styles and other basic checkbox container styles
- icon（`semantic-mark-icon`）: Checkbox icon element with size, direction, background, border, border-radius, transitions, and checked state checkmark styles
- label（`semantic-mark-label`）: Label text element with padding and spacing styles relative to the checkbox

### Usage Example

```tsx
<Checkbox
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    label: "semantic-mark-label"
  }}
/>
```

### Abstract DOM Structure

```html
<label class="ant-checkbox-wrapper semantic-mark-root css-var-test-id ant-checkbox-css-var">
        <span class="ant-checkbox semantic-mark-icon ant-wave-target">
          <input class="ant-checkbox-input" type="checkbox">
        </span>
        <span class="ant-checkbox-label semantic-mark-label">
          Checkbox
        </span>
      </label>
```

---

# collapse Semantic

Source: https://ant.design/components/collapse/semantic.md

## Collapse

### Semantic Parts

- root（`semantic-mark-root`）: Root element with border, border-radius, background color and container styles that control the overall layout and appearance of collapse panels
- header（`semantic-mark-header`）: Header element with flex layout, padding, color, line-height, cursor style, transition animations and other interactive styles for panel headers
- title（`semantic-mark-title`）: Title element with flex auto layout and margin styles for title text layout and typography
- body（`semantic-mark-body`）: Body element with padding, color, background color and other styles for panel content area display
- icon（`semantic-mark-icon`）: Icon element with font size, transition animations, rotation transforms and other styles and animations for expand/collapse arrows

### Usage Example

```tsx
<Collapse
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; inset: 0; margin: 32px;">
        <div class="ant-collapse ant-collapse-icon-placement-start css-var-test-id semantic-mark-root">
          <div class="ant-collapse-item ant-collapse-item-active">
            <div aria-disabled="false" aria-expanded="true" class="ant-collapse-header semantic-mark-header" role="button" tabindex="0">
              <div class="ant-collapse-expand-icon semantic-mark-icon">
                <span aria-label="expanded" class="anticon anticon-right ant-collapse-arrow" role="img">
                  <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" style="transform: rotate(90deg);" viewBox="64 64 896 896" width="1em">
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                  </svg>
                </span>
              </div>
              <span class="ant-collapse-title semantic-mark-title">
                This is panel header
              </span>
            </div>
            <div class="ant-collapse-panel ant-collapse-panel-active">
              <div class="ant-collapse-body semantic-mark-body">
                <p>
                  This is panel body
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
```

---

# color-picker Semantic

Source: https://ant.design/components/color-picker/semantic.md

## ColorPicker

### Semantic Parts

- root（`semantic-mark-root`）: Trigger container with border styles, transition animations, size controls, displaying color block and text content
- body（`semantic-mark-body`）: Color block container with background color, border styles
- content（`semantic-mark-content`）: Color block element with actual selected color styles
- description（`semantic-mark-description`）: Description text content with font styles and color
- popup.root（`semantic-mark-popup-root`）: Popup panel root container with background color, shadow effects, color selection panel, slider controls and preset colors

### Usage Example

```tsx
<ColorPicker
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    body: "semantic-mark-body",
    content: "semantic-mark-content",
    description: "semantic-mark-description",
    popup.root: "semantic-mark-popup-root"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-flex-start ant-flex-gap-small" style="height: 300px;">
        <div aria-describedby="test-id" class="ant-color-picker-trigger css-var-test-id ant-color-picker-css-var ant-popover-open semantic-mark-root ant-color-picker-trigger-active">
          <div class="ant-color-picker-color-block semantic-mark-body">
            <div class="ant-color-picker-color-block-inner semantic-mark-content" style="background: rgb(22, 119, 255);">
          </div>
          <div class="ant-color-picker-trigger-text semantic-mark-description">
            #1677FF
          </div>
        </div>
        <div class="ant-popover ant-zoom-big-appear ant-zoom-big-appear-prepare ant-zoom-big ant-popover-css-var css-var-test-id css-var-test-id ant-color-picker css-var-test-id ant-color-picker-css-var semantic-mark-popup-root ant-popover-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1;">
          <div class="ant-popover-arrow" style="position: absolute;">
            <span class="ant-popover-arrow-content">
          </span></div>
          <div class="ant-popover-container" id="test-id" role="tooltip">
            <div class="ant-popover-content">
              <div class="ant-color-picker-inner">
                <div class="ant-color-picker-inner-content">
                  <div class="ant-color-picker-panel">
                    <div class="ant-color-picker-select">
                      <div class="ant-color-picker-palette" style="position: relative;">
                        <div style="position: absolute; left: 91.37254901960785%; top: 0%; z-index: 1; transform: translate(-50%, -50%);">
                          <div class="ant-color-picker-handler" style="background-color: rgb(22, 119, 255);">
                        </div>
                        <div class="ant-color-picker-saturation" style="background-color: rgb(0, 106, 255); background-image: linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));">
                      </div>
                    </div>
                    <div class="ant-color-picker-slider-container">
                      <div class="ant-color-picker-slider-group">
                        <div class="ant-slider ant-color-picker-slider css-var-test-id ant-slider-horizontal">
                          <div class="ant-slider-rail ant-color-picker-slider-rail" style="background: linear-gradient(90deg, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%);">
                          <div class="ant-slider-step">
                          <div aria-disabled="false" aria-orientation="horizontal" aria-valuemax="359" aria-valuemin="0" aria-valuenow="215" class="ant-slider-handle ant-slider-handle-1 ant-color-picker-slider-handle" role="slider" style="left: 59.888579387186624%; transform: translateX(-50%); background: rgb(0, 106, 255);" tabindex="0">
                        </div>
                        <div class="ant-slider ant-color-picker-slider css-var-test-id ant-slider-horizontal">
                          <div class="ant-slider-rail ant-color-picker-slider-rail" style="background: linear-gradient(90deg, rgba(255, 0, 4, 0) 0%, rgb(22,119,255) 100%);">
                          <div class="ant-slider-step">
                          <div aria-disabled="false" aria-orientation="horizontal" aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" class="ant-slider-handle ant-slider-handle-1 ant-color-picker-slider-handle" role="slider" style="left: 100%; transform: translateX(-50%); background: rgb(22, 119, 255);" tabindex="0">
                        </div>
                      </div>
                      <div class="ant-color-picker-color-block">
                        <div class="ant-color-picker-color-block-inner" style="background: rgb(22, 119, 255);">
                      </div>
                    </div>
                  </div>
                  <div class="ant-color-picker-input-container">
                    <div class="ant-select ant-select-sm ant-select-borderless ant-color-picker-format-select css-var-test-id ant-select-css-var ant-select-single ant-select-show-arrow">
                      <div class="ant-select-content ant-select-content-has-value" title="HEX">
                        HEX
                        <input aria-autocomplete="list" aria-expanded="false" aria-haspopup="listbox" autocomplete="off" class="ant-select-input" id="test-id" readonly="" role="combobox" type="search" value="">
                      </div>
                      <div class="ant-select-suffix">
                        <span aria-label="down" class="anticon anticon-down" role="img">
                          <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div class="ant-color-picker-input">
                      <span class="ant-input-affix-wrapper ant-input-affix-wrapper-sm ant-input-outlined ant-color-picker-hex-input css-var-test-id ant-input-css-var">
                        <span class="ant-input-prefix">
                          #
                        </span>
                        <input class="ant-input ant-input-sm" type="text" value="1677ff">
                      </span>
                    </div>
                    <div class="ant-input-number ant-input-number-mode-input css-var-test-id ant-input-number-css-var ant-color-picker-steppers ant-color-picker-alpha-input ant-input-number-outlined ant-input-number-sm">
                      <input aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" autocomplete="off" class="ant-input-number-input" role="spinbutton" step="1" value="100%">
                      <div class="ant-input-number-actions">
                        <span aria-disabled="true" aria-label="Increase Value" class="ant-input-number-action ant-input-number-action-up ant-input-number-action-up-disabled" role="button" unselectable="on">
                          <span aria-label="up" class="anticon anticon-up" role="img">
                            <svg aria-hidden="true" data-icon="up" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                              <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                            </svg>
                          </span>
                        </span>
                        <span aria-disabled="false" aria-label="Decrease Value" class="ant-input-number-action ant-input-number-action-down" role="button" unselectable="on">
                          <span aria-label="down" class="anticon anticon-down" role="img">
                            <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                              <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-color-picker-trigger css-var-test-id ant-color-picker-css-var semantic-mark-root">
          <div class="ant-color-picker-clear semantic-mark-body">
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              触发器容器，包含边框样式、过渡动画、尺寸控制等样式，显示颜色块和文本内容
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  body
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              色块容器，包含底色、边框等样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  content
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              色块颜色元素，包含实际选择的颜色样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  description
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              描述文本内容，包含字体样式、颜色等样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出面板根容器，包含背景色、阴影效果、色彩选择面板、滑块控制和预设颜色等样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div></div></div></div></div></div></div></div></div>
```

---

# date-picker Semantic

Source: https://ant.design/components/date-picker/semantic.md

## DatePicker

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-flex layout, padding, border-radius, transition animations and other basic styles for date picker container
- prefix（`semantic-mark-prefix`）: Prefix element with flex layout and margin styles for prefix content layout
- input（`semantic-mark-input`）: Input element with relative positioning, width, color, font, line-height, transition animations and other core interactive styles for input field
- suffix（`semantic-mark-suffix`）: Suffix element with flex layout, color, line-height, pointer events, transition animations and other styles for suffix content
- popup（`semantic-mark-popup`）: Popup element
- popup.container（`semantic-mark-popup-container`）: Container element, set background color, padding, border radius, shadow, border and content display styles
- popup.header（`semantic-mark-popup-header`）: Popup header element with navigation buttons, month/year selectors and other header control area layout and styles
- popup.body（`semantic-mark-popup-body`）: Popup body element with container layout and styles for date panel table
- popup.content（`semantic-mark-popup-content`）: Popup content element with width, border, cell and other content display styles for date table
- popup.item（`semantic-mark-popup-item`）: Popup item element with size, background, border-radius, hover state, selected state and other interactive styles for date cells
- popup.footer（`semantic-mark-popup-footer`）: Popup footer element with layout styles for bottom operation area including confirm/cancel buttons and shortcuts

### Usage Example

```tsx
<DatePicker
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    input: "semantic-mark-input",
    suffix: "semantic-mark-suffix",
    popup: "semantic-mark-popup",
    popup.container: "semantic-mark-popup-container",
    popup.header: "semantic-mark-popup-header",
    popup.body: "semantic-mark-popup-body",
    popup.content: "semantic-mark-popup-content",
    popup.item: "semantic-mark-popup-item",
    popup.footer: "semantic-mark-popup-footer"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="align-self: flex-start;">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Single">
                Single
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Multiple">
                Multiple
              </div>
            </label>
          </div>
        </div>
        <div class="ant-picker ant-picker-range ant-picker-outlined css-var-test-id ant-picker-css-var semantic-mark-root">
          <div class="ant-picker-prefix semantic-mark-prefix">
            <span aria-label="smile" class="anticon anticon-smile" role="img">
              <svg aria-hidden="true" data-icon="smile" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path>
              </svg>
            </span>
          </div>
          <div class="ant-picker-input ant-picker-input-active ant-picker-input-start">
            <input aria-invalid="false" autocomplete="off" class="semantic-mark-input" date-range="start" placeholder="Start date" size="12" value="">
          </div>
          <div class="ant-picker-range-separator">
            <span aria-label="to" class="ant-picker-separator">
              <span aria-label="swap-right" class="anticon anticon-swap-right" role="img">
                <svg aria-hidden="true" data-icon="swap-right" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                  <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
                </svg>
              </span>
            </span>
          </div>
          <div class="ant-picker-input ant-picker-input-end">
            <input aria-invalid="false" autocomplete="off" class="semantic-mark-input" date-range="end" placeholder="End date" size="12" value="">
          </div>
          <div class="ant-picker-active-bar" style="position: absolute; width: 0px; left: 0px;">
          <span class="ant-picker-suffix semantic-mark-suffix">
            <span aria-label="calendar" class="anticon anticon-calendar" role="img">
              <svg aria-hidden="true" data-icon="calendar" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
              </svg>
            </span>
          </span>
        </div>
        <div class="ant-picker-dropdown css-var-test-id ant-picker-css-var semantic-mark-popup-root ant-picker-dropdown-range ant-picker-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-picker-range-wrapper ant-picker-date-range-wrapper">
            <div class="ant-picker-range-arrow" style="left: 0px;">
            <div class="ant-picker-panel-container ant-picker-date-panel-container semantic-mark-popup-container" style="margin-left: 0px; margin-right: auto;" tabindex="-1">
              <div class="ant-picker-panel-layout">
                <div>
                  <div class="ant-picker-panels">
                    <div class="ant-picker-panel" tabindex="0">
                      <div class="ant-picker-date-panel">
                        <div class="ant-picker-header semantic-mark-popup-header">
                          <button aria-label="Last year (Control + left)" class="ant-picker-header-super-prev-btn" tabindex="-1" type="button">
                            <span class="ant-picker-super-prev-icon">
                          </span></button>
                          <button aria-label="Previous month (PageUp)" class="ant-picker-header-prev-btn" tabindex="-1" type="button">
                            <span class="ant-picker-prev-icon">
                          </span></button>
                          <div class="ant-picker-header-view">
                            <button aria-label="Choose a month" class="ant-picker-month-btn" tabindex="-1" type="button">
                              Nov
                            </button>
                            <button aria-label="Choose a year" class="ant-picker-year-btn" tabindex="-1" type="button">
                              2016
                            </button>
                          </div>
                          <button aria-label="Next month (PageDown)" class="ant-picker-header-next-btn" style="visibility: hidden;" tabindex="-1" type="button">
                            <span class="ant-picker-next-icon">
                          </span></button>
                          <button aria-label="Next year (Control + right)" class="ant-picker-header-super-next-btn" style="visibility: hidden;" tabindex="-1" type="button">
                            <span class="ant-picker-super-next-icon">
                          </span></button>
                        </div>
                        <div class="ant-picker-body semantic-mark-popup-body">
                          <table class="ant-picker-content semantic-mark-popup-content">
                            <thead>
                              <tr>
                                <th>
                                  Su
                                </th>
                                <th>
                                  Mo
                                </th>
                                <th>
                                  Tu
                                </th>
                                <th>
                                  We
                                </th>
                                <th>
                                  Th
                                </th>
                                <th>
                                  Fr
                                </th>
                                <th>
                                  Sa
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-10-30">
                                  <div class="ant-picker-cell-inner">
                                    30
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-10-31">
                                  <div class="ant-picker-cell-inner">
                                    31
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-01">
                                  <div class="ant-picker-cell-inner">
                                    1
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-02">
                                  <div class="ant-picker-cell-inner">
                                    2
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-03">
                                  <div class="ant-picker-cell-inner">
                                    3
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-04">
                                  <div class="ant-picker-cell-inner">
                                    4
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-05">
                                  <div class="ant-picker-cell-inner">
                                    5
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-06">
                                  <div class="ant-picker-cell-inner">
                                    6
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-07">
                                  <div class="ant-picker-cell-inner">
                                    7
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-08">
                                  <div class="ant-picker-cell-inner">
                                    8
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-09">
                                  <div class="ant-picker-cell-inner">
                                    9
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-10">
                                  <div class="ant-picker-cell-inner">
                                    10
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-11">
                                  <div class="ant-picker-cell-inner">
                                    11
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-12">
                                  <div class="ant-picker-cell-inner">
                                    12
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-13">
                                  <div class="ant-picker-cell-inner">
                                    13
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-14">
                                  <div class="ant-picker-cell-inner">
                                    14
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-15">
                                  <div class="ant-picker-cell-inner">
                                    15
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-16">
                                  <div class="ant-picker-cell-inner">
                                    16
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-17">
                                  <div class="ant-picker-cell-inner">
                                    17
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-18">
                                  <div class="ant-picker-cell-inner">
                                    18
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-19">
                                  <div class="ant-picker-cell-inner">
                                    19
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-20">
                                  <div class="ant-picker-cell-inner">
                                    20
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-21">
                                  <div class="ant-picker-cell-inner">
                                    21
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view ant-picker-cell-today" title="2016-11-22">
                                  <div class="ant-picker-cell-inner">
                                    22
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-23">
                                  <div class="ant-picker-cell-inner">
                                    23
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-24">
                                  <div class="ant-picker-cell-inner">
                                    24
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-25">
                                  <div class="ant-picker-cell-inner">
                                    25
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-26">
                                  <div class="ant-picker-cell-inner">
                                    26
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-27">
                                  <div class="ant-picker-cell-inner">
                                    27
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-28">
                                  <div class="ant-picker-cell-inner">
                                    28
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-29">
                                  <div class="ant-picker-cell-inner">
                                    29
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-11-30">
                                  <div class="ant-picker-cell-inner">
                                    30
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-01">
                                  <div class="ant-picker-cell-inner">
                                    1
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-02">
                                  <div class="ant-picker-cell-inner">
                                    2
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-03">
                                  <div class="ant-picker-cell-inner">
                                    3
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-04">
                                  <div class="ant-picker-cell-inner">
                                    4
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-05">
                                  <div class="ant-picker-cell-inner">
                                    5
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-06">
                                  <div class="ant-picker-cell-inner">
                                    6
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-07">
                                  <div class="ant-picker-cell-inner">
                                    7
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-08">
                                  <div class="ant-picker-cell-inner">
                                    8
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-09">
                                  <div class="ant-picker-cell-inner">
                                    9
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-12-10">
                                  <div class="ant-picker-cell-inner">
                                    10
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="ant-picker-panel" tabindex="0">
                      <div class="ant-picker-date-panel">
                        <div class="ant-picker-header semantic-mark-popup-header">
                          <button aria-label="Last year (Control + left)" class="ant-picker-header-super-prev-btn" style="visibility: hidden;" tabindex="-1" type="button">
                            <span class="ant-picker-super-prev-icon">
                          </span></button>
                          <button aria-label="Previous month (PageUp)" class="ant-picker-header-prev-btn" style="visibility: hidden;" tabindex="-1" type="button">
                            <span class="ant-picker-prev-icon">
                          </span></button>
                          <div class="ant-picker-header-view">
                            <button aria-label="Choose a month" class="ant-picker-month-btn" tabindex="-1" type="button">
                              Dec
                            </button>
                            <button aria-label="Choose a year" class="ant-picker-year-btn" tabindex="-1" type="button">
                              2016
                            </button>
                          </div>
                          <button aria-label="Next month (PageDown)" class="ant-picker-header-next-btn" tabindex="-1" type="button">
                            <span class="ant-picker-next-icon">
                          </span></button>
                          <button aria-label="Next year (Control + right)" class="ant-picker-header-super-next-btn" tabindex="-1" type="button">
                            <span class="ant-picker-super-next-icon">
                          </span></button>
                        </div>
                        <div class="ant-picker-body semantic-mark-popup-body">
                          <table class="ant-picker-content semantic-mark-popup-content">
                            <thead>
                              <tr>
                                <th>
                                  Su
                                </th>
                                <th>
                                  Mo
                                </th>
                                <th>
                                  Tu
                                </th>
                                <th>
                                  We
                                </th>
                                <th>
                                  Th
                                </th>
                                <th>
                                  Fr
                                </th>
                                <th>
                                  Sa
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-11-27">
                                  <div class="ant-picker-cell-inner">
                                    27
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-11-28">
                                  <div class="ant-picker-cell-inner">
                                    28
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-11-29">
                                  <div class="ant-picker-cell-inner">
                                    29
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2016-11-30">
                                  <div class="ant-picker-cell-inner">
                                    30
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-01">
                                  <div class="ant-picker-cell-inner">
                                    1
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-02">
                                  <div class="ant-picker-cell-inner">
                                    2
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-03">
                                  <div class="ant-picker-cell-inner">
                                    3
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-04">
                                  <div class="ant-picker-cell-inner">
                                    4
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-05">
                                  <div class="ant-picker-cell-inner">
                                    5
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-06">
                                  <div class="ant-picker-cell-inner">
                                    6
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-07">
                                  <div class="ant-picker-cell-inner">
                                    7
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-08">
                                  <div class="ant-picker-cell-inner">
                                    8
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-09">
                                  <div class="ant-picker-cell-inner">
                                    9
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-10">
                                  <div class="ant-picker-cell-inner">
                                    10
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-11">
                                  <div class="ant-picker-cell-inner">
                                    11
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-12">
                                  <div class="ant-picker-cell-inner">
                                    12
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-13">
                                  <div class="ant-picker-cell-inner">
                                    13
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-14">
                                  <div class="ant-picker-cell-inner">
                                    14
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-15">
                                  <div class="ant-picker-cell-inner">
                                    15
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-16">
                                  <div class="ant-picker-cell-inner">
                                    16
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-17">
                                  <div class="ant-picker-cell-inner">
                                    17
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-18">
                                  <div class="ant-picker-cell-inner">
                                    18
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-19">
                                  <div class="ant-picker-cell-inner">
                                    19
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-20">
                                  <div class="ant-picker-cell-inner">
                                    20
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-21">
                                  <div class="ant-picker-cell-inner">
                                    21
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-22">
                                  <div class="ant-picker-cell-inner">
                                    22
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-23">
                                  <div class="ant-picker-cell-inner">
                                    23
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-24">
                                  <div class="ant-picker-cell-inner">
                                    24
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-25">
                                  <div class="ant-picker-cell-inner">
                                    25
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-26">
                                  <div class="ant-picker-cell-inner">
                                    26
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-27">
                                  <div class="ant-picker-cell-inner">
                                    27
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-28">
                                  <div class="ant-picker-cell-inner">
                                    28
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-29">
                                  <div class="ant-picker-cell-inner">
                                    29
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-30">
                                  <div class="ant-picker-cell-inner">
                                    30
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item ant-picker-cell-in-view" title="2016-12-31">
                                  <div class="ant-picker-cell-inner">
                                    31
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2017-01-01">
                                  <div class="ant-picker-cell-inner">
                                    1
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2017-01-02">
                                  <div class="ant-picker-cell-inner">
                                    2
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2017-01-03">
                                  <div class="ant-picker-cell-inner">
                                    3
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2017-01-04">
                                  <div class="ant-picker-cell-inner">
                                    4
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2017-01-05">
                                  <div class="ant-picker-cell-inner">
                                    5
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2017-01-06">
                                  <div class="ant-picker-cell-inner">
                                    6
                                  </div>
                                </td>
                                <td class="ant-picker-cell semantic-mark-popup-item" title="2017-01-07">
                                  <div class="ant-picker-cell-inner">
                                    7
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ant-picker-footer semantic-mark-popup-footer">
                    <ul class="ant-picker-ranges">
                      <li class="ant-picker-ok">
                        <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" disabled="" type="button">
                          <span>
                            OK
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，包含相对定位、行内flex布局、内边距、边框圆角、过渡动画等日期选择器容器的基础样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  prefix
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              前缀元素，包含flex布局、右外边距等前缀内容的布局样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  input
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              输入框元素，包含相对定位、宽度、颜色、字体、行高、过渡动画等输入框的核心交互样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  suffix
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              后缀元素，包含flex布局、颜色、行高、指针事件、过渡动画等后缀内容的样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.container
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              容器元素，设置背景色、内边距、圆角、阴影、边框和内容展示样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.header
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框头部元素，包含导航按钮、月份年份选择器等头部控制区域的布局和样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.body
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框主体元素，包含日期面板表格的容器布局和样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.content
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框内容元素，包含日期表格的宽度、边框、单元格等内容展示样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.item
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框单项元素，包含日期单元格的尺寸、背景色、边框圆角、悬停态、选中态等交互样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.footer
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框底部元素，包含确认取消按钮、快捷选择等底部操作区域的布局样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
```

---

# descriptions Semantic

Source: https://ant.design/components/descriptions/semantic.md

## Descriptions

### Semantic Parts

- root（`semantic-mark-root`）: Root element with basic styles, reset styles, border styles, layout direction and other overall styles for description list container
- header（`semantic-mark-header`）: Header element with flex layout, alignment, bottom margin and other layout and style controls for header area
- title（`semantic-mark-title`）: Title element with text ellipsis, flex ratio, color, font weight, font size, line height and other title text styles
- extra（`semantic-mark-extra`）: Extra content element with left margin, color, font size and other styles for additional operation area
- label（`semantic-mark-label`）: Label element with color, font weight, font size, line height, text align, colon styles and other label text styles
- content（`semantic-mark-content`）: Content element with table cell layout, color, font size, line height, word break and other content display styles

### Usage Example

```tsx
<Descriptions
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    extra: "semantic-mark-extra",
    label: "semantic-mark-label",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%; height: 100%;">
        <button aria-checked="false" class="ant-switch css-var-test-id" role="switch" type="button">
          <div class="ant-switch-handle">
          <span class="ant-switch-inner">
            <span class="ant-switch-inner-checked">
            <span class="ant-switch-inner-unchecked">
          </span>
        </span></span></div></button>
        Toggle Border
        <div class="ant-divider css-var-test-id ant-divider-horizontal ant-divider-rail" role="separator">
        <div class="ant-descriptions semantic-mark-root css-var-test-id">
          <div class="ant-descriptions-header semantic-mark-header">
            <div class="ant-descriptions-title semantic-mark-title">
              User Info
            </div>
            <div class="ant-descriptions-extra semantic-mark-extra">
              <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
                <span>
                  Edit
                </span>
              </button>
            </div>
          </div>
          <div class="ant-descriptions-view">
            <table>
              <tbody>
                <tr class="ant-descriptions-row">
                  <td class="ant-descriptions-item" colspan="1">
                    <div class="ant-descriptions-item-container">
                      <span class="ant-descriptions-item-label semantic-mark-label">
                        Telephone
                      </span>
                      <span class="ant-descriptions-item-content semantic-mark-content">
                        1810000000
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
```

---

# divider Semantic

Source: https://ant.design/components/divider/semantic.md

## Divider

### Semantic Parts

- root（`semantic-mark-root`）: Root element with border-top style, divider styling and other basic divider container styles
- content（`semantic-mark-content`）: Content element with inline-block display, padding and other divider text content styles
- rail（`semantic-mark-rail`）: Background rail element with border-top style and other divider connection line styles

### Usage Example

```tsx
<Divider
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content",
    rail: "semantic-mark-rail"
  }}
/>
```

### Abstract DOM Structure

```html
<div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <div class="ant-divider css-var-test-id ant-divider-horizontal ant-divider-rail semantic-mark-rail semantic-mark-root" role="separator">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <div class="ant-divider css-var-test-id ant-divider-horizontal ant-divider-with-text ant-divider-with-text-center semantic-mark-root" role="separator">
          <div class="ant-divider-rail ant-divider-rail-start semantic-mark-rail">
          <span class="ant-divider-inner-text semantic-mark-content">
            Solid
          </span>
          <div class="ant-divider-rail ant-divider-rail-end semantic-mark-rail">
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <div class="ant-divider css-var-test-id ant-divider-horizontal ant-divider-with-text ant-divider-with-text-start ant-divider-dotted semantic-mark-root" role="separator">
          <div class="ant-divider-rail ant-divider-rail-start semantic-mark-rail">
          <span class="ant-divider-inner-text semantic-mark-content">
            Dotted
          </span>
          <div class="ant-divider-rail ant-divider-rail-end semantic-mark-rail">
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <div class="ant-divider css-var-test-id ant-divider-horizontal ant-divider-with-text ant-divider-with-text-end ant-divider-dashed semantic-mark-root" role="separator">
          <div class="ant-divider-rail ant-divider-rail-start semantic-mark-rail">
          <span class="ant-divider-inner-text semantic-mark-content">
            Dashed
          </span>
          <div class="ant-divider-rail ant-divider-rail-end semantic-mark-rail">
        </div>
        These
        <div class="ant-divider css-var-test-id ant-divider-vertical ant-divider-rail semantic-mark-rail semantic-mark-root" role="separator">
        are
        <div class="ant-divider css-var-test-id ant-divider-vertical ant-divider-rail semantic-mark-rail semantic-mark-root" role="separator">
        vertical
        <div class="ant-divider css-var-test-id ant-divider-vertical ant-divider-rail semantic-mark-rail semantic-mark-root" role="separator">
        Dividers
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，包含边框顶部样式、分隔线样式等分割线容器的基础样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  rail
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              背景条元素，包含边框顶部样式等分割线连接条的样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  content
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              内容元素，包含行内块显示、内边距等分割线文本内容的样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div></div></div></div></div></div></div></div>
```

---

# drawer Semantic

Source: https://ant.design/components/drawer/semantic.md

## Drawer

### Semantic Parts

- root（`semantic-mark-root`）: Root element with fixed positioning, z-index control, pointer events, color and other basic styles and layout control for drawer container
- mask（`semantic-mark-mask`）: Mask element with absolute positioning, z-index, background color, pointer events and other mask layer styles and interaction controls
- section（`semantic-mark-section`）: Drawer container element with flex layout, width/height, overflow control, background color, pointer events and other drawer body styles
- header（`semantic-mark-header`）: Header element with flex layout, alignment, padding, font size, line height, bottom border and other header area styles
- body（`semantic-mark-body`）: Body element with flex ratio, minimum size, padding, overflow scroll and other content area display and layout styles
- footer（`semantic-mark-footer`）: Footer element with flex shrink, padding, top border and other bottom operation area styles
- title（`semantic-mark-title`）: Title element with flex ratio, margin, font weight, font size, line height and other title text styles
- extra（`semantic-mark-extra`）: Extra element with flex fixed layout and other additional operation content style controls
- dragger（`semantic-mark-dragger`）: Dragger element used to resize the drawer, with absolute positioning, transparent background, pointer events control, hover state styles, and dragging state styles
- close（`semantic-mark-close`）: Close button element with basic button styling

### Usage Example

```tsx
<Drawer
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    mask: "semantic-mark-mask",
    section: "semantic-mark-section",
    header: "semantic-mark-header",
    body: "semantic-mark-body",
    footer: "semantic-mark-footer",
    title: "semantic-mark-title",
    extra: "semantic-mark-extra",
    dragger: "semantic-mark-dragger",
    close: "semantic-mark-close"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-drawer ant-drawer-right css-var-test-id semantic-mark-root ant-drawer-open ant-drawer-inline" tabindex="-1">
        <div class="ant-drawer-mask semantic-mark-mask">
        <div class="ant-drawer-content-wrapper" style="width: 300px;">
          <div class="ant-drawer-resizable-dragger ant-drawer-resizable-dragger-right ant-drawer-resizable-dragger-horizontal semantic-mark-dragger">
          <div aria-labelledby="test-id" aria-modal="true" class="ant-drawer-section semantic-mark-section" role="dialog">
            <div class="ant-drawer-header semantic-mark-header">
              <div class="ant-drawer-header-title">
                <button aria-label="Close" class="ant-drawer-close semantic-mark-close" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
                <div class="ant-drawer-title semantic-mark-title" id="test-id">
                  Title
                </div>
              </div>
              <div class="ant-drawer-extra semantic-mark-extra">
                <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
                  <span>
                    Cancel
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-drawer-body semantic-mark-body">
              <p>
                Some contents...
              </p>
            </div>
            <div class="ant-drawer-footer semantic-mark-footer">
              <a class="ant-typography ant-typography-link css-var-test-id">
                Footer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.0.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，包含固定定位、层级控制、指针事件、颜色等抽屉容器的基础样式和布局控制
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  mask
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.13.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              遮罩层元素，包含绝对定位、层级、背景色、指针事件等遮罩层的样式和交互控制
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  section
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.0.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              Drawer 容器元素，包含flex布局、宽高、溢出控制、背景色、指针事件等抽屉主体的样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  header
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.13.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              头部元素，包含flex布局、对齐方式、内边距、字体大小、行高、下边框等头部区域的样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  title
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.0.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              标题元素，包含flex占比、外边距、字体权重、字体大小、行高等标题文字的样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  extra
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.0.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              额外元素，包含flex固定布局等额外操作内容的样式控制
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  body
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.13.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              内容元素，包含flex占比、最小尺寸、内边距、溢出滚动等内容区域的展示和布局样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  footer
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.13.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              底部元素，包含flex收缩、内边距、上边框等底部操作区域的样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  dragger
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.0.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              拖拽元素，用于调整抽屉大小的拖拽手柄，包含绝对定位、背景透明、指针事件控制、hover状态样式、拖拽状态样式等
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  close
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.1.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              关闭按钮元素，包含按钮的基础样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
```

---

# dropdown Semantic

Source: https://ant.design/components/dropdown/semantic.md

## Dropdown

### Semantic Parts

- root（`semantic-mark-root`）: Root element of dropdown, sets positioning, z-index and container styles
- itemTitle（`semantic-mark-itemTitle`）: Title content area of dropdown option, sets layout and text styles
- item（`semantic-mark-item`）: Individual dropdown option element, sets interaction states and background styles
- itemContent（`semantic-mark-itemContent`）: Main content area of dropdown option, sets content layout and link styles
- itemIcon（`semantic-mark-itemIcon`）: Icon area of dropdown option, sets icon size and spacing styles

### Usage Example

```tsx
<Dropdown
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    itemTitle: "semantic-mark-itemTitle",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemIcon: "semantic-mark-itemIcon"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="height: 120px; position: absolute; top: 50px;">
        <a class="ant-dropdown-trigger ant-dropdown-open">
          <div class="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small css-var-test-id">
            <div class="ant-space-item">
              Hover me
            </div>
            <div class="ant-space-item">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </div>
          </div>
        </a>
        <div class="ant-dropdown ant-slide-up-appear ant-slide-up-appear-prepare ant-slide-up css-var-test-id ant-dropdown-css-var semantic-mark-root ant-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1; width: 200px;">
          <ul class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light css-var-test-id ant-dropdown-css-var css-var-test-id ant-dropdown-menu-css-var" data-menu-list="true" role="menu" tabindex="0">
            <li class="ant-dropdown-menu-item-group" role="presentation">
              <div class="ant-dropdown-menu-item-group-title semantic-mark-itemTitle" role="presentation" title="Group title">
                Group title
              </div>
              <ul class="ant-dropdown-menu-item-group-list" role="group">
                <li class="ant-dropdown-menu-item semantic-mark-item" data-menu-id="rc-menu-uuid-1-1" role="menuitem" tabindex="-1">
                  <span aria-label="save" class="anticon anticon-save ant-dropdown-menu-item-icon semantic-mark-itemIcon" role="img">
                    <svg aria-hidden="true" data-icon="save" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"></path>
                    </svg>
                  </span>
                  <span class="ant-dropdown-menu-title-content semantic-mark-itemContent">
                    1st menu item
                  </span>
                </li>
                <li class="ant-dropdown-menu-item semantic-mark-item" data-menu-id="rc-menu-uuid-1-2" role="menuitem" tabindex="-1">
                  <span aria-label="edit" class="anticon anticon-edit ant-dropdown-menu-item-icon semantic-mark-itemIcon" role="img">
                    <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                    </svg>
                  </span>
                  <span class="ant-dropdown-menu-title-content semantic-mark-itemContent">
                    2nd menu item
                  </span>
                </li>
              </ul>
            </li>
            <li class="ant-dropdown-menu-submenu ant-dropdown-menu-submenu-vertical ant-dropdown-menu-submenu-open" role="none">
              <div aria-controls="rc-menu-uuid-SubMenu-popup" aria-expanded="true" aria-haspopup="true" class="ant-dropdown-menu-submenu-title" data-menu-id="rc-menu-uuid-SubMenu" role="menuitem" tabindex="-1">
                <span class="ant-dropdown-menu-title-content">
                  SubMenu
                </span>
                <span class="ant-dropdown-menu-submenu-expand-icon ant-dropdown-menu-submenu-arrow">
                  <span aria-label="right" class="anticon anticon-right ant-dropdown-menu-submenu-arrow-icon" role="img">
                    <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                    </svg>
                  </span>
                </span>
              </div>
            </li>
            <li class="ant-dropdown-menu-item-divider" role="separator">
            </li><li class="ant-dropdown-menu-item semantic-mark-item ant-dropdown-menu-item-danger" data-menu-id="rc-menu-uuid-4" role="menuitem" tabindex="-1">
              <span aria-label="delete" class="anticon anticon-delete ant-dropdown-menu-item-icon semantic-mark-itemIcon" role="img">
                <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                </svg>
              </span>
              <span class="ant-dropdown-menu-title-content semantic-mark-itemContent">
                Delete
              </span>
            </li>
          </ul>
          <div aria-hidden="true" style="display: none;">
        </div>
      </div>
    </div>
```

---

# empty Semantic

Source: https://ant.design/components/empty/semantic.md

## Empty

### Semantic Parts

- root（`semantic-mark-root`）: Root element, sets text alignment, font and line height styles
- image（`semantic-mark-image`）: Image element, sets height, opacity, margin and image styles
- description（`semantic-mark-description`）: Description element, sets text color styles
- footer（`semantic-mark-footer`）: Footer element, sets top margin and action button styles

### Usage Example

```tsx
<Empty
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    image: "semantic-mark-image",
    description: "semantic-mark-description",
    footer: "semantic-mark-footer"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="css-var-test-id ant-empty ant-empty-normal semantic-mark-root">
        <div class="ant-empty-image semantic-mark-image" style="height: 60px;">
          <svg height="41" viewBox="0 0 64 41" width="64" xmlns="http://www.w3.org/2000/svg">
            <title>
              No data
            </title>
            <g fill="none" fill-rule="evenodd" transform="translate(0 1)">
              <ellipse cx="32" cy="33" fill="#f5f5f5" rx="32" ry="7"></ellipse>
              <g fill-rule="nonzero" stroke="#d9d9d9">
                <path d="M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z"></path>
                <path d="M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3" fill="#fafafa"></path>
              </g>
            </g>
          </svg>
        </div>
        <div class="ant-empty-description semantic-mark-description">
          <span class="ant-typography css-var-test-id">
            Customize 
            <a href="#API">
              Description
            </a>
          </span>
        </div>
        <div class="ant-empty-footer semantic-mark-footer">
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
            <span>
              Create Now
            </span>
          </button>
        </div>
      </div>
```

---

# float-button Group Semantic

Source: https://ant.design/components/float-button/semantic_group.md

## FloatButton.Group

### Semantic Parts

- root（`semantic-mark-root`）: Root element with float button group container styles, fixed positioning, z-index, padding, gap, direction mode and other combined layout styles
- list（`semantic-mark-list`）: List element with button group list flex layout, border radius, shadow, animation transition, vertical alignment and other list container styles
- item（`semantic-mark-item`）: Item element with individual float button styles, size, shape, type, state, icon content and other button base styles
- itemIcon（`semantic-mark-itemIcon`）: Item icon element with float button icon size, color, alignment and other icon display styles
- itemContent（`semantic-mark-itemContent`）: Item content element with float button text content, badge, description and other content area styles
- trigger（`semantic-mark-trigger`）: Trigger element with menu mode trigger button styles, shape, icon, hover state, expand/collapse state and other interaction styles
- triggerIcon（`semantic-mark-triggerIcon`）: Trigger icon element with trigger button icon styles, rotation animation, toggle state and other icon interaction styles
- triggerContent（`semantic-mark-triggerContent`）: Trigger content element with trigger button content area text, identifier, state indicator and other content styles

### Usage Example

```tsx
<FloatButton.Group
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    list: "semantic-mark-list",
    item: "semantic-mark-item",
    itemIcon: "semantic-mark-itemIcon",
    itemContent: "semantic-mark-itemContent",
    trigger: "semantic-mark-trigger",
    triggerIcon: "semantic-mark-triggerIcon",
    triggerContent: "semantic-mark-triggerContent"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-float-btn-group css-var-test-id ant-float-btn-css-var semantic-mark-root ant-float-btn-pure ant-float-btn-group-top ant-float-btn-group-menu-mode">
        <div class="ant-space-compact ant-space-compact-vertical ant-float-btn-group-list semantic-mark-list">
          <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-lg ant-btn-compact-vertical-item ant-btn-compact-vertical-first-item css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-default ant-float-btn-square semantic-mark-item" type="button">
            <span class="ant-btn-icon ant-float-btn-icon semantic-mark-itemIcon">
              <span aria-label="alert" class="anticon anticon-alert" role="img">
                <svg aria-hidden="true" data-icon="alert" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 00-11.3 0l-39.6 39.6a8.03 8.03 0 000 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 00-11.3 0l-67.9 67.9a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-float-btn-content semantic-mark-itemContent">
              warn
            </span>
          </button>
          <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-lg ant-btn-compact-vertical-item css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-default ant-float-btn-square semantic-mark-item" type="button">
            <span class="ant-btn-icon ant-float-btn-icon semantic-mark-itemIcon">
              <span aria-label="bug" class="anticon anticon-bug" role="img">
                <svg aria-hidden="true" data-icon="bug" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M304 280h56c4.4 0 8-3.6 8-8 0-28.3 5.9-53.2 17.1-73.5 10.6-19.4 26-34.8 45.4-45.4C450.9 142 475.7 136 504 136h16c28.3 0 53.2 5.9 73.5 17.1 19.4 10.6 34.8 26 45.4 45.4C650 218.9 656 243.7 656 272c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-40-8.8-76.7-25.9-108.1a184.31 184.31 0 00-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9a184.31 184.31 0 00-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8z"></path>
                  <path d="M940 512H792V412c76.8 0 139-62.2 139-139 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8a63 63 0 01-63 63H232a63 63 0 01-63-63c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5.2 13 .7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-44.2 23.9-82.9 59.6-103.7a273 273 0 0022.7 49c24.3 41.5 59 76.2 100.5 100.5S460.5 960 512 960s99.8-13.9 141.3-38.2a281.38 281.38 0 00123.2-149.5A120 120 0 01836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-79.3-48.1-147.4-116.7-176.7.4-6.4.7-12.8.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM716 680c0 36.8-9.7 72-27.8 102.9-17.7 30.3-43 55.6-73.3 73.3C584 874.3 548.8 884 512 884s-72-9.7-102.9-27.8c-30.3-17.7-55.6-43-73.3-73.3A202.75 202.75 0 01308 680V412h408v268z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-float-btn-content semantic-mark-itemContent">
              bug
            </span>
          </button>
          <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-lg ant-btn-compact-vertical-item ant-btn-compact-vertical-last-item css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-default ant-float-btn-square semantic-mark-item" type="button">
            <span class="ant-btn-icon ant-float-btn-icon semantic-mark-itemIcon">
              <span aria-label="bulb" class="anticon anticon-bulb" role="img">
                <svg aria-hidden="true" data-icon="bulb" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M632 888H392c-4.4 0-8 3.6-8 8v32c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-32c0-4.4-3.6-8-8-8zM512 64c-181.1 0-328 146.9-328 328 0 121.4 66 227.4 164 284.1V792c0 17.7 14.3 32 32 32h264c17.7 0 32-14.3 32-32V676.1c98-56.7 164-162.7 164-284.1 0-181.1-146.9-328-328-328zm127.9 549.8L604 634.6V752H420V634.6l-35.9-20.8C305.4 568.3 256 484.5 256 392c0-141.4 114.6-256 256-256s256 114.6 256 256c0 92.5-49.4 176.3-128.1 221.8z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-float-btn-content semantic-mark-itemContent">
              idea
            </span>
          </button>
        </div>
        <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-lg css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-group-trigger ant-float-btn-primary ant-float-btn-square ant-float-btn-individual semantic-mark-trigger" type="button">
          <span class="ant-btn-icon ant-float-btn-icon semantic-mark-triggerIcon">
            <span aria-label="close" class="anticon anticon-close" role="img">
              <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
              </svg>
            </span>
          </span>
          <span class="ant-float-btn-content semantic-mark-triggerContent">
            back
          </span>
        </button>
      </div>
```

---

# float-button Semantic

Source: https://ant.design/components/float-button/semantic.md

## FloatButton

### Semantic Parts

- root（`semantic-mark-root`）: Root element with float button base styles, shape size, type theme, fixed positioning, z-index, shadow, spacing and other container styles
- content（`semantic-mark-content`）: Content element with button text content font size, color, alignment, line wrap and other text display styles
- icon（`semantic-mark-icon`）: Icon element with button icon size, color, line height, alignment and other icon display styles

### Usage Example

```tsx
<FloatButton
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-lg css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-pure ant-float-btn-primary ant-float-btn-square ant-float-btn-individual semantic-mark-root" type="button">
        <span class="ant-btn-icon ant-float-btn-icon semantic-mark-icon">
          <span aria-label="question-circle" class="anticon anticon-question-circle" role="img">
            <svg aria-hidden="true" data-icon="question-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path>
            </svg>
          </span>
        </span>
        <span class="ant-float-btn-content semantic-mark-content">
          HELP
        </span>
      </button>
```

---

# form Semantic

Source: https://ant.design/components/form/semantic.md

## Form

### Semantic Parts

- root（`semantic-mark-root`）: Root element with form item margin-bottom, vertical-align, transitions, hidden states, error/warning states and other basic form item container styles
- label（`semantic-mark-label`）: Label element with flex layout, overflow hidden, whitespace nowrap, text alignment, vertical alignment, plus label color, font size, height, required marks and other label display styles
- content（`semantic-mark-content`）: Content element with form content area layout, styling and control container related styles

### Usage Example

```tsx
<Form
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    label: "semantic-mark-label",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<form autocomplete="off" class="ant-form ant-form-horizontal css-var-test-id ant-form-css-var semantic-mark-root" id="basic" style="max-width: 600px;">
        <div class="ant-form-item css-var-test-id ant-form-css-var ant-form-item-horizontal">
          <div class="ant-row ant-form-item-row css-var-test-id">
            <div class="ant-col ant-col-8 ant-form-item-label css-var-test-id">
              <label class="semantic-mark-label ant-form-item-required" for="basic_username" title="Username">
                Username
              </label>
            </div>
            <div class="ant-col ant-col-16 ant-form-item-control css-var-test-id">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content semantic-mark-content">
                  <input aria-required="true" class="ant-input ant-input-outlined css-var-test-id ant-input-css-var" id="basic_username" type="text" value="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-form-item css-var-test-id ant-form-css-var ant-form-item-horizontal">
          <div class="ant-row ant-form-item-row css-var-test-id">
            <div class="ant-col ant-col-8 ant-form-item-label css-var-test-id">
              <label class="semantic-mark-label ant-form-item-required" for="basic_password" title="Password">
                Password
              </label>
            </div>
            <div class="ant-col ant-col-16 ant-form-item-control css-var-test-id">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content semantic-mark-content">
                  <span class="ant-input-affix-wrapper ant-input-outlined ant-input-password css-var-test-id ant-input-css-var">
                    <input aria-required="true" class="ant-input" id="basic_password" type="password" value="">
                    <span class="ant-input-suffix">
                      <span aria-label="eye-invisible" class="anticon anticon-eye-invisible ant-input-password-icon" role="img" tabindex="-1">
                        <svg aria-hidden="true" data-icon="eye-invisible" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                          <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                        </svg>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
```

---

# image Semantic

Source: https://ant.design/components/image/semantic.md

## Image

### Semantic Parts

- root（`semantic-mark-root`）: Root element, sets relative positioning and inline-block layout styles
- image（`semantic-mark-image`）: Image element, sets width, height and vertical alignment styles
- cover（`semantic-mark-cover`）: Image hover display prompt element, sets absolute positioning, background color, opacity and transition animation styles
- popup.root（`semantic-mark-popup-root`）: Preview root element, sets fixed positioning, z-index and background mask styles
- popup.mask（`semantic-mark-popup-mask`）: Preview mask element, sets absolute positioning and semi-transparent background styles
- popup.body（`semantic-mark-popup-body`）: Preview body element, sets flex layout, center alignment and pointer event styles
- popup.footer（`semantic-mark-popup-footer`）: Preview footer element, sets absolute positioning, center layout and bottom operation area styles
- popup.actions（`semantic-mark-popup-actions`）: Preview actions group element, sets flex layout, background color, border radius and action button styles

### Usage Example

```tsx
<Image
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    image: "semantic-mark-image",
    cover: "semantic-mark-cover",
    popup.root: "semantic-mark-popup-root",
    popup.mask: "semantic-mark-popup-mask",
    popup.body: "semantic-mark-popup-body",
    popup.footer: "semantic-mark-popup-footer",
    popup.actions: "semantic-mark-popup-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-vertical" style="min-height: 100%; width: 100%;">
        <div class="ant-flex css-var-test-id ant-flex-justify-center" style="padding: 16px; flex: 0 0 auto;">
          <div class="ant-image css-var-test-id ant-image-css-var semantic-mark-root" style="width: 200px;">
            <img class="ant-image-img semantic-mark-image" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" width="200">
            <div class="ant-image-cover semantic-mark-cover acss-e54699 ant-image-cover-center">
          </div>
        </div>
        <div style="flex: 1 1 0%; position: relative; min-height: 500px; width: 100%;">
          <div class="ant-image-preview css-var-test-id ant-image-css-var semantic-mark-popup-root" style="position: absolute;">
            <div class="ant-image-preview-mask semantic-mark-popup-mask">
            <div class="ant-image-preview-body semantic-mark-popup-body">
              <img class="ant-image-preview-img" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="transform: translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg);">
            </div>
            <button class="ant-image-preview-close">
              <span aria-label="close" class="anticon anticon-close" role="img">
                <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </span>
            </button>
            <div class="ant-image-preview-switch ant-image-preview-switch-prev ant-image-preview-switch-disabled">
              <span aria-label="left" class="anticon anticon-left" role="img">
                <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                </svg>
              </span>
            </div>
            <div class="ant-image-preview-switch ant-image-preview-switch-next">
              <span aria-label="right" class="anticon anticon-right" role="img">
                <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                </svg>
              </span>
            </div>
            <div class="ant-image-preview-footer semantic-mark-popup-footer">
              <div class="ant-image-preview-progress">
                <bdi>
                  1 / 2
                </bdi>
              </div>
              <div class="ant-image-preview-actions semantic-mark-popup-actions">
                <div class="ant-image-preview-actions-action ant-image-preview-actions-action-flipY">
                  <span aria-label="swap" class="anticon anticon-swap" role="img">
                    <svg aria-hidden="true" data-icon="swap" fill="currentColor" focusable="false" height="1em" style="transform: rotate(90deg);" viewBox="64 64 896 896" width="1em">
                      <path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                  </span>
                </div>
                <div class="ant-image-preview-actions-action ant-image-preview-actions-action-flipX">
                  <span aria-label="swap" class="anticon anticon-swap" role="img">
                    <svg aria-hidden="true" data-icon="swap" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                  </span>
                </div>
                <div class="ant-image-preview-actions-action ant-image-preview-actions-action-rotateLeft">
                  <span aria-label="rotate-left" class="anticon anticon-rotate-left" role="img">
                    <svg aria-hidden="true" data-icon="rotate-left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <defs>
                        <style></style>
                      </defs>
                      <path d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"></path>
                      <path d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"></path>
                    </svg>
                  </span>
                </div>
                <div class="ant-image-preview-actions-action ant-image-preview-actions-action-rotateRight">
                  <span aria-label="rotate-right" class="anticon anticon-rotate-right" role="img">
                    <svg aria-hidden="true" data-icon="rotate-right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <defs>
                        <style></style>
                      </defs>
                      <path d="M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z"></path>
                      <path d="M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z"></path>
                    </svg>
                  </span>
                </div>
                <div class="ant-image-preview-actions-action ant-image-preview-actions-action-zoomOut ant-image-preview-actions-action-disabled">
                  <span aria-label="zoom-out" class="anticon anticon-zoom-out" role="img">
                    <svg aria-hidden="true" data-icon="zoom-out" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path>
                    </svg>
                  </span>
                </div>
                <div class="ant-image-preview-actions-action ant-image-preview-actions-action-zoomIn">
                  <span aria-label="zoom-in" class="anticon anticon-zoom-in" role="img">
                    <svg aria-hidden="true" data-icon="zoom-in" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，设置相对定位和行内块布局样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  image
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              图片元素，设置宽度、高度和垂直对齐样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  cover
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              悬浮图片显示的提示元素，设置绝对定位、背景色、透明度和过渡动画样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              预览根元素，设置固定定位、层级和背景遮罩样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.mask
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              预览遮罩元素，设置绝对定位和半透明背景样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.body
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              预览内容元素，设置flex布局、居中对齐和指针事件样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.footer
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              预览页脚元素，设置绝对定位、居中布局和底部操作区域样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.actions
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              预览操作组元素，设置flex布局、背景色、圆角和操作按钮样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
```

---

# input Input Semantic

Source: https://ant.design/components/input/semantic_input.md

## Input.Input

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-block display, width, min-width, padding, colors, fonts, line-height, border-radius, transitions and other input container basic styles
- input（`semantic-mark-input`）: Input element with core interactive styles and text input related styling
- prefix（`semantic-mark-prefix`）: Prefix wrapper element with layout and styling for prefix content
- suffix（`semantic-mark-suffix`）: Suffix wrapper element with layout and styling for suffix content
- count（`semantic-mark-count`）: Character count element with font and color styles for count display

### Usage Example

```tsx
<Input.Input
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-outlined css-var-test-id ant-input-css-var semantic-mark-root">
        <span class="ant-input-prefix semantic-mark-prefix">
          <span aria-label="user" class="anticon anticon-user" role="img">
            <svg aria-hidden="true" data-icon="user" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
            </svg>
          </span>
        </span>
        <input class="ant-input semantic-mark-input" type="text" value="Hello, Ant Design">
        <span class="ant-input-suffix semantic-mark-suffix">
          <span class="ant-input-show-count-suffix ant-input-show-count-has-suffix semantic-mark-count">
            17
          </span>
          <span aria-label="edit" class="anticon anticon-edit" role="img">
            <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
            </svg>
          </span>
        </span>
      </span>
```

---

# input Otp Semantic

Source: https://ant.design/components/input/semantic_otp.md

## Input.Otp

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set inline flex layout, alignment, column gap and wrapper styles
- input（`semantic-mark-input`）: Input element, set text center, padding and number input styles
- separator（`semantic-mark-separator`）: Separator element, set separator display styles between OTP input boxes

### Usage Example

```tsx
<Input.Otp
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    separator: "semantic-mark-separator"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-otp css-var-test-id semantic-mark-root" role="group">
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 1" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 2" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 3" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 4" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 5" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 6" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
      </div>
```

---

# input Password Semantic

Source: https://ant.design/components/input/semantic_password.md

## Input.Password

### Semantic Parts

- root（`semantic-mark-root`）: root element
- input（`semantic-mark-input`）: input element
- prefix（`semantic-mark-prefix`）: prefix element
- suffix（`semantic-mark-suffix`）: suffix element
- count（`semantic-mark-count`）: count element

### Usage Example

```tsx
<Input.Password
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-outlined ant-input-password css-var-test-id ant-input-css-var semantic-mark-root">
        <span class="ant-input-prefix semantic-mark-prefix">
          <span aria-label="user" class="anticon anticon-user" role="img">
            <svg aria-hidden="true" data-icon="user" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
            </svg>
          </span>
        </span>
        <input class="ant-input semantic-mark-input" type="password" value="Hello, Ant Design">
        <span class="ant-input-suffix semantic-mark-suffix">
          <span class="ant-input-show-count-suffix ant-input-show-count-has-suffix semantic-mark-count">
            17
          </span>
          <span aria-label="eye-invisible" class="anticon anticon-eye-invisible ant-input-password-icon" role="img" tabindex="-1">
            <svg aria-hidden="true" data-icon="eye-invisible" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
              <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
            </svg>
          </span>
          <span aria-label="edit" class="anticon anticon-edit" role="img">
            <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
            </svg>
          </span>
        </span>
      </span>
```

---

# input Search Semantic

Source: https://ant.design/components/input/semantic_search.md

## Input.Search

### Semantic Parts

- root（`semantic-mark-root`）: root element
- input（`semantic-mark-input`）: input element
- prefix（`semantic-mark-prefix`）: prefix element
- suffix（`semantic-mark-suffix`）: suffix element
- count（`semantic-mark-count`）: count element
- button.root（`semantic-mark-button-root`）: button root element
- button.icon（`semantic-mark-button-icon`）: button icon element
- button.content（`semantic-mark-button-content`）: button content element

### Usage Example

```tsx
<Input.Search
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    count: "semantic-mark-count",
    button.root: "semantic-mark-button-root",
    button.icon: "semantic-mark-button-icon",
    button.content: "semantic-mark-button-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-space-compact ant-input-search css-var-test-id ant-input-search-with-button semantic-mark-root">
        <span class="ant-input-affix-wrapper ant-input-outlined css-var-test-id ant-input-css-var ant-input-compact-item ant-input-compact-first-item">
          <span class="ant-input-prefix semantic-mark-prefix">
            <span aria-label="user" class="anticon anticon-user" role="img">
              <svg aria-hidden="true" data-icon="user" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
              </svg>
            </span>
          </span>
          <input class="ant-input semantic-mark-input" type="search" value="Hello, Ant Design">
          <span class="ant-input-suffix semantic-mark-suffix">
            <span class="ant-input-show-count-suffix ant-input-show-count-has-suffix semantic-mark-count">
              17
            </span>
            <span aria-label="edit" class="anticon anticon-edit" role="img">
              <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
              </svg>
            </span>
          </span>
        </span>
        <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-primary ant-btn-variant-solid ant-btn-loading ant-btn-compact-item ant-btn-compact-last-item ant-input-search-btn semantic-mark-button-root" type="button">
          <span class="ant-btn-icon ant-btn-loading-icon semantic-mark-button-icon">
            <span aria-label="loading" class="anticon anticon-loading anticon-spin" role="img">
              <svg aria-hidden="true" data-icon="loading" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
              </svg>
            </span>
          </span>
          <span class="semantic-mark-button-content">
            Searching...
          </span>
        </button>
      </div>
```

---

# input Textarea Semantic

Source: https://ant.design/components/input/semantic_textarea.md

## Input.Textarea

### Semantic Parts

- root（`semantic-mark-root`）: Root element with textarea wrapper styles, border, border radius, transition animation and state control
- textarea（`semantic-mark-textarea`）: Textarea element with font, line height, padding, color, background, border, text input and multi-line text display styles
- count（`semantic-mark-count`）: Count element with character count display position, font, color and numeric statistics styles

### Usage Example

```tsx
<Input.Textarea
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    textarea: "semantic-mark-textarea",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-textarea-affix-wrapper ant-input-textarea-show-count ant-input-outlined css-var-test-id ant-input-css-var semantic-mark-root" data-count="17 / 100">
        <textarea class="ant-input semantic-mark-textarea" rows="3">          Hello, Ant Design
        </textarea>
        <span class="ant-input-suffix">
          <span class="ant-input-data-count semantic-mark-count">
            17 / 100
          </span>
        </span>
      </span>
```

---

# input-number Semantic

Source: https://ant.design/components/input-number/semantic.md

## InputNumber

### Semantic Parts

- root（`semantic-mark-root`）: Root element, sets inline-block layout, width, border radius and reset styles
- input（`semantic-mark-input`）: Input element, sets font, line height, text input and interaction styles
- prefix（`semantic-mark-prefix`）: Prefix wrapper element, sets flex layout, alignment and right margin styles
- suffix（`semantic-mark-suffix`）: Suffix wrapper element, sets flex layout, margin and transition animation styles
- action（`semantic-mark-action`）: Single action button element, sets button styling, hover effects and click interactions
- actions（`semantic-mark-actions`）: Actions element, sets absolute positioning, width, flex layout and number adjustment button styles

### Usage Example

```tsx
<InputNumber
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    action: "semantic-mark-action",
    actions: "semantic-mark-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="display: flex; flex-direction: column; gap: 16px;">
        <div class="ant-input-number ant-input-number-mode-input css-var-test-id ant-input-number-css-var semantic-mark-root ant-input-number-outlined semantic-mark-root" style="width: 200px;">
          <div class="ant-input-number-prefix semantic-mark-prefix">
            ￥
          </div>
          <input aria-valuenow="100" autocomplete="off" class="ant-input-number-input semantic-mark-input" role="spinbutton" step="1" value="100">
          <div class="ant-input-number-suffix semantic-mark-suffix" style="margin-right: 28px;">
            RMB
          </div>
          <div class="ant-input-number-actions semantic-mark-actions" style="opacity: 1; width: 24px;">
            <span aria-disabled="false" aria-label="Increase Value" class="ant-input-number-action ant-input-number-action-up semantic-mark-action" role="button" unselectable="on">
              <span aria-label="up" class="anticon anticon-up" role="img">
                <svg aria-hidden="true" data-icon="up" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                </svg>
              </span>
            </span>
            <span aria-disabled="false" aria-label="Decrease Value" class="ant-input-number-action ant-input-number-action-down semantic-mark-action" role="button" unselectable="on">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
        <div class="ant-input-number ant-input-number-mode-spinner css-var-test-id ant-input-number-css-var semantic-mark-root ant-input-number-outlined semantic-mark-root" style="width: 200px;">
          <span aria-disabled="false" aria-label="Decrease Value" class="ant-input-number-action ant-input-number-action-down semantic-mark-action" role="button" unselectable="on">
            <span aria-label="minus" class="anticon anticon-minus" role="img">
              <svg aria-hidden="true" data-icon="minus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </span>
          </span>
          <input aria-valuenow="100" autocomplete="off" class="ant-input-number-input semantic-mark-input" role="spinbutton" step="1" value="100">
          <span aria-disabled="false" aria-label="Increase Value" class="ant-input-number-action ant-input-number-action-up semantic-mark-action" role="button" unselectable="on">
            <span aria-label="plus" class="anticon anticon-plus" role="img">
              <svg aria-hidden="true" data-icon="plus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
```

---

# list Semantic

Source: https://ant.design/components/list/semantic.md

## List

### Semantic Parts

- extra（`semantic-mark-extra`）: set `extra` of List.Item
- actions（`semantic-mark-actions`）: set `actions` of List.Item

### Usage Example

```tsx
<List
  {...otherProps}
  classNames={{
    extra: "semantic-mark-extra",
    actions: "semantic-mark-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<ul class="ant-list-item-action semantic-mark-actions">
                      <li>
                        <div class="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small css-var-test-id">
                          <div class="ant-space-item">
                            <span aria-label="star" class="anticon anticon-star" role="img">
                              <svg aria-hidden="true" data-icon="star" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                                <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                              </svg>
                            </span>
                          </div>
                          <div class="ant-space-item">
                            156
                          </div>
                        </div>
                        <em class="ant-list-item-action-split">
                      </em></li><em class="ant-list-item-action-split">
                      <li>
                        <div class="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small css-var-test-id">
                          <div class="ant-space-item">
                            <span aria-label="like" class="anticon anticon-like" role="img">
                              <svg aria-hidden="true" data-icon="like" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                                <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path>
                              </svg>
                            </span>
                          </div>
                          <div class="ant-space-item">
                            156
                          </div>
                        </div>
                        <em class="ant-list-item-action-split">
                      </em></li><em class="ant-list-item-action-split">
                      <li>
                        <div class="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small css-var-test-id">
                          <div class="ant-space-item">
                            <span aria-label="message" class="anticon anticon-message" role="img">
                              <svg aria-hidden="true" data-icon="message" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                                <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
                              </svg>
                            </span>
                          </div>
                          <div class="ant-space-item">
                            2
                          </div>
                        </div>
                      </li>
                    </em></em></ul>
```

---

# masonry Semantic

Source: https://ant.design/components/masonry/semantic.md

## Masonry

### Semantic Parts

- root（`semantic-mark-root`）: Root element, sets relative positioning, flex layout and masonry container styles
- item（`semantic-mark-item`）: Item element, sets absolute positioning, width calculation, transition animation and masonry item styles

### Usage Example

```tsx
<Masonry
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-masonry semantic-mark-root css-var-test-id" style="height: 0px; width: 100%;">
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 75px;">
            <div class="ant-card-body">
              1
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 50px;">
            <div class="ant-card-body">
              2
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 70px;">
            <div class="ant-card-body">
              3
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 60px;">
            <div class="ant-card-body">
              4
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 85px;">
            <div class="ant-card-body">
              5
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 75px;">
            <div class="ant-card-body">
              6
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 50px;">
            <div class="ant-card-body">
              7
            </div>
          </div>
        </div>
      </div>
```

---

# mentions Semantic

Source: https://ant.design/components/mentions/semantic.md

## Mentions

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set inline flex layout, relative positioning, padding and border styles
- textarea（`semantic-mark-textarea`）: Textarea element, set font, line height, text input and background styles
- popup（`semantic-mark-popup`）: Popup element, set absolute positioning, z-index, background color, border radius, shadow and dropdown options styles
- suffix（`semantic-mark-suffix`）: Suffix element with layout and styling for suffix content like clear button, etc.

### Usage Example

```tsx
<Mentions
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    textarea: "semantic-mark-textarea",
    popup: "semantic-mark-popup",
    suffix: "semantic-mark-suffix"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; height: 200px; overflow: hidden;">
        <span class="ant-mentions-affix-wrapper ant-mentions-outlined ant-mentions css-var-test-id ant-mentions-css-var semantic-mark-root ant-mentions-has-suffix">
          <textarea class="rc-textarea semantic-mark-textarea" rows="1">            Hi, @
          </textarea>
          <div class="ant-mentions-measure">
            Hi, 
            <span>
              @
            </span>
            <div class="ant-mentions-dropdown semantic-mark-popup css-var-test-id ant-mentions-css-var ant-mentions-dropdown-placement-bottomRight" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1;">
              <ul class="ant-mentions-dropdown-menu ant-mentions-dropdown-menu-root ant-mentions-dropdown-menu-vertical" data-menu-list="true" role="menu" tabindex="0">
                <li class="ant-mentions-dropdown-menu-item ant-mentions-dropdown-menu-item-active" data-menu-id="rc-menu-uuid-afc163-test-id" role="menuitem" tabindex="-1">
                  afc163
                </li>
                <li class="ant-mentions-dropdown-menu-item" data-menu-id="rc-menu-uuid-zombieJ-test-id" role="menuitem" tabindex="-1">
                  zombieJ
                </li>
                <li class="ant-mentions-dropdown-menu-item" data-menu-id="rc-menu-uuid-thinkasany-test-id" role="menuitem" tabindex="-1">
                  thinkasany
                </li>
                <li class="ant-mentions-dropdown-menu-item" data-menu-id="rc-menu-uuid-meet-student-test-id" role="menuitem" tabindex="-1">
                  meet-student
                </li>
              </ul>
              <div aria-hidden="true" style="display: none;">
            </div>
          </div>
          <span class="ant-mentions-suffix semantic-mark-suffix">
            <button class="ant-mentions-clear-icon" tabindex="-1" type="button">
              <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                </svg>
              </span>
            </button>
          </span>
        
      </div>
    </span></div>
```

---

# menu Semantic

Source: https://ant.design/components/menu/semantic.md

## Menu

### Semantic Parts

- root（`semantic-mark-root`）: Root element with basic menu container styles and layout
- item（`semantic-mark-item`）: Item element with relative positioning, block display, margins, whitespace handling, cursor styles, transitions and other basic interactive styles for menu items
- itemContent（`semantic-mark-itemContent`）: Item content element with layout and typography styles for menu item content
- itemIcon（`semantic-mark-itemIcon`）: Icon element with min-width, font-size, transitions, icon reset styles, and spacing control with text
- itemTitle（`semantic-mark-itemTitle`）: Item title element (no effect in horizontal mode) with title text styles and layout
- list（`semantic-mark-list`）: Menu list element (no effect in horizontal mode) with menu list layout and container styles
- popup（`semantic-mark-popup`）: Popup menu element (no effect in inline mode) with popup layer positioning, z-index, background and other styles
- subMenu.itemTitle（`semantic-mark-subMenu-itemTitle`）: Submenu title element with submenu title styles and interactive effects
- subMenu.list（`semantic-mark-subMenu-list`）: Submenu list element with submenu list layout and container styles
- subMenu.item（`semantic-mark-subMenu-item`）: Submenu item element with submenu item styles and interactive effects
- subMenu.itemIcon（`semantic-mark-subMenu-itemIcon`）: Submenu item icon element with submenu icon size and styles
- subMenu.itemContent（`semantic-mark-subMenu-itemContent`）: Submenu item content element with submenu content layout and typography

### Usage Example

```tsx
<Menu
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemIcon: "semantic-mark-itemIcon",
    itemTitle: "semantic-mark-itemTitle",
    list: "semantic-mark-list",
    popup: "semantic-mark-popup",
    subMenu.itemTitle: "semantic-mark-subMenu-itemTitle",
    subMenu.list: "semantic-mark-subMenu-list",
    subMenu.item: "semantic-mark-subMenu-item",
    subMenu.itemIcon: "semantic-mark-subMenu-itemIcon",
    subMenu.itemContent: "semantic-mark-subMenu-itemContent"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="horizontal">
                horizontal
              </div>
            </label>
            <label class="ant-segmented-item">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="vertical">
                vertical
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="inline">
                inline
              </div>
            </label>
          </div>
        </div>
        <div style="height: 360px;">
          <ul class="ant-menu ant-menu-root ant-menu-inline ant-menu-light css-var-test-id ant-menu-css-var semantic-mark-root" data-menu-list="true" item="[object Object],[object Object],[object Object]" role="menu" style="width: 230px;" tabindex="0">
            <li class="ant-menu-item ant-menu-item-selected semantic-mark-item" data-menu-id="rc-menu-uuid-mail" role="menuitem" style="padding-left: 24px;" tabindex="-1">
              <span aria-label="mail" class="anticon anticon-mail ant-menu-item-icon semantic-mark-itemIcon" role="img">
                <svg aria-hidden="true" data-icon="mail" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                </svg>
              </span>
              <span class="ant-menu-title-content semantic-mark-itemContent">
                Navigation One
              </span>
            </li>
            <li class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-open" role="none">
              <div aria-controls="rc-menu-uuid-SubMenu-popup" aria-expanded="true" aria-haspopup="true" class="ant-menu-submenu-title" data-menu-id="rc-menu-uuid-SubMenu" role="menuitem" style="padding-left: 24px;" tabindex="-1">
                <span aria-label="mail" class="anticon anticon-mail ant-menu-item-icon semantic-mark-itemIcon" role="img">
                  <svg aria-hidden="true" data-icon="mail" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                  </svg>
                </span>
                <span class="ant-menu-title-content">
                  Navigation One
                </span>
                <i class="ant-menu-submenu-arrow">
              </i></div><i class="ant-menu-submenu-arrow">
              <ul class="ant-menu ant-menu-sub ant-menu-inline" data-menu-list="true" id="rc-menu-uuid-SubMenu-popup" role="menu">
                <li class="ant-menu-item-group" role="presentation">
                  <div class="ant-menu-item-group-title semantic-mark-subMenu-itemTitle" role="presentation" title="Item 1">
                    Item 1
                  </div>
                  <ul class="ant-menu-item-group-list semantic-mark-subMenu-list" role="group">
                    <li class="ant-menu-item semantic-mark-subMenu-item" data-menu-id="rc-menu-uuid-1" role="menuitem" style="padding-left: 48px;" tabindex="-1">
                      <span aria-label="mail" class="anticon anticon-mail ant-menu-item-icon semantic-mark-subMenu-itemIcon" role="img">
                        <svg aria-hidden="true" data-icon="mail" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                        </svg>
                      </span>
                      <span class="ant-menu-title-content semantic-mark-subMenu-itemContent">
                        Option 1
                      </span>
                    </li>
                    <li class="ant-menu-item semantic-mark-subMenu-item ant-menu-item-only-child" data-menu-id="rc-menu-uuid-2" role="menuitem" style="padding-left: 48px;" tabindex="-1">
                      <span class="ant-menu-title-content semantic-mark-subMenu-itemContent">
                        Option 2
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </i></li><i class="ant-menu-submenu-arrow">
            <li class="ant-menu-item-group" role="presentation">
              <div class="ant-menu-item-group-title semantic-mark-itemTitle" role="presentation" title="Group">
                Group
              </div>
              <ul class="ant-menu-item-group-list semantic-mark-list" role="group">
                <li class="ant-menu-item semantic-mark-item ant-menu-item-only-child" data-menu-id="rc-menu-uuid-13" role="menuitem" style="padding-left: 24px;" tabindex="-1">
                  <span class="ant-menu-title-content semantic-mark-itemContent">
                    Option 13
                  </span>
                </li>
                <li class="ant-menu-item semantic-mark-item ant-menu-item-only-child" data-menu-id="rc-menu-uuid-14" role="menuitem" style="padding-left: 24px;" tabindex="-1">
                  <span class="ant-menu-title-content semantic-mark-itemContent">
                    Option 14
                  </span>
                </li>
              </ul>
            </li>
          </i></ul><i class="ant-menu-submenu-arrow">
          <div aria-hidden="true" style="display: none;">
        </div>
      </i></div><i class="ant-menu-submenu-arrow">
    </i></div>
```

---

# message Semantic

Source: https://ant.design/components/message/semantic.md

## Message

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set fixed positioning, z-index, padding, background color, border radius, shadow and animation styles
- icon（`semantic-mark-icon`）: Icon element, set font size, right margin and status color styles
- content（`semantic-mark-content`）: Content element, set inline block layout, text color and content display styles

### Usage Example

```tsx
<Message
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-message-notice semantic-mark-root ant-message-notice-pure-panel css-var-test-id ant-message-css-var">
        <div class="ant-message-notice-content">
          <div class="ant-message-custom-content ant-message-success">
            <span aria-label="check-circle" class="anticon anticon-check-circle semantic-mark-icon" role="img">
              <svg aria-hidden="true" data-icon="check-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
              </svg>
            </span>
            <span class="semantic-mark-content">
              Hello, Ant Design!
            </span>
          </div>
        </div>
      </div>
```

---

# modal Semantic

Source: https://ant.design/components/modal/semantic.md

## Modal

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, top position, width, max-width, margins, bottom padding and other basic layout styles for modal container
- mask（`semantic-mark-mask`）: Mask element with fixed positioning, z-index, background color, animation transitions and other mask layer styles
- wrapper（`semantic-mark-wrapper`）: Wrapper element used for motion container with animation and transition effect styles
- container（`semantic-mark-container`）: Modal container element with relative positioning, background, background-clip, border, border-radius, box-shadow, pointer-events, padding and other modal body styles
- header（`semantic-mark-header`）: Header element with padding, bottom border and other header area styles
- title（`semantic-mark-title`）: Title element with margin, color, font-weight, font-size, line-height, word-wrap and other title text styles
- body（`semantic-mark-body`）: Body element with content area background color, padding and other content display styles
- footer（`semantic-mark-footer`）: Footer element with footer background color, padding, top border, border-radius and other footer area styles

### Usage Example

```tsx
<Modal
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    mask: "semantic-mark-mask",
    wrapper: "semantic-mark-wrapper",
    container: "semantic-mark-container",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    footer: "semantic-mark-footer"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; inset: 0;">
        <div class="ant-modal-root css-var-test-id ant-modal-css-var semantic-mark-root">
          <div class="ant-modal-mask semantic-mark-mask" style="z-index: 1; position: absolute;">
          <div class="ant-modal-wrap semantic-mark-wrapper" style="z-index: 1; position: absolute;">
            <div aria-labelledby="test-id" aria-modal="true" class="ant-modal ant-zoom-appear ant-zoom-appear-prepare ant-zoom" role="dialog" style="top: 50%; transform: translateY(-50%); margin-bottom: 0px; padding-bottom: 0px; width: 400px;" tabindex="-1">
              <div class="ant-modal-container semantic-mark-container">
                <div class="ant-modal-header semantic-mark-header">
                  <div class="ant-modal-title semantic-mark-title" id="test-id">
                    Title
                  </div>
                </div>
                <div class="ant-modal-body semantic-mark-body">
                  <p>
                    Some contents...
                  </p>
                </div>
                <div class="ant-modal-footer semantic-mark-footer">
                  <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
                    <span>
                      Cancel
                    </span>
                  </button>
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
                    <span>
                      OK
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```

---

# notification Semantic

Source: https://ant.design/components/notification/semantic.md

## Notification

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set fixed positioning, z-index, padding, background color, border radius, shadow and animation styles
- icon（`semantic-mark-icon`）: Icon element, set absolute positioning, font size, line height and status color styles
- title（`semantic-mark-title`）: Title element, set color, font size, line height and margin styles
- description（`semantic-mark-description`）: Description element, set font size, color and margin styles
- actions（`semantic-mark-actions`）: Actions element, set float right, top margin and action button layout styles

### Usage Example

```tsx
<Notification
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    actions: "semantic-mark-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-notification-notice-pure-panel css-var-test-id ant-notification-css-var semantic-mark-root">
        <div class="ant-notification-notice ant-notification-notice-closable">
          <div class="ant-notification-notice-content">
            <div class="ant-notification-notice-with-icon" role="alert">
              <span aria-label="check-circle" class="anticon anticon-check-circle ant-notification-notice-icon semantic-mark-icon ant-notification-notice-icon-success" role="img">
                <svg aria-hidden="true" data-icon="check-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                </svg>
              </span>
              <div class="ant-notification-notice-title semantic-mark-title">
                Hello World!
              </div>
              <div class="ant-notification-notice-description semantic-mark-description">
                Hello World?
              </div>
              <div class="ant-notification-notice-actions semantic-mark-actions">
                <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                  <span>
                    My Button
                  </span>
                </button>
              </div>
            </div>
          </div>
          <button aria-label="Close" class="ant-notification-notice-close">
            <span aria-label="Close" class="anticon anticon-close ant-notification-close-icon" role="img">
              <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
```

---

# pagination Semantic

Source: https://ant.design/components/pagination/semantic.md

## Pagination

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set flex layout, alignment, flex wrap and list styles
- item（`semantic-mark-item`）: Item element, set size, padding, border, background color, hover state and active state styles

### Usage Example

```tsx
<Pagination
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<ul class="ant-pagination semantic-mark-root css-var-test-id">
        <li aria-disabled="true" class="ant-pagination-prev semantic-mark-item ant-pagination-disabled" title="Previous Page">
          <button class="ant-pagination-item-link" disabled="" tabindex="-1" type="button">
            <span aria-label="left" class="anticon anticon-left" role="img">
              <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
              </svg>
            </span>
          </button>
        </li>
        <li class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active semantic-mark-item" tabindex="0" title="1">
          <a rel="nofollow">
            1
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-2 semantic-mark-item" tabindex="0" title="2">
          <a rel="nofollow">
            2
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-3 semantic-mark-item" tabindex="0" title="3">
          <a rel="nofollow">
            3
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-4 semantic-mark-item" tabindex="0" title="4">
          <a rel="nofollow">
            4
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-5 semantic-mark-item" tabindex="0" title="5">
          <a rel="nofollow">
            5
          </a>
        </li>
        <li aria-disabled="false" class="ant-pagination-next semantic-mark-item" tabindex="0" title="Next Page">
          <button class="ant-pagination-item-link" tabindex="-1" type="button">
            <span aria-label="right" class="anticon anticon-right" role="img">
              <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
              </svg>
            </span>
          </button>
        </li>
      </ul>
```

---

# popconfirm Semantic

Source: https://ant.design/components/popconfirm/semantic.md

## Popconfirm

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set absolute positioning, z-index, transform origin, arrow direction and popover container styles
- container（`semantic-mark-container`）: Container element, set background color, padding, border radius, shadow, border and content display styles
- arrow（`semantic-mark-arrow`）: Arrow element with width, height, position, color and border styles
- title（`semantic-mark-title`）: Title element, set title text styles and spacing
- content（`semantic-mark-content`）: Description element, set content text styles and layout

### Usage Example

```tsx
<Popconfirm
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    container: "semantic-mark-container",
    arrow: "semantic-mark-arrow",
    title: "semantic-mark-title",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; margin-top: 60px;">
        <span aria-describedby="test-id" class="ant-popover-open">
        <div class="ant-popover ant-zoom-big-appear ant-zoom-big-appear-prepare ant-zoom-big ant-popover-css-var css-var-test-id css-var-test-id ant-popconfirm semantic-mark-root ant-popover-placement-top" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-popover-arrow semantic-mark-arrow" style="position: absolute; bottom: 0px; left: 0px;">
            <span class="ant-popover-arrow-content">
          </span></div>
          <div class="ant-popover-container semantic-mark-container" id="test-id" role="tooltip">
            <div class="ant-popover-content">
              <div class="ant-popconfirm-inner-content">
                <div class="ant-popconfirm-message">
                  <span class="ant-popconfirm-message-icon">
                    <span aria-label="exclamation-circle" class="anticon anticon-exclamation-circle" role="img">
                      <svg aria-hidden="true" data-icon="exclamation-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                      </svg>
                    </span>
                  </span>
                  <div class="ant-popconfirm-message-text">
                    <div class="ant-popconfirm-title semantic-mark-title">
                      Confirm
                    </div>
                    <div class="ant-popconfirm-description semantic-mark-content">
                      Are you sure you want to perform this action?
                    </div>
                  </div>
                </div>
                <div class="ant-popconfirm-buttons">
                  <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-sm" type="button">
                    <span>
                      Cancel
                    </span>
                  </button>
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                    <span>
                      OK
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span></div>
```

---

# popover Semantic

Source: https://ant.design/components/popover/semantic.md

## Popover

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set absolute positioning, z-index, transform origin, arrow direction and popover container styles
- container（`semantic-mark-container`）: Container element, set background color, padding, border radius, shadow, border and content display styles
- arrow（`semantic-mark-arrow`）: Arrow element with width, height, position, color and border styles
- title（`semantic-mark-title`）: Title element, set title text styles and spacing
- content（`semantic-mark-content`）: Content element, set content text styles and layout

### Usage Example

```tsx
<Popover
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    container: "semantic-mark-container",
    arrow: "semantic-mark-arrow",
    title: "semantic-mark-title",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; margin-top: 60px;">
        <span aria-describedby="test-id" class="ant-popover-open">
        <div class="ant-popover ant-zoom-big-appear ant-zoom-big-appear-prepare ant-zoom-big ant-popover-css-var css-var-test-id css-var-test-id semantic-mark-root ant-popover-placement-top" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-popover-arrow semantic-mark-arrow" style="position: absolute; bottom: 0px; left: 0px;">
            <span class="ant-popover-arrow-content">
          </span></div>
          <div class="ant-popover-container semantic-mark-container" id="test-id" role="tooltip">
            <div class="ant-popover-title semantic-mark-title">
              Hello
            </div>
            <div class="ant-popover-content semantic-mark-content">
              Ant Design love you!
            </div>
          </div>
        </div>
      </span></div>
```

---

# progress Semantic

Source: https://ant.design/components/progress/semantic.md

## Progress

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set relative positioning and basic container styles
- body（`semantic-mark-body`）: Body element, set progress bar layout and size styles
- rail（`semantic-mark-rail`）: Rail element, set background track color and border radius styles. Not exist in steps mode
- track（`semantic-mark-track`）: Track element, set progress fill color and transition animation styles
- indicator（`semantic-mark-indicator`）: Indicator element, set percentage text or icon position and font styles

### Usage Example

```tsx
<Progress
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    body: "semantic-mark-body",
    rail: "semantic-mark-rail",
    track: "semantic-mark-track",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="width: 100%;">
        <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle">
          <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
            <div class="ant-segmented-group">
              <label class="ant-segmented-item ant-segmented-item-selected">
                <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="line">
                  line
                </div>
              </label>
              <label class="ant-segmented-item">
                <input class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="steps">
                  steps
                </div>
              </label>
              <label class="ant-segmented-item">
                <input class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="circle">
                  circle
                </div>
              </label>
              <label class="ant-segmented-item">
                <input class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="dashboard">
                  dashboard
                </div>
              </label>
            </div>
          </div>
          <button aria-checked="false" class="ant-switch css-var-test-id" role="switch" type="button">
            <div class="ant-switch-handle">
            <span class="ant-switch-inner">
              <span class="ant-switch-inner-checked">
                Gradient
              </span>
              <span class="ant-switch-inner-unchecked">
                Gradient
              </span>
            </span>
          </div></button>
        </div>
        <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-vertical" style="height: 200px; width: 100%;">
          <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="80" class="ant-progress ant-progress-status-normal ant-progress-line ant-progress-line-align-end ant-progress-line-position-outer ant-progress-show-info ant-progress-default semantic-mark-root css-var-test-id" role="progressbar">
            <div class="ant-progress-body semantic-mark-body" style="width: 100%;">
              <div class="ant-progress-rail semantic-mark-rail" style="height: 8px;">
                <div class="ant-progress-track semantic-mark-track" style="width: 80%; height: 8px;">
              </div>
              <span class="ant-progress-indicator ant-progress-indicator-end ant-progress-indicator-outer semantic-mark-indicator" title="80%">
                80%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
```

---

# qr-code Semantic

Source: https://ant.design/components/qr-code/semantic.md

## QrCode

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set flex layout, padding, background color, border, border radius and relative positioning styles
- cover（`semantic-mark-cover`）: Cover element, set absolute positioning, z-index, background color and loading state overlay styles

### Usage Example

```tsx
<QrCode
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    cover: "semantic-mark-cover"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-qrcode css-var-test-id semantic-mark-root" style="background-color: transparent; width: 160px; height: 160px;">
        <div class="ant-qrcode-cover semantic-mark-cover">
          <div aria-busy="true" aria-live="polite" class="ant-spin ant-spin-spinning ant-spin-section css-var-test-id">
            <span class="ant-spin-dot-holder">
              <span class="ant-spin-dot ant-spin-dot-spin">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
              </i></i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
            </i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
          </i></i></i></div><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
        </i></i></i></div><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
        <canvas height="160" role="img" width="160">
      </canvas></i></i></i></div>
```

---

# radio Semantic

Source: https://ant.design/components/radio/semantic.md

## Radio

### Semantic Parts

- root（`semantic-mark-root`）: Root element with layout styles, cursor styles, disabled text color and other basic container styles
- icon（`semantic-mark-icon`）: Icon element with border radius, transition animations, border styles, hover states, focus states and other interactive styles
- label（`semantic-mark-label`）: Label element with padding, text color, disabled states, alignment and other text styles

### Usage Example

```tsx
<Radio
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    label: "semantic-mark-label"
  }}
/>
```

### Abstract DOM Structure

```html
<label class="ant-radio-wrapper semantic-mark-root css-var-test-id ant-radio-css-var">
        <span class="ant-radio semantic-mark-icon ant-wave-target">
          <input class="ant-radio-input" type="radio">
        </span>
        <span class="ant-radio-label semantic-mark-label">
          Radio
        </span>
      </label>
```

---

# result Semantic

Source: https://ant.design/components/result/semantic.md

## Result

### Semantic Parts

- root（`semantic-mark-root`）: Root element with text alignment, layout styles and other basic container styles
- title（`semantic-mark-title`）: Title element with font size, text color, line height, text alignment and other text styles
- subTitle（`semantic-mark-subTitle`）: Subtitle element with font size, text color, line height and other text styles
- body（`semantic-mark-body`）: Content element with margin, padding, background color and other content area styles
- extra（`semantic-mark-extra`）: Action area element with margin, text alignment, inner element spacing and other layout styles
- icon（`semantic-mark-icon`）: Icon element with margin, text alignment, font size, status colors and other icon styles

### Usage Example

```tsx
<Result
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    title: "semantic-mark-title",
    subTitle: "semantic-mark-subTitle",
    body: "semantic-mark-body",
    extra: "semantic-mark-extra",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-result ant-result-info css-var-test-id semantic-mark-root">
        <div class="ant-result-icon semantic-mark-icon">
          <span aria-label="exclamation-circle" class="anticon anticon-exclamation-circle" role="img">
            <svg aria-hidden="true" data-icon="exclamation-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
            </svg>
          </span>
        </div>
        <div class="ant-result-title semantic-mark-title">
          title
        </div>
        <div class="ant-result-subtitle semantic-mark-subTitle">
          subTitle
        </div>
        <div class="ant-result-extra semantic-mark-extra">
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
            <span>
              extra
            </span>
          </button>
        </div>
        <div class="ant-result-body semantic-mark-body">
          <div style="text-align: center;">
            The Content of Result
          </div>
        </div>
      </div>
```

---

# segmented Semantic

Source: https://ant.design/components/segmented/semantic.md

## Segmented

### Semantic Parts

- root（`semantic-mark-root`）: Root element with inline-block layout, padding, background, border radius, transition and container styles
- item（`semantic-mark-item`）: Option element with relative positioning, text alignment, cursor style, transition, selected state background and hover styles
- icon（`semantic-mark-icon`）: Icon element with icon size, color and text spacing styles
- label（`semantic-mark-label`）: Label content element with min height, line height, padding, text ellipsis and content layout styles

### Usage Example

```tsx
<Segmented
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    icon: "semantic-mark-icon",
    label: "semantic-mark-label"
  }}
/>
```

### Abstract DOM Structure

```html
<div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented semantic-mark-root css-var-test-id" role="radiogroup" tabindex="0">
        <div class="ant-segmented-group">
          <label class="ant-segmented-item semantic-mark-item ant-segmented-item-selected">
            <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
            <div class="ant-segmented-item-label semantic-mark-label">
              <span class="ant-segmented-item-icon semantic-mark-icon">
                <span aria-label="bars" class="anticon anticon-bars" role="img">
                  <svg aria-hidden="true" data-icon="bars" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                    <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                  </svg>
                </span>
              </span>
              <span>
                List
              </span>
            </div>
          </label>
          <label class="ant-segmented-item semantic-mark-item">
            <input class="ant-segmented-item-input" name="test-id" type="radio">
            <div class="ant-segmented-item-label semantic-mark-label">
              <span class="ant-segmented-item-icon semantic-mark-icon">
                <span aria-label="appstore" class="anticon anticon-appstore" role="img">
                  <svg aria-hidden="true" data-icon="appstore" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z"></path>
                  </svg>
                </span>
              </span>
              <span>
                Kanban
              </span>
            </div>
          </label>
        </div>
      </div>
```

---

# select Semantic

Source: https://ant.design/components/select/semantic.md

## Select

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-flex layout, cursor styles, transitions, border and other basic selector container styles
- prefix（`semantic-mark-prefix`）: Prefix element with layout and styling for prefix content
- suffix（`semantic-mark-suffix`）: Suffix element with layout and styling for suffix content like clear button, arrow icon, etc.
- input（`semantic-mark-input`）: Input element with search input styling, cursor control, font inheritance and other search-related styles. Remove border styles
- content（`semantic-mark-content`）: Multiple selection container with layout, spacing, and wrapping styles for selected items
- clear（`semantic-mark-clear`）: Clear button element with layout, styling and interactive effects for clear button
- item（`semantic-mark-item`）: Multiple selection item element with border, background, padding, and margin styles
- itemContent（`semantic-mark-itemContent`）: Multiple selection item content area with text ellipsis styles
- itemRemove（`semantic-mark-itemRemove`）: Multiple selection item remove button with font-related styles
- placeholder（`semantic-mark-placeholder`）: Placeholder element with font styles and colors for placeholder text
- popup.root（`semantic-mark-popup-root`）: Popup element with popup layer positioning, z-index, background, border, box-shadow and other popup container styles
- popup.list（`semantic-mark-popup-list`）: Popup list element with option list layout, scrolling, max-height and other list container styles
- popup.listItem（`semantic-mark-popup-listItem`）: Popup item element with option item padding, hover effects, selected states, disabled states and other option interactive styles

### Usage Example

```tsx
<Select
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    input: "semantic-mark-input",
    content: "semantic-mark-content",
    clear: "semantic-mark-clear",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemRemove: "semantic-mark-itemRemove",
    placeholder: "semantic-mark-placeholder",
    popup.root: "semantic-mark-popup-root",
    popup.list: "semantic-mark-popup-list",
    popup.listItem: "semantic-mark-popup-listItem"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="position: absolute; margin-bottom: 80px;">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Single">
                Single
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Multiple">
                Multiple
              </div>
            </label>
          </div>
        </div>
        <div class="ant-select ant-select-outlined semantic-mark-root css-var-test-id ant-select-css-var ant-select-multiple ant-select-allow-clear ant-select-show-arrow ant-select-open ant-select-show-search" style="width: 300px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content semantic-mark-content">
            <div class="ant-select-content-item" style="opacity: 1;">
              <span class="ant-select-selection-item semantic-mark-item" title="aojunhao123">
                <span class="ant-select-selection-item-content semantic-mark-itemContent">
                  aojunhao123
                </span>
                <span aria-hidden="true" class="ant-select-selection-item-remove semantic-mark-itemRemove" style="user-select: none;" unselectable="on">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </span>
              </span>
            </div>
            <div class="ant-select-content-item ant-select-content-item-suffix" style="opacity: 1;">
              <input aria-activedescendant="test-id_list_0" aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="off" class="ant-select-input semantic-mark-input" id="test-id" role="combobox" style="--select-input-width: 0;" type="search" value="">
            </div>
          </div>
          <div class="ant-select-suffix semantic-mark-suffix">
            <span aria-label="search" class="anticon anticon-search" role="img">
              <svg aria-hidden="true" data-icon="search" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </span>
          </div>
          <div class="ant-select-clear semantic-mark-clear">
            <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
              <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div class="ant-select-dropdown semantic-mark-popup-root css-var-test-id ant-select-css-var ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div>
            <div id="test-id_list" role="listbox" style="height: 0px; width: 0px; overflow: hidden;">
              <div aria-label="aojunhao123" aria-selected="true" id="test-id_list_0" role="option">
                aojunhao123
              </div>
              <div aria-label="thinkasany" aria-selected="false" id="test-id_list_1" role="option">
                thinkasany
              </div>
            </div>
            <div class="rc-virtual-list semantic-mark-popup-list" style="position: relative;">
              <div class="rc-virtual-list-holder" style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
                <div>
                  <div class="rc-virtual-list-holder-inner" style="display: flex; flex-direction: column;">
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem ant-select-item-option-active ant-select-item-option-selected" title="aojunhao123">
                      <div class="ant-select-item-option-content">
                        aojunhao123
                      </div>
                      <span aria-hidden="true" class="ant-select-item-option-state" style="user-select: none;" unselectable="on">
                        <span aria-label="check" class="anticon anticon-check" role="img">
                          <svg aria-hidden="true" data-icon="check" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                            <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                          </svg>
                        </span>
                      </span>
                    </div>
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="thinkasany">
                      <div class="ant-select-item-option-content">
                        thinkasany
                      </div>
                    </div>
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="meet-student">
                      <div class="ant-select-item-option-content">
                        meet-student
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
```

---

# skeleton Element Semantic

Source: https://ant.design/components/skeleton/semantic_element.md

## Skeleton.Element

### Semantic Parts

- root（`semantic-mark-root`）: Root element
- content（`semantic-mark-content`）: Content element

### Usage Example

```tsx
<Skeleton.Element
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-vertical" style="width: fit-content; margin-right: auto;">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Avatar">
                Avatar
              </div>
            </label>
            <label class="ant-segmented-item">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Button">
                Button
              </div>
            </label>
            <label class="ant-segmented-item">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Input">
                Input
              </div>
            </label>
            <label class="ant-segmented-item">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Image">
                Image
              </div>
            </label>
            <label class="ant-segmented-item">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Node">
                Node
              </div>
            </label>
          </div>
        </div>
        <div class="ant-divider css-var-test-id ant-divider-horizontal ant-divider-with-text ant-divider-with-text-start ant-divider-plain" role="separator">
          <div class="ant-divider-rail ant-divider-rail-start">
          <span class="ant-divider-inner-text">
            Preview
          </span>
          <div class="ant-divider-rail ant-divider-rail-end">
        </div>
        <div class="ant-skeleton ant-skeleton-element semantic-mark-root css-var-test-id">
          <span class="ant-skeleton-avatar ant-skeleton-avatar-circle semantic-mark-content">
        </span></div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.0.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  content
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  6.0.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              内容元素
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
```

---

# skeleton Semantic

Source: https://ant.design/components/skeleton/semantic.md

## Skeleton

### Semantic Parts

- root（`semantic-mark-root`）: Root element with table display, width, animation effects, border radius and other skeleton container basic styles
- header（`semantic-mark-header`）: Header element with table cell, padding, vertical alignment and other avatar placeholder area layout styles
- section（`semantic-mark-section`）: Section element with skeleton content area layout styles
- avatar（`semantic-mark-avatar`）: Avatar element with inline-block display, vertical alignment, background color, size, border radius and other avatar placeholder styles
- title（`semantic-mark-title`）: Title element with width, height, background color, border radius and other title placeholder styles
- paragraph（`semantic-mark-paragraph`）: Paragraph element with padding, list item styles, background color, border radius and other paragraph placeholder styles

### Usage Example

```tsx
<Skeleton
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    section: "semantic-mark-section",
    avatar: "semantic-mark-avatar",
    title: "semantic-mark-title",
    paragraph: "semantic-mark-paragraph"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-skeleton ant-skeleton-with-avatar semantic-mark-root css-var-test-id">
        <div class="semantic-mark-header ant-skeleton-header">
          <span class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle semantic-mark-avatar">
        </span></div>
        <div class="semantic-mark-section ant-skeleton-section">
          <h3 class="ant-skeleton-title semantic-mark-title" style="width: 50%;">
          <ul class="ant-skeleton-paragraph semantic-mark-paragraph">
            <li>
            </li><li>
            </li><li>
            </li><li>
          </li></ul>
        </h3></div>
      </div>
```

---

# slider Semantic

Source: https://ant.design/components/slider/semantic.md

## Slider

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, height, margin, padding, cursor style and touch action control
- track（`semantic-mark-track`）: Track selection bar element with absolute positioning, background color, border radius and transition animation styles
- tracks（`semantic-mark-tracks`）: Multi-segment track container element with absolute positioning and transition animation styles
- rail（`semantic-mark-rail`）: Background rail element with absolute positioning, background color, border radius and transition animation styles
- handle（`semantic-mark-handle`）: Slider handle control element with absolute positioning, size, outline, user selection, background color, border shadow, border radius, cursor style and transition animation

### Usage Example

```tsx
<Slider
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    track: "semantic-mark-track",
    tracks: "semantic-mark-tracks",
    rail: "semantic-mark-rail",
    handle: "semantic-mark-handle"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-slider semantic-mark-root css-var-test-id ant-slider-horizontal" style="width: 100%;">
        <div class="ant-slider-rail semantic-mark-rail">
        <div class="semantic-mark-tracks ant-slider-tracks" style="left: 20%; width: 30%;">
        <div class="ant-slider-track ant-slider-track-1 semantic-mark-track" style="left: 20%; width: 10%;">
        <div class="ant-slider-track ant-slider-track-2 semantic-mark-track" style="left: 30%; width: 20%;">
        <div class="ant-slider-step">
        <div aria-disabled="false" aria-orientation="horizontal" aria-valuemax="100" aria-valuemin="0" aria-valuenow="20" class="ant-slider-handle ant-slider-handle-1 semantic-mark-handle" role="slider" style="left: 20%; transform: translateX(-50%);" tabindex="0">
        <div aria-disabled="false" aria-orientation="horizontal" aria-valuemax="100" aria-valuemin="0" aria-valuenow="30" class="ant-slider-handle ant-slider-handle-2 semantic-mark-handle" role="slider" style="left: 30%; transform: translateX(-50%);" tabindex="0">
        <div aria-disabled="false" aria-orientation="horizontal" aria-valuemax="100" aria-valuemin="0" aria-valuenow="50" class="ant-slider-handle ant-slider-handle-3 semantic-mark-handle" role="slider" style="left: 50%; transform: translateX(-50%);" tabindex="0">
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.23.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，设置相对定位、高度、边距、内边距、光标样式和触摸事件控制
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  track
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.10.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              轨道选取条元素，设置绝对定位、背景色、圆角和过渡动画样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  tracks
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.10.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              多段轨道容器元素，设置绝对定位和过渡动画样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  rail
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.10.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              背景轨道元素，设置绝对定位、背景色、圆角和过渡动画样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  handle
                </h5>
                <span class="ant-tag ant-tag-filled ant-tag-blue css-var-test-id">
                  5.10.0
                </span>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              滑块控制点元素，设置绝对定位、尺寸、轮廓线、用户选择、背景色、边框阴影、圆角、光标样式和过渡动画
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div></div></div></div></div></div>
```

---

# space Semantic

Source: https://ant.design/components/space/semantic.md

## Space

### Semantic Parts

- root（`semantic-mark-root`）: Root element with flex layout, gap settings, alignment, wrap and other spacing container basic styles
- item（`semantic-mark-item`）: Wrapped item element with spacing item layout and styles, providing wrapper for each child element for inline alignment
- separator（`semantic-mark-separator`）: Separator element with divider styling

### Usage Example

```tsx
<Space
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    separator: "semantic-mark-separator"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small css-var-test-id semantic-mark-root">
        <div class="ant-space-item semantic-mark-item">
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
            <span>
              Primary
            </span>
          </button>
        </div>
        <span class="ant-space-item-separator semantic-mark-separator">
          <div class="ant-divider css-var-test-id ant-divider-vertical ant-divider-rail" role="separator">
        
        <div class="ant-space-item semantic-mark-item">
          <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
            <span>
              Default
            </span>
          </button>
        </div>
        <span class="ant-space-item-separator semantic-mark-separator">
          <div class="ant-divider css-var-test-id ant-divider-vertical ant-divider-rail" role="separator">
        
        <div class="ant-space-item semantic-mark-item">
          <button class="ant-btn css-var-test-id ant-btn-dashed ant-btn-color-default ant-btn-variant-dashed" type="button">
            <span>
              Dashed
            </span>
          </button>
        </div>
      </div>
    </span></div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，包含 flex 布局、间隙设置、对齐方式、换行等间距容器的基础样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  item
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              包裹的子组件，包含间距项的布局和样式，为每个子元素提供包装用于内联对齐
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  separator
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              分隔符，包含分隔元素的样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </span></div>
```

---

# spin Semantic

Source: https://ant.design/components/spin/semantic.md

## Spin

### Semantic Parts

- root（`semantic-mark-root`）: The root element, which sets absolute positioning, display control, color, font size, text alignment, vertical alignment, opacity, and transition animation (only effective when fullscreen is false)
- section（`semantic-mark-section`）: The loading element area, which sets relative positioning, flexbox layout, alignment, and color
- indicator（`semantic-mark-indicator`）: The indicator element, which sets width, height, font size, inline-block display, transition animation, transform origin, and line height
- description（`semantic-mark-description`）: The description element, which sets font size and line height
- container（`semantic-mark-container`）: The container element that holds the child elements wrapped by Spin, setting opacity and transition animation

### Usage Example

```tsx
<Spin
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    indicator: "semantic-mark-indicator",
    description: "semantic-mark-description",
    container: "semantic-mark-container"
  }}
/>
```

### Abstract DOM Structure

```html
<div aria-busy="true" aria-live="polite" class="ant-spin ant-spin-spinning semantic-mark-root ant-spin-section semantic-mark-section css-var-test-id">
            <span class="ant-spin-dot-holder semantic-mark-indicator">
              <span class="ant-spin-dot ant-spin-dot-spin">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
              </i></i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
            </i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
          </i></i></i></div>
```

---

# splitter Semantic

Source: https://ant.design/components/splitter/semantic.md

## Splitter

### Semantic Parts

- root（`semantic-mark-root`）: Root element with flex layout, width and height, alignment and stretch styles
- panel（`semantic-mark-panel`）: Panel element with flex basis, grow ratio and panel container styles
- dragger（`semantic-mark-dragger`）: Drag control element with absolute positioning, user selection, z-index, center alignment, background color, hover and active states styles

### Usage Example

```tsx
<Splitter
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    panel: "semantic-mark-panel",
    dragger: "semantic-mark-dragger"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-splitter ant-splitter-horizontal semantic-mark-root css-var-test-id ant-splitter-css-var" style="height: 200px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div class="ant-splitter-panel semantic-mark-panel" style="flex-basis: auto; flex-grow: 1;">
          <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-center" style="height: 100%;">
            <h5 class="ant-typography ant-typography-secondary css-var-test-id" style="white-space: nowrap;">
              First
            </h5>
          </div>
        </div>
        <div aria-valuemax="0" aria-valuemin="0" aria-valuenow="50" class="ant-splitter-bar" role="separator">
          <div class="ant-splitter-bar-dragger semantic-mark-dragger">
        </div>
        <div class="ant-splitter-panel semantic-mark-panel" style="flex-basis: auto; flex-grow: 1;">
          <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-center" style="height: 100%;">
            <h5 class="ant-typography ant-typography-secondary css-var-test-id" style="white-space: nowrap;">
              Second
            </h5>
          </div>
        </div>
      </div>
    </div>
```

---

# statistic Semantic

Source: https://ant.design/components/statistic/semantic.md

## Statistic

### Semantic Parts

- root（`semantic-mark-root`）: Root element with reset styles and overall container styles for statistic component
- header（`semantic-mark-header`）: Header element with bottom padding and title area layout styles
- title（`semantic-mark-title`）: Title element with text color, font size and other title text display styles
- content（`semantic-mark-content`）: Content element with text color, font size, font family and other numeric content display styles
- prefix（`semantic-mark-prefix`）: Prefix element with inline-block display, right margin and other prefix content layout styles
- suffix（`semantic-mark-suffix`）: Suffix element with inline-block display, left margin and other suffix content layout styles

### Usage Example

```tsx
<Statistic
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    content: "semantic-mark-content",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute;">
        <div class="ant-statistic semantic-mark-root css-var-test-id">
          <div class="ant-statistic-header semantic-mark-header">
            <div class="ant-statistic-title semantic-mark-title">
              Active
            </div>
          </div>
          <div class="ant-statistic-content semantic-mark-content" style="color: rgb(63, 134, 0);">
            <span class="ant-statistic-content-prefix semantic-mark-prefix">
              <span aria-label="arrow-up" class="anticon anticon-arrow-up" role="img">
                <svg aria-hidden="true" data-icon="arrow-up" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-statistic-content-value">
              <span class="ant-statistic-content-value-int">
                11
              </span>
              <span class="ant-statistic-content-value-decimal">
                .28
              </span>
            </span>
            <span class="ant-statistic-content-suffix semantic-mark-suffix">
              %
            </span>
          </div>
        </div>
      </div>
```

---

# steps Items Semantic

Source: https://ant.design/components/steps/semantic_items.md

## Steps.Items

### Semantic Parts

- root（`semantic-mark-root`）: Root element
- wrapper（`semantic-mark-wrapper`）: Step item wrapper element
- icon（`semantic-mark-icon`）: Step item icon element
- header（`semantic-mark-header`）: Step item header element
- title（`semantic-mark-title`）: Step item title element
- subtitle（`semantic-mark-subtitle`）: Step item subtitle element
- section（`semantic-mark-section`）: Step item section element
- content（`semantic-mark-content`）: Step item content element
- rail（`semantic-mark-rail`）: Step item rail element

### Usage Example

```tsx
<Steps.Items
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    wrapper: "semantic-mark-wrapper",
    icon: "semantic-mark-icon",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    subtitle: "semantic-mark-subtitle",
    section: "semantic-mark-section",
    content: "semantic-mark-content",
    rail: "semantic-mark-rail"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-large ant-flex-vertical" style="width: 100%;">
        <div class="ant-steps ant-steps-vertical ant-steps-title-horizontal ant-steps-filled css-var-test-id" style="--ant-cmp-steps-items-offset: 0; width: 100%;">
          <div class="ant-steps-item ant-steps-item-finish semantic-mark-root">
            <div class="ant-steps-item-wrapper semantic-mark-wrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-icon">
                <span aria-label="check" class="anticon anticon-check ant-steps-item-icon-finish" role="img">
                  <svg aria-hidden="true" data-icon="check" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-section">
                <div class="ant-steps-item-header semantic-mark-header">
                  <div class="ant-steps-item-title semantic-mark-title">
                    Step 1
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-subtitle" title="00:00">
                    00:00
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-process semantic-mark-rail">
                </div>
                <div class="ant-steps-item-content semantic-mark-content">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
          <div class="ant-steps-item ant-steps-item-process ant-steps-item-active">
            <div class="ant-steps-item-wrapper">
              <div class="ant-steps-item-icon ant-wave-target">
                <span class="ant-steps-item-icon-number">
                  2
                </span>
              </div>
              <div class="ant-steps-item-section">
                <div class="ant-steps-item-header">
                  <div class="ant-steps-item-title">
                    Step 2
                  </div>
                  <div class="ant-steps-item-subtitle" title="00:01">
                    00:01
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-wait">
                </div>
                <div class="ant-steps-item-content">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
          <div class="ant-steps-item ant-steps-item-wait">
            <div class="ant-steps-item-wrapper">
              <div class="ant-steps-item-icon ant-wave-target">
                <span class="ant-steps-item-icon-number">
                  3
                </span>
              </div>
              <div class="ant-steps-item-section">
                <div class="ant-steps-item-header">
                  <div class="ant-steps-item-title">
                    Step 3
                  </div>
                  <div class="ant-steps-item-subtitle" title="00:02">
                    00:02
                  </div>
                </div>
                <div class="ant-steps-item-content">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-steps ant-steps-horizontal ant-steps-title-horizontal ant-steps-filled ant-steps-panel ant-steps-small css-var-test-id" style="--ant-cmp-steps-items-offset: 0; width: 100%;">
          <div class="ant-steps-item ant-steps-item-finish semantic-mark-root">
            <div class="ant-steps-item-wrapper semantic-mark-wrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-icon">
                <span aria-label="check" class="anticon anticon-check ant-steps-item-icon-finish" role="img">
                  <svg aria-hidden="true" data-icon="check" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-section">
                <div class="ant-steps-item-header semantic-mark-header">
                  <div class="ant-steps-item-title semantic-mark-title">
                    Step 1
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-subtitle" title="00:00">
                    00:00
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-process semantic-mark-rail">
                </div>
                <div class="ant-steps-item-content semantic-mark-content">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
          <div class="ant-steps-item ant-steps-item-process ant-steps-item-active">
            <div class="ant-steps-item-wrapper">
              <div class="ant-steps-item-icon ant-wave-target">
                <span class="ant-steps-item-icon-number">
                  2
                </span>
              </div>
              <div class="ant-steps-item-section">
                <div class="ant-steps-item-header">
                  <div class="ant-steps-item-title">
                    Step 2
                  </div>
                  <div class="ant-steps-item-subtitle" title="00:01">
                    00:01
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-wait">
                </div>
                <div class="ant-steps-item-content">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
          <div class="ant-steps-item ant-steps-item-wait">
            <div class="ant-steps-item-wrapper">
              <div class="ant-steps-item-icon ant-wave-target">
                <span class="ant-steps-item-icon-number">
                  3
                </span>
              </div>
              <div class="ant-steps-item-section">
                <div class="ant-steps-item-header">
                  <div class="ant-steps-item-title">
                    Step 3
                  </div>
                  <div class="ant-steps-item-subtitle" title="00:02">
                    00:02
                  </div>
                </div>
                <div class="ant-steps-item-content">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  wrapper
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项内裹元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  icon
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项图标元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  header
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项头部元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  title
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项标题元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  subtitle
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项副标题元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  section
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项区域元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  content
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项内容元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  rail
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项连接线元素
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div></div>
```

---

# steps Semantic

Source: https://ant.design/components/steps/semantic.md

## Steps

### Semantic Parts

- root（`semantic-mark-root`）: Root element with flex layout, nowrap, alignment, CSS variables and other basic step container styles
- item（`semantic-mark-item`）: Step item element with flex layout, relative positioning and other basic step item container styles
- itemWrapper（`semantic-mark-itemWrapper`）: Step item wrapper element with flex layout, nowrap, top padding and other step content wrapping styles
- itemIcon（`semantic-mark-itemIcon`）: Step item icon element with icon size, positioning, font-size and other icon display related styles
- itemHeader（`semantic-mark-itemHeader`）: Step item header element with flex layout, nowrap, alignment and other header area layout styles
- itemTitle（`semantic-mark-itemTitle`）: Step item title element with color, font-size, line-height, word-break, transitions and other title text styles
- itemSubtitle（`semantic-mark-itemSubtitle`）: Step item subtitle element with color, font-weight, font-size, line-height, margin, word-break and other subtitle styles
- itemSection（`semantic-mark-itemSection`）: Step item section element with step content area layout and styling
- itemContent（`semantic-mark-itemContent`）: Step item content element with color, font-size, line-height, word-break, transitions and other content text styles
- itemRail（`semantic-mark-itemRail`）: Step item rail element with border-style, border-width, transitions and other connecting line styles

### Usage Example

```tsx
<Steps
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemWrapper: "semantic-mark-itemWrapper",
    itemIcon: "semantic-mark-itemIcon",
    itemHeader: "semantic-mark-itemHeader",
    itemTitle: "semantic-mark-itemTitle",
    itemSubtitle: "semantic-mark-itemSubtitle",
    itemSection: "semantic-mark-itemSection",
    itemContent: "semantic-mark-itemContent",
    itemRail: "semantic-mark-itemRail"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-large ant-flex-vertical" style="width: 100%;">
        <div class="ant-steps ant-steps-vertical ant-steps-title-horizontal ant-steps-filled css-var-test-id semantic-mark-root" style="--ant-cmp-steps-items-offset: 0; width: 100%;">
          <div class="ant-steps-item ant-steps-item-finish semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span aria-label="check" class="anticon anticon-check ant-steps-item-icon-finish" role="img">
                  <svg aria-hidden="true" data-icon="check" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 1
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:00">
                    00:00
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-process semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
          <div class="ant-steps-item ant-steps-item-process ant-steps-item-active semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  2
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 2
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:01">
                    00:01
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-wait semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
          <div class="ant-steps-item ant-steps-item-wait semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  3
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 3
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:02">
                    00:02
                  </div>
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-steps ant-steps-horizontal ant-steps-title-horizontal ant-steps-filled ant-steps-panel ant-steps-small css-var-test-id semantic-mark-root" style="--ant-cmp-steps-items-offset: 0; width: 100%;">
          <div class="ant-steps-item ant-steps-item-finish semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span aria-label="check" class="anticon anticon-check ant-steps-item-icon-finish" role="img">
                  <svg aria-hidden="true" data-icon="check" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 1
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:00">
                    00:00
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-process semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
          <div class="ant-steps-item ant-steps-item-process ant-steps-item-active semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  2
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 2
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:01">
                    00:01
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-wait semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
          <div class="ant-steps-item ant-steps-item-wait semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  3
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 3
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:02">
                    00:02
                  </div>
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，包含 flex 布局、禁止换行、对齐方式、CSS 变量等步骤条容器的基础样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  item
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项元素，包含 flex 布局、相对定位等单个步骤项的基础容器样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemWrapper
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项内裹元素，包含 flex 布局、禁止换行、顶部内边距等步骤项内容的包装样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemIcon
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项图标元素，包含图标的尺寸、定位、字体大小等图标显示相关样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemHeader
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项头部元素，包含 flex 布局、禁止换行、对齐方式等头部区域的布局样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemTitle
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项标题元素，包含颜色、字体大小、行高、文字换行、过渡动画等标题文字样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemSubtitle
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项副标题元素，包含颜色、字体权重、字体大小、行高、外边距、文字换行等副标题样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemSection
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项区域元素，包含步骤项内容区域的布局和样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemContent
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项内容元素，包含颜色、字体大小、行高、文字换行、过渡动画等内容文字样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemRail
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项连接线元素，包含边框样式、边框宽度、过渡动画等连接线的样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div></div>
```

---

# switch Semantic

Source: https://ant.design/components/switch/semantic.md

## Switch

### Semantic Parts

- root（`semantic-mark-root`）: Root element with min-width, height, line-height, vertical alignment, background color, border, border radius, cursor style, transition animations, user selection and other basic switch container styles
- content（`semantic-mark-content`）: Content element with block display, overflow hidden, border radius, height, padding, transition animations and other switch content area layout and styles
- indicator（`semantic-mark-indicator`）: Indicator element with absolute positioning, width, height, background color, border radius, shadow, transition animations and other switch handle styles and interactive effects

### Usage Example

```tsx
<Switch
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<button aria-checked="true" class="ant-switch semantic-mark-root css-var-test-id ant-switch-checked" role="switch" type="button">
        <div class="ant-switch-handle semantic-mark-indicator">
        <span class="ant-switch-inner">
          <span class="ant-switch-inner-checked semantic-mark-content">
            ON
          </span>
          <span class="ant-switch-inner-unchecked semantic-mark-content">
            OFF
          </span>
        </span>
      </div></button>
```

---

# table Semantic

Source: https://ant.design/components/table/semantic.md

## Table

### Semantic Parts

- root（`semantic-mark-root`）: Root element with font-size, background, border-radius, scrollbar-color and other basic table container styles
- section（`semantic-mark-section`）: Container element with clear-fix, max-width, scrollbar background and other table wrapper styles
- header.wrapper（`semantic-mark-header-wrapper`）: Header wrapper element with table header layout and container styles
- header.row（`semantic-mark-header-row`）: Header row element with table header row layout and styling
- header.cell（`semantic-mark-header-cell`）: Header cell element with relative positioning, padding, word-wrap, background, text color, font-weight and other header cell styles
- title（`semantic-mark-title`）: Title element with table title styling and layout
- body.wrapper（`semantic-mark-body-wrapper`）: Body wrapper element with table body layout and container styles
- body.row（`semantic-mark-body-row`）: Body row element with hover effects, selected states, expanded states and other interactive row styles
- body.cell（`semantic-mark-body-cell`）: Body cell element with relative positioning, padding, word-wrap and other basic data cell styles
- footer（`semantic-mark-footer`）: Footer element with table footer background color, text color and other footer styles
- content（`semantic-mark-content`）: Content element with table content area styling and layout
- pagination.root（`semantic-mark-pagination-root`）: Pagination root element with pagination component basic styles and layout
- pagination.item（`semantic-mark-pagination-item`）: Pagination item element with pagination item styling and interactive effects

### Usage Example

```tsx
<Table
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    header.wrapper: "semantic-mark-header-wrapper",
    header.row: "semantic-mark-header-row",
    header.cell: "semantic-mark-header-cell",
    title: "semantic-mark-title",
    body.wrapper: "semantic-mark-body-wrapper",
    body.row: "semantic-mark-body-row",
    body.cell: "semantic-mark-body-cell",
    footer: "semantic-mark-footer",
    content: "semantic-mark-content",
    pagination.root: "semantic-mark-pagination-root",
    pagination.item: "semantic-mark-pagination-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="css-var-test-id ant-table-css-var ant-table-wrapper semantic-mark-root" style="width: 100%;">
        <div aria-busy="false" aria-live="polite" class="ant-spin css-var-test-id">
          <div class="ant-spin-container">
            <div class="ant-table ant-table-middle ant-table-bordered css-var-test-id ant-table-css-var">
              <div class="ant-table-title semantic-mark-title">
                table title
              </div>
              <div class="ant-table-container semantic-mark-section">
                <div class="ant-table-content semantic-mark-content">
                  <table style="table-layout: auto;">
                    <thead class="ant-table-thead semantic-mark-header-wrapper">
                      <tr class="semantic-mark-header-row">
                        <th class="ant-table-cell semantic-mark-header-cell" colspan="2" scope="colgroup">
                          Personal Info
                        </th>
                        <th class="ant-table-cell semantic-mark-header-cell" rowspan="2" scope="col">
                          Address
                        </th>
                      </tr>
                      <tr class="semantic-mark-header-row">
                        <th class="ant-table-cell semantic-mark-header-cell" scope="col">
                          Name
                        </th>
                        <th class="ant-table-cell semantic-mark-header-cell" scope="col">
                          Age
                        </th>
                      </tr>
                    </thead>
                    <tbody class="ant-table-tbody semantic-mark-body-wrapper">
                      <tr class="ant-table-row ant-table-row-level-0 semantic-mark-body-row" data-row-key="1">
                        <td class="ant-table-cell semantic-mark-body-cell">
                          thinkasany
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          24
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          New York No. 1 Lake Park
                        </td>
                      </tr>
                      <tr class="ant-table-row ant-table-row-level-0 semantic-mark-body-row" data-row-key="2">
                        <td class="ant-table-cell semantic-mark-body-cell">
                          Jim Green
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          42
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          London No. 1 Lake Park
                        </td>
                      </tr>
                      <tr class="ant-table-row ant-table-row-level-0 semantic-mark-body-row" data-row-key="3">
                        <td class="ant-table-cell semantic-mark-body-cell">
                          Joe Black
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          32
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          Sydney No. 1 Lake Park
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="ant-table-footer semantic-mark-footer">
                table footer
              </div>
            </div>
            <ul class="ant-pagination ant-pagination-small ant-pagination-mini ant-table-pagination ant-table-pagination-end semantic-mark-pagination-root css-var-test-id">
              <li aria-disabled="true" class="ant-pagination-prev semantic-mark-pagination-item ant-pagination-disabled" title="Previous Page">
                <button class="ant-pagination-item-link" disabled="" tabindex="-1" type="button">
                  <span aria-label="left" class="anticon anticon-left" role="img">
                    <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                    </svg>
                  </span>
                </button>
              </li>
              <li class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active semantic-mark-pagination-item" tabindex="0" title="1">
                <a rel="nofollow">
                  1
                </a>
              </li>
              <li class="ant-pagination-item ant-pagination-item-2 semantic-mark-pagination-item" tabindex="0" title="2">
                <a rel="nofollow">
                  2
                </a>
              </li>
              <li aria-disabled="false" class="ant-pagination-next semantic-mark-pagination-item" tabindex="0" title="Next Page">
                <button class="ant-pagination-item-link" tabindex="-1" type="button">
                  <span aria-label="right" class="anticon anticon-right" role="img">
                    <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                    </svg>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
```

---

# tabs Semantic

Source: https://ant.design/components/tabs/semantic.md

## Tabs

### Semantic Parts

- root（`semantic-mark-root`）: Root element with basic tab container styles, layout and direction control
- item（`semantic-mark-item`）: Item element with relative positioning, padding, colors, text ellipsis, border-radius, transitions and other tab item styles and interactive effects
- header（`semantic-mark-header`）: Header element with tab navigation header layout, background, borders and other styles
- indicator（`semantic-mark-indicator`）: Indicator element with indicator bar color, position, dimensions, transitions and other active state indication styles
- content（`semantic-mark-content`）: Content element with tab content panel layout, padding and other content display styles
- popup.root（`semantic-mark-popup-root`）: Popup menu element with dropdown absolute positioning, z-index, display control, max-height, scrolling and other styles

### Usage Example

```tsx
<Tabs
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    header: "semantic-mark-header",
    indicator: "semantic-mark-indicator",
    content: "semantic-mark-content",
    popup.root: "semantic-mark-popup-root"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-tabs ant-tabs-top semantic-mark-root css-var-test-id ant-tabs-css-var" style="height: 220px; width: 100%;">
        <div aria-orientation="horizontal" class="ant-tabs-nav semantic-mark-header" role="tablist">
          <div class="ant-tabs-nav-wrap">
            <div class="ant-tabs-nav-list" style="transform: translate(0px, 0px);">
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="0">
                <div aria-controls="rc-tabs-test-panel-0" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-0" role="tab" tabindex="-1">
                  Tab-0
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-active" data-node-key="1">
                <div aria-controls="rc-tabs-test-panel-1" aria-disabled="false" aria-selected="true" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-1" role="tab" tabindex="0">
                  Tab-1
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="2">
                <div aria-controls="rc-tabs-test-panel-2" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-2" role="tab" tabindex="-1">
                  Tab-2
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="3">
                <div aria-controls="rc-tabs-test-panel-3" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-3" role="tab" tabindex="-1">
                  Tab-3
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="4">
                <div aria-controls="rc-tabs-test-panel-4" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-4" role="tab" tabindex="-1">
                  Tab-4
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="5">
                <div aria-controls="rc-tabs-test-panel-5" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-5" role="tab" tabindex="-1">
                  Tab-5
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="6">
                <div aria-controls="rc-tabs-test-panel-6" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-6" role="tab" tabindex="-1">
                  Tab-6
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="7">
                <div aria-controls="rc-tabs-test-panel-7" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-7" role="tab" tabindex="-1">
                  Tab-7
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="8">
                <div aria-controls="rc-tabs-test-panel-8" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-8" role="tab" tabindex="-1">
                  Tab-8
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="9">
                <div aria-controls="rc-tabs-test-panel-9" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-9" role="tab" tabindex="-1">
                  Tab-9
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="10">
                <div aria-controls="rc-tabs-test-panel-10" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-10" role="tab" tabindex="-1">
                  Tab-10
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="11">
                <div aria-controls="rc-tabs-test-panel-11" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-11" role="tab" tabindex="-1">
                  Tab-11
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="12">
                <div aria-controls="rc-tabs-test-panel-12" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-12" role="tab" tabindex="-1">
                  Tab-12
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="13">
                <div aria-controls="rc-tabs-test-panel-13" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-13" role="tab" tabindex="-1">
                  Tab-13
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="14">
                <div aria-controls="rc-tabs-test-panel-14" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-14" role="tab" tabindex="-1">
                  Tab-14
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="15">
                <div aria-controls="rc-tabs-test-panel-15" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-15" role="tab" tabindex="-1">
                  Tab-15
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="16">
                <div aria-controls="rc-tabs-test-panel-16" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-16" role="tab" tabindex="-1">
                  Tab-16
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="17">
                <div aria-controls="rc-tabs-test-panel-17" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-17" role="tab" tabindex="-1">
                  Tab-17
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="18">
                <div aria-controls="rc-tabs-test-panel-18" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-18" role="tab" tabindex="-1">
                  Tab-18
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="19">
                <div aria-controls="rc-tabs-test-panel-19" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-19" role="tab" tabindex="-1">
                  Tab-19
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="20">
                <div aria-controls="rc-tabs-test-panel-20" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-20" role="tab" tabindex="-1">
                  Tab-20
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="21">
                <div aria-controls="rc-tabs-test-panel-21" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-21" role="tab" tabindex="-1">
                  Tab-21
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="22">
                <div aria-controls="rc-tabs-test-panel-22" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-22" role="tab" tabindex="-1">
                  Tab-22
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="23">
                <div aria-controls="rc-tabs-test-panel-23" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-23" role="tab" tabindex="-1">
                  Tab-23
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="24">
                <div aria-controls="rc-tabs-test-panel-24" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-24" role="tab" tabindex="-1">
                  Tab-24
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="25">
                <div aria-controls="rc-tabs-test-panel-25" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-25" role="tab" tabindex="-1">
                  Tab-25
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="26">
                <div aria-controls="rc-tabs-test-panel-26" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-26" role="tab" tabindex="-1">
                  Tab-26
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="27">
                <div aria-controls="rc-tabs-test-panel-27" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-27" role="tab" tabindex="-1">
                  Tab-27
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-disabled" data-node-key="28">
                <div aria-controls="rc-tabs-test-panel-28" aria-disabled="true" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-28" role="tab">
                  Tab-28
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item" data-node-key="29">
                <div aria-controls="rc-tabs-test-panel-29" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-29" role="tab" tabindex="-1">
                  Tab-29
                </div>
              </div>
              <div class="ant-tabs-ink-bar semantic-mark-indicator ant-tabs-ink-bar-animated">
            </div>
          </div>
          <div class="ant-tabs-nav-operations ant-tabs-nav-operations-hidden">
            <button aria-controls="rc-tabs-test-more-popup" aria-expanded="false" aria-haspopup="listbox" class="ant-tabs-nav-more" id="rc-tabs-test-more" style="visibility: hidden; order: 1;" type="button">
              <span aria-label="ellipsis" class="anticon anticon-ellipsis" role="img">
                <svg aria-hidden="true" data-icon="ellipsis" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div class="ant-tabs-content-holder">
          <div class="ant-tabs-content ant-tabs-content-top">
            <div aria-hidden="false" aria-labelledby="rc-tabs-test-tab-1" class="ant-tabs-tabpane ant-tabs-tabpane-active semantic-mark-content" id="rc-tabs-test-panel-1" role="tabpanel" tabindex="0">
              Content of tab 1
            </div>
          </div>
        </div>
      </div>
    </div>
```

---

# tag Group Semantic

Source: https://ant.design/components/tag/semantic_group.md

## Tag.Group

### Semantic Parts

- root（`semantic-mark-root`）: Root element with tag group container styles and layout
- item（`semantic-mark-item`）: Tag item element with inline-block display, height, padding, font size, line height, background color, border, border radius, opacity, transition animation, checkable state and other styles

### Usage Example

```tsx
<Tag.Group
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-tag-checkable-group css-var-test-id semantic-mark-root">
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Movies
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-checked ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Books
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Music
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Sports
          </span>
        </span>
      </div>
```

---

# tag Semantic

Source: https://ant.design/components/tag/semantic.md

## Tag

### Semantic Parts

- root（`semantic-mark-root`）: Root element with inline-block display, auto height, padding, font size, line height, nowrap, background color, border, border radius, opacity, transition animations, text alignment, relative positioning and other basic tag styles
- icon（`semantic-mark-icon`）: Icon element with font size, color, cursor style, transition animations and other icon display styles
- content（`semantic-mark-content`）: Content element with text content color, font styles and other content area styles

### Usage Example

```tsx
<Tag
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-tag semantic-mark-root ant-tag-filled css-var-test-id">
        <span aria-label="ant-design" class="anticon anticon-ant-design semantic-mark-icon" role="img">
          <svg aria-hidden="true" data-icon="ant-design" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
            <path d="M716.3 313.8c19-18.9 19-49.7 0-68.6l-69.9-69.9.1.1c-18.5-18.5-50.3-50.3-95.3-95.2-21.2-20.7-55.5-20.5-76.5.5L80.9 474.2a53.84 53.84 0 000 76.4L474.6 944a54.14 54.14 0 0076.5 0l165.1-165c19-18.9 19-49.7 0-68.6a48.7 48.7 0 00-68.7 0l-125 125.2c-5.2 5.2-13.3 5.2-18.5 0L189.5 521.4c-5.2-5.2-5.2-13.3 0-18.5l314.4-314.2c.4-.4.9-.7 1.3-1.1 5.2-4.1 12.4-3.7 17.2 1.1l125.2 125.1c19 19 49.8 19 68.7 0zM408.6 514.4a106.3 106.2 0 10212.6 0 106.3 106.2 0 10-212.6 0zm536.2-38.6L821.9 353.5c-19-18.9-49.8-18.9-68.7.1a48.4 48.4 0 000 68.6l83 82.9c5.2 5.2 5.2 13.3 0 18.5l-81.8 81.7a48.4 48.4 0 000 68.6 48.7 48.7 0 0068.7 0l121.8-121.7a53.93 53.93 0 00-.1-76.4z"></path>
          </svg>
        </span>
        <span class="semantic-mark-content">
          Ant Design
        </span>
      </span>
```

---

# time-picker Semantic

Source: https://ant.design/components/time-picker/semantic.md

## TimePicker

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-flex layout, padding, border-radius, transition animations and other basic styles for date picker container
- prefix（`semantic-mark-prefix`）: Prefix element with flex layout and margin styles for prefix content layout
- input（`semantic-mark-input`）: Input element with relative positioning, width, color, font, line-height, transition animations and other core interactive styles for input field
- suffix（`semantic-mark-suffix`）: Suffix element with flex layout, color, line-height, pointer events, transition animations and other styles for suffix content
- popup（`semantic-mark-popup`）: Popup element
- popup.container（`semantic-mark-popup-container`）: Container element, set background color, padding, border radius, shadow, border and content display styles
- popup.content（`semantic-mark-popup-content`）: Popup content element with width, border, cell and other content display styles for date table
- popup.item（`semantic-mark-popup-item`）: Popup item element with size, background, border-radius, hover state, selected state and other interactive styles for date cells
- popup.footer（`semantic-mark-popup-footer`）: Popup footer element with layout styles for bottom operation area including confirm/cancel buttons and shortcuts

### Usage Example

```tsx
<TimePicker
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    input: "semantic-mark-input",
    suffix: "semantic-mark-suffix",
    popup: "semantic-mark-popup",
    popup.container: "semantic-mark-popup-container",
    popup.content: "semantic-mark-popup-content",
    popup.item: "semantic-mark-popup-item",
    popup.footer: "semantic-mark-popup-footer"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="align-self: flex-start;">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Single">
                Single
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Multiple">
                Multiple
              </div>
            </label>
          </div>
        </div>
        <div class="ant-picker ant-picker-range ant-picker-outlined css-var-test-id ant-picker-css-var semantic-mark-root">
          <div class="ant-picker-prefix semantic-mark-prefix">
            <span aria-label="smile" class="anticon anticon-smile" role="img">
              <svg aria-hidden="true" data-icon="smile" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path>
              </svg>
            </span>
          </div>
          <div class="ant-picker-input ant-picker-input-active ant-picker-input-start">
            <input aria-invalid="false" autocomplete="off" class="semantic-mark-input" date-range="start" placeholder="Start time" size="10" value="">
          </div>
          <div class="ant-picker-range-separator">
            <span aria-label="to" class="ant-picker-separator">
              <span aria-label="swap-right" class="anticon anticon-swap-right" role="img">
                <svg aria-hidden="true" data-icon="swap-right" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                  <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
                </svg>
              </span>
            </span>
          </div>
          <div class="ant-picker-input ant-picker-input-end">
            <input aria-invalid="false" autocomplete="off" class="semantic-mark-input" date-range="end" placeholder="End time" size="10" value="">
          </div>
          <div class="ant-picker-active-bar" style="position: absolute; width: 0px; left: 0px;">
          <span class="ant-picker-suffix semantic-mark-suffix">
            <span aria-label="clock-circle" class="anticon anticon-clock-circle" role="img">
              <svg aria-hidden="true" data-icon="clock-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
              </svg>
            </span>
          </span>
        </div>
        <div class="ant-picker-dropdown css-var-test-id ant-picker-css-var semantic-mark-popup-root ant-picker-dropdown-range ant-picker-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-picker-range-wrapper ant-picker-time-range-wrapper">
            <div class="ant-picker-range-arrow" style="left: 0px;">
            <div class="ant-picker-panel-container ant-picker-time-panel-container semantic-mark-popup-container" style="margin-left: 0px; margin-right: auto;" tabindex="-1">
              <div class="ant-picker-panel-layout">
                <div>
                  <div class="ant-picker-panel" tabindex="0">
                    <div class="ant-picker-time-panel">
                      <div class="ant-picker-content semantic-mark-popup-content">
                        <ul class="ant-picker-time-panel-column" data-type="hour">
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="0">
                            <div class="ant-picker-time-panel-cell-inner">
                              00
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="1">
                            <div class="ant-picker-time-panel-cell-inner">
                              01
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="2">
                            <div class="ant-picker-time-panel-cell-inner">
                              02
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="3">
                            <div class="ant-picker-time-panel-cell-inner">
                              03
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="4">
                            <div class="ant-picker-time-panel-cell-inner">
                              04
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="5">
                            <div class="ant-picker-time-panel-cell-inner">
                              05
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="6">
                            <div class="ant-picker-time-panel-cell-inner">
                              06
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="7">
                            <div class="ant-picker-time-panel-cell-inner">
                              07
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="8">
                            <div class="ant-picker-time-panel-cell-inner">
                              08
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="9">
                            <div class="ant-picker-time-panel-cell-inner">
                              09
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="10">
                            <div class="ant-picker-time-panel-cell-inner">
                              10
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="11">
                            <div class="ant-picker-time-panel-cell-inner">
                              11
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="12">
                            <div class="ant-picker-time-panel-cell-inner">
                              12
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="13">
                            <div class="ant-picker-time-panel-cell-inner">
                              13
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="14">
                            <div class="ant-picker-time-panel-cell-inner">
                              14
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="15">
                            <div class="ant-picker-time-panel-cell-inner">
                              15
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="16">
                            <div class="ant-picker-time-panel-cell-inner">
                              16
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="17">
                            <div class="ant-picker-time-panel-cell-inner">
                              17
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="18">
                            <div class="ant-picker-time-panel-cell-inner">
                              18
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="19">
                            <div class="ant-picker-time-panel-cell-inner">
                              19
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="20">
                            <div class="ant-picker-time-panel-cell-inner">
                              20
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="21">
                            <div class="ant-picker-time-panel-cell-inner">
                              21
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="22">
                            <div class="ant-picker-time-panel-cell-inner">
                              22
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="23">
                            <div class="ant-picker-time-panel-cell-inner">
                              23
                            </div>
                          </li>
                        </ul>
                        <ul class="ant-picker-time-panel-column" data-type="minute">
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="0">
                            <div class="ant-picker-time-panel-cell-inner">
                              00
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="1">
                            <div class="ant-picker-time-panel-cell-inner">
                              01
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="2">
                            <div class="ant-picker-time-panel-cell-inner">
                              02
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="3">
                            <div class="ant-picker-time-panel-cell-inner">
                              03
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="4">
                            <div class="ant-picker-time-panel-cell-inner">
                              04
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="5">
                            <div class="ant-picker-time-panel-cell-inner">
                              05
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="6">
                            <div class="ant-picker-time-panel-cell-inner">
                              06
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="7">
                            <div class="ant-picker-time-panel-cell-inner">
                              07
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="8">
                            <div class="ant-picker-time-panel-cell-inner">
                              08
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="9">
                            <div class="ant-picker-time-panel-cell-inner">
                              09
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="10">
                            <div class="ant-picker-time-panel-cell-inner">
                              10
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="11">
                            <div class="ant-picker-time-panel-cell-inner">
                              11
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="12">
                            <div class="ant-picker-time-panel-cell-inner">
                              12
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="13">
                            <div class="ant-picker-time-panel-cell-inner">
                              13
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="14">
                            <div class="ant-picker-time-panel-cell-inner">
                              14
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="15">
                            <div class="ant-picker-time-panel-cell-inner">
                              15
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="16">
                            <div class="ant-picker-time-panel-cell-inner">
                              16
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="17">
                            <div class="ant-picker-time-panel-cell-inner">
                              17
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="18">
                            <div class="ant-picker-time-panel-cell-inner">
                              18
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="19">
                            <div class="ant-picker-time-panel-cell-inner">
                              19
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="20">
                            <div class="ant-picker-time-panel-cell-inner">
                              20
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="21">
                            <div class="ant-picker-time-panel-cell-inner">
                              21
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="22">
                            <div class="ant-picker-time-panel-cell-inner">
                              22
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="23">
                            <div class="ant-picker-time-panel-cell-inner">
                              23
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="24">
                            <div class="ant-picker-time-panel-cell-inner">
                              24
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="25">
                            <div class="ant-picker-time-panel-cell-inner">
                              25
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="26">
                            <div class="ant-picker-time-panel-cell-inner">
                              26
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="27">
                            <div class="ant-picker-time-panel-cell-inner">
                              27
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="28">
                            <div class="ant-picker-time-panel-cell-inner">
                              28
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="29">
                            <div class="ant-picker-time-panel-cell-inner">
                              29
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="30">
                            <div class="ant-picker-time-panel-cell-inner">
                              30
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="31">
                            <div class="ant-picker-time-panel-cell-inner">
                              31
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="32">
                            <div class="ant-picker-time-panel-cell-inner">
                              32
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="33">
                            <div class="ant-picker-time-panel-cell-inner">
                              33
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="34">
                            <div class="ant-picker-time-panel-cell-inner">
                              34
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="35">
                            <div class="ant-picker-time-panel-cell-inner">
                              35
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="36">
                            <div class="ant-picker-time-panel-cell-inner">
                              36
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="37">
                            <div class="ant-picker-time-panel-cell-inner">
                              37
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="38">
                            <div class="ant-picker-time-panel-cell-inner">
                              38
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="39">
                            <div class="ant-picker-time-panel-cell-inner">
                              39
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="40">
                            <div class="ant-picker-time-panel-cell-inner">
                              40
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="41">
                            <div class="ant-picker-time-panel-cell-inner">
                              41
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="42">
                            <div class="ant-picker-time-panel-cell-inner">
                              42
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="43">
                            <div class="ant-picker-time-panel-cell-inner">
                              43
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="44">
                            <div class="ant-picker-time-panel-cell-inner">
                              44
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="45">
                            <div class="ant-picker-time-panel-cell-inner">
                              45
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="46">
                            <div class="ant-picker-time-panel-cell-inner">
                              46
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="47">
                            <div class="ant-picker-time-panel-cell-inner">
                              47
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="48">
                            <div class="ant-picker-time-panel-cell-inner">
                              48
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="49">
                            <div class="ant-picker-time-panel-cell-inner">
                              49
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="50">
                            <div class="ant-picker-time-panel-cell-inner">
                              50
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="51">
                            <div class="ant-picker-time-panel-cell-inner">
                              51
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="52">
                            <div class="ant-picker-time-panel-cell-inner">
                              52
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="53">
                            <div class="ant-picker-time-panel-cell-inner">
                              53
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="54">
                            <div class="ant-picker-time-panel-cell-inner">
                              54
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="55">
                            <div class="ant-picker-time-panel-cell-inner">
                              55
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="56">
                            <div class="ant-picker-time-panel-cell-inner">
                              56
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="57">
                            <div class="ant-picker-time-panel-cell-inner">
                              57
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="58">
                            <div class="ant-picker-time-panel-cell-inner">
                              58
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="59">
                            <div class="ant-picker-time-panel-cell-inner">
                              59
                            </div>
                          </li>
                        </ul>
                        <ul class="ant-picker-time-panel-column" data-type="second">
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="0">
                            <div class="ant-picker-time-panel-cell-inner">
                              00
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="1">
                            <div class="ant-picker-time-panel-cell-inner">
                              01
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="2">
                            <div class="ant-picker-time-panel-cell-inner">
                              02
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="3">
                            <div class="ant-picker-time-panel-cell-inner">
                              03
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="4">
                            <div class="ant-picker-time-panel-cell-inner">
                              04
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="5">
                            <div class="ant-picker-time-panel-cell-inner">
                              05
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="6">
                            <div class="ant-picker-time-panel-cell-inner">
                              06
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="7">
                            <div class="ant-picker-time-panel-cell-inner">
                              07
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="8">
                            <div class="ant-picker-time-panel-cell-inner">
                              08
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="9">
                            <div class="ant-picker-time-panel-cell-inner">
                              09
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="10">
                            <div class="ant-picker-time-panel-cell-inner">
                              10
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="11">
                            <div class="ant-picker-time-panel-cell-inner">
                              11
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="12">
                            <div class="ant-picker-time-panel-cell-inner">
                              12
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="13">
                            <div class="ant-picker-time-panel-cell-inner">
                              13
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="14">
                            <div class="ant-picker-time-panel-cell-inner">
                              14
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="15">
                            <div class="ant-picker-time-panel-cell-inner">
                              15
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="16">
                            <div class="ant-picker-time-panel-cell-inner">
                              16
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="17">
                            <div class="ant-picker-time-panel-cell-inner">
                              17
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="18">
                            <div class="ant-picker-time-panel-cell-inner">
                              18
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="19">
                            <div class="ant-picker-time-panel-cell-inner">
                              19
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="20">
                            <div class="ant-picker-time-panel-cell-inner">
                              20
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="21">
                            <div class="ant-picker-time-panel-cell-inner">
                              21
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="22">
                            <div class="ant-picker-time-panel-cell-inner">
                              22
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="23">
                            <div class="ant-picker-time-panel-cell-inner">
                              23
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="24">
                            <div class="ant-picker-time-panel-cell-inner">
                              24
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="25">
                            <div class="ant-picker-time-panel-cell-inner">
                              25
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="26">
                            <div class="ant-picker-time-panel-cell-inner">
                              26
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="27">
                            <div class="ant-picker-time-panel-cell-inner">
                              27
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="28">
                            <div class="ant-picker-time-panel-cell-inner">
                              28
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="29">
                            <div class="ant-picker-time-panel-cell-inner">
                              29
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="30">
                            <div class="ant-picker-time-panel-cell-inner">
                              30
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="31">
                            <div class="ant-picker-time-panel-cell-inner">
                              31
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="32">
                            <div class="ant-picker-time-panel-cell-inner">
                              32
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="33">
                            <div class="ant-picker-time-panel-cell-inner">
                              33
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="34">
                            <div class="ant-picker-time-panel-cell-inner">
                              34
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="35">
                            <div class="ant-picker-time-panel-cell-inner">
                              35
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="36">
                            <div class="ant-picker-time-panel-cell-inner">
                              36
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="37">
                            <div class="ant-picker-time-panel-cell-inner">
                              37
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="38">
                            <div class="ant-picker-time-panel-cell-inner">
                              38
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="39">
                            <div class="ant-picker-time-panel-cell-inner">
                              39
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="40">
                            <div class="ant-picker-time-panel-cell-inner">
                              40
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="41">
                            <div class="ant-picker-time-panel-cell-inner">
                              41
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="42">
                            <div class="ant-picker-time-panel-cell-inner">
                              42
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="43">
                            <div class="ant-picker-time-panel-cell-inner">
                              43
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="44">
                            <div class="ant-picker-time-panel-cell-inner">
                              44
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="45">
                            <div class="ant-picker-time-panel-cell-inner">
                              45
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="46">
                            <div class="ant-picker-time-panel-cell-inner">
                              46
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="47">
                            <div class="ant-picker-time-panel-cell-inner">
                              47
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="48">
                            <div class="ant-picker-time-panel-cell-inner">
                              48
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="49">
                            <div class="ant-picker-time-panel-cell-inner">
                              49
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="50">
                            <div class="ant-picker-time-panel-cell-inner">
                              50
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="51">
                            <div class="ant-picker-time-panel-cell-inner">
                              51
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="52">
                            <div class="ant-picker-time-panel-cell-inner">
                              52
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="53">
                            <div class="ant-picker-time-panel-cell-inner">
                              53
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="54">
                            <div class="ant-picker-time-panel-cell-inner">
                              54
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="55">
                            <div class="ant-picker-time-panel-cell-inner">
                              55
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="56">
                            <div class="ant-picker-time-panel-cell-inner">
                              56
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="57">
                            <div class="ant-picker-time-panel-cell-inner">
                              57
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="58">
                            <div class="ant-picker-time-panel-cell-inner">
                              58
                            </div>
                          </li>
                          <li class="ant-picker-time-panel-cell semantic-mark-popup-item" data-value="59">
                            <div class="ant-picker-time-panel-cell-inner">
                              59
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="ant-picker-footer semantic-mark-popup-footer">
                    <ul class="ant-picker-ranges">
                      <li class="ant-picker-ok">
                        <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" disabled="" type="button">
                          <span>
                            OK
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，包含相对定位、行内flex布局、内边距、边框圆角、过渡动画等日期选择器容器的基础样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  prefix
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              前缀元素，包含flex布局、右外边距等前缀内容的布局样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  input
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              输入框元素，包含相对定位、宽度、颜色、字体、行高、过渡动画等输入框的核心交互样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  suffix
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              后缀元素，包含flex布局、颜色、行高、指针事件、过渡动画等后缀内容的样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框元素
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.container
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              容器元素，设置背景色、内边距、圆角、阴影、边框和内容展示样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.content
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框内容元素，包含日期表格的宽度、边框、单元格等内容展示样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.item
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框单项元素，包含日期单元格的尺寸、背景色、边框圆角、悬停态、选中态等交互样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  popup.footer
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              弹出框底部元素，包含确认取消按钮、快捷选择等底部操作区域的布局样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
```

---

# timeline Items Semantic

Source: https://ant.design/components/timeline/semantic_items.md

## Timeline.Items

### Semantic Parts

- root（`semantic-mark-root`）: Root element
- wrapper（`semantic-mark-wrapper`）: Item wrapper element
- icon（`semantic-mark-icon`）: Item icon element
- header（`semantic-mark-header`）: Item header element
- title（`semantic-mark-title`）: Item title element
- section（`semantic-mark-section`）: Item section element
- content（`semantic-mark-content`）: Item content element
- rail（`semantic-mark-rail`）: Item rail element

### Usage Example

```tsx
<Timeline.Items
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    wrapper: "semantic-mark-wrapper",
    icon: "semantic-mark-icon",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    section: "semantic-mark-section",
    content: "semantic-mark-content",
    rail: "semantic-mark-rail"
  }}
/>
```

### Abstract DOM Structure

```html
<ol class="ant-steps ant-steps-vertical ant-steps-title-horizontal ant-steps-outlined ant-steps-dot ant-timeline css-var-test-id ant-timeline-layout-alternate css-var-test-id" style="--ant-cmp-steps-items-offset: 0;">
        <li class="ant-steps-item ant-steps-item-finish ant-timeline-item-placement-start ant-timeline-item semantic-mark-root">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-wrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-icon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-section">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-header">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-title">
                  2015-09-01 09:12:11
                </div>
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-rail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-content">
                Solve initial network problems
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-steps-item-active ant-timeline-item-placement-start ant-timeline-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon">
            <div class="ant-steps-item-section ant-timeline-item-section">
              <div class="ant-steps-item-header ant-timeline-item-header">
                <div class="ant-steps-item-title ant-timeline-item-title">
                  2015-09-01 11:11:11
                </div>
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content">
                Technical testing
              </div>
            </div>
          </div>
        </div></li>
      </ol>
```

---

# timeline Semantic

Source: https://ant.design/components/timeline/semantic.md

## Timeline

### Semantic Parts

- root（`semantic-mark-root`）: Root element with timeline container list style reset, vertical layout, dot icon, outlined style, alternate layout and other basic container styles
- item（`semantic-mark-item`）: Item element with single timeline node relative positioning, margin, padding, font size, finish state, color theme, layout direction and other node basic styles
- itemWrapper（`semantic-mark-itemWrapper`）: Item wrapper element with timeline node content wrapping container styles
- itemIcon（`semantic-mark-itemIcon`）: Item icon element with node head icon absolute positioning, width/height size, background color, border, border radius, wave animation and other icon styles
- itemHeader（`semantic-mark-itemHeader`）: Item header element with header area layout containing title and rail, alignment, text direction and other styles
- itemTitle（`semantic-mark-itemTitle`）: Item title element with node title text font size, line height, color and other text styles
- itemSection（`semantic-mark-itemSection`）: Item section element with section container containing header and content flex layout, wrap, gap and other layout styles
- itemContent（`semantic-mark-itemContent`）: Item content element with node detail content relative positioning, top offset, left margin, text color, word break and other content styles
- itemRail（`semantic-mark-itemRail`）: Item rail element with timeline node connection track line absolute positioning, top offset, left offset, height, border color, width, style and other connection line styles

### Usage Example

```tsx
<Timeline
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemWrapper: "semantic-mark-itemWrapper",
    itemIcon: "semantic-mark-itemIcon",
    itemHeader: "semantic-mark-itemHeader",
    itemTitle: "semantic-mark-itemTitle",
    itemSection: "semantic-mark-itemSection",
    itemContent: "semantic-mark-itemContent",
    itemRail: "semantic-mark-itemRail"
  }}
/>
```

### Abstract DOM Structure

```html
<ol class="ant-steps ant-steps-vertical ant-steps-title-horizontal ant-steps-outlined ant-steps-dot ant-timeline css-var-test-id ant-timeline-layout-alternate css-var-test-id semantic-mark-root" style="--ant-cmp-steps-items-offset: 0;">
        <li class="ant-steps-item ant-steps-item-finish ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-itemTitle">
                  2015-09-01
                </div>
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-itemRail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Create a services
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-itemTitle">
                  2015-09-01 09:12:11
                </div>
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-itemRail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Solve initial network problems
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-steps-item-empty-header ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-itemRail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Technical testing
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-steps-item-active ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-itemTitle">
                  2015-09-01 09:12:11
                </div>
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Network problems being solved
              </div>
            </div>
          </div>
        </div></li>
      </ol>
```

---

# tooltip Semantic

Source: https://ant.design/components/tooltip/semantic.md

## Tooltip

### Semantic Parts

- root（`semantic-mark-root`）: Root element (including arrows, content elements) with absolute positioning, z-index, block display, max width, visibility, transform origin and arrow background color
- container（`semantic-mark-container`）: Content element with min width and height, padding, color, text alignment, background color, border radius, shadow and border styles
- arrow（`semantic-mark-arrow`）: Arrow element with width, height, position, color and border styles

### Usage Example

```tsx
<Tooltip
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    container: "semantic-mark-container",
    arrow: "semantic-mark-arrow"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; margin-top: 60px;">
        <span aria-describedby="test-id" class="ant-tooltip-open">
        <div class="ant-tooltip ant-zoom-big-fast-appear ant-zoom-big-fast-appear-prepare ant-zoom-big-fast ant-tooltip-css-var css-var-test-id semantic-mark-root ant-tooltip-placement-top" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-tooltip-arrow semantic-mark-arrow" style="position: absolute; bottom: 0px; left: 0px;">
            <span class="ant-tooltip-arrow-content">
          </span></div>
          <div class="ant-tooltip-container semantic-mark-container" id="test-id" role="tooltip">
            tooltip prompt text
          </div>
        </div>
      </span></div>
```

---

# tour Semantic

Source: https://ant.design/components/tour/semantic.md

## Tour

### Semantic Parts

- root（`semantic-mark-root`）: Tour root container with absolute positioning, z-index control, max width, visibility, arrow background color variable, theme styles and other container styles
- cover（`semantic-mark-cover`）: Card cover area with text center alignment, padding, image width and other image display styles
- section（`semantic-mark-section`）: Card main content area with text alignment, border radius, box shadow, relative positioning, background color, border, background clip and other card styles
- footer（`semantic-mark-footer`）: Card bottom action area with padding, text right alignment, border radius, flex layout and other bottom container styles
- actions（`semantic-mark-actions`）: Action button group container with left auto margin, button spacing and other button group layout styles
- indicator（`semantic-mark-indicator`）: Single indicator element with width/height size, inline-block display, border radius, background color, right margin, active state and other dot styles
- indicators（`semantic-mark-indicators`）: Indicator group container with inline-block display and other indicator container styles
- header（`semantic-mark-header`）: Card header area with padding, width calculation, word break and other header container styles
- title（`semantic-mark-title`）: Guide title text with font weight and other title text styles
- description（`semantic-mark-description`）: Guide description text with padding, word wrap and other description text styles
- mask（`semantic-mark-mask`）: Mask layer element with fixed positioning, full screen coverage, z-index, pointer events, transition animation and other mask styles

### Usage Example

```tsx
<Tour
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    cover: "semantic-mark-cover",
    section: "semantic-mark-section",
    footer: "semantic-mark-footer",
    actions: "semantic-mark-actions",
    indicator: "semantic-mark-indicator",
    indicators: "semantic-mark-indicators",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    mask: "semantic-mark-mask"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%; height: 825px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
        <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
          <span>
            Show
          </span>
        </button>
        <div class="ant-tour css-var-test-id semantic-mark-root ant-tour-placement-bottom" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1;">
          <div class="ant-tour-arrow" style="position: absolute; top: 0px; left: 0px;">
          <div class="ant-tour-panel">
            <div class="ant-tour-section semantic-mark-section">
              <button aria-label="Close" class="ant-tour-close" type="button">
                <span aria-label="close" class="anticon anticon-close ant-tour-close-icon" role="img">
                  <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                  </svg>
                </span>
              </button>
              <div class="ant-tour-cover semantic-mark-cover">
                <img alt="tour.png" src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png">
              </div>
              <div class="ant-tour-header semantic-mark-header">
                <div class="ant-tour-title semantic-mark-title">
                  Hello World!
                </div>
              </div>
              <div class="ant-tour-description semantic-mark-description">
                Hello World?!
              </div>
              <div class="ant-tour-footer semantic-mark-footer">
                <div class="ant-tour-indicators semantic-mark-indicators">
                  <span class="ant-tour-indicator-active ant-tour-indicator semantic-mark-indicator">
                  <span class="ant-tour-indicator semantic-mark-indicator">
                </span></span></div>
                <div class="ant-tour-actions semantic-mark-actions">
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm ant-tour-next-btn" type="button">
                    <span>
                      Next
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```

---

# transfer Semantic

Source: https://ant.design/components/transfer/semantic.md

## Transfer

### Semantic Parts

- root（`semantic-mark-root`）: Root element with flex layout, transfer container base styles and layout control
- section（`semantic-mark-section`）: Section element with flex layout, width, height, min height, border, border radius and other single-side transfer container styles
- header（`semantic-mark-header`）: Header element with flex layout, alignment, height, padding, color, background color, bottom border, border radius and other header area styles
- title（`semantic-mark-title`）: Title element with text ellipsis, flex ratio, text alignment, auto left margin and other title text layout and styles
- body（`semantic-mark-body`）: Body element with list main area container styles and layout control
- list（`semantic-mark-list`）: List element with list content styles, layout and scroll control
- item（`semantic-mark-item`）: List item element with relative positioning, padding, border, hover state, selected state, disabled state and other list item interaction styles
- itemIcon（`semantic-mark-itemIcon`）: List item icon element with checkbox and other icon styles and interaction states
- itemContent（`semantic-mark-itemContent`）: List item content element with text ellipsis, padding and other list item text content display styles
- footer（`semantic-mark-footer`）: Footer element with bottom operation area styles and layout
- actions（`semantic-mark-actions`）: Actions element with transfer button group styles, layout and interaction states

### Usage Example

```tsx
<Transfer
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    list: "semantic-mark-list",
    item: "semantic-mark-item",
    itemIcon: "semantic-mark-itemIcon",
    itemContent: "semantic-mark-itemContent",
    footer: "semantic-mark-footer",
    actions: "semantic-mark-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-transfer css-var-test-id semantic-mark-root">
        <div class="ant-transfer-section semantic-mark-section ant-transfer-section-with-footer" style="height: 250px; width: 200px;">
          <div class="ant-transfer-list-header semantic-mark-header">
            <label class="ant-checkbox-wrapper ant-transfer-list-checkbox css-var-test-id ant-checkbox-css-var">
              <span class="ant-checkbox ant-wave-target">
                <input class="ant-checkbox-input" type="checkbox">
              </span>
            </label>
            <span aria-label="down" class="anticon anticon-down ant-dropdown-trigger" role="img">
              <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
            <span class="ant-transfer-list-header-selected">
              18 items
            </span>
            <span class="ant-transfer-list-header-title semantic-mark-title">
              Source
            </span>
          </div>
          <div class="ant-transfer-list-body ant-transfer-list-body-with-search semantic-mark-body">
            <div class="ant-transfer-list-body-search-wrapper">
              <span class="ant-input-affix-wrapper ant-input-outlined ant-transfer-list-search css-var-test-id ant-input-css-var">
                <span class="ant-input-prefix">
                  <span aria-label="search" class="anticon anticon-search" role="img">
                    <svg aria-hidden="true" data-icon="search" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                    </svg>
                  </span>
                </span>
                <input class="ant-input" placeholder="Search here" type="text" value="">
                <span class="ant-input-suffix">
                  <button class="ant-input-clear-icon ant-input-clear-icon-hidden" tabindex="-1" type="button">
                    <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                      <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                      </svg>
                    </span>
                  </button>
                </span>
              </span>
            </div>
            <ul class="ant-transfer-list-content semantic-mark-list">
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 1">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 1
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 2">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 2
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 3">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 3
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 5">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 5
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 6">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 6
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 7">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 7
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 8">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 8
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 9">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 9
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 11">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 11
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 12">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 12
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 13">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 13
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 14">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 14
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 15">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 15
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 16">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 16
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 17">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 17
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 18">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 18
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 19">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 19
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 20">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 20
                </span>
              </li>
            </ul>
          </div>
          <div class="ant-transfer-list-footer semantic-mark-footer">
            <div style="padding: 8px;">
              Custom Footer
            </div>
          </div>
        </div>
        <div class="ant-transfer-actions semantic-mark-actions">
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm ant-btn-icon-only" disabled="" type="button">
            <span class="ant-btn-icon">
              <span aria-label="right" class="anticon anticon-right" role="img">
                <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                </svg>
              </span>
            </span>
          </button>
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm ant-btn-icon-only" disabled="" type="button">
            <span class="ant-btn-icon">
              <span aria-label="left" class="anticon anticon-left" role="img">
                <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                </svg>
              </span>
            </span>
          </button>
        </div>
        <div class="ant-transfer-section semantic-mark-section ant-transfer-section-with-footer" style="height: 250px; width: 200px;">
          <div class="ant-transfer-list-header semantic-mark-header">
            <label class="ant-checkbox-wrapper ant-transfer-list-checkbox css-var-test-id ant-checkbox-css-var">
              <span class="ant-checkbox ant-wave-target">
                <input class="ant-checkbox-input" type="checkbox">
              </span>
            </label>
            <span aria-label="down" class="anticon anticon-down ant-dropdown-trigger" role="img">
              <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
            <span class="ant-transfer-list-header-selected">
              2 items
            </span>
            <span class="ant-transfer-list-header-title semantic-mark-title">
              Target
            </span>
          </div>
          <div class="ant-transfer-list-body ant-transfer-list-body-with-search semantic-mark-body">
            <div class="ant-transfer-list-body-search-wrapper">
              <span class="ant-input-affix-wrapper ant-input-outlined ant-transfer-list-search css-var-test-id ant-input-css-var">
                <span class="ant-input-prefix">
                  <span aria-label="search" class="anticon anticon-search" role="img">
                    <svg aria-hidden="true" data-icon="search" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                    </svg>
                  </span>
                </span>
                <input class="ant-input" placeholder="Search here" type="text" value="">
                <span class="ant-input-suffix">
                  <button class="ant-input-clear-icon ant-input-clear-icon-hidden" tabindex="-1" type="button">
                    <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                      <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                      </svg>
                    </span>
                  </button>
                </span>
              </span>
            </div>
            <ul class="ant-transfer-list-content semantic-mark-list">
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 4">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 4
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 10">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 10
                </span>
              </li>
            </ul>
          </div>
          <div class="ant-transfer-list-footer semantic-mark-footer">
            <div style="padding: 8px;">
              Custom Footer
            </div>
          </div>
        </div>
      </div>
```

---

# tree Semantic

Source: https://ant.design/components/tree/semantic.md

## Tree

### Semantic Parts

- root（`semantic-mark-root`）: Root element with tree control base styles, layout and container control
- item（`semantic-mark-item`）: Item element with tree node base styles, drag state, role attributes, indentation, switcher, content wrapper and other node structure
- itemTitle（`semantic-mark-itemTitle`）: Title element with tree node title text display styles and text content
- itemIcon（`semantic-mark-itemIcon`）: Icon element with tree node icon styles, size and state display

### Usage Example

```tsx
<Tree
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemTitle: "semantic-mark-itemTitle",
    itemIcon: "semantic-mark-itemIcon"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-tree css-var-test-id semantic-mark-root">
        <div aria-hidden="true" class="ant-tree-treenode" style="position: absolute; pointer-events: none; visibility: hidden; height: 0px; overflow: hidden; border: 0px; padding: 0px;">
          <div class="ant-tree-indent">
            <div class="ant-tree-indent-unit">
          </div>
        </div>
        <div class="ant-tree-list" role="tree" style="position: relative;" tabindex="0">
          <div class="ant-tree-list-holder">
            <div>
              <div class="ant-tree-list-holder-inner" style="display: flex; flex-direction: column;">
                <div aria-disabled="false" aria-expanded="true" aria-selected="false" class="ant-tree-treenode semantic-mark-item ant-tree-treenode-switcher-open ant-tree-treenode-leaf-last" draggable="false" id="test-id-0-0" role="treeitem">
                  <span aria-hidden="true" class="ant-tree-indent">
                  <span class="ant-tree-switcher ant-tree-switcher_open">
                    <span aria-label="down" class="anticon anticon-down ant-tree-switcher-icon" role="img">
                      <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                      </svg>
                    </span>
                  </span>
                  <span class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open" title="parent 1">
                    <span class="semantic-mark-itemIcon ant-tree-iconEle ant-tree-icon__customize">
                      <span aria-label="smile" class="anticon anticon-smile" role="img">
                        <svg aria-hidden="true" data-icon="smile" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="ant-tree-title semantic-mark-itemTitle">
                      parent 1
                    </span>
                  </span>
                </span></div>
                <div aria-disabled="false" aria-selected="true" class="ant-tree-treenode semantic-mark-item ant-tree-treenode-switcher-close ant-tree-treenode-selected ant-tree-treenode-leaf" draggable="false" id="test-id-0-0-0" role="treeitem">
                  <span aria-hidden="true" class="ant-tree-indent">
                    <span class="ant-tree-indent-unit ant-tree-indent-unit-start ant-tree-indent-unit-end">
                  </span>
                  <span class="ant-tree-switcher ant-tree-switcher-noop">
                  <span class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal ant-tree-node-selected" title="leaf">
                    <span class="semantic-mark-itemIcon ant-tree-iconEle ant-tree-icon__customize">
                      <span aria-label="meh" class="anticon anticon-meh" role="img">
                        <svg aria-hidden="true" data-icon="meh" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 565H360c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="ant-tree-title semantic-mark-itemTitle">
                      leaf
                    </span>
                  </span>
                </span></span></div>
                <div aria-disabled="false" aria-selected="false" class="ant-tree-treenode semantic-mark-item ant-tree-treenode-switcher-close ant-tree-treenode-leaf-last ant-tree-treenode-leaf" draggable="false" id="test-id-0-0-1" role="treeitem">
                  <span aria-hidden="true" class="ant-tree-indent">
                    <span class="ant-tree-indent-unit ant-tree-indent-unit-start ant-tree-indent-unit-end">
                  </span>
                  <span class="ant-tree-switcher ant-tree-switcher-noop">
                  <span class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal" title="leaf">
                    <span class="semantic-mark-itemIcon ant-tree-iconEle ant-tree-icon__customize">
                      <span aria-label="frown" class="anticon anticon-frown" role="img">
                        <svg aria-hidden="true" data-icon="frown" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM512 533c-85.5 0-155.6 67.3-160 151.6a8 8 0 008 8.4h48.1c4.2 0 7.8-3.2 8.1-7.4C420 636.1 461.5 597 512 597s92.1 39.1 95.8 88.6c.3 4.2 3.9 7.4 8.1 7.4H664a8 8 0 008-8.4C667.6 600.3 597.5 533 512 533z"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="ant-tree-title semantic-mark-itemTitle">
                      leaf
                    </span>
                  </span>
                </span></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```

---

# tree-select Semantic

Source: https://ant.design/components/tree-select/semantic.md

## TreeSelect

### Semantic Parts

- root（`semantic-mark-root`）: Root element with tree selector base styles, border, border radius container styles
- prefix（`semantic-mark-prefix`）: Prefix element with prefix content layout and styles
- input（`semantic-mark-input`）: Input element with text input, search, selected value display and other input core interaction styles
- suffix（`semantic-mark-suffix`）: Suffix element with suffix content, clear button, dropdown arrow and other suffix area styles
- content（`semantic-mark-content`）: Multiple selection container with layout, spacing, and wrapping styles for selected items
- item（`semantic-mark-item`）: Multiple selection item element with border, background, padding, and margin styles
- itemContent（`semantic-mark-itemContent`）: Multiple selection item content area with text ellipsis styles
- itemRemove（`semantic-mark-itemRemove`）: Multiple selection item remove button with font-related styles
- placeholder（`semantic-mark-placeholder`）: Placeholder element with font styles and colors for placeholder text
- popup.root（`semantic-mark-popup-root`）: Popup element with dropdown tree selection panel positioning, z-index, background, border, shadow and other popup layer styles
- popup.item（`semantic-mark-popup-item`）: Popup item element with tree node option styles, hover state, selected state and other interaction states
- popup.itemTitle（`semantic-mark-popup-itemTitle`）: Popup title element with tree node title text display styles

### Usage Example

```tsx
<TreeSelect
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    input: "semantic-mark-input",
    suffix: "semantic-mark-suffix",
    content: "semantic-mark-content",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemRemove: "semantic-mark-itemRemove",
    placeholder: "semantic-mark-placeholder",
    popup.root: "semantic-mark-popup-root",
    popup.item: "semantic-mark-popup-item",
    popup.itemTitle: "semantic-mark-popup-itemTitle"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="position: absolute; margin-bottom: 80px;">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Single">
                Single
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Multiple">
                Multiple
              </div>
            </label>
          </div>
        </div>
        <div class="ant-select ant-tree-select ant-select-outlined semantic-mark-root css-var-test-id ant-select-css-var ant-tree-select-css-var ant-select-multiple ant-select-allow-clear ant-select-show-arrow ant-select-open ant-select-show-search" style="width: 300px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content semantic-mark-content">
            <div class="ant-select-content-item" style="opacity: 1;">
              <span class="ant-select-selection-item semantic-mark-item" title="aojunhao123">
                <span class="ant-select-selection-item-content semantic-mark-itemContent">
                  aojunhao123
                </span>
                <span aria-hidden="true" class="ant-select-selection-item-remove semantic-mark-itemRemove" style="user-select: none;" unselectable="on">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </span>
              </span>
            </div>
            <div class="ant-select-content-item ant-select-content-item-suffix" style="opacity: 1;">
              <input aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="off" class="ant-select-input semantic-mark-input" id="test-id" role="combobox" style="--select-input-width: 0;" type="search" value="">
            </div>
          </div>
          <div class="ant-select-suffix semantic-mark-suffix">
            <span aria-label="search" class="anticon anticon-search" role="img">
              <svg aria-hidden="true" data-icon="search" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </span>
          </div>
          <div class="ant-select-clear">
            <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
              <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div class="ant-select-dropdown ant-tree-select-dropdown semantic-mark-root semantic-mark-popup-root css-var-test-id ant-select-css-var ant-tree-select-css-var ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div>
            <div>
              <span aria-live="assertive" style="width: 0px; height: 0px; display: flex; overflow: hidden; opacity: 0; border: 0px; padding: 0px; margin: 0px;">
                contributors
              </span>
              <div class="ant-select-tree">
                <div aria-hidden="true" class="ant-select-tree-treenode" style="position: absolute; pointer-events: none; visibility: hidden; height: 0px; overflow: hidden; border: 0px; padding: 0px;">
                  <div class="ant-select-tree-indent">
                    <div class="ant-select-tree-indent-unit">
                  </div>
                </div>
                <div aria-activedescendant="test-id-contributors" class="ant-select-tree-list" role="tree" style="position: relative;">
                  <div class="ant-select-tree-list-holder" style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
                    <div>
                      <div class="ant-select-tree-list-holder-inner" style="display: flex; flex-direction: column;">
                        <div aria-disabled="false" aria-expanded="true" aria-selected="false" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-open ant-select-tree-treenode-active ant-select-tree-treenode-leaf-last" draggable="false" id="test-id-contributors" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                          <span class="ant-select-tree-switcher ant-select-tree-switcher_open">
                            <span aria-label="caret-down" class="anticon anticon-caret-down ant-select-tree-switcher-icon" role="img">
                              <svg aria-hidden="true" data-icon="caret-down" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                              </svg>
                            </span>
                          </span>
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-open" title="contributors">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              contributors
                            </span>
                          </span>
                        </span></div>
                        <div aria-disabled="false" aria-selected="true" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-close ant-select-tree-treenode-selected ant-select-tree-treenode-leaf" draggable="false" id="test-id-aojunhao123" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                            <span class="ant-select-tree-indent-unit ant-select-tree-indent-unit-start ant-select-tree-indent-unit-end">
                          </span>
                          <span class="ant-select-tree-switcher ant-select-tree-switcher-noop">
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal ant-select-tree-node-selected" title="aojunhao123">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              aojunhao123
                            </span>
                          </span>
                        </span></span></div>
                        <div aria-disabled="false" aria-selected="false" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-close ant-select-tree-treenode-leaf" draggable="false" id="test-id-thinkasany" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                            <span class="ant-select-tree-indent-unit ant-select-tree-indent-unit-start ant-select-tree-indent-unit-end">
                          </span>
                          <span class="ant-select-tree-switcher ant-select-tree-switcher-noop">
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal" title="thinkasany">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              thinkasany
                            </span>
                          </span>
                        </span></span></div>
                        <div aria-disabled="false" aria-selected="false" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-close ant-select-tree-treenode-leaf-last ant-select-tree-treenode-leaf" draggable="false" id="test-id-meet-student" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                            <span class="ant-select-tree-indent-unit ant-select-tree-indent-unit-start ant-select-tree-indent-unit-end">
                          </span>
                          <span class="ant-select-tree-switcher ant-select-tree-switcher-noop">
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal" title="meet-student">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              meet-student
                            </span>
                          </span>
                        </span></span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```

---

# upload Semantic

Source: https://ant.design/components/upload/semantic.md

## Upload

### Semantic Parts

- root（`semantic-mark-root`）: Root container element with layout styles, disabled text color, user-select control, cursor styles and other basic styles
- list（`semantic-mark-list`）: File list container with layout arrangement, transition animations, spacing control and other styles
- item（`semantic-mark-item`）: File item element with padding, background color, border styles, hover effects, status colors, transition animations and other styles
- trigger（`semantic-mark-trigger`）: Upload button container with button styles, disabled state, visibility control and other styles

### Usage Example

```tsx
<Upload
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    list: "semantic-mark-list",
    item: "semantic-mark-item",
    trigger: "semantic-mark-trigger"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-upload-wrapper css-var-test-id semantic-mark-root">
        <div class="ant-upload ant-upload-select semantic-mark-trigger">
          <span class="ant-upload">
            <input accept="" name="file" style="display: none;" type="file">
            <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
              <span class="ant-btn-icon">
                <span aria-label="upload" class="anticon anticon-upload" role="img">
                  <svg aria-hidden="true" data-icon="upload" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                  </svg>
                </span>
              </span>
              <span>
                Upload
              </span>
            </button>
          </span>
        </div>
        <div class="ant-upload-list ant-upload-list-text semantic-mark-list">
          <div class="ant-upload-list-item-container">
            <div class="ant-upload-list-item ant-upload-list-item-uploading semantic-mark-item">
              <div class="ant-upload-icon">
                <span aria-label="loading" class="anticon anticon-loading anticon-spin" role="img">
                  <svg aria-hidden="true" data-icon="loading" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                  </svg>
                </span>
              </div>
              <a class="ant-upload-list-item-name" href="http://www.baidu.com/xxx.png" rel="noopener noreferrer" target="_blank" title="xxx.png">
                xxx.png
              </a>
              <span class="ant-upload-list-item-actions">
                <button class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action" title="Remove file" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="delete" class="anticon anticon-delete" role="img" tabindex="-1">
                      <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
          <div class="ant-upload-list-item-container">
            <div class="ant-upload-list-item ant-upload-list-item-done semantic-mark-item">
              <div class="ant-upload-icon">
                <span aria-label="paper-clip" class="anticon anticon-paper-clip" role="img">
                  <svg aria-hidden="true" data-icon="paper-clip" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path>
                  </svg>
                </span>
              </div>
              <a class="ant-upload-list-item-name" href="http://www.baidu.com/yyy.png" rel="noopener noreferrer" target="_blank" title="yyy.png">
                yyy.png
              </a>
              <span class="ant-upload-list-item-actions">
                <button class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action" title="Remove file" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="delete" class="anticon anticon-delete" role="img" tabindex="-1">
                      <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
          <div class="ant-upload-list-item-container">
            <div class="ant-upload-list-item ant-upload-list-item-error semantic-mark-item">
              <div class="ant-upload-icon">
                <span aria-label="paper-clip" class="anticon anticon-paper-clip" role="img">
                  <svg aria-hidden="true" data-icon="paper-clip" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path>
                  </svg>
                </span>
              </div>
              <a class="ant-upload-list-item-name" href="http://www.baidu.com/zzz.png" rel="noopener noreferrer" target="_blank" title="zzz.png">
                zzz.png
              </a>
              <span class="ant-upload-list-item-actions">
                <button class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action" title="Remove file" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="delete" class="anticon anticon-delete" role="img" tabindex="-1">
                      <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </span>
```

---
