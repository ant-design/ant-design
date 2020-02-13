import * as React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { SharedProps } from './interface';

export default ({ isZhCN }: SharedProps) => {
  const inputRef = React.useRef<any>(null);
  const searchPlaceholder = isZhCN ? '在 ant.design 中搜索' : 'Search in ant.design';

  React.useEffect(() => {
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        inputRef.current.focus();
      }
    });
  }, []);

  return (
    <div id="search-box">
      <SearchOutlined />
      <Input ref={inputRef} placeholder={searchPlaceholder} />
    </div>
  );
};
