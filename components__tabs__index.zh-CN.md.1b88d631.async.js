"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[8928],{10664:function(p,l,e){e.r(l);var m=e(2143),b=e(50250),v=e(59378),_=e(78190),i=e(74775),o=e(5937),d=e(2068),Z=e(74399),f=e(46004),h=e(35708),x=e(30138),y=e(56140),s=e(5388),T=e(49545),g=e(92169),P=e(13140),A=e(95127),C=e(74418),k=e(97119),a=e(28257),r=e(67294),n=e(13946);function u(){var c=(0,a.eL)(),t=c.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(r.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,t[1].value),(0,n.tZ)("p",null,t[2].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[3].value),(0,n.tZ)("li",null,t[4].value),(0,n.tZ)("li",null,(0,n.tZ)(a.rU,{to:"/components/radio/#components-radio-demo-radiobutton"},t[5].value),t[6].value)),(0,n.tZ)("h3",{id:"4230-\u7528\u6CD5\u5347\u7EA7"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#4230-\u7528\u6CD5\u5347\u7EA7"},(0,n.tZ)("span",{className:"icon icon-link"})),"4.23.0 \u7528\u6CD5\u5347\u7EA7")),(0,n.tZ)(d.Z,{message:"\u5728 4.23.0 \u7248\u672C\u540E\uFF0C\u6211\u4EEC\u63D0\u4F9B\u4E86 <Tabs items={[...]} /> \u7684\u7B80\u5199\u65B9\u5F0F\uFF0C\u6709\u66F4\u597D\u7684\u6027\u80FD\u548C\u66F4\u65B9\u4FBF\u7684\u6570\u636E\u7EC4\u7EC7\u65B9\u5F0F\uFF0C\u5F00\u53D1\u8005\u4E0D\u518D\u9700\u8981\u81EA\u884C\u62FC\u63A5 JSX\u3002\u540C\u65F6\u6211\u4EEC\u5E9F\u5F03\u4E86\u539F\u5148\u7684\u5199\u6CD5\uFF0C\u4F60\u8FD8\u662F\u53EF\u4EE5\u5728 4.x \u7EE7\u7EED\u4F7F\u7528\uFF0C\u4F46\u4F1A\u5728\u63A7\u5236\u53F0\u770B\u5230\u8B66\u544A\uFF0C\u5E76\u4F1A\u5728 5.0 \u540E\u79FB\u9664\u3002"}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)(i.Z,{lang:"jsx"},t[7].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(s.Z,{items:[{demo:{id:"components-tabs-demo-deprecated"},previewerProps:{title:"\u57FA\u7840\u7528\u6CD5\uFF08\u5E9F\u5F03\u7684\u8BED\u6CD5\u7CD6\uFF09",filename:"components/tabs/demo/deprecated.tsx",jsx:`import React from 'react';
import { Tabs } from 'antd';
const App = () => (
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </Tabs.TabPane>
  </Tabs>
);
export default App;
`,description:"<p>\u9ED8\u8BA4\u9009\u4E2D\u7B2C\u4E00\u9879\u3002</p>"}},{demo:{id:"components-tabs-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/tabs/demo/basic.tsx",jsx:`import React from 'react';
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const App = () => (
  <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: \`Tab 1\`,
        key: '1',
        children: \`Content of Tab Pane 1\`,
      },
      {
        label: \`Tab 2\`,
        key: '2',
        children: \`Content of Tab Pane 2\`,
      },
      {
        label: \`Tab 3\`,
        key: '3',
        children: \`Content of Tab Pane 3\`,
      },
    ]}
  />
);
export default App;
`,description:"<p>\u9ED8\u8BA4\u9009\u4E2D\u7B2C\u4E00\u9879\u3002</p>"}},{demo:{id:"components-tabs-demo-disabled"},previewerProps:{title:"\u7981\u7528",filename:"components/tabs/demo/disabled.tsx",jsx:`import React from 'react';
import { Tabs } from 'antd';
const App = () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        label: 'Tab 1',
        key: '1',
        children: 'Tab 1',
      },
      {
        label: 'Tab 2',
        key: '2',
        children: 'Tab 2',
        disabled: true,
      },
      {
        label: 'Tab 3',
        key: '3',
        children: 'Tab 3',
      },
    ]}
  />
);
export default App;
`,description:"<p>\u7981\u7528\u67D0\u4E00\u9879\u3002</p>"}},{demo:{id:"components-tabs-demo-centered"},previewerProps:{title:"\u5C45\u4E2D",filename:"components/tabs/demo/centered.tsx",jsx:`import React from 'react';
import { Tabs } from 'antd';
const App = () => (
  <Tabs
    defaultActiveKey="1"
    centered
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: \`Tab \${id}\`,
        key: id,
        children: \`Content of Tab Pane \${id}\`,
      };
    })}
  />
);
export default App;
`,description:"<p>\u6807\u7B7E\u5C45\u4E2D\u5C55\u793A\u3002</p>"}},{demo:{id:"components-tabs-demo-icon"},previewerProps:{title:"\u56FE\u6807",filename:"components/tabs/demo/icon.tsx",jsx:`import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
const App = () => (
  <Tabs
    defaultActiveKey="2"
    items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
      const id = String(i + 1);
      return {
        label: (
          <span>
            <Icon />
            Tab {id}
          </span>
        ),
        key: id,
        children: \`Tab \${id}\`,
      };
    })}
  />
);
export default App;
`,description:"<p>\u6709\u56FE\u6807\u7684\u6807\u7B7E\u3002</p>"}},{demo:{id:"components-tabs-demo-slide"},previewerProps:{title:"\u6ED1\u52A8",filename:"components/tabs/demo/slide.tsx",jsx:`import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';
const App = () => {
  const [mode, setMode] = useState('top');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <div>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{
          height: 220,
        }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: \`Tab-\${id}\`,
            key: id,
            disabled: i === 28,
            children: \`Content of tab \${id}\`,
          };
        })}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u53EF\u4EE5\u5DE6\u53F3\u3001\u4E0A\u4E0B\u6ED1\u52A8\uFF0C\u5BB9\u7EB3\u66F4\u591A\u6807\u7B7E\u3002</p>"}},{demo:{id:"components-tabs-demo-extra"},previewerProps:{title:"\u9644\u52A0\u5185\u5BB9",filename:"components/tabs/demo/extra.tsx",jsx:`import React, { useMemo, useState } from 'react';
import { Button, Checkbox, Divider, Tabs } from 'antd';
const CheckboxGroup = Checkbox.Group;
const operations = <Button>Extra Action</Button>;
const OperationsSlot = {
  left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};
const options = ['left', 'right'];
const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: \`Tab \${id}\`,
    key: id,
    children: \`Content of tab \${id}\`,
  };
});
const App = () => {
  const [position, setPosition] = useState(['left', 'right']);
  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {},
    );
  }, [position]);
  return (
    <>
      <Tabs tabBarExtraContent={operations} items={items} />
      <br />
      <br />
      <br />
      <div>You can also specify its direction or both side</div>
      <Divider />
      <CheckboxGroup
        options={options}
        value={position}
        onChange={(value) => {
          setPosition(value);
        }}
      />
      <br />
      <br />
      <Tabs tabBarExtraContent={slot} items={items} />
    </>
  );
};
export default App;
`,description:"<p>\u53EF\u4EE5\u5728\u9875\u7B7E\u4E24\u8FB9\u6DFB\u52A0\u9644\u52A0\u64CD\u4F5C\u3002</p>",style:`.tabs-extra-demo-button {
  margin-right: 16px;
}

.ant-row-rtl .tabs-extra-demo-button {
  margin-right: 0;
  margin-left: 16px;
}`}},{demo:{id:"components-tabs-demo-size"},previewerProps:{title:"\u5927\u5C0F",filename:"components/tabs/demo/size.tsx",jsx:`import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';
const App = () => {
  const [size, setSize] = useState('small');
  const onChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <div>
      <Radio.Group
        value={size}
        onChange={onChange}
        style={{
          marginBottom: 16,
        }}
      >
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        size={size}
        style={{
          marginBottom: 32,
        }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: \`Tab \${id}\`,
            key: id,
            children: \`Content of tab \${id}\`,
          };
        })}
      />
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: \`Card Tab \${id}\`,
            key: id,
            children: \`Content of card tab \${id}\`,
          };
        })}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u5927\u53F7\u9875\u7B7E\u7528\u5728\u9875\u5934\u533A\u57DF\uFF0C\u5C0F\u53F7\u7528\u5728\u5F39\u51FA\u6846\u7B49\u8F83\u72ED\u7A84\u7684\u5BB9\u5668\u5185\u3002</p>"}},{demo:{id:"components-tabs-demo-position"},previewerProps:{title:"\u4F4D\u7F6E",filename:"components/tabs/demo/position.tsx",jsx:`import React, { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
const App = () => {
  const [tabPosition, setTabPosition] = useState('left');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <>
      <Space
        style={{
          marginBottom: 24,
        }}
      >
        Tab position:
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs
        tabPosition={tabPosition}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: \`Tab \${id}\`,
            key: id,
            children: \`Content of Tab \${id}\`,
          };
        })}
      />
    </>
  );
};
export default App;
`,description:'<p>\u6709\u56DB\u4E2A\u4F4D\u7F6E\uFF0C<code>tabPosition="left|right|top|bottom"</code>\u3002\u5728\u79FB\u52A8\u7AEF\u4E0B\uFF0C<code>left|right</code> \u4F1A\u81EA\u52A8\u5207\u6362\u6210 <code>top</code>\u3002</p>'}},{demo:{id:"components-tabs-demo-card"},previewerProps:{title:"\u5361\u7247\u5F0F\u9875\u7B7E",filename:"components/tabs/demo/card.tsx",jsx:`import React from 'react';
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const App = () => (
  <Tabs
    onChange={onChange}
    type="card"
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: \`Tab \${id}\`,
        key: id,
        children: \`Content of Tab Pane \${id}\`,
      };
    })}
  />
);
export default App;
`,description:"<p>\u53E6\u4E00\u79CD\u6837\u5F0F\u7684\u9875\u7B7E\uFF0C\u4E0D\u63D0\u4F9B\u5BF9\u5E94\u7684\u5782\u76F4\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-tabs-demo-editable-card"},previewerProps:{title:"\u65B0\u589E\u548C\u5173\u95ED\u9875\u7B7E",filename:"components/tabs/demo/editable-card.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';
const initialItems = [
  {
    label: 'Tab 1',
    children: 'Content of Tab 1',
    key: '1',
  },
  {
    label: 'Tab 2',
    children: 'Content of Tab 2',
    key: '2',
  },
  {
    label: 'Tab 3',
    children: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];
const App = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = \`newTab\${newTabIndex.current++}\`;
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      children: 'Content of new Tab',
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};
export default App;
`,description:"<p>\u53EA\u6709\u5361\u7247\u6837\u5F0F\u7684\u9875\u7B7E\u652F\u6301\u65B0\u589E\u548C\u5173\u95ED\u9009\u9879\u3002\u4F7F\u7528 <code>closable={false}</code> \u7981\u6B62\u5173\u95ED\u3002</p>"}},{demo:{id:"components-tabs-demo-card-top"},previewerProps:{title:"\u5361\u7247\u5F0F\u9875\u7B7E\u5BB9\u5668",filename:"components/tabs/demo/card-top.tsx",jsx:`import React from 'react';
import { Tabs } from 'antd';
const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: \`Tab Title \${id}\`,
    key: id,
    children: (
      <>
        <p>Content of Tab Pane {id}</p>
        <p>Content of Tab Pane {id}</p>
        <p>Content of Tab Pane {id}</p>
      </>
    ),
  };
});
const App = () => (
  <div className="card-container">
    <Tabs type="card" items={items} />
  </div>
);
export default App;
`,description:"<p>\u7528\u4E8E\u5BB9\u5668\u9876\u90E8\uFF0C\u9700\u8981\u4E00\u70B9\u989D\u5916\u7684\u6837\u5F0F\u8986\u76D6\u3002</p>",style:`.card-container p {
  margin: 0;
}
.card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}
.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}
.card-container > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}
.card-container > .ant-tabs-card .ant-tabs-nav-list > .ant-tabs-tab,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-nav-list > .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
.card-container > .ant-tabs-card .ant-tabs-nav-list > .ant-tabs-tab-active,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-nav-list > .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}
#components-tabs-demo-card-top .code-box-demo {
  padding: 24px;
  overflow: hidden;
  background: #f5f5f5;
}
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -8px;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
[data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
  background: #000;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  background: #141414;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #141414;
  border-color: #141414;
}`}},{demo:{id:"components-tabs-demo-custom-add-trigger"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u65B0\u589E\u9875\u7B7E\u89E6\u53D1\u5668",filename:"components/tabs/demo/custom-add-trigger.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Button, Tabs } from 'antd';
const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: \`Tab \${id}\`,
    children: \`Content of Tab Pane \${index + 1}\`,
    key: id,
  };
});
const App = () => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);
  const onChange = (key) => {
    setActiveKey(key);
  };
  const add = () => {
    const newActiveKey = \`newTab\${newTabIndex.current++}\`;
    setItems([
      ...items,
      {
        label: 'New Tab',
        children: 'New Tab Pane',
        key: newActiveKey,
      },
    ]);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u9690\u85CF\u9ED8\u8BA4\u7684\u9875\u7B7E\u589E\u52A0\u56FE\u6807\uFF0C\u7ED9\u81EA\u5B9A\u4E49\u89E6\u53D1\u5668\u7ED1\u5B9A\u4E8B\u4EF6\u3002</p>"}},{demo:{id:"components-tabs-demo-custom-tab-bar"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u9875\u7B7E\u5934",filename:"components/tabs/demo/custom-tab-bar.tsx",jsx:`import React from 'react';
import { Tabs } from 'antd';
import { Sticky, StickyContainer } from 'react-sticky';
const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{
          ...style,
        }}
      />
    )}
  </Sticky>
);
const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: \`Tab \${id}\`,
    key: id,
    children: \`Content of Tab Pane \${id}\`,
    style:
      i === 0
        ? {
            height: 200,
          }
        : undefined,
  };
});
const App = () => (
  <StickyContainer>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={items} />
  </StickyContainer>
);
export default App;
`,description:"<p>\u4F7F\u7528 react-sticky \u7EC4\u4EF6\u5B9E\u73B0\u5438\u9876\u6548\u679C\u3002</p>",style:`.site-custom-tab-bar {
  z-index: 1;
  background: #fff;
}`}},{demo:{id:"components-tabs-demo-custom-tab-bar-node"},previewerProps:{title:"\u53EF\u62D6\u62FD\u6807\u7B7E",filename:"components/tabs/demo/custom-tab-bar-node.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const type = 'DraggableTabNode';
const DraggableTabNode = ({ index, children, moveNode }) => {
  const ref = useRef(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: 'dropping',
      };
    },
    drop: (item) => {
      moveNode(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <div
      ref={ref}
      style={{
        marginRight: 24,
      }}
      className={isOver ? dropClassName : ''}
    >
      {children}
    </div>
  );
};
const DraggableTabs = (props) => {
  const { items = [] } = props;
  const [order, setOrder] = useState([]);
  const moveTabNode = (dragKey, hoverKey) => {
    const newOrder = order.slice();
    items.forEach((item) => {
      if (item.key && newOrder.indexOf(item.key) === -1) {
        newOrder.push(item.key);
      }
    });
    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);
    setOrder(newOrder);
  };
  const renderTabBar = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      {(node) => (
        <DraggableTabNode key={node.key} index={node.key} moveNode={moveTabNode}>
          {node}
        </DraggableTabNode>
      )}
    </DefaultTabBar>
  );
  const orderItems = [...items].sort((a, b) => {
    const orderA = order.indexOf(a.key);
    const orderB = order.indexOf(b.key);
    if (orderA !== -1 && orderB !== -1) {
      return orderA - orderB;
    }
    if (orderA !== -1) {
      return -1;
    }
    if (orderB !== -1) {
      return 1;
    }
    const ia = items.indexOf(a);
    const ib = items.indexOf(b);
    return ia - ib;
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <Tabs renderTabBar={renderTabBar} {...props} items={orderItems} />
    </DndProvider>
  );
};
const App = () => (
  <DraggableTabs
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: \`tab \${id}\`,
        key: id,
        children: \`Content of Tab Pane \${id}\`,
      };
    })}
  />
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>react-dnd@15+</code> \u5B9E\u73B0\u6807\u7B7E\u53EF\u62D6\u62FD\u3002</p>",style:`.dropping {
  background: #fefefe;
  transition: all 0.3s;
}`}},{demo:{id:"components-tabs-demo-animated"},previewerProps:{debug:!0,title:"\u52A8\u753B",filename:"components/tabs/demo/animated.tsx",jsx:`import React from 'react';
import { Tabs, Switch, Space } from 'antd';
const App = () => {
  const [inkBar, setInkBar] = React.useState(true);
  const [tabPane, setTabPane] = React.useState(true);
  return (
    <>
      <Space>
        <Switch
          checkedChildren="inkBar"
          unCheckedChildren="inkBar"
          checked={inkBar}
          onChange={() => setInkBar(!inkBar)}
        />
        <Switch
          checkedChildren="tabPane"
          unCheckedChildren="tabPane"
          checked={tabPane}
          onChange={() => setTabPane(!tabPane)}
        />
      </Space>

      <Tabs
        animated={{
          inkBar,
          tabPane,
        }}
        items={[
          {
            label: \`Bamboo\`,
            key: '1',
            children: \`Hello Bamboo!\`,
            style: {
              height: 200,
              boxShadow: '0 0 3px rgba(255, 0, 0, 0.5)',
            },
          },
          {
            label: \`Little\`,
            key: '2',
            children: \`Hi Little!\`,
            style: {
              height: 300,
              boxShadow: '0 0 3px rgba(0, 255, 0, 0.5)',
            },
          },
          {
            label: \`Light\`,
            key: '3',
            children: \`Welcome Light!\`,
            style: {
              height: 100,
              boxShadow: '0 0 3px rgba(0, 0, 255, 0.5)',
            },
          },
        ]}
      />
    </>
  );
};
export default App;
`,description:"<p>\u52A8\u753B\u5207\u6362\u3002</p>"}},{demo:{id:"components-tabs-demo-nest"},previewerProps:{debug:!0,title:"\u5D4C\u5957",filename:"components/tabs/demo/nest.tsx",jsx:`import React, { useState } from 'react';
import { Select, Tabs } from 'antd';
const { Option } = Select;
const positionList = ['left', 'right', 'top', 'bottom'];
const App = () => {
  const [parentPos, setParentPos] = useState(undefined);
  const [childPos, setChildPos] = useState(undefined);
  const [parentType, setParentType] = useState(undefined);
  const [childType, setChildType] = useState(undefined);
  return (
    <div>
      <Select
        style={{
          width: 200,
        }}
        onChange={(val) => {
          setParentPos(val);
        }}
      >
        {positionList.map((pos) => (
          <Option key={pos} value={pos}>
            Parent - {pos}
          </Option>
        ))}
      </Select>

      <Select
        style={{
          width: 200,
        }}
        onChange={(val) => {
          setChildPos(val);
        }}
      >
        {positionList.map((pos) => (
          <Option key={pos} value={pos}>
            Child - {pos}
          </Option>
        ))}
      </Select>

      <Select
        style={{
          width: 200,
        }}
        onChange={(val) => {
          setParentType(val);
        }}
      >
        <Option value="line">Parent - line</Option>
        <Option value="card">Parent - card</Option>
        <Option value="editable-card">Parent - card edit</Option>
      </Select>

      <Select
        style={{
          width: 200,
        }}
        onChange={(val) => {
          setChildType(val);
        }}
      >
        <Option value="line">Child - line</Option>
        <Option value="card">Child - card</Option>
        <Option value="editable-card">Parent - card edit</Option>
      </Select>

      <Tabs
        defaultActiveKey="1"
        tabPosition={parentPos}
        type={parentType}
        items={[
          {
            label: 'Tab 1',
            key: '1',
            children: (
              <Tabs
                defaultActiveKey="1"
                tabPosition={childPos}
                type={childType}
                style={{
                  height: 300,
                }}
                items={new Array(20).fill(null).map((_, index) => {
                  const key = String(index);
                  return {
                    label: \`Tab \${key}\`,
                    key,
                    children: \`TTTT \${key}\`,
                  };
                })}
              />
            ),
          },
          {
            label: 'Tab 2',
            key: '2',
            children: 'Content of Tab Pane 2',
          },
        ]}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u9ED8\u8BA4\u9009\u4E2D\u7B2C\u4E00\u9879\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"tabs"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tabs"},(0,n.tZ)("span",{className:"icon icon-link"})),"Tabs"),(0,n.tZ)(o.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[8].value),(0,n.tZ)("th",null,t[9].value),(0,n.tZ)("th",null,t[10].value),(0,n.tZ)("th",null,t[11].value),(0,n.tZ)("th",null,t[12].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value),(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null,t[16].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[17].value),(0,n.tZ)("td",null,t[18].value),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null,t[21].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,t[23].value,(0,n.tZ)("code",null,t[24].value)),(0,n.tZ)("td",null,t[25].value),(0,n.tZ)("td",null,t[26].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[27].value),(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null,t[29].value),(0,n.tZ)("td",null,t[30].value),(0,n.tZ)("td",null,t[31].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[32].value),(0,n.tZ)("td",null,t[33].value),(0,n.tZ)("td",null,t[34].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[35].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null,t[37].value,(0,n.tZ)("code",null,t[38].value),t[39].value),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,(0,n.tZ)(a.rU,{to:"#TabItemType"},t[44].value)),(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null,t[46].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null,t[49].value),(0,n.tZ)("td",null,t[50].value),(0,n.tZ)("td",null,t[51].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[52].value),(0,n.tZ)("td",null,t[53].value,(0,n.tZ)("code",null,t[54].value)),(0,n.tZ)("td",null,t[55].value),(0,n.tZ)("td",null,t[56].value),(0,n.tZ)("td",null,t[57].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[58].value),(0,n.tZ)("td",null,t[59].value),(0,n.tZ)("td",null,t[60].value),(0,n.tZ)("td",null,t[61].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[62].value),(0,n.tZ)("td",null,t[63].value,(0,n.tZ)("code",null,t[64].value),t[65].value,(0,n.tZ)("code",null,t[66].value),t[67].value,(0,n.tZ)("code",null,t[68].value),t[69].value),(0,n.tZ)("td",null,t[70].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[71].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[72].value),(0,n.tZ)("td",null,t[73].value),(0,n.tZ)("td",null,t[74].value),(0,n.tZ)("td",null,t[75].value),(0,n.tZ)("td",null,t[76].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[77].value),(0,n.tZ)("td",null,t[78].value),(0,n.tZ)("td",null,t[79].value),(0,n.tZ)("td",null,t[80].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[81].value),(0,n.tZ)("td",null,t[82].value),(0,n.tZ)("td",null,t[83].value),(0,n.tZ)("td",null,t[84].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[85].value),(0,n.tZ)("td",null,t[86].value,(0,n.tZ)("code",null,t[87].value),t[88].value,(0,n.tZ)("code",null,t[89].value),t[90].value,(0,n.tZ)("code",null,t[91].value),t[92].value,(0,n.tZ)("code",null,t[93].value)),(0,n.tZ)("td",null,t[94].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[95].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[96].value),(0,n.tZ)("td",null,t[97].value),(0,n.tZ)("td",null,t[98].value),(0,n.tZ)("td",null,t[99].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[100].value),(0,n.tZ)("td",null,t[101].value,(0,n.tZ)("code",null,t[102].value),t[103].value,(0,n.tZ)("code",null,t[104].value),t[105].value,(0,n.tZ)("code",null,t[106].value),t[107].value),(0,n.tZ)("td",null,t[108].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[109].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[110].value),(0,n.tZ)("td",null,t[111].value),(0,n.tZ)("td",null,t[112].value),(0,n.tZ)("td",null,t[113].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[114].value),(0,n.tZ)("td",null,t[115].value,(0,n.tZ)("code",null,t[116].value),t[117].value),(0,n.tZ)("td",null,t[118].value),(0,n.tZ)("td",null,t[119].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[120].value),(0,n.tZ)("td",null,t[121].value),(0,n.tZ)("td",null,t[122].value),(0,n.tZ)("td",null,t[123].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[124].value),(0,n.tZ)("td",null,t[125].value),(0,n.tZ)("td",null,t[126].value,(0,n.tZ)("code",null,t[127].value),t[128].value,(0,n.tZ)("code",null,t[129].value),t[130].value,(0,n.tZ)("code",null,t[131].value),t[132].value,(0,n.tZ)("code",null,t[133].value),t[134].value),(0,n.tZ)("td",null,t[135].value),(0,n.tZ)("td",null,t[136].value)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[137].value,(0,n.tZ)("a",{href:"https://github.com/react-component/tabs#tabs"},t[138].value))),(0,n.tZ)("h3",{id:"tabitemtype"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tabitemtype"},(0,n.tZ)("span",{className:"icon icon-link"})),"TabItemType"),(0,n.tZ)(o.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[139].value),(0,n.tZ)("th",null,t[140].value),(0,n.tZ)("th",null,t[141].value),(0,n.tZ)("th",null,t[142].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[143].value),(0,n.tZ)("td",null,t[144].value,(0,n.tZ)("code",null,t[145].value),t[146].value),(0,n.tZ)("td",null,t[147].value),(0,n.tZ)("td",null,t[148].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[149].value),(0,n.tZ)("td",null,t[150].value),(0,n.tZ)("td",null,t[151].value),(0,n.tZ)("td",null,t[152].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[153].value),(0,n.tZ)("td",null,t[154].value),(0,n.tZ)("td",null,t[155].value),(0,n.tZ)("td",null,t[156].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[157].value),(0,n.tZ)("td",null,t[158].value),(0,n.tZ)("td",null,t[159].value),(0,n.tZ)("td",null,t[160].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[161].value),(0,n.tZ)("td",null,t[162].value),(0,n.tZ)("td",null,t[163].value),(0,n.tZ)("td",null,t[164].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[165].value),(0,n.tZ)("td",null,t[166].value),(0,n.tZ)("td",null,t[167].value),(0,n.tZ)("td",null,t[168].value)))))))}l.default=u}}]);
