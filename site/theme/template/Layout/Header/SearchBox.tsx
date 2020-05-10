import * as React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import { SharedProps } from './interface';

import './SearchBox.less';

export interface SearchBoxProps extends SharedProps {
  onTriggerFocus?: (focus: boolean) => void;
  responsive: null | 'narrow' | 'crowded';
}

export default ({ isZhCN, responsive, onTriggerFocus }: SearchBoxProps) => {
  const inputRef = React.useRef<any>(null);
  const [focused, setFocused] = React.useState(false);
  const searchPlaceholder = isZhCN ? '在 ant.design 中搜索' : 'Search in ant.design';

  function triggerFocus(focus: boolean) {
    setFocused(focus);
    onTriggerFocus?.(focus);
  }

  React.useEffect(() => {
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        inputRef.current.focus();
      }
    });
  }, []);

  return (
    <div
      id="search-box"
      className={classNames({
        'narrow-mode': responsive,
        focused,
      })}
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <SearchOutlined />
      <Input
        ref={inputRef}
        placeholder={searchPlaceholder}
        onFocus={() => {
          triggerFocus(true);
        }}
        onBlur={() => {
          triggerFocus(false);
        }}
      />
    </div>
  );
};
