## en-US

Select supports standard ARIA attributes to ensure accessibility for screen reader users and keyboard navigation.

### Accessibility Attributes

- `aria-label`: Provides an accessible name directly
- `aria-labelledby`: References the ID of an external label element
- `aria-describedby`: References description or help text
- `aria-required`: Indicates the field is required
- `aria-invalid`: Indicates validation errors

### Form Integration

When used inside `Form.Item`, aria attributes are automatically managed:

- `aria-required` is added when `required` prop is true
- `aria-invalid` is added when validation fails
- `aria-describedby` links to help text and error messages

### Best Practices

1. Always provide a label using either `aria-label` or `aria-labelledby`
2. Use `aria-describedby` for help text or additional instructions
3. Let `Form.Item` manage `aria-required` and `aria-invalid` automatically
4. Test with screen readers to ensure proper announcements
