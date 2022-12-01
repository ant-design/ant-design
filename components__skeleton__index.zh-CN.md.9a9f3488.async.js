"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[9582],{44601:function(r,o,n){n.r(o);var _=n(2143),c=n(50250),p=n(59378),v=n(78190),Z=n(74775),l=n(5937),m=n(2068),h=n(74399),x=n(46004),k=n(35708),g=n(30138),S=n(56140),u=n(5388),f=n(49545),E=n(92169),P=n(13140),A=n(95127),b=n(74418),B=n(97119),a=n(28257),i=n(67294),t=n(13946);function s(){var d=(0,a.eL)(),e=d.texts;return(0,t.tZ)(a.dY,null,(0,t.tZ)(i.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,e[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,e[1].value),(0,t.tZ)("li",null,e[2].value),(0,t.tZ)("li",null,e[3].value),(0,t.tZ)("li",null,e[4].value)),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(u.Z,{items:[{demo:{id:"components-skeleton-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/skeleton/demo/basic.tsx",jsx:`import React from 'react';
import { Skeleton } from 'antd';
const App = () => <Skeleton />;
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u5360\u4F4D\u6548\u679C\u3002</p>"}},{demo:{id:"components-skeleton-demo-complex"},previewerProps:{title:"\u590D\u6742\u7684\u7EC4\u5408",filename:"components/skeleton/demo/complex.tsx",jsx:`import React from 'react';
import { Skeleton } from 'antd';
const App = () => (
  <Skeleton
    avatar
    paragraph={{
      rows: 4,
    }}
  />
);
export default App;
`,description:"<p>\u66F4\u590D\u6742\u7684\u7EC4\u5408\u3002</p>"}},{demo:{id:"components-skeleton-demo-active"},previewerProps:{title:"\u52A8\u753B\u6548\u679C",filename:"components/skeleton/demo/active.tsx",jsx:`import React from 'react';
import { Skeleton } from 'antd';
const App = () => <Skeleton active />;
export default App;
`,description:"<p>\u663E\u793A\u52A8\u753B\u6548\u679C\u3002</p>"}},{demo:{id:"components-skeleton-demo-element"},previewerProps:{title:"\u6309\u94AE/\u5934\u50CF/\u8F93\u5165\u6846/\u56FE\u50CF/\u81EA\u5B9A\u4E49\u8282\u70B9",filename:"components/skeleton/demo/element.tsx",jsx:`import React, { useState } from 'react';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';
const App = () => {
  const [active, setActive] = useState(false);
  const [block, setBlock] = useState(false);
  const [size, setSize] = useState('default');
  const [buttonShape, setButtonShape] = useState('default');
  const [avatarShape, setAvatarShape] = useState('circle');
  const handleActiveChange = (checked) => {
    setActive(checked);
  };
  const handleBlockChange = (checked) => {
    setBlock(checked);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleShapeButton = (e) => {
    setButtonShape(e.target.value);
  };
  const handleAvatarShape = (e) => {
    setAvatarShape(e.target.value);
  };
  return (
    <>
      <Space>
        <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
        <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
        <Skeleton.Input active={active} size={size} />
      </Space>
      <br />
      <br />
      <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
      <br />
      <br />
      <Skeleton.Input active={active} size={size} block={block} />
      <br />
      <br />
      <Space>
        <Skeleton.Image active={active} />
        <Skeleton.Node active={active}>
          <DotChartOutlined
            style={{
              fontSize: 40,
              color: '#bfbfbf',
            }}
          />
        </Skeleton.Node>
      </Space>
      <Divider />
      <Form
        layout="inline"
        style={{
          margin: '16px 0',
        }}
      >
        <Form.Item label="Active">
          <Switch checked={active} onChange={handleActiveChange} />
        </Form.Item>
        <Form.Item label="Button and Input Block">
          <Switch checked={block} onChange={handleBlockChange} />
        </Form.Item>
        <Form.Item label="Size">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Button Shape">
          <Radio.Group value={buttonShape} onChange={handleShapeButton}>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="square">Square</Radio.Button>
            <Radio.Button value="round">Round</Radio.Button>
            <Radio.Button value="circle">Circle</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Avatar Shape">
          <Radio.Group value={avatarShape} onChange={handleAvatarShape}>
            <Radio.Button value="square">Square</Radio.Button>
            <Radio.Button value="circle">Circle</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};
export default App;
`,description:"<p>\u9AA8\u67B6\u6309\u94AE\u3001\u5934\u50CF\u3001\u8F93\u5165\u6846\u3001\u56FE\u50CF\u548C\u81EA\u5B9A\u4E49\u8282\u70B9\u3002</p>"}},{demo:{id:"components-skeleton-demo-children"},previewerProps:{title:"\u5305\u542B\u5B50\u7EC4\u4EF6",filename:"components/skeleton/demo/children.tsx",jsx:`import React, { useState } from 'react';
import { Button, Skeleton } from 'antd';
const App = () => {
  const [loading, setLoading] = useState(false);
  const showSkeleton = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      <Skeleton loading={loading}>
        <h4
          style={{
            marginBottom: 16,
          }}
        >
          Ant Design, a design language
        </h4>
        <p
          style={{
            marginBottom: 16,
          }}
        >
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      </Skeleton>
      <Button onClick={showSkeleton} disabled={loading}>
        Show Skeleton
      </Button>
    </>
  );
};
export default App;
`,description:"<p>\u52A0\u8F7D\u5360\u4F4D\u56FE\u5305\u542B\u5B50\u7EC4\u4EF6\u3002</p>"}},{demo:{id:"components-skeleton-demo-list"},previewerProps:{title:"\u5217\u8868",filename:"components/skeleton/demo/list.tsx",jsx:`import React, { useState } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Skeleton, Switch } from 'antd';
const listData = Array.from({
  length: 3,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: \`ant design part \${i}\`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, {
      style: {
        marginRight: 8,
      },
    })}
    {text}
  </span>
);
const App = () => {
  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };
  return (
    <>
      <Switch checked={!loading} onChange={onChange} />

      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={
              !loading
                ? [
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]
                : undefined
            }
            extra={
              !loading && (
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              )
            }
          >
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};
export default App;
`,description:"<p>\u5728\u5217\u8868\u7EC4\u4EF6\u4E2D\u4F7F\u7528\u52A0\u8F7D\u5360\u4F4D\u7B26\u3002</p>",style:`.skeleton-demo {
  border: 1px solid #f4f4f4;
}`}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("h3",{id:"skeleton"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#skeleton"},(0,t.tZ)("span",{className:"icon icon-link"})),"Skeleton"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[5].value),(0,t.tZ)("th",null,e[6].value),(0,t.tZ)("th",null,e[7].value),(0,t.tZ)("th",null,e[8].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[9].value),(0,t.tZ)("td",null,e[10].value),(0,t.tZ)("td",null,e[11].value),(0,t.tZ)("td",null,e[12].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[13].value),(0,t.tZ)("td",null,e[14].value),(0,t.tZ)("td",null,e[15].value,(0,t.tZ)(a.rU,{to:"#SkeletonAvatarProps"},e[16].value)),(0,t.tZ)("td",null,e[17].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[18].value),(0,t.tZ)("td",null,e[19].value),(0,t.tZ)("td",null,e[20].value),(0,t.tZ)("td",null,e[21].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[22].value),(0,t.tZ)("td",null,e[23].value),(0,t.tZ)("td",null,e[24].value,(0,t.tZ)(a.rU,{to:"#SkeletonParagraphProps"},e[25].value)),(0,t.tZ)("td",null,e[26].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[27].value),(0,t.tZ)("td",null,e[28].value),(0,t.tZ)("td",null,e[29].value),(0,t.tZ)("td",null,e[30].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[31].value),(0,t.tZ)("td",null,e[32].value),(0,t.tZ)("td",null,e[33].value,(0,t.tZ)(a.rU,{to:"#SkeletonTitleProps"},e[34].value)),(0,t.tZ)("td",null,e[35].value)))),(0,t.tZ)("h3",{id:"skeletonavatarprops"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#skeletonavatarprops"},(0,t.tZ)("span",{className:"icon icon-link"})),"SkeletonAvatarProps"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[36].value),(0,t.tZ)("th",null,e[37].value),(0,t.tZ)("th",null,e[38].value),(0,t.tZ)("th",null,e[39].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[40].value),(0,t.tZ)("td",null,e[41].value),(0,t.tZ)("td",null,e[42].value),(0,t.tZ)("td",null,e[43].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[44].value),(0,t.tZ)("td",null,e[45].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[46].value),e[47].value,(0,t.tZ)("code",null,e[48].value)),(0,t.tZ)("td",null,e[49].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[50].value),(0,t.tZ)("td",null,e[51].value),(0,t.tZ)("td",null,e[52].value,(0,t.tZ)("code",null,e[53].value),e[54].value,(0,t.tZ)("code",null,e[55].value),e[56].value,(0,t.tZ)("code",null,e[57].value)),(0,t.tZ)("td",null,e[58].value)))),(0,t.tZ)("h3",{id:"skeletontitleprops"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#skeletontitleprops"},(0,t.tZ)("span",{className:"icon icon-link"})),"SkeletonTitleProps"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[59].value),(0,t.tZ)("th",null,e[60].value),(0,t.tZ)("th",null,e[61].value),(0,t.tZ)("th",null,e[62].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[63].value),(0,t.tZ)("td",null,e[64].value),(0,t.tZ)("td",null,e[65].value),(0,t.tZ)("td",null,e[66].value)))),(0,t.tZ)("h3",{id:"skeletonparagraphprops"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#skeletonparagraphprops"},(0,t.tZ)("span",{className:"icon icon-link"})),"SkeletonParagraphProps"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[67].value),(0,t.tZ)("th",null,e[68].value),(0,t.tZ)("th",null,e[69].value),(0,t.tZ)("th",null,e[70].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[71].value),(0,t.tZ)("td",null,e[72].value),(0,t.tZ)("td",null,e[73].value),(0,t.tZ)("td",null,e[74].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[75].value),(0,t.tZ)("td",null,e[76].value),(0,t.tZ)("td",null,e[77].value),(0,t.tZ)("td",null,e[78].value)))),(0,t.tZ)("h3",{id:"skeletonbuttonprops"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#skeletonbuttonprops"},(0,t.tZ)("span",{className:"icon icon-link"})),"SkeletonButtonProps"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[79].value),(0,t.tZ)("th",null,e[80].value),(0,t.tZ)("th",null,e[81].value),(0,t.tZ)("th",null,e[82].value),(0,t.tZ)("th",null,e[83].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[84].value),(0,t.tZ)("td",null,e[85].value),(0,t.tZ)("td",null,e[86].value),(0,t.tZ)("td",null,e[87].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[88].value),(0,t.tZ)("td",null,e[89].value),(0,t.tZ)("td",null,e[90].value),(0,t.tZ)("td",null,e[91].value),(0,t.tZ)("td",null,e[92].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[93].value),(0,t.tZ)("td",null,e[94].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[95].value),e[96].value,(0,t.tZ)("code",null,e[97].value),e[98].value,(0,t.tZ)("code",null,e[99].value),e[100].value,(0,t.tZ)("code",null,e[101].value)),(0,t.tZ)("td",null,e[102].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[103].value),(0,t.tZ)("td",null,e[104].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[105].value),e[106].value,(0,t.tZ)("code",null,e[107].value),e[108].value,(0,t.tZ)("code",null,e[109].value)),(0,t.tZ)("td",null,e[110].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"skeletoninputprops"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#skeletoninputprops"},(0,t.tZ)("span",{className:"icon icon-link"})),"SkeletonInputProps"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[111].value),(0,t.tZ)("th",null,e[112].value),(0,t.tZ)("th",null,e[113].value),(0,t.tZ)("th",null,e[114].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[115].value),(0,t.tZ)("td",null,e[116].value),(0,t.tZ)("td",null,e[117].value),(0,t.tZ)("td",null,e[118].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[119].value),(0,t.tZ)("td",null,e[120].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[121].value),e[122].value,(0,t.tZ)("code",null,e[123].value),e[124].value,(0,t.tZ)("code",null,e[125].value)),(0,t.tZ)("td",null,e[126].value)))))))}o.default=s}}]);
