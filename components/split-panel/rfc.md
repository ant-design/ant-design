## Motivation

SplitPanel is used to split and resize panels.

## API

| Props         | Descriptions | Type                                      | Default           |
| ------------- | ------------ | --------------                            | -------           |
| layout        |              |  `horizontal` \| `vertical`               |                   |
| height        |              |   number                                  |                   |
| items         |              |   `{size?: number;content: ReactNode;}`   |                   |
| splitBarSize  |              |   number                                |                   |

## Example

```
const App = () => (
  <SplitPanel
    height={300}
    layout={layout}
    items={[
      {
        content: <div>111</div>,
      },
      {
        content: <div>222</div>,
      },
      {
        content: <div>333</div>,
      },
      {
        content: <div>444</div>,
      },
    ]}
  />
);
```

![image](https://github.com/user-attachments/assets/57ebc7aa-aa22-41d1-998b-6650c456d6d0)
