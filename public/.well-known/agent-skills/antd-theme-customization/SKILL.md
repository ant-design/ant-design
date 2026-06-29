---
name: antd-theme-customization
description: Customize Ant Design theme using Design Tokens and ConfigProvider. Use when adjusting visual styles, colors, spacing, or other theme properties in an Ant Design project.
---

# Ant Design Theme Customization

Customize the visual appearance of Ant Design components using the theme system.

## When to Use

- You need to change primary colors, border radius, or other design tokens
- You need to implement dark mode or custom themes
- You need to configure component-specific token overrides
- You need to use the static token extraction or CSS variable mode

## Instructions

1. Review the theme documentation at `https://ant.design/docs/react/customize-theme`
2. Use `<ConfigProvider theme={{ token: { ... } }}>` to customize global tokens
3. Use `<ConfigProvider theme={{ components: { Button: { ... } } }}>` for component-specific tokens
4. For dark mode, use `<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>`
5. For CSS variable mode, set `<ConfigProvider theme={{ cssVar: true }}>`

## Key Design Tokens

- `colorPrimary` — primary color (default: `#1677ff`)
- `colorBgContainer` — background color of containers
- `borderRadius` — global border radius
- `fontFamily` — font family
- `fontSize` — base font size

## Notes

- Ant Design v5 uses CSS-in-JS; no more Less variable overrides
- Use `theme.getDesignToken()` to extract computed tokens
- See all available tokens at `https://ant.design/docs/react/token`
