---
order: 3
title:
  zh-CN: 受控模式
  en-US: Controlled
---

## zh-CN

受控模式.

## en-US

Controlled mode.

````jsx
import { Mention } from 'antd';

const { toContentState } = Mention;

class App extends React.Component {
  state = {
    value: toContentState('@afc163'),
  }

  componentDidMount() {
    this.mention.focus();
  }

  handleChange = (editorState) => {
    this.setState({
      value: editorState,
    });
  }

  render() {
    return (
      <Mention
        ref={ele => this.mention = ele}
        defaultSuggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
