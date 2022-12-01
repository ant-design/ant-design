"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[315],{97642:function(r,i,e){e.r(i);var c=e(2143),m=e(50250),v=e(59378),Z=e(78190),p=e(74775),l=e(5937),_=e(2068),g=e(74399),h=e(46004),f=e(35708),x=e(30138),L=e(56140),d=e(5388),I=e(49545),D=e(92169),E=e(13140),A=e(95127),T=e(74418),M=e(97119),a=e(28257),u=e(67294),t=e(13946);function o(){var s=(0,a.eL)(),n=s.texts;return(0,t.tZ)(a.dY,null,(0,t.tZ)(u.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("p",null,n[1].value),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(d.Z,{items:[{demo:{id:"components-list-demo-simple"},previewerProps:{title:"\u7B80\u5355\u5217\u8868",filename:"components/list/demo/simple.tsx",jsx:`import React from 'react';
import { Divider, List, Typography } from 'antd';
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const App = () => (
  <>
    <Divider orientation="left">Default Size</Divider>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
    <Divider orientation="left">Small Size</Divider>
    <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
    <Divider orientation="left">Large Size</Divider>
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </>
);
export default App;
`,description:`<p>\u5217\u8868\u62E5\u6709\u5927\u3001\u4E2D\u3001\u5C0F\u4E09\u79CD\u5C3A\u5BF8\u3002</p>
<p>\u901A\u8FC7\u8BBE\u7F6E <code>size</code> \u4E3A <code>large</code> <code>small</code> \u5206\u522B\u628A\u6309\u94AE\u8BBE\u4E3A\u5927\u3001\u5C0F\u5C3A\u5BF8\u3002\u82E5\u4E0D\u8BBE\u7F6E <code>size</code>\uFF0C\u5219\u5C3A\u5BF8\u4E3A\u4E2D\u3002</p>
<p>\u53EF\u901A\u8FC7\u8BBE\u7F6E <code>header</code> \u548C <code>footer</code>\uFF0C\u6765\u81EA\u5B9A\u4E49\u5217\u8868\u5934\u90E8\u548C\u5C3E\u90E8\u3002</p>`}},{demo:{id:"components-list-demo-basic"},previewerProps:{title:"\u57FA\u7840\u5217\u8868",filename:"components/list/demo/basic.tsx",jsx:`import React from 'react';
import { Avatar, List } from 'antd';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const App = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
);
export default App;
`,description:"<p>\u57FA\u7840\u5217\u8868\u3002</p>"}},{demo:{id:"components-list-demo-loadmore"},previewerProps:{title:"\u52A0\u8F7D\u66F4\u591A",filename:"components/list/demo/loadmore.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
const count = 3;
const fakeDataUrl = \`https://randomuser.me/api/?results=\${count}&inc=name,gender,email,nat,picture&noinfo\`;
const App = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default App;
`,description:"<p>\u53EF\u901A\u8FC7 <code>loadMore</code> \u5C5E\u6027\u5B9E\u73B0\u52A0\u8F7D\u66F4\u591A\u529F\u80FD\u3002</p>",style:`.demo-loadmore-list {
  min-height: 350px;
}`}},{demo:{id:"components-list-demo-vertical"},previewerProps:{title:"\u7AD6\u6392\u5217\u8868\u6837\u5F0F",filename:"components/list/demo/vertical.tsx",jsx:`import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
const data = Array.from({
  length: 23,
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
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const App = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);
export default App;
`,description:"<p>\u901A\u8FC7\u8BBE\u7F6E <code>itemLayout</code> \u5C5E\u6027\u4E3A <code>vertical</code> \u53EF\u5B9E\u73B0\u7AD6\u6392\u5217\u8868\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-list-demo-grid"},previewerProps:{title:"\u6805\u683C\u5217\u8868",filename:"components/list/demo/grid.tsx",jsx:`import React from 'react';
import { Card, List } from 'antd';
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];
const App = () => (
  <List
    grid={{
      gutter: 16,
      column: 4,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
);
export default App;
`,description:"<p>\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E <code>List</code> \u7684 <code>grid</code> \u5C5E\u6027\u6765\u5B9E\u73B0\u6805\u683C\u5217\u8868\uFF0C<code>column</code> \u53EF\u8BBE\u7F6E\u671F\u671B\u663E\u793A\u7684\u5217\u6570\u3002</p>"}},{demo:{id:"components-list-demo-grid-test"},previewerProps:{debug:!0,title:"\u6D4B\u8BD5\u6805\u683C\u5217\u8868",filename:"components/list/demo/grid-test.tsx",jsx:`import React from 'react';
import { Card, List } from 'antd';
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];
const ListItem = () => (
  <List.Item>
    <Card title="title">Card content</Card>
  </List.Item>
);
const App = () => (
  <>
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}>Card content</Card>
        </List.Item>
      )}
    />
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={data}
      renderItem={() => <ListItem />}
    />
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={data}
      renderItem={() => (
        <>
          <ListItem />
          <div />
        </>
      )}
    />
  </>
);
export default App;
`,description:"<p>List <code>grid</code> \u5728\u5404\u79CD\u60C5\u51B5\u4E0B\u7684\u6837\u5F0F\u8868\u73B0\uFF0C\u5982 Fragment \u548C\u5C01\u88C5\u4E86 List.Item.</p>"}},{demo:{id:"components-list-demo-responsive"},previewerProps:{title:"\u54CD\u5E94\u5F0F\u7684\u6805\u683C\u5217\u8868",filename:"components/list/demo/responsive.tsx",jsx:`import React from 'react';
import { Card, List } from 'antd';
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];
const App = () => (
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
);
export default App;
`,description:'<p>\u54CD\u5E94\u5F0F\u7684\u6805\u683C\u5217\u8868\u3002\u5C3A\u5BF8\u4E0E <a href="/components/grid/#Col">Layout Grid</a> \u4FDD\u6301\u4E00\u81F4\u3002</p>'}},{demo:{id:"components-list-demo-infinite-load"},previewerProps:{title:"\u6EDA\u52A8\u52A0\u8F7D",filename:"components/list/demo/infinite-load.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more \u{1F910}</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default App;
`,description:'<p>\u7ED3\u5408 <a href="https://github.com/ankeetmaini/react-infinite-scroll-component">react-infinite-scroll-component</a> \u5B9E\u73B0\u6EDA\u52A8\u81EA\u52A8\u52A0\u8F7D\u5217\u8868\u3002</p>'}},{demo:{id:"components-list-demo-virtual-list"},previewerProps:{title:"\u6EDA\u52A8\u52A0\u8F7D\u65E0\u9650\u957F\u5217\u8868",filename:"components/list/demo/virtual-list.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
const App = () => {
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(\`\${body.results.length} more items loaded!\`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default App;
`,description:'<p>\u7ED3\u5408 <a href="https://github.com/react-component/virtual-list">rc-virtual-list</a> \u5B9E\u73B0\u6EDA\u52A8\u52A0\u8F7D\u65E0\u9650\u957F\u5217\u8868\uFF0C\u80FD\u591F\u63D0\u9AD8\u6570\u636E\u91CF\u5927\u65F6\u5019\u957F\u5217\u8868\u7684\u6027\u80FD\u3002</p>'}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("p",null,n[2].value,(0,t.tZ)("a",{href:"https://procomponents.ant.design/components/list"},n[3].value),n[4].value,(0,t.tZ)("code",null,n[5].value),n[6].value),(0,t.tZ)("h3",{id:"list"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#list"},(0,t.tZ)("span",{className:"icon icon-link"})),"List"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[7].value),(0,t.tZ)("th",null,n[8].value),(0,t.tZ)("th",null,n[9].value),(0,t.tZ)("th",null,n[10].value),(0,t.tZ)("th",null,n[11].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[24].value),(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null,(0,t.tZ)(a.rU,{to:"#List-grid-props"},n[26].value)),(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null,n[29].value),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,n[31].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null,n[33].value,(0,t.tZ)("code",null,n[34].value),n[35].value,(0,t.tZ)("code",null,n[36].value),n[37].value),(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value,(0,t.tZ)("code",null,n[42].value),n[43].value),(0,t.tZ)("td",null,n[44].value,(0,t.tZ)(a.rU,{to:"/components/spin/#API"},n[45].value),n[46].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/8659"},n[47].value),n[48].value),(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[50].value),(0,t.tZ)("td",null,n[51].value),(0,t.tZ)("td",null,n[52].value),(0,t.tZ)("td",null,n[53].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[54].value),(0,t.tZ)("td",null,n[55].value),(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null,n[57].value,(0,t.tZ)("code",null,n[58].value),n[59].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[60].value),(0,t.tZ)("td",null,n[61].value,(0,t.tZ)("code",null,n[62].value),n[63].value),(0,t.tZ)("td",null,n[64].value),(0,t.tZ)("td",null,n[65].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[66].value),(0,t.tZ)("td",null,n[67].value,(0,t.tZ)("code",null,n[68].value),n[69].value),(0,t.tZ)("td",null,n[70].value),(0,t.tZ)("td",null,n[71].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[72].value),(0,t.tZ)("td",null,n[73].value,(0,t.tZ)("code",null,n[74].value),n[75].value,(0,t.tZ)("code",null,n[76].value),n[77].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[78].value),n[79].value,(0,t.tZ)("code",null,n[80].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[81].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[82].value),(0,t.tZ)("td",null,n[83].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[84].value),n[85].value,(0,t.tZ)("code",null,n[86].value),n[87].value,(0,t.tZ)("code",null,n[88].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[89].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null,n[92].value),(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"pagination"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#pagination"},(0,t.tZ)("span",{className:"icon icon-link"})),"pagination"),(0,t.tZ)("p",null,n[94].value),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[95].value),(0,t.tZ)("th",null,n[96].value),(0,t.tZ)("th",null,n[97].value),(0,t.tZ)("th",null,n[98].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[99].value),(0,t.tZ)("td",null,n[100].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[101].value),n[102].value,(0,t.tZ)("code",null,n[103].value),n[104].value,(0,t.tZ)("code",null,n[105].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[106].value))))),(0,t.tZ)("p",null,n[107].value,(0,t.tZ)(a.rU,{to:"/components/pagination/"},(0,t.tZ)("code",null,n[108].value)),n[109].value),(0,t.tZ)("h3",{id:"list-grid-props"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#list-grid-props"},(0,t.tZ)("span",{className:"icon icon-link"})),"List grid props"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[110].value),(0,t.tZ)("th",null,n[111].value),(0,t.tZ)("th",null,n[112].value),(0,t.tZ)("th",null,n[113].value),(0,t.tZ)("th",null,n[114].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[115].value),(0,t.tZ)("td",null,n[116].value),(0,t.tZ)("td",null,n[117].value),(0,t.tZ)("td",null,n[118].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[119].value),(0,t.tZ)("td",null,n[120].value),(0,t.tZ)("td",null,n[121].value),(0,t.tZ)("td",null,n[122].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[123].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[124].value),n[125].value),(0,t.tZ)("td",null,n[126].value),(0,t.tZ)("td",null,n[127].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[128].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[129].value),n[130].value),(0,t.tZ)("td",null,n[131].value),(0,t.tZ)("td",null,n[132].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[133].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[134].value),n[135].value),(0,t.tZ)("td",null,n[136].value),(0,t.tZ)("td",null,n[137].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[138].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[139].value),n[140].value),(0,t.tZ)("td",null,n[141].value),(0,t.tZ)("td",null,n[142].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[143].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[144].value),n[145].value),(0,t.tZ)("td",null,n[146].value),(0,t.tZ)("td",null,n[147].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[148].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[149].value),n[150].value),(0,t.tZ)("td",null,n[151].value),(0,t.tZ)("td",null,n[152].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"listitem"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#listitem"},(0,t.tZ)("span",{className:"icon icon-link"})),"List.Item"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[153].value),(0,t.tZ)("th",null,n[154].value),(0,t.tZ)("th",null,n[155].value),(0,t.tZ)("th",null,n[156].value),(0,t.tZ)("th",null,n[157].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[158].value),(0,t.tZ)("td",null,n[159].value,(0,t.tZ)("code",null,n[160].value),n[161].value),(0,t.tZ)("td",null,n[162].value),(0,t.tZ)("td",null,n[163].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[164].value),(0,t.tZ)("td",null,n[165].value,(0,t.tZ)("code",null,n[166].value),n[167].value,(0,t.tZ)("code",null,n[168].value),n[169].value,(0,t.tZ)("code",null,n[170].value),n[171].value),(0,t.tZ)("td",null,n[172].value),(0,t.tZ)("td",null,n[173].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"listitemmeta"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#listitemmeta"},(0,t.tZ)("span",{className:"icon icon-link"})),"List.Item.Meta"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[174].value),(0,t.tZ)("th",null,n[175].value),(0,t.tZ)("th",null,n[176].value),(0,t.tZ)("th",null,n[177].value),(0,t.tZ)("th",null,n[178].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[179].value),(0,t.tZ)("td",null,n[180].value),(0,t.tZ)("td",null,n[181].value),(0,t.tZ)("td",null,n[182].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[183].value),(0,t.tZ)("td",null,n[184].value),(0,t.tZ)("td",null,n[185].value),(0,t.tZ)("td",null,n[186].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[187].value),(0,t.tZ)("td",null,n[188].value),(0,t.tZ)("td",null,n[189].value),(0,t.tZ)("td",null,n[190].value),(0,t.tZ)("td",null)))))))}i.default=o}}]);
