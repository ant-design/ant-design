---
category: Components
type: Form Controls
title: Switch
---

Switching Selector.

## When to use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.


## API

### Switch

Property | Description | Type | Default |
-----|-----|-----|------|
checked | determine whether the `Switch` is checked  | Boolean | false |
defaultChecked | to set the initial state | Boolean | false |
onChange | a callback function, can be executed when the checked state is changing | Function(checked:Boolean) | |
checkedChildren | content to be shown when the state is checked | React Node  | |
unCheckedChildren | content to be shown when the state is unchecked | React Node  | |
size | the size of the `Switch`, options: `default` `small` | String | default |
