"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[509],{25092:function(_,d,e){e.r(d);var p=e(2143),c=e(50250),Z=e(59378),m=e(78190),r=e(74775),l=e(5937),v=e(2068),C=e(74399),x=e(46004),h=e(35708),E=e(30138),b=e(56140),i=e(5388),g=e(49545),f=e(92169),y=e(13140),P=e(95127),A=e(74418),M=e(97119),a=e(28257),u=e(67294),t=e(13946);function o(){var s=(0,a.eL)(),n=s.texts;return(0,t.tZ)(a.dY,null,(0,t.tZ)(u.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("p",null,n[1].value),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(i.Z,{items:[{demo:{id:"components-card-demo-basic"},previewerProps:{title:"\u5178\u578B\u5361\u7247",filename:"components/card/demo/basic.tsx",jsx:`import React from 'react';
import { Card } from 'antd';
const App = () => (
  <>
    <Card
      title="Default size card"
      extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card
      size="small"
      title="Small size card"
      extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </>
);
export default App;
`,description:"<p>\u5305\u542B\u6807\u9898\u3001\u5185\u5BB9\u3001\u64CD\u4F5C\u533A\u57DF\u3002</p>",style:`.code-box-demo p {
  margin: 0;
}
#components-card-demo-basic .ant-card { margin-bottom: 30px; }`}},{demo:{id:"components-card-demo-border-less"},previewerProps:{title:"\u65E0\u8FB9\u6846",filename:"components/card/demo/border-less.tsx",jsx:`import React from 'react';
import { Card } from 'antd';
const App = () => (
  <div className="site-card-border-less-wrapper">
    <Card
      title="Card title"
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>
);
export default App;
`,description:"<p>\u5728\u7070\u8272\u80CC\u666F\u4E0A\u4F7F\u7528\u65E0\u8FB9\u6846\u7684\u5361\u7247\u3002</p>",style:`.site-card-border-less-wrapper {
  padding: 30px;
  background: #ececec;
}`}},{demo:{id:"components-card-demo-simple"},previewerProps:{title:"\u7B80\u6D01\u5361\u7247",filename:"components/card/demo/simple.tsx",jsx:`import React from 'react';
import { Card } from 'antd';
const App = () => (
  <Card
    style={{
      width: 300,
    }}
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);
export default App;
`,description:"<p>\u53EA\u5305\u542B\u5185\u5BB9\u533A\u57DF\u3002</p>"}},{demo:{id:"components-card-demo-flexible-content"},previewerProps:{title:"\u66F4\u7075\u6D3B\u7684\u5185\u5BB9\u5C55\u793A",filename:"components/card/demo/flexible-content.tsx",jsx:`import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const App = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);
export default App;
`,description:"<p>\u53EF\u4EE5\u5229\u7528 <code>Card.Meta</code> \u652F\u6301\u66F4\u7075\u6D3B\u7684\u5185\u5BB9\u3002</p>"}},{demo:{id:"components-card-demo-in-column"},previewerProps:{title:"\u6805\u683C\u5361\u7247",filename:"components/card/demo/in-column.tsx",jsx:`import React from 'react';
import { Card, Col, Row } from 'antd';
const App = () => (
  <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
);
export default App;
`,description:"<p>\u5728\u7CFB\u7EDF\u6982\u89C8\u9875\u9762\u5E38\u5E38\u548C\u6805\u683C\u8FDB\u884C\u914D\u5408\u3002</p>",style:`.site-card-wrapper {
  padding: 30px;
  background: #ececec;
}

[data-theme="dark"] .site-card-wrapper {
  background: #303030;
}`}},{demo:{id:"components-card-demo-loading"},previewerProps:{title:"\u9884\u52A0\u8F7D\u7684\u5361\u7247",filename:"components/card/demo/loading.tsx",jsx:`import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
const { Meta } = Card;
const App = () => {
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };
  return (
    <>
      <Switch checked={!loading} onChange={onChange} />

      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        loading={loading}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          description="This is the description"
        />
      </Card>

      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </>
  );
};
export default App;
`,description:"<p>\u6570\u636E\u8BFB\u5165\u524D\u4F1A\u6709\u6587\u672C\u5757\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-card-demo-grid-card"},previewerProps:{title:"\u7F51\u683C\u578B\u5185\u5D4C\u5361\u7247",filename:"components/card/demo/grid-card.tsx",jsx:`import React from 'react';
import { Card } from 'antd';
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};
const App = () => (
  <Card title="Card Title">
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      Content
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>
);
export default App;
`,description:"<p>\u4E00\u79CD\u5E38\u89C1\u7684\u5361\u7247\u5185\u5BB9\u533A\u9694\u6A21\u5F0F\u3002</p>"}},{demo:{id:"components-card-demo-inner"},previewerProps:{title:"\u5185\u90E8\u5361\u7247",filename:"components/card/demo/inner.tsx",jsx:`import React from 'react';
import { Card } from 'antd';
const App = () => (
  <Card title="Card title">
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card>
  </Card>
);
export default App;
`,description:"<p>\u53EF\u4EE5\u653E\u5728\u666E\u901A\u5361\u7247\u5185\u90E8\uFF0C\u5C55\u793A\u591A\u5C42\u7EA7\u7ED3\u6784\u7684\u4FE1\u606F\u3002</p>"}},{demo:{id:"components-card-demo-tabs"},previewerProps:{title:"\u5E26\u9875\u7B7E\u7684\u5361\u7247",filename:"components/card/demo/tabs.tsx",jsx:`import React, { useState } from 'react';
import { Card } from 'antd';
const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];
const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};
const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];
const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};
const App = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <>
      <Card
        style={{
          width: '100%',
        }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br />
      <Card
        style={{
          width: '100%',
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<a href="#">More</a>}
        onTabChange={(key) => {
          onTab2Change(key);
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};
export default App;
`,description:"<p>\u53EF\u627F\u8F7D\u66F4\u591A\u5185\u5BB9\u3002</p>"}},{demo:{id:"components-card-demo-meta"},previewerProps:{title:"\u652F\u6301\u66F4\u591A\u5185\u5BB9\u914D\u7F6E",filename:"components/card/demo/meta.tsx",jsx:`import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const App = () => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
);
export default App;
`,description:"<p>\u4E00\u79CD\u652F\u6301\u5C01\u9762\u3001\u5934\u50CF\u3001\u6807\u9898\u548C\u63CF\u8FF0\u4FE1\u606F\u7684\u5361\u7247\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(r.Z,{lang:"jsx"},n[2].value),(0,t.tZ)("h3",{id:"card"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#card"},(0,t.tZ)("span",{className:"icon icon-link"})),"Card"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[3].value),(0,t.tZ)("th",null,n[4].value),(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[8].value),(0,t.tZ)("td",null,n[9].value),(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,n[11].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[24].value),(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null,n[29].value),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[31].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null,n[33].value),(0,t.tZ)("td",null,n[34].value),(0,t.tZ)("td",null,n[35].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[36].value),(0,t.tZ)("td",null,n[37].value),(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value),(0,t.tZ)("td",null,n[42].value),(0,t.tZ)("td",null,n[43].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null,n[46].value),(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[48].value),(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[50].value),n[51].value,(0,t.tZ)("code",null,n[52].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[53].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[54].value),(0,t.tZ)("td",null,n[55].value),(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null,n[57].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[58].value),(0,t.tZ)("td",null,n[59].value),(0,t.tZ)("td",null,n[60].value),(0,t.tZ)("td",null,n[61].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[62].value),(0,t.tZ)("td",null,(0,t.tZ)(a.rU,{to:"/components/tabs/#Tabs"},n[63].value)),(0,t.tZ)("td",null,n[64].value),(0,t.tZ)("td",null,n[65].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[66].value),(0,t.tZ)("td",null,n[67].value),(0,t.tZ)("td",null,n[68].value),(0,t.tZ)("td",null,n[69].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[70].value),(0,t.tZ)("td",null,n[71].value,(0,t.tZ)("code",null,n[72].value),n[73].value),(0,t.tZ)("td",null,n[74].value),(0,t.tZ)("td",null,n[75].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[76].value),(0,t.tZ)("td",null,n[77].value),(0,t.tZ)("td",null,n[78].value),(0,t.tZ)("td",null,n[79].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"cardgrid"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#cardgrid"},(0,t.tZ)("span",{className:"icon icon-link"})),"Card.Grid"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[80].value),(0,t.tZ)("th",null,n[81].value),(0,t.tZ)("th",null,n[82].value),(0,t.tZ)("th",null,n[83].value),(0,t.tZ)("th",null,n[84].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[85].value),(0,t.tZ)("td",null,n[86].value),(0,t.tZ)("td",null,n[87].value),(0,t.tZ)("td",null,n[88].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[89].value),(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null,n[92].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null,n[94].value),(0,t.tZ)("td",null,n[95].value),(0,t.tZ)("td",null,n[96].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"cardmeta"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#cardmeta"},(0,t.tZ)("span",{className:"icon icon-link"})),"Card.Meta"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[97].value),(0,t.tZ)("th",null,n[98].value),(0,t.tZ)("th",null,n[99].value),(0,t.tZ)("th",null,n[100].value),(0,t.tZ)("th",null,n[101].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[102].value),(0,t.tZ)("td",null,n[103].value),(0,t.tZ)("td",null,n[104].value),(0,t.tZ)("td",null,n[105].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[106].value),(0,t.tZ)("td",null,n[107].value),(0,t.tZ)("td",null,n[108].value),(0,t.tZ)("td",null,n[109].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[110].value),(0,t.tZ)("td",null,n[111].value),(0,t.tZ)("td",null,n[112].value),(0,t.tZ)("td",null,n[113].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[114].value),(0,t.tZ)("td",null,n[115].value),(0,t.tZ)("td",null,n[116].value),(0,t.tZ)("td",null,n[117].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[118].value),(0,t.tZ)("td",null,n[119].value),(0,t.tZ)("td",null,n[120].value),(0,t.tZ)("td",null,n[121].value),(0,t.tZ)("td",null)))))))}d.default=o}}]);
