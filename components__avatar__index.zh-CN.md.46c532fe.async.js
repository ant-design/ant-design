"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2],{28173:function(d,a,e){e.r(a);var v=e(2143),c=e(50250),_=e(59378),p=e(78190),m=e(74775),l=e(5937),Z=e(2068),A=e(74399),g=e(46004),x=e(35708),h=e(30138),f=e(56140),r=e(5388),E=e(49545),U=e(92169),O=e(13140),C=e(95127),P=e(74418),D=e(97119),o=e(28257),s=e(67294),n=e(13946);function u(){var i=(0,o.eL)(),t=i.texts;return(0,n.tZ)(o.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"\u8BBE\u8BA1\u5E08\u4E13\u5C5E"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u8BBE\u8BA1\u5E08\u4E13\u5C5E"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u8BBE\u8BA1\u5E08\u4E13\u5C5E"),(0,n.tZ)("p",null,t[1].value,(0,n.tZ)("a",{href:"https://kitchen.alipay.com"},t[2].value),t[3].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(r.Z,{items:[{demo:{id:"components-avatar-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/avatar/demo/basic.tsx",jsx:`import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const App = () => (
  <>
    <div>
      <Avatar size={64} icon={<UserOutlined />} />
      <Avatar size="large" icon={<UserOutlined />} />
      <Avatar icon={<UserOutlined />} />
      <Avatar size="small" icon={<UserOutlined />} />
    </div>
    <div>
      <Avatar shape="square" size={64} icon={<UserOutlined />} />
      <Avatar shape="square" size="large" icon={<UserOutlined />} />
      <Avatar shape="square" icon={<UserOutlined />} />
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
  </>
);
export default App;
`,description:"<p>\u5934\u50CF\u6709\u4E09\u79CD\u5C3A\u5BF8\uFF0C\u4E24\u79CD\u5F62\u72B6\u53EF\u9009\u3002</p>",style:`#components-avatar-demo-basic .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
.ant-row-rtl #components-avatar-demo-basic .ant-avatar {
  margin-right: 0;
  margin-left: 16px;
}`}},{demo:{id:"components-avatar-demo-type"},previewerProps:{title:"\u7C7B\u578B",filename:"components/avatar/demo/type.tsx",jsx:`import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
const App = () => (
  <>
    <Avatar icon={<UserOutlined />} />
    <Avatar>U</Avatar>
    <Avatar size={40}>USER</Avatar>
    <Avatar src="https://joeschmoe.io/api/v1/random" />
    <Avatar
      src={
        <Image
          src="https://joeschmoe.io/api/v1/random"
          style={{
            width: 32,
          }}
        />
      }
    />
    <Avatar
      style={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      U
    </Avatar>
    <Avatar
      style={{
        backgroundColor: '#87d068',
      }}
      icon={<UserOutlined />}
    />
  </>
);
export default App;
`,description:"<p>\u652F\u6301\u4E09\u79CD\u7C7B\u578B\uFF1A\u56FE\u7247\u3001Icon \u4EE5\u53CA\u5B57\u7B26\uFF0C\u5176\u4E2D Icon \u548C\u5B57\u7B26\u578B\u53EF\u4EE5\u81EA\u5B9A\u4E49\u56FE\u6807\u989C\u8272\u53CA\u80CC\u666F\u8272\u3002</p>",style:`#components-avatar-demo-type .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
.ant-row-rtl #components-avatar-demo-type .ant-avatar {
  margin-right: 0;
  margin-left: 16px;
}`}},{demo:{id:"components-avatar-demo-dynamic"},previewerProps:{title:"\u81EA\u52A8\u8C03\u6574\u5B57\u7B26\u5927\u5C0F",filename:"components/avatar/demo/dynamic.tsx",jsx:`import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const App = () => {
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);
  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  };
  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };
  return (
    <>
      <Avatar
        style={{
          backgroundColor: color,
          verticalAlign: 'middle',
        }}
        size="large"
        gap={gap}
      >
        {user}
      </Avatar>
      <Button
        size="small"
        style={{
          margin: '0 16px',
          verticalAlign: 'middle',
        }}
        onClick={changeUser}
      >
        ChangeUser
      </Button>
      <Button
        size="small"
        style={{
          verticalAlign: 'middle',
        }}
        onClick={changeGap}
      >
        changeGap
      </Button>
    </>
  );
};
export default App;
`,description:"<p>\u5BF9\u4E8E\u5B57\u7B26\u578B\u7684\u5934\u50CF\uFF0C\u5F53\u5B57\u7B26\u4E32\u8F83\u957F\u65F6\uFF0C\u5B57\u4F53\u5927\u5C0F\u53EF\u4EE5\u6839\u636E\u5934\u50CF\u5BBD\u5EA6\u81EA\u52A8\u8C03\u6574\u3002\u4E5F\u53EF\u4F7F\u7528 <code>gap</code> \u6765\u8BBE\u7F6E\u5B57\u7B26\u8DDD\u79BB\u5DE6\u53F3\u4E24\u4FA7\u8FB9\u754C\u5355\u4F4D\u50CF\u7D20\u3002</p>"}},{demo:{id:"components-avatar-demo-badge"},previewerProps:{title:"\u5E26\u5FBD\u6807\u7684\u5934\u50CF",filename:"components/avatar/demo/badge.tsx",jsx:`import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
const App = () => (
  <>
    <span className="avatar-item">
      <Badge count={1}>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </span>
    <span>
      <Badge dot>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </span>
  </>
);
export default App;
`,description:"<p>\u901A\u5E38\u7528\u4E8E\u6D88\u606F\u63D0\u793A\u3002</p>",style:`/* tile uploaded pictures */
.avatar-item {
  margin-right: 24px;
}

[class*='-col-rtl'] .avatar-item {
  margin-right: 0;
  margin-left: 24px;
}`}},{demo:{id:"components-avatar-demo-group"},previewerProps:{title:"Avatar.Group",filename:"components/avatar/demo/group.tsx",jsx:`import React from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
const App = () => (
  <>
    <Avatar.Group>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Avatar
        style={{
          backgroundColor: '#f56a00',
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff',
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      maxCount={2}
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Avatar
        style={{
          backgroundColor: '#f56a00',
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff',
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      maxCount={2}
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
      }}
    >
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Avatar
        style={{
          backgroundColor: '#f56a00',
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff',
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      maxCount={2}
      maxPopoverTrigger="click"
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        cursor: 'pointer',
      }}
    >
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar
        style={{
          backgroundColor: '#f56a00',
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1890ff',
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
  </>
);
export default App;
`,description:"<p>\u5934\u50CF\u7EC4\u5408\u5C55\u73B0\u3002</p>"}},{demo:{id:"components-avatar-demo-toggle-debug"},previewerProps:{debug:!0,title:"\u9690\u85CF\u60C5\u51B5\u4E0B\u8BA1\u7B97\u5B57\u7B26\u5BF9\u9F50",filename:"components/avatar/demo/toggle-debug.tsx",jsx:`import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
const App = () => {
  const [hide, setHide] = useState(true);
  const [size, setSize] = useState('large');
  const [scale, setScale] = useState(1);
  const toggle = () => {
    setHide(!hide);
  };
  const toggleSize = () => {
    const sizes = ['small', 'default', 'large'];
    let current = sizes.indexOf(size) + 1;
    if (current > 2) {
      current = 0;
    }
    setSize(sizes[current]);
  };
  const changeScale = () => {
    setScale(scale === 1 ? 2 : 1);
  };
  return (
    <>
      <Button onClick={toggle}>Toggle Avatar visibility</Button>
      <Button onClick={toggleSize}>Toggle Avatar size</Button>
      <Button onClick={changeScale}>Change Avatar scale</Button>
      <br />
      <br />
      <div
        style={{
          textAlign: 'center',
          transform: \`scale(\${scale})\`,
          marginTop: 24,
        }}
      >
        <Avatar
          size={size}
          style={{
            background: '#7265e6',
            display: hide ? 'none' : '',
          }}
        >
          Avatar
        </Avatar>
        <Avatar
          size={size}
          src="invalid"
          style={{
            background: '#00a2ae',
            display: hide ? 'none' : '',
          }}
        >
          Invalid
        </Avatar>
        <div
          style={{
            display: hide ? 'none' : '',
          }}
        >
          <Avatar
            size={size}
            style={{
              background: '#7265e6',
            }}
          >
            Avatar
          </Avatar>
          <Avatar
            size={size}
            src="invalid"
            style={{
              background: '#00a2ae',
            }}
          >
            Invalid
          </Avatar>
        </div>
      </div>
    </>
  );
};
export default App;
`,description:"<p>\u5207\u6362 Avatar \u663E\u793A\u7684\u65F6\u5019\uFF0C\u6587\u672C\u6837\u5F0F\u5E94\u8BE5\u5C45\u4E2D\u5E76\u6B63\u786E\u8C03\u6574\u5B57\u4F53\u5927\u5C0F\u3002</p>"}},{demo:{id:"components-avatar-demo-responsive"},previewerProps:{title:"\u54CD\u5E94\u5F0F\u5C3A\u5BF8",filename:"components/avatar/demo/responsive.tsx",jsx:`import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const App = () => (
  <Avatar
    size={{
      xs: 24,
      sm: 32,
      md: 40,
      lg: 64,
      xl: 80,
      xxl: 100,
    }}
    icon={<AntDesignOutlined />}
  />
);
export default App;
`,description:"<p>\u5934\u50CF\u5927\u5C0F\u53EF\u4EE5\u6839\u636E\u5C4F\u5E55\u5927\u5C0F\u81EA\u52A8\u8C03\u6574\u3002</p>"}},{demo:{id:"components-avatar-demo-fallback"},previewerProps:{debug:!0,title:"\u56FE\u7247\u4E0D\u5B58\u5728\u65F6",filename:"components/avatar/demo/fallback.tsx",jsx:`import React from 'react';
import { Avatar } from 'antd';
const App = () => (
  <>
    <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
      A
    </Avatar>
    <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
      ABC
    </Avatar>
  </>
);
export default App;
`,description:"<p>\u56FE\u7247\u4E0D\u5B58\u5728\u65F6\uFF0C\u5982\u679C <code>src</code> \u672C\u8EAB\u662F\u4E2A ReactElement\uFF0C\u4F1A\u5C1D\u8BD5\u56DE\u9000\u5230 <code>src</code>\uFF0C\u5426\u5219\u5C1D\u8BD5\u56DE\u9000\u5230 <code>icon</code>\uFF0C\u6700\u540E\u56DE\u9000\u5230\u663E\u793A <code>children</code>\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"avatar"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#avatar"},(0,n.tZ)("span",{className:"icon icon-link"})),"Avatar"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[4].value),(0,n.tZ)("th",null,t[5].value),(0,n.tZ)("th",null,t[6].value),(0,n.tZ)("th",null,t[7].value),(0,n.tZ)("th",null,t[8].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[9].value),(0,n.tZ)("td",null,t[10].value),(0,n.tZ)("td",null,t[11].value),(0,n.tZ)("td",null,t[12].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value),(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null,t[16].value),(0,n.tZ)("td",null,t[17].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[18].value),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,t[23].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[24].value),t[25].value,(0,n.tZ)("code",null,t[26].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[27].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null,t[29].value),(0,n.tZ)("td",null,t[30].value,(0,n.tZ)("code",null,t[31].value),t[32].value,(0,n.tZ)("code",null,t[33].value),t[34].value,(0,n.tZ)("code",null,t[35].value),t[36].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[37].value)),(0,n.tZ)("td",null,t[38].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[39].value),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null,t[43].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null,t[49].value),(0,n.tZ)("td",null,t[50].value,(0,n.tZ)("code",null,t[51].value),t[52].value,(0,n.tZ)("code",null,t[53].value)),(0,n.tZ)("td",null,t[54].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[55].value),(0,n.tZ)("td",null,t[56].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[57].value),t[58].value,(0,n.tZ)("code",null,t[59].value),t[60].value,(0,n.tZ)("code",null,t[61].value)),(0,n.tZ)("td",null,t[62].value),(0,n.tZ)("td",null,t[63].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[68].value,(0,n.tZ)("code",null,t[69].value),t[70].value,(0,n.tZ)("code",null,t[71].value),t[72].value,(0,n.tZ)("code",null,t[73].value),t[74].value,(0,n.tZ)("code",null,t[75].value))),(0,n.tZ)("h3",{id:"avatargroup-450"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#avatargroup-450"},(0,n.tZ)("span",{className:"icon icon-link"})),"Avatar.Group (4.5.0+)"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[76].value),(0,n.tZ)("th",null,t[77].value),(0,n.tZ)("th",null,t[78].value),(0,n.tZ)("th",null,t[79].value),(0,n.tZ)("th",null,t[80].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[81].value),(0,n.tZ)("td",null,t[82].value),(0,n.tZ)("td",null,t[83].value),(0,n.tZ)("td",null,t[84].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[85].value),(0,n.tZ)("td",null,t[86].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[87].value),t[88].value,(0,n.tZ)("code",null,t[89].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[90].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[91].value),(0,n.tZ)("td",null,t[92].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[93].value),t[94].value,(0,n.tZ)("code",null,t[95].value),t[96].value,(0,n.tZ)("code",null,t[97].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[98].value)),(0,n.tZ)("td",null,t[99].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[100].value),(0,n.tZ)("td",null,t[101].value),(0,n.tZ)("td",null,t[102].value),(0,n.tZ)("td",null,t[103].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[104].value),(0,n.tZ)("td",null,t[105].value),(0,n.tZ)("td",null,t[106].value,(0,n.tZ)("code",null,t[107].value),t[108].value,(0,n.tZ)("code",null,t[109].value),t[110].value,(0,n.tZ)("code",null,t[111].value),t[112].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[113].value)),(0,n.tZ)("td",null,t[114].value)))))))}a.default=u}}]);
