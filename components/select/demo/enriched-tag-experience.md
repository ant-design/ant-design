---
order: 25
title:
  zh-CN: '...'
  en-US: Tag Editing
---

## zh-CN

...

## en-US

Create experiences where users can edit the tag values

```jsx
import { Select, Tag } from 'antd';

const { Option } = Select;

const OPTIONS = ['hello@world.void', 'not_an_email'];
const children = [];
for (let i = 0; i < OPTIONS.length; i++) {
  children.push(<Option key={OPTIONS[i]}>{OPTIONS[i]}</Option>);
}

const EmailInput = () => {

  const selectRef = React.useRef();
  const [currentSearch, setCurrentSearch] = React.useState('');

  const handleKeyDown = (event) => {
    const {which} = event;
    if (which === 9 && currentSearch !== '' && selectRef.current) {
      event.preventDefault();
      event.stopPropagation();
      selectRef.current.blur();
      selectRef.current.focus();
    }
  }

  const handleSearch = (value) => {
    setCurrentSearch(value)
  };

  const handleChange = (values) => {
    setCurrentSearch('')
  }

  const tagEdit = (value) => {
    if (!selectRef.current) return;
    setCurrentSearch(value)
    selectRef.current.focus();
  }

  const tagRender = (props) => {

    const { label, value, closable, onClose } = props;

    let color;
    if (!/\S+@\S+\.\S+/.test(label as string)) color = 'red';

    return (
      <Tag
        color={color}
        closable={closable}
        onClick={closable ? () => {
          onClose();
          tagEdit(value)
        } : undefined}
        onClose={onClose}
        style={{
          marginRight: 3,
          cursor: closable ? 'pointer': undefined
        }}
      >
        {label}
      </Tag>
    )
  }

  return (
    <Select
      ref={selectRef}
      mode="tags"
      style={{ width: '100%' }}
      placeholder="Enter emails"
      defaultValue={OPTIONS}
      tagRender={tagRender}
      onKeyDown={handleKeyDown}
      onSearch={handleSearch}
      onChange={handleChange}
      searchValue={currentSearch}
    >
      {children}
    </Select>
  )
}

ReactDOM.render(<EmailInput />, mountNode );
```
