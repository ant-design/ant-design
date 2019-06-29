---
category: Components
type: Deprecated
title: Mention (Deprecated)
---

Mention component. Deprecated, please use [Mentions](/components/mentions) instead.

## Why deprecated?

<div class="ant-alert ant-alert-error ant-alert-no-icon">
Mention use
<a href="https://www.npmjs.com/package/draft-js" target="_blank" rel="noopener noreferrer">Draft.js</a>
to measure tips position, which use nearly 11.6% package size. We hope to reduce bundle size by using lightweight solution to handle this.
</div>

## API

```jsx
<Mention
  onChange={onChange}
  suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
/>
```

### Mention API

| API | Description | Type | Version Added |
| --- | --- | --- | --- |
| getMentions | get mentioned people in current contentState | Function(ContentState: contentState): string\[] | 3.0.0 |
| toContentState | convert string to ContentState | Function(value: string): ContentState | 3.0.0 |
| toString | convert ContentState to string | Function(contentState: ContentState): string | 3.0.0 |

### Mention

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| defaultValue | default value | ContentState, you can use `Mention.toContentState` to convert text to `ContentState` | null | 3.0.0 |
| defaultSuggestions | default suggestion content | Array&lt;string\|Mention.Nav> | \[] | 3.12.0 |
| disabled | Tell if the input is disabled. | boolean | false | 3.0.0 |
| getSuggestionContainer | rendered to the root of the menu. Default rendered to the body dom. If gets any problem of the menu while scrolling. Try to make the root the dom scrolled, and make it position relative. | function | () => document.body | 3.0.0 |
| loading | loading mode | boolean | false | 3.0.0 |
| multiLines | multilines mode | boolean | false | 3.0.0 |
| notFoundContent | suggestion when suggestions empty | string | 'No matches found' | 3.0.0 |
| placeholder | placeholder of input | string | null | 3.0.0 |
| placement | The position of the suggestion relative to the target, which can be one of `top` and `bottom` | string | 'bottom'. | 3.0.0 |
| prefix | character which will trigger Mention to show mention list | string or Array&lt;string> | '@' | 3.0.0 |
| readOnly | Tell if the input is readonly. | boolean | false | 3.0.0 |
| suggestions | suggestion content | Array&lt;string\|Mention.Nav> | \[] | 3.0.0 |
| suggestionStyle | style of suggestion container | object | {} | 3.0.0 |
| value | core state of mention | ContentState | null | 3.0.0 |
| onBlur | Callback function called when mention component blur | function(e) | null | 3.0.0 |
| onChange | Callback function called when content of input changes | function(contentState: ContentState) | null | 3.0.0 |
| onFocus | Callback function called when mention component get focus | function | null | 3.0.0 |
| onSearchChange | Callback function called when search content changes | function(value:string, trigger: string) | \[] | 3.0.0 |
| onSelect | Callback function called when select from suggestions | function(suggestion: string, data?: any) | null | 3.0.0 |

### Mention methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |

### Nav

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| children | suggestion content | object | {} | 3.0.0 |
| value | value of suggestion, the value will insert into input filed while selected | string | "" | 3.0.0 |
