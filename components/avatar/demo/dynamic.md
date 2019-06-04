---
order: 2
title:
  zh-CN: 自动调整字符大小
  en-US: Autoset Font Size
---

## zh-CN

对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。

## en-US

For letter type Avatar, when the letters are too long to display, the font size can be automatically adjusted according to the width of the Avatar.

```jsx
import { Avatar, Button } from 'antd';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

class Autoset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserList[0],
      color: colorList[0],
    };
  }

  changeUser = () => {
    const index = UserList.indexOf(this.state.user);
    this.setState({
      user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
      color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
    });
  };

  render() {
    return (
      <div>
        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
          {this.state.user}
        </Avatar>
        <Button
          size="small"
          style={{ marginLeft: 16, verticalAlign: 'middle' }}
          onClick={this.changeUser}
        >
          Change
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Autoset />, mountNode);
```
