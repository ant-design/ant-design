---
order: 6
title:
  zh-CN: 添加动画
  en-US: Animate
---

## zh-CN

给你的标签增加添加或删除动画。

## en-US

Add or remove animations to your tag.

````jsx
import {
  Tag, Input, Tooltip, Icon,
} from 'antd';
import Animate from 'rc-animate';
import { TweenOneGroup } from 'rc-tween-one';


class EditableTagGroup extends React.Component {
  state = {
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  forMap = (tag) => {
    const isLongTag = tag.length > 20;
    const tagElem = (
      <Tag 
        closable 
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {isLongTag ? (
          <Tooltip title={tag}>
            {tagElem}
          </Tooltip>
        ) : tagElem}
      </span>
    );
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 8 }}>
            Add Animate: 
          </h3>
          <Animate component="div" transitionName="antd-demo-tag-zoom">
            {tagChild}
          </Animate>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 8 }}>
            Add TweenOne: 
          </h3>
          <TweenOneGroup 
            enter={{
              scale: 0.8, opacity: 0, 
              type: 'from', duration: 100,
              onComplete: (e) => {
                e.target.style = '';
              },
            }}
            leave={{ 
              opacity: 0, width: 0, scale: 0, duration: 200,
            }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

ReactDOM.render(<EditableTagGroup />, mountNode);
````

```css
.antd-demo-tag-zoom-enter,
.antd-demo-tag-zoom-appear {
  animation: antFadeIn 0.1s ease-in-out;
   animation-fill-mode: both;
}


.antd-demo-tag-zoom-leave {
  animation: antTagDemoZoomOut 0.2s ease-in-out;
  animation-fill-mode: both;
}

@keyframes antTagDemoZoomOut {
  0% {
    transform: scale(1);
    max-width: 100%;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    max-width: 0%;
    opacity: 0;
  }
}
```