# Ant Design Repository Copilot Instructions

This is the Ant Design (antd) repository - a React component library with enterprise-class UI design language, widely used for building professional web applications.

## Project Context

- **Framework**: TypeScript + React (compatible with React 16-19)
- **Package**: Published as npm package `antd`
- **Purpose**: Enterprise-class UI components for React applications
- **Design System**: Follows Ant Design specifications
- **Internationalization**: Full i18n support

## Code Standards & Best Practices

### TypeScript Requirements
- Always use TypeScript with strict type checking
- Never use `any` type - define precise types instead
- Use interfaces (not type aliases) for object structures
- Export all public interface types
- Component props interfaces should be named `ComponentNameProps`
- Component ref types should use `React.ForwardRefRenderFunction`
- Prefer union types over enums, use `as const` for constants

### React Component Guidelines
- Use functional components with hooks exclusively (no class components)
- Use early returns to improve readability
- Apply performance optimizations with React.memo, useMemo, useCallback appropriately
- Support server-side rendering
- Maintain backward compatibility - avoid breaking changes
- Components must support ref forwarding with this structure:
  ```tsx
  ComponentRef {
    nativeElement: HTMLElement;
    focus: VoidFunction;
    // other methods
  }
  ```

### Naming Conventions
- **Components**: PascalCase (e.g., `Button`, `DatePicker`)
- **Props**: camelCase with specific patterns:
  - Default values: `default` + `PropName` (e.g., `defaultValue`)
  - Force rendering: `forceRender`
  - Panel state: use `open` instead of `visible`
  - Display toggles: `show` + `PropName`
  - Capabilities: `PropName` + `able`
  - Data source: `dataSource`
  - Disabled state: `disabled`
  - Additional content: `extra`
  - Icons: `icon`
  - Triggers: `trigger`
  - CSS classes: `className`
- **Events**: `on` + `EventName` (e.g., `onClick`, `onChange`)
- **Sub-component events**: `on` + `SubComponentName` + `EventName`
- Use complete names, never abbreviations

### Styling Approach
- Use `@ant-design/cssinjs` for all styling
- Place component styles in `style/` directory
- Generate styles with functions named `gen[ComponentName]Style`
- Use design tokens from the Ant Design token system
- Never hardcode colors, sizes, or spacing values
- Support both light and dark themes
- Use CSS logical properties for RTL support (e.g., `margin-inline-start` instead of `margin-left`)
- Respect `prefers-reduced-motion` for animations

### Bundle & Performance
- Avoid introducing new dependencies
- Maintain strict bundle size control
- Support tree shaking
- Browser compatibility: Chrome 80+
- Optimize for minimal re-renders

### Testing Requirements
- Write comprehensive tests using Jest and React Testing Library
- Target 100% test coverage
- Place tests in `__tests__` directory as `index.test.tsx` or `componentName.test.tsx`
- Include snapshot tests for UI components

### Demo & Documentation
- Keep demo code concise and copy-pasteable
- Focus each demo on a single feature
- Provide both English and Chinese documentation
- Follow import order: React → dependencies → antd components → custom components → types → styles
- Use 2-space indentation
- Prefer antd built-in components over external dependencies

### API Documentation Format
When documenting component APIs, use this table structure:
- String defaults in backticks: `"default"`
- Boolean defaults as literal values: `true` or `false`  
- Number defaults as literal values: `0`, `100`
- No default value: `-`
- Descriptions start with capital letter, no ending period
- Sort API properties alphabetically

### Internationalization
- Locale configuration files use pattern: `locale_COUNTRY.ts` (e.g., `zh_CN.ts`)
- Use `useLocale` hook from `components/locale/index.tsx`
- When modifying locale strings, update ALL language files
- Locale content should be plain strings with `${}` placeholders for variables

### File Organization
- Components in `components/[component-name]/` directory
- Demos in `components/[component-name]/demo/` as `.tsx` files
- Use kebab-case for demo filenames: `basic.tsx`, `custom-filter.tsx`
- Each component demo includes both `.md` documentation and `.tsx` code

## Development Commands
- `npm start` - Development server
- `npm run build` - Build project  
- `npm test` - Run tests
- `npm run lint` - Code linting
- `npm run format` - Code formatting

## Quality Standards
- Pass all ESLint and TypeScript checks
- Achieve 100% test coverage
- Support accessibility (WCAG 2.1 AA)
- Maintain cross-browser compatibility
- No console errors or warnings

When contributing code, ensure it follows these patterns and integrates seamlessly with the existing Ant Design ecosystem.
