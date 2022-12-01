"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[1544],{67950:function(c,d,e){e.r(d);var p=e(2143),_=e(50250),m=e(59378),Z=e(78190),r=e(74775),l=e(5937),v=e(2068),C=e(74399),x=e(46004),h=e(35708),g=e(30138),b=e(56140),o=e(5388),f=e(49545),E=e(92169),y=e(13140),P=e(95127),A=e(74418),M=e(97119),a=e(28257),i=e(67294),t=e(13946);function u(){var s=(0,a.eL)(),n=s.texts;return(0,t.tZ)(a.dY,null,(0,t.tZ)(i.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("p",null,n[1].value),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(o.Z,{items:[{demo:{id:"components-card-demo-basic"},previewerProps:{title:"Basic card",filename:"components/card/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>A basic card containing a title, content and an extra corner content. Supports two sizes: <code>default</code> and <code>small</code>.</p>",style:`.code-box-demo p {
  margin: 0;
}
#components-card-demo-basic .ant-card { margin-bottom: 30px; }`}},{demo:{id:"components-card-demo-border-less"},previewerProps:{title:"No border",filename:"components/card/demo/border-less.tsx",jsx:`import React from 'react';
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
`,description:"<p>A borderless card on a gray background.</p>",style:`.site-card-border-less-wrapper {
  padding: 30px;
  background: #ececec;
}`}},{demo:{id:"components-card-demo-simple"},previewerProps:{title:"Simple card",filename:"components/card/demo/simple.tsx",jsx:`import React from 'react';
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
`,description:"<p>A simple card only containing a content area.</p>"}},{demo:{id:"components-card-demo-flexible-content"},previewerProps:{title:"Customized content",filename:"components/card/demo/flexible-content.tsx",jsx:`import React from 'react';
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
`,description:"<p>You can use <code>Card.Meta</code> to support more flexible content.</p>"}},{demo:{id:"components-card-demo-in-column"},previewerProps:{title:"Card in column",filename:"components/card/demo/in-column.tsx",jsx:`import React from 'react';
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
`,description:"<p>Cards usually cooperate with grid column layout in overview page.</p>",style:`.site-card-wrapper {
  padding: 30px;
  background: #ececec;
}

[data-theme="dark"] .site-card-wrapper {
  background: #303030;
}`}},{demo:{id:"components-card-demo-loading"},previewerProps:{title:"Loading card",filename:"components/card/demo/loading.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Shows a loading indicator while the contents of the card is being fetched.</p>"}},{demo:{id:"components-card-demo-grid-card"},previewerProps:{title:"Grid card",filename:"components/card/demo/grid-card.tsx",jsx:`import React from 'react';
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
`,description:"<p>Grid style card content.</p>"}},{demo:{id:"components-card-demo-inner"},previewerProps:{title:"Inner card",filename:"components/card/demo/inner.tsx",jsx:`import React from 'react';
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
`,description:"<p>It can be placed inside the ordinary card to display the information of the multilevel structure.</p>"}},{demo:{id:"components-card-demo-tabs"},previewerProps:{title:"With tabs",filename:"components/card/demo/tabs.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>More content can be hosted.</p>"}},{demo:{id:"components-card-demo-meta"},previewerProps:{title:"Support more content configuration",filename:"components/card/demo/meta.tsx",jsx:`import React from 'react';
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
`,description:"<p>A Card that supports <code>cover</code>, <code>avatar</code>, <code>title</code> and <code>description</code>.</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(r.Z,{lang:"jsx"},n[2].value),(0,t.tZ)("h3",{id:"card"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#card"},(0,t.tZ)("span",{className:"icon icon-link"})),"Card"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[3].value),(0,t.tZ)("th",null,n[4].value),(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[8].value),(0,t.tZ)("td",null,n[9].value),(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,n[11].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[24].value),(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null,n[29].value,(0,t.tZ)("code",null,n[30].value),n[31].value),(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null,n[33].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[34].value),(0,t.tZ)("td",null,n[35].value),(0,t.tZ)("td",null,n[36].value),(0,t.tZ)("td",null,n[37].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[42].value),(0,t.tZ)("td",null,n[43].value),(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[46].value),(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null,n[48].value),(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[50].value),(0,t.tZ)("td",null,n[51].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[52].value),n[53].value,(0,t.tZ)("code",null,n[54].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[55].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null,n[57].value),(0,t.tZ)("td",null,n[58].value),(0,t.tZ)("td",null,n[59].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[60].value),(0,t.tZ)("td",null,n[61].value),(0,t.tZ)("td",null,n[62].value),(0,t.tZ)("td",null,n[63].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[64].value),(0,t.tZ)("td",null,(0,t.tZ)(a.rU,{to:"/components/tabs/#Tabs"},n[65].value)),(0,t.tZ)("td",null,n[66].value),(0,t.tZ)("td",null,n[67].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[68].value),(0,t.tZ)("td",null,n[69].value),(0,t.tZ)("td",null,n[70].value),(0,t.tZ)("td",null,n[71].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[72].value),(0,t.tZ)("td",null,n[73].value,(0,t.tZ)("code",null,n[74].value),n[75].value),(0,t.tZ)("td",null,n[76].value),(0,t.tZ)("td",null,n[77].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[78].value),(0,t.tZ)("td",null,n[79].value),(0,t.tZ)("td",null,n[80].value),(0,t.tZ)("td",null,n[81].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"cardgrid"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#cardgrid"},(0,t.tZ)("span",{className:"icon icon-link"})),"Card.Grid"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[82].value),(0,t.tZ)("th",null,n[83].value),(0,t.tZ)("th",null,n[84].value),(0,t.tZ)("th",null,n[85].value),(0,t.tZ)("th",null,n[86].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[87].value),(0,t.tZ)("td",null,n[88].value),(0,t.tZ)("td",null,n[89].value),(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null,n[92].value),(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null,n[94].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[95].value),(0,t.tZ)("td",null,n[96].value),(0,t.tZ)("td",null,n[97].value),(0,t.tZ)("td",null,n[98].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"cardmeta"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#cardmeta"},(0,t.tZ)("span",{className:"icon icon-link"})),"Card.Meta"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[99].value),(0,t.tZ)("th",null,n[100].value),(0,t.tZ)("th",null,n[101].value),(0,t.tZ)("th",null,n[102].value),(0,t.tZ)("th",null,n[103].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[104].value),(0,t.tZ)("td",null,n[105].value),(0,t.tZ)("td",null,n[106].value),(0,t.tZ)("td",null,n[107].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[108].value),(0,t.tZ)("td",null,n[109].value),(0,t.tZ)("td",null,n[110].value),(0,t.tZ)("td",null,n[111].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[112].value),(0,t.tZ)("td",null,n[113].value),(0,t.tZ)("td",null,n[114].value),(0,t.tZ)("td",null,n[115].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[116].value),(0,t.tZ)("td",null,n[117].value),(0,t.tZ)("td",null,n[118].value),(0,t.tZ)("td",null,n[119].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[120].value),(0,t.tZ)("td",null,n[121].value),(0,t.tZ)("td",null,n[122].value),(0,t.tZ)("td",null,n[123].value),(0,t.tZ)("td",null)))))))}d.default=u}}]);
