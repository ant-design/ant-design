---
order: 7
title:
  zh-CN: 平滑地卸载
  en-US: Smoothly Unmount
---

## zh-CN

平滑、自然的卸载提示

## en-US

Smoothly and unaffectedly unmount Alert.

````jsx
import { Alert } from 'antd';

class App extends React.Component {
  state = {
    visible: true,
  }
  handleClose = () => {
    this.setState({ visible: false });
  }
  render() {
    return (
      <div>
        {
          this.state.visible ? (
            <Alert
              message="Alert Message Text"
              type="success"
              closable
              afterClose={this.handleClose}
            />
          ) : null
        }
        <p>placeholder text here</p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
````
