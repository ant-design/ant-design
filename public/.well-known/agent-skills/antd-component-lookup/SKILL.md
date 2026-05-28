---
name: antd-component-lookup
description: Look up Ant Design React component documentation, props, and usage examples. Use when working with Ant Design (antd) components and needing API details, default values, or usage patterns.
---

# Ant Design Component Lookup

Look up component documentation for Ant Design (antd), a React UI library with 80+ components.

## When to Use

- You need to know a component's props, defaults, or TypeScript types
- You need usage examples or demo code
- You need to know which subcomponents or methods a component provides

## Instructions

1. Visit the component's English documentation page at `https://ant.design/components/<component-name>`
   - For Chinese docs: `https://ant.design/components/<component-name>-cn`
2. For a machine-readable overview, fetch `https://ant.design/llms.txt` to discover all available component documentation paths
3. For detailed component API tables, fetch `https://ant.design/llms-full.txt` for the complete content

## Common Components

Button, Input, Select, Table, Form, Modal, Tabs, Menu, DatePicker, Upload, message, notification, Popconfirm, Tooltip, Tree, Cascader, Transfer, Steps, Card, Collapse, Carousel, Calendar, TimePicker, Rate, Switch, Slider, Progress, Badge, Tag, Avatar, Typography, Space, Divider, Grid, Layout, Affix, Anchor, Breadcrumb, Dropdown, Pagination, Popover, Result, Skeleton, Spin, Watermark, Tour, FloatButton, QRCode, ColorPicker, Segmented, Splitter

## Notes

- Component names in URLs use kebab-case (e.g., `date-picker`, `float-button`)
- The `llms-full.txt` file contains the most comprehensive documentation
- For TypeScript types, refer to the component's type definitions in the antd package
