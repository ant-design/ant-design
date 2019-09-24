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

| API | Description | Type | Version |
| --- | --- | --- | --- |
| getMentions | get mentioned people in current contentState | Function(ContentState: contentState): string\[] |  |
| toContentState | convert string to ContentState | Function(value: string): ContentState |  |
| toString | convert ContentState to string | Function(contentState: ContentState): string |  |

### Mention

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false |  |
| defaultValue | default value | ContentState, you can use `Mention.toContentState` to convert text to `ContentState` | null |  |
| defaultSuggestions | default suggestion content | Array&lt;string\|Mention.Nav> | \[] | 3.12.0 |
| disabled | Tell if the input is disabled. | boolean | false |  |
| getSuggestionContainer | rendered to the root of the menu. Default rendered to the body dom. If gets any problem of the menu while scrolling. Try to make the root the dom scrolled, and make it position relative. | function | () => document.body |  |
| loading | loading mode | boolean | false |  |
| multiLines | multilines mode | boolean | false |  |
| notFoundContent | suggestion when suggestions empty | string | 'No matches found' |  |
| placeholder | placeholder of input | string | null |  |
| placement | The position of the suggestion relative to the target, which can be one of `top` and `bottom` | string | 'bottom'. |  |
| prefix | character which will trigger Mention to show mention list | string or Array&lt;string> | '@' |  |
| readOnly | Tell if the input is readonly. | boolean | false |  |
| suggestions | suggestion content | Array&lt;string\|Mention.Nav> | \[] |  |
| suggestionStyle | style of suggestion container | object | {} |  |
| value | core state of mention | ContentState | null |  |
| onBlur | Callback function called when mention component blur | function(e) | null |  |
| onChange | Callback function called when content of input changes | function(contentState: ContentState) | null |  |
| onFocus | Callback function called when mention component get focus | function | null |  |
| onSearchChange | Callback function called when search content changes | function(value:string, trigger: string) | \[] |  |
| onSelect | Callback function called when select from suggestions | function(suggestion: string, data?: any) | null |  |

### Mention methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus |         |
| focus() | get focus    |         |

### Nav

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| children | suggestion content | object | {} |  |
| value | value of suggestion, the value will insert into input filed while selected | string | "" |  |
