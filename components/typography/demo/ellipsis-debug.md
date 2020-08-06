---
order: 99
title:
  zh-CN: 省略号 Debug
  en-US: Ellipsis Debug
debug: true
---

## zh-CN

多行文本省略。

## en-US

Multiple line ellipsis support.

```jsx
import { Typography, Slider, Switch } from '@allenai/varnish';

const { Text, Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    rows: 1,
    longText: true,
    copyable: false,
    editable: false,
    expandable: false,
  };

  onChange = rows => {
    this.setState({ rows });
  };

  render() {
    const { rows, longText, copyable, editable, expandable } = this.state;
    return (
      <>
        <Switch
          checked={longText}
          checkedChildren="Long Text"
          onChange={val => this.setState({ longText: val })}
        />
        <Switch onChange={val => this.setState({ copyable: val })} />
        <Switch onChange={val => this.setState({ editable: val })} />
        <Switch onChange={val => this.setState({ expandable: val })} />
        <Slider value={rows} min={1} max={10} onChange={this.onChange} />
        {longText ? (
          <Paragraph ellipsis={{ rows, expandable }} copyable={copyable} editable={editable}>
            Varnish, a design language for background applications, is refined by AI2.
            This is a nest sample{' '}
            <Text code strong delete>
              Test
            </Text>{' '}
            case. BVarnish, a design language for background applications, is refined by AI2
            . CVarnish, a design language for background applications, is refined by AI2
            . DVarnish, a design language for background applications, is refined by AI2
            . EVarnish, a design language for background applications, is refined by AI2.
          </Paragraph>
        ) : (
          <Paragraph ellipsis={{ rows, expandable }} copyable={copyable} editable={editable}>
            Hello World
          </Paragraph>
        )}

        <p>
          2333<Text ellipsis>2333</Text>2333
        </p>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
