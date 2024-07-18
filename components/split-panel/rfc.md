## Motivation

SplitPanel is used to split and resize panels.

## API

| Props         | Descriptions | Type | Default |
| ------------- | ------------ | ---- | ------- |
| width         |              |      |         |
| height        |              |      |         |
| onResizeEnd   |              |      |         |
| onResizeStart |              |      |         |

## Example

```
const App = () => (
  <SplitterPanel.Group>
    <SplitterPanel>left</SplitterPanel>
    <SplitterPanel>right</SplitterPanel>
  </SplitterPanel.Group>
);
```

![image](https://github.com/user-attachments/assets/57ebc7aa-aa22-41d1-998b-6650c456d6d0)
