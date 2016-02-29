import React from 'react';
import { Button, Icon } from '../../../';

import './index.less';
export default function Home() {
  return (<div id="banner">
    <section>
      <aside>
        <h2>Ant Design</h2>
        <p>一个 UI 设计语言</p>
        <Button type="ghost" size="large">
          <Icon type="smile" />
          开始探索
        </Button>
      </aside>
      <img src="https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg" />
    </section>
  </div>);
}
