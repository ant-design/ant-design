"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2913],{5638:function(p,i,t){t.r(i);var u=t(2143),r=t(50250),m=t(59378),c=t(78190),x=t(74775),l=t(5937),v=t(2068),g=t(74399),E=t(46004),Z=t(35708),h=t(30138),P=t(56140),a=t(5388),A=t(49545),f=t(92169),D=t(13140),O=t(95127),M=t(74418),S=t(97119),s=t(28257),_=t(67294),n=t(13946);function d(){var o=(0,s.eL)(),e=o.texts;return(0,n.tZ)(s.dY,null,(0,n.tZ)(_.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(a.Z,{items:[{demo:{id:"components-spin-demo-basic"},previewerProps:{title:"\u57FA\u672C\u7528\u6CD5",filename:"components/spin/demo/basic.tsx",jsx:`import React from 'react';
import { Spin } from 'antd';
const App = () => <Spin />;
export default App;
`,description:"<p>\u4E00\u4E2A\u7B80\u5355\u7684 loading \u72B6\u6001\u3002</p>"}},{demo:{id:"components-spin-demo-size"},previewerProps:{title:"\u5404\u79CD\u5927\u5C0F",filename:"components/spin/demo/size.tsx",jsx:`import React from 'react';
import { Space, Spin } from 'antd';
const App = () => (
  <Space size="middle">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Space>
);
export default App;
`,description:"<p>\u5C0F\u7684\u7528\u4E8E\u6587\u672C\u52A0\u8F7D\uFF0C\u9ED8\u8BA4\u7528\u4E8E\u5361\u7247\u5BB9\u5668\u7EA7\u52A0\u8F7D\uFF0C\u5927\u7684\u7528\u4E8E<strong>\u9875\u9762\u7EA7</strong>\u52A0\u8F7D\u3002</p>"}},{demo:{id:"components-spin-demo-inside"},previewerProps:{title:"\u5BB9\u5668",filename:"components/spin/demo/inside.tsx",jsx:`import React from 'react';
import { Spin } from 'antd';
const App = () => (
  <div className="example">
    <Spin />
  </div>
);
export default App;
`,description:"<p>\u653E\u5165\u4E00\u4E2A\u5BB9\u5668\u4E2D\u3002</p>",style:`.example {
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}`}},{demo:{id:"components-spin-demo-nested"},previewerProps:{title:"\u5361\u7247\u52A0\u8F7D\u4E2D",filename:"components/spin/demo/nested.tsx",jsx:`import React, { useState } from 'react';
import { Alert, Spin, Switch } from 'antd';
const App = () => {
  const [loading, setLoading] = useState(false);
  const toggle = (checked) => {
    setLoading(checked);
  };
  return (
    <div>
      <Spin spinning={loading}>
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
      <div
        style={{
          marginTop: 16,
        }}
      >
        Loading state\uFF1A
        <Switch checked={loading} onChange={toggle} />
      </div>
    </div>
  );
};
export default App;
`,description:"<p>\u53EF\u4EE5\u76F4\u63A5\u628A\u5185\u5BB9\u5185\u5D4C\u5230 <code>Spin</code> \u4E2D\uFF0C\u5C06\u73B0\u6709\u5BB9\u5668\u53D8\u4E3A\u52A0\u8F7D\u72B6\u6001\u3002</p>"}},{demo:{id:"components-spin-demo-tip"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u63CF\u8FF0\u6587\u6848",filename:"components/spin/demo/tip.tsx",jsx:`import React from 'react';
import { Alert, Space, Spin } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Space>
      <Spin tip="Loading" size="small">
        <div className="content" />
      </Spin>
      <Spin tip="Loading">
        <div className="content" />
      </Spin>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>

    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  </Space>
);
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u63CF\u8FF0\u6587\u6848\u3002</p>",style:`.content {
  padding: 50px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}`}},{demo:{id:"components-spin-demo-delayanddebounce"},previewerProps:{title:"\u5EF6\u8FDF",filename:"components/spin/demo/delayAndDebounce.tsx",jsx:`import React, { useState } from 'react';
import { Alert, Spin, Switch } from 'antd';
const App = () => {
  const [loading, setLoading] = useState(false);
  const toggle = (checked) => {
    setLoading(checked);
  };
  const container = (
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
      type="info"
    />
  );
  return (
    <div>
      <Spin spinning={loading} delay={500}>
        {container}
      </Spin>
      <div
        style={{
          marginTop: 16,
        }}
      >
        Loading state\uFF1A
        <Switch checked={loading} onChange={toggle} />
      </div>
    </div>
  );
};
export default App;
`,description:"<p>\u5EF6\u8FDF\u663E\u793A loading \u6548\u679C\u3002\u5F53 spinning \u72B6\u6001\u5728 <code>delay</code> \u65F6\u95F4\u5185\u7ED3\u675F\uFF0C\u5219\u4E0D\u663E\u793A loading \u72B6\u6001\u3002</p>"}},{demo:{id:"components-spin-demo-custom-indicator"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u6307\u793A\u7B26",filename:"components/spin/demo/custom-indicator.tsx",jsx:`import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const App = () => <Spin indicator={antIcon} />;
export default App;
`,description:"<p>\u4F7F\u7528\u81EA\u5B9A\u4E49\u6307\u793A\u7B26\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[2].value),(0,n.tZ)("th",null,e[3].value),(0,n.tZ)("th",null,e[4].value),(0,n.tZ)("th",null,e[5].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[6].value),(0,n.tZ)("td",null,e[7].value),(0,n.tZ)("td",null,e[8].value),(0,n.tZ)("td",null,e[9].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value,(0,n.tZ)("code",null,e[16].value),e[17].value,(0,n.tZ)("code",null,e[18].value),e[19].value,(0,n.tZ)("code",null,e[20].value)),(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[22].value))),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value)))),(0,n.tZ)("h3",{id:"\u9759\u6001\u65B9\u6CD5"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u9759\u6001\u65B9\u6CD5"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u9759\u6001\u65B9\u6CD5"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[35].value)),(0,n.tZ)("p",null,e[36].value))))))}i.default=d}}]);
