"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[8059],{38966:function(r,i,n){n.r(i);var m=n(2143),c=n(50250),p=n(59378),v=n(78190),Z=n(74775),a=n(5937),_=n(2068),h=n(74399),g=n(46004),f=n(35708),x=n(30138),L=n(56140),s=n(5388),I=n(49545),D=n(92169),E=n(13140),A=n(95127),T=n(74418),M=n(97119),l=n(28257),d=n(67294),t=n(13946);function o(){var u=(0,l.eL)(),e=u.texts;return(0,t.tZ)(l.dY,null,(0,t.tZ)(d.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,e[0].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("p",null,e[1].value),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(s.Z,{items:[{demo:{id:"components-list-demo-simple"},previewerProps:{title:"Simple list",filename:"components/list/demo/simple.tsx",jsx:`import React from 'react';
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
`,description:`<p>Ant Design supports a default list size as well as a large and small size.</p>
<p>If a large or small list is desired, set the size property to either large or small respectively. Omit the size property for a list with the default size.</p>
<p>Customizing the header and footer of list by setting <code>header</code> and <code>footer</code> property.</p>`}},{demo:{id:"components-list-demo-basic"},previewerProps:{title:"Basic list",filename:"components/list/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>Basic list.</p>"}},{demo:{id:"components-list-demo-loadmore"},previewerProps:{title:"Load more",filename:"components/list/demo/loadmore.tsx",jsx:`import React, { useEffect, useState } from 'react';
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
`,description:"<p>Load more list with <code>loadMore</code> property.</p>",style:`.demo-loadmore-list {
  min-height: 350px;
}`}},{demo:{id:"components-list-demo-vertical"},previewerProps:{title:"Vertical",filename:"components/list/demo/vertical.tsx",jsx:`import React from 'react';
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
`,description:"<p>Set the <code>itemLayout</code> property to <code>vertical</code> to create a vertical list.</p>"}},{demo:{id:"components-list-demo-grid"},previewerProps:{title:"Grid",filename:"components/list/demo/grid.tsx",jsx:`import React from 'react';
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
`,description:"<p>Create a grid layout by setting the <code>grid</code> property of List.</p>"}},{demo:{id:"components-list-demo-grid-test"},previewerProps:{debug:!0,title:"Test Grid",filename:"components/list/demo/grid-test.tsx",jsx:`import React from 'react';
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
`,description:"<p>Test List <code>grid</code> for some edge cases.</p>"}},{demo:{id:"components-list-demo-responsive"},previewerProps:{title:"Responsive grid list",filename:"components/list/demo/responsive.tsx",jsx:`import React from 'react';
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
`,description:'<p>Responsive grid list. The size property the is as same as <a href="/components/grid/#Col">Layout Grid</a>.</p>'}},{demo:{id:"components-list-demo-infinite-load"},previewerProps:{title:"Scrolling loaded",filename:"components/list/demo/infinite-load.tsx",jsx:`import React, { useEffect, useState } from 'react';
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
`,description:'<p>The example of infinite load with <a href="https://github.com/ankeetmaini/react-infinite-scroll-component">react-infinite-scroll-component</a>.</p>'}},{demo:{id:"components-list-demo-virtual-list"},previewerProps:{title:"virtual list",filename:"components/list/demo/virtual-list.tsx",jsx:`import React, { useEffect, useState } from 'react';
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
`,description:'<p>An example of infinite &#x26; virtualized list via using <a href="https://github.com/react-component/virtual-list">rc-virtual-list</a>.</p>'}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("h3",{id:"list"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#list"},(0,t.tZ)("span",{className:"icon icon-link"})),"List"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[2].value),(0,t.tZ)("th",null,e[3].value),(0,t.tZ)("th",null,e[4].value),(0,t.tZ)("th",null,e[5].value),(0,t.tZ)("th",null,e[6].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[7].value),(0,t.tZ)("td",null,e[8].value),(0,t.tZ)("td",null,e[9].value),(0,t.tZ)("td",null,e[10].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[11].value),(0,t.tZ)("td",null,e[12].value),(0,t.tZ)("td",null,e[13].value),(0,t.tZ)("td",null,e[14].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[15].value),(0,t.tZ)("td",null,e[16].value),(0,t.tZ)("td",null,e[17].value),(0,t.tZ)("td",null,e[18].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[19].value),(0,t.tZ)("td",null,e[20].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#List-grid-props"},e[21].value)),(0,t.tZ)("td",null,e[22].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[23].value),(0,t.tZ)("td",null,e[24].value),(0,t.tZ)("td",null,e[25].value),(0,t.tZ)("td",null,e[26].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[27].value),(0,t.tZ)("td",null,e[28].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[29].value),e[30].value,(0,t.tZ)("code",null,e[31].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[32].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[33].value),(0,t.tZ)("td",null,e[34].value),(0,t.tZ)("td",null,e[35].value,(0,t.tZ)(l.rU,{to:"/components/spin/#API"},e[36].value),e[37].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/8659"},e[38].value),e[39].value),(0,t.tZ)("td",null,e[40].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[41].value),(0,t.tZ)("td",null,e[42].value),(0,t.tZ)("td",null,e[43].value),(0,t.tZ)("td",null,e[44].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[45].value),(0,t.tZ)("td",null,e[46].value),(0,t.tZ)("td",null,e[47].value),(0,t.tZ)("td",null,e[48].value,(0,t.tZ)("code",null,e[49].value),e[50].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[51].value),(0,t.tZ)("td",null,e[52].value,(0,t.tZ)(l.rU,{to:"/components/pagination/"},e[53].value),e[54].value),(0,t.tZ)("td",null,e[55].value),(0,t.tZ)("td",null,e[56].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[57].value),(0,t.tZ)("td",null,e[58].value,(0,t.tZ)("code",null,e[59].value)),(0,t.tZ)("td",null,e[60].value),(0,t.tZ)("td",null,e[61].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[62].value),(0,t.tZ)("td",null,e[63].value,(0,t.tZ)("code",null,e[64].value),e[65].value,(0,t.tZ)("code",null,e[66].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[67].value),e[68].value,(0,t.tZ)("code",null,e[69].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[70].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[71].value),(0,t.tZ)("td",null,e[72].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[73].value),e[74].value,(0,t.tZ)("code",null,e[75].value),e[76].value,(0,t.tZ)("code",null,e[77].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[78].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[79].value),(0,t.tZ)("td",null,e[80].value),(0,t.tZ)("td",null,e[81].value),(0,t.tZ)("td",null,e[82].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"pagination"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#pagination"},(0,t.tZ)("span",{className:"icon icon-link"})),"pagination"),(0,t.tZ)("p",null,e[83].value),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[84].value),(0,t.tZ)("th",null,e[85].value),(0,t.tZ)("th",null,e[86].value),(0,t.tZ)("th",null,e[87].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[88].value),(0,t.tZ)("td",null,e[89].value,(0,t.tZ)("code",null,e[90].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[91].value),e[92].value,(0,t.tZ)("code",null,e[93].value),e[94].value,(0,t.tZ)("code",null,e[95].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[96].value))))),(0,t.tZ)("p",null,e[97].value,(0,t.tZ)(l.rU,{to:"/components/pagination/"},(0,t.tZ)("code",null,e[98].value)),e[99].value),(0,t.tZ)("h3",{id:"list-grid-props"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#list-grid-props"},(0,t.tZ)("span",{className:"icon icon-link"})),"List grid props"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[100].value),(0,t.tZ)("th",null,e[101].value),(0,t.tZ)("th",null,e[102].value),(0,t.tZ)("th",null,e[103].value),(0,t.tZ)("th",null,e[104].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[105].value),(0,t.tZ)("td",null,e[106].value),(0,t.tZ)("td",null,e[107].value),(0,t.tZ)("td",null,e[108].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[109].value),(0,t.tZ)("td",null,e[110].value),(0,t.tZ)("td",null,e[111].value),(0,t.tZ)("td",null,e[112].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[113].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[114].value),e[115].value),(0,t.tZ)("td",null,e[116].value),(0,t.tZ)("td",null,e[117].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[118].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[119].value),e[120].value),(0,t.tZ)("td",null,e[121].value),(0,t.tZ)("td",null,e[122].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[123].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[124].value),e[125].value),(0,t.tZ)("td",null,e[126].value),(0,t.tZ)("td",null,e[127].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[128].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[129].value),e[130].value),(0,t.tZ)("td",null,e[131].value),(0,t.tZ)("td",null,e[132].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[133].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[134].value),e[135].value),(0,t.tZ)("td",null,e[136].value),(0,t.tZ)("td",null,e[137].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[138].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[139].value),e[140].value),(0,t.tZ)("td",null,e[141].value),(0,t.tZ)("td",null,e[142].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"listitem"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#listitem"},(0,t.tZ)("span",{className:"icon icon-link"})),"List.Item"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[143].value),(0,t.tZ)("th",null,e[144].value),(0,t.tZ)("th",null,e[145].value),(0,t.tZ)("th",null,e[146].value),(0,t.tZ)("th",null,e[147].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[148].value),(0,t.tZ)("td",null,e[149].value,(0,t.tZ)("code",null,e[150].value),e[151].value,(0,t.tZ)("code",null,e[152].value),e[153].value),(0,t.tZ)("td",null,e[154].value),(0,t.tZ)("td",null,e[155].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[156].value),(0,t.tZ)("td",null,e[157].value,(0,t.tZ)("code",null,e[158].value),e[159].value,(0,t.tZ)("code",null,e[160].value),e[161].value),(0,t.tZ)("td",null,e[162].value),(0,t.tZ)("td",null,e[163].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"listitemmeta"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#listitemmeta"},(0,t.tZ)("span",{className:"icon icon-link"})),"List.Item.Meta"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[164].value),(0,t.tZ)("th",null,e[165].value),(0,t.tZ)("th",null,e[166].value),(0,t.tZ)("th",null,e[167].value),(0,t.tZ)("th",null,e[168].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[169].value),(0,t.tZ)("td",null,e[170].value),(0,t.tZ)("td",null,e[171].value),(0,t.tZ)("td",null,e[172].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[173].value),(0,t.tZ)("td",null,e[174].value),(0,t.tZ)("td",null,e[175].value),(0,t.tZ)("td",null,e[176].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[177].value),(0,t.tZ)("td",null,e[178].value),(0,t.tZ)("td",null,e[179].value),(0,t.tZ)("td",null,e[180].value),(0,t.tZ)("td",null)))))))}i.default=o}}]);
