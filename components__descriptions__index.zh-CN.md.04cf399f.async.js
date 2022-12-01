"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6130],{4274:function(u,i,n){n.r(i);var c=n(2143),p=n(50250),m=n(59378),_=n(78190),D=n(74775),s=n(5937),I=n(2068),v=n(74399),b=n(46004),Z=n(35708),x=n(30138),g=n(56140),o=n(5388),f=n(49545),h=n(92169),E=n(13140),P=n(95127),R=n(74418),C=n(97119),l=n(28257),a=n(67294),e=n(13946);function r(){var d=(0,l.eL)(),t=d.texts;return(0,e.tZ)(l.dY,null,(0,e.tZ)(a.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("p",null,t[1].value),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(o.Z,{items:[{demo:{id:"components-descriptions-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/descriptions/demo/basic.tsx",jsx:`import React from 'react';
import { Descriptions } from 'antd';
const App = () => (
  <Descriptions title="User Info">
    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
    <Descriptions.Item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);
export default App;
`,description:"<p>\u7B80\u5355\u7684\u5C55\u793A\u3002</p>"}},{demo:{id:"components-descriptions-demo-border"},previewerProps:{title:"\u5E26\u8FB9\u6846\u7684",filename:"components/descriptions/demo/border.tsx",jsx:`import React from 'react';
import { Badge, Descriptions } from 'antd';
const App = () => (
  <Descriptions title="User Info" bordered>
    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
    <Descriptions.Item label="Usage Time" span={2}>
      2019-04-24 18:00:00
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="Running" />
    </Descriptions.Item>
    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
    <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </Descriptions.Item>
  </Descriptions>
);
export default App;
`,description:"<p>\u5E26\u8FB9\u6846\u548C\u80CC\u666F\u989C\u8272\u5217\u8868\u3002</p>"}},{demo:{id:"components-descriptions-demo-text"},previewerProps:{debug:!0,title:"\u590D\u6742\u6587\u672C\u7684\u60C5\u51B5",filename:"components/descriptions/demo/text.tsx",jsx:`import React from 'react';
import { Badge, Descriptions, Table } from 'antd';
const dataSource = [
  {
    key: '1',
    name: '\u80E1\u5F66\u658C',
    age: 32,
    address: '\u897F\u6E56\u533A\u6E56\u5E95\u516C\u56ED1\u53F7',
  },
  {
    key: '2',
    name: '\u80E1\u5F66\u7956',
    age: 42,
    address: '\u897F\u6E56\u533A\u6E56\u5E95\u516C\u56ED1\u53F7',
  },
];
const columns = [
  {
    title: '\u59D3\u540D',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '\u5E74\u9F84',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '\u4F4F\u5740',
    dataIndex: 'address',
    key: 'address',
  },
];
const App = () => (
  <Descriptions title="User Info" column={2}>
    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
    <Descriptions.Item
      label={
        <div
          style={{
            display: 'flex',
          }}
        >
          Billing Mode
        </div>
      }
    >
      Prepaid
    </Descriptions.Item>
    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
    <Descriptions.Item label="Usage Time" span={2}>
      2019-04-24 18:00:00
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="Running" />
    </Descriptions.Item>
    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
    <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
    <Descriptions.Item label="Config Info">
      <Table size="small" pagination={false} dataSource={dataSource} columns={columns} />
    </Descriptions.Item>
  </Descriptions>
);
export default App;
`,description:"<p>\u5E26\u8FB9\u6846\u548C\u80CC\u666F\u989C\u8272\u5217\u8868\u3002</p>"}},{demo:{id:"components-descriptions-demo-size"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u5C3A\u5BF8",filename:"components/descriptions/demo/size.tsx",jsx:`import React, { useState } from 'react';
import { Button, Descriptions, Radio } from 'antd';
const App = () => {
  const [size, setSize] = useState('default');
  const onChange = (e) => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };
  return (
    <div>
      <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <br />
      <br />
      <Descriptions
        bordered
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions title="Custom Size" size={size} extra={<Button type="primary">Edit</Button>}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u5C3A\u5BF8\uFF0C\u9002\u5E94\u5728\u5404\u79CD\u5BB9\u5668\u4E2D\u5C55\u793A\u3002</p>"}},{demo:{id:"components-descriptions-demo-responsive"},previewerProps:{title:"\u54CD\u5E94\u5F0F",filename:"components/descriptions/demo/responsive.tsx",jsx:`import React from 'react';
import { Descriptions } from 'antd';
const App = () => (
  <div>
    <Descriptions
      title="Responsive Descriptions"
      bordered
      column={{
        xxl: 4,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
    >
      <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
      <Descriptions.Item label="time">18:00:00</Descriptions.Item>
      <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official">$60.00</Descriptions.Item>
      <Descriptions.Item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </Descriptions.Item>
    </Descriptions>
  </div>
);
export default App;
`,description:"<p>\u901A\u8FC7\u54CD\u5E94\u5F0F\u7684\u914D\u7F6E\u53EF\u4EE5\u5B9E\u73B0\u5728\u5C0F\u5C4F\u5E55\u8BBE\u5907\u4E0A\u7684\u5B8C\u7F8E\u5448\u73B0\u3002</p>"}},{demo:{id:"components-descriptions-demo-vertical"},previewerProps:{title:"\u5782\u76F4",filename:"components/descriptions/demo/vertical.tsx",jsx:`import React from 'react';
import { Descriptions } from 'antd';
const App = () => (
  <Descriptions title="User Info" layout="vertical">
    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Address" span={2}>
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
  </Descriptions>
);
export default App;
`,description:"<p>\u5782\u76F4\u7684\u5217\u8868\u3002</p>"}},{demo:{id:"components-descriptions-demo-vertical-border"},previewerProps:{title:"\u5782\u76F4\u5E26\u8FB9\u6846\u7684",filename:"components/descriptions/demo/vertical-border.tsx",jsx:`import React from 'react';
import { Badge, Descriptions } from 'antd';
const App = () => (
  <Descriptions title="User Info" layout="vertical" bordered>
    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
    <Descriptions.Item label="Usage Time" span={2}>
      2019-04-24 18:00:00
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="Running" />
    </Descriptions.Item>
    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
    <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </Descriptions.Item>
  </Descriptions>
);
export default App;
`,description:"<p>\u5782\u76F4\u5E26\u8FB9\u6846\u548C\u80CC\u666F\u989C\u8272\u7684\u5217\u8868\u3002</p>"}},{demo:{id:"components-descriptions-demo-style"},previewerProps:{debug:!0,title:"\u81EA\u5B9A\u4E49 label & wrapper \u6837\u5F0F",filename:"components/descriptions/demo/style.tsx",jsx:`import React, { useState } from 'react';
import { Descriptions, Divider, Radio, Switch } from 'antd';
const labelStyle = {
  background: 'red',
};
const contentStyle = {
  background: 'green',
};
const App = () => {
  const [border, setBorder] = useState(true);
  const [layout, setLayout] = useState('horizontal');
  return (
    <>
      <Switch
        checkedChildren="Border"
        unCheckedChildren="No Border"
        checked={border}
        onChange={(e) => setBorder(e)}
      />
      <Divider />
      <Radio.Group onChange={(e) => setLayout(e.target.value)} value={layout}>
        <Radio value="horizontal">horizontal</Radio>
        <Radio value="vertical">vertical</Radio>
      </Radio.Group>
      <Divider />
      <Descriptions title="User Info" bordered={border} layout={layout}>
        <Descriptions.Item label="Product" labelStyle={labelStyle} contentStyle={contentStyle}>
          Cloud Database
        </Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="Root style"
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        bordered={border}
        layout={layout}
      >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item
          label="Automatic Renewal"
          labelStyle={{
            color: 'orange',
          }}
          contentStyle={{
            color: 'blue',
          }}
        >
          YES
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49 label &#x26; wrapper \u6837\u5F0F</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("h3",{id:"descriptions"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#descriptions"},(0,e.tZ)("span",{className:"icon icon-link"})),"Descriptions"),(0,e.tZ)(s.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[2].value),(0,e.tZ)("th",null,t[3].value),(0,e.tZ)("th",null,t[4].value),(0,e.tZ)("th",null,t[5].value),(0,e.tZ)("th",null,t[6].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[7].value),(0,e.tZ)("td",null,t[8].value),(0,e.tZ)("td",null,t[9].value),(0,e.tZ)("td",null,t[10].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[11].value),(0,e.tZ)("td",null,t[12].value,(0,e.tZ)("code",null,t[13].value),t[14].value,(0,e.tZ)("code",null,t[15].value),t[16].value),(0,e.tZ)("td",null,t[17].value),(0,e.tZ)("td",null,t[18].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[19].value),(0,e.tZ)("td",null,t[20].value,(0,e.tZ)("code",null,t[21].value),t[22].value,(0,e.tZ)("code",null,t[23].value)),(0,e.tZ)("td",null,t[24].value),(0,e.tZ)("td",null,t[25].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[26].value),(0,e.tZ)("td",null,t[27].value),(0,e.tZ)("td",null,t[28].value),(0,e.tZ)("td",null,t[29].value),(0,e.tZ)("td",null,t[30].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[31].value),(0,e.tZ)("td",null,t[32].value),(0,e.tZ)("td",null,t[33].value),(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null,t[35].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,t[37].value),(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null,t[39].value),(0,e.tZ)("td",null,t[40].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[41].value),(0,e.tZ)("td",null,t[42].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[43].value),t[44].value,(0,e.tZ)("code",null,t[45].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[46].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[47].value),(0,e.tZ)("td",null,t[48].value,(0,e.tZ)("code",null,t[49].value),t[50].value,(0,e.tZ)("code",null,t[51].value),t[52].value,(0,e.tZ)("code",null,t[53].value),t[54].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[55].value),t[56].value,(0,e.tZ)("code",null,t[57].value),t[58].value,(0,e.tZ)("code",null,t[59].value)),(0,e.tZ)("td",null,t[60].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[61].value),(0,e.tZ)("td",null,t[62].value),(0,e.tZ)("td",null,t[63].value),(0,e.tZ)("td",null,t[64].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"descriptionitem"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#descriptionitem"},(0,e.tZ)("span",{className:"icon icon-link"})),"DescriptionItem"),(0,e.tZ)(s.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[65].value),(0,e.tZ)("th",null,t[66].value),(0,e.tZ)("th",null,t[67].value),(0,e.tZ)("th",null,t[68].value),(0,e.tZ)("th",null,t[69].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[70].value),(0,e.tZ)("td",null,t[71].value),(0,e.tZ)("td",null,t[72].value),(0,e.tZ)("td",null,t[73].value),(0,e.tZ)("td",null,t[74].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[75].value),(0,e.tZ)("td",null,t[76].value),(0,e.tZ)("td",null,t[77].value),(0,e.tZ)("td",null,t[78].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[79].value),(0,e.tZ)("td",null,t[80].value),(0,e.tZ)("td",null,t[81].value),(0,e.tZ)("td",null,t[82].value),(0,e.tZ)("td",null,t[83].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[84].value),(0,e.tZ)("td",null,t[85].value),(0,e.tZ)("td",null,t[86].value),(0,e.tZ)("td",null,t[87].value),(0,e.tZ)("td",null)))),(0,e.tZ)("blockquote",null,(0,e.tZ)("p",null,t[88].value,(0,e.tZ)("code",null,t[89].value),t[90].value,(0,e.tZ)("code",null,t[91].value),t[92].value,(0,e.tZ)("code",null,t[93].value),t[94].value)))))}i.default=r}}]);
