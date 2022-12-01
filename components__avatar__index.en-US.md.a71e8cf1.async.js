"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[5129],{70267:function(d,a,e){e.r(a);var v=e(2143),c=e(50250),_=e(59378),p=e(78190),m=e(74775),l=e(5937),Z=e(2068),g=e(74399),A=e(46004),x=e(35708),h=e(30138),f=e(56140),r=e(5388),U=e(49545),O=e(92169),C=e(13140),E=e(95127),b=e(74418),P=e(97119),o=e(28257),s=e(67294),n=e(13946);function i(){var u=(0,o.eL)(),t=u.texts;return(0,n.tZ)(o.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value,(0,n.tZ)("code",null,t[1].value),t[2].value),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(r.Z,{items:[{demo:{id:"components-avatar-demo-basic"},previewerProps:{title:"Basic",filename:"components/avatar/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>Three sizes and two shapes are available.</p>",style:`#components-avatar-demo-basic .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
.ant-row-rtl #components-avatar-demo-basic .ant-avatar {
  margin-right: 0;
  margin-left: 16px;
}`}},{demo:{id:"components-avatar-demo-type"},previewerProps:{title:"Type",filename:"components/avatar/demo/type.tsx",jsx:`import React from 'react';
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
`,description:"<p>Image, Icon and letter are supported, and the latter two kinds of avatar can have custom colors and background colors.</p>",style:`#components-avatar-demo-type .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
.ant-row-rtl #components-avatar-demo-type .ant-avatar {
  margin-right: 0;
  margin-left: 16px;
}`}},{demo:{id:"components-avatar-demo-dynamic"},previewerProps:{title:"Autoset Font Size",filename:"components/avatar/demo/dynamic.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>For letter type Avatar, when the letters are too long to display, the font size can be automatically adjusted according to the width of the Avatar. You can also use <code>gap</code> to set the unit distance between left and right sides.</p>"}},{demo:{id:"components-avatar-demo-badge"},previewerProps:{title:"With Badge",filename:"components/avatar/demo/badge.tsx",jsx:`import React from 'react';
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
`,description:"<p>Usually used for reminders and notifications.</p>",style:`/* tile uploaded pictures */
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
`,description:"<p>Avatar group display.</p>"}},{demo:{id:"components-avatar-demo-toggle-debug"},previewerProps:{debug:!0,title:"Calculate text style when hiding",filename:"components/avatar/demo/toggle-debug.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Text inside Avatar should be set a proper font size when toggle it's visibility.</p>"}},{demo:{id:"components-avatar-demo-responsive"},previewerProps:{title:"Responsive Size",filename:"components/avatar/demo/responsive.tsx",jsx:`import React from 'react';
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
`,description:"<p>Avatar size can be automatically adjusted based on the screen size.</p>"}},{demo:{id:"components-avatar-demo-fallback"},previewerProps:{debug:!0,title:"Fallback",filename:"components/avatar/demo/fallback.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u56FE\u7247\u4E0D\u5B58\u5728\u65F6\uFF0C\u5982\u679C <code>src</code> \u672C\u8EAB\u662F\u4E2A ReactElement\uFF0C\u4F1A\u5C1D\u8BD5\u56DE\u9000\u5230 <code>src</code>\uFF0C\u5426\u5219\u5C1D\u8BD5\u56DE\u9000\u5230 <code>icon</code>\uFF0C\u6700\u540E\u56DE\u9000\u5230\u663E\u793A <code>children</code>\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"avatar"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#avatar"},(0,n.tZ)("span",{className:"icon icon-link"})),"Avatar"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[3].value),(0,n.tZ)("th",null,t[4].value),(0,n.tZ)("th",null,t[5].value),(0,n.tZ)("th",null,t[6].value),(0,n.tZ)("th",null,t[7].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[8].value),(0,n.tZ)("td",null,t[9].value),(0,n.tZ)("td",null,t[10].value),(0,n.tZ)("td",null,t[11].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[12].value),(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value),(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null,t[16].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[17].value),(0,n.tZ)("td",null,t[18].value),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[23].value),t[24].value,(0,n.tZ)("code",null,t[25].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[26].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[27].value),(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null,t[29].value,(0,n.tZ)("code",null,t[30].value),t[31].value,(0,n.tZ)("code",null,t[32].value),t[33].value,(0,n.tZ)("code",null,t[34].value),t[35].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[36].value)),(0,n.tZ)("td",null,t[37].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[38].value),(0,n.tZ)("td",null,t[39].value),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null,t[42].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null,t[49].value,(0,n.tZ)("code",null,t[50].value),t[51].value,(0,n.tZ)("code",null,t[52].value)),(0,n.tZ)("td",null,t[53].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[54].value),(0,n.tZ)("td",null,t[55].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[56].value),t[57].value,(0,n.tZ)("code",null,t[58].value),t[59].value,(0,n.tZ)("code",null,t[60].value)),(0,n.tZ)("td",null,t[61].value),(0,n.tZ)("td",null,t[62].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[63].value),(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[67].value,(0,n.tZ)("code",null,t[68].value),t[69].value,(0,n.tZ)("code",null,t[70].value),t[71].value,(0,n.tZ)("code",null,t[72].value),t[73].value,(0,n.tZ)("code",null,t[74].value))),(0,n.tZ)("h3",{id:"avatargroup-450"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#avatargroup-450"},(0,n.tZ)("span",{className:"icon icon-link"})),"Avatar.Group (4.5.0+)"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[75].value),(0,n.tZ)("th",null,t[76].value),(0,n.tZ)("th",null,t[77].value),(0,n.tZ)("th",null,t[78].value),(0,n.tZ)("th",null,t[79].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[80].value),(0,n.tZ)("td",null,t[81].value),(0,n.tZ)("td",null,t[82].value),(0,n.tZ)("td",null,t[83].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[84].value),(0,n.tZ)("td",null,t[85].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[86].value),t[87].value,(0,n.tZ)("code",null,t[88].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[89].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[90].value),(0,n.tZ)("td",null,t[91].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[92].value),t[93].value,(0,n.tZ)("code",null,t[94].value),t[95].value,(0,n.tZ)("code",null,t[96].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[97].value)),(0,n.tZ)("td",null,t[98].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[99].value),(0,n.tZ)("td",null,t[100].value),(0,n.tZ)("td",null,t[101].value),(0,n.tZ)("td",null,t[102].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[103].value),(0,n.tZ)("td",null,t[104].value),(0,n.tZ)("td",null,t[105].value,(0,n.tZ)("code",null,t[106].value),t[107].value,(0,n.tZ)("code",null,t[108].value),t[109].value,(0,n.tZ)("code",null,t[110].value),t[111].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[112].value)),(0,n.tZ)("td",null,t[113].value)))))))}a.default=i}}]);
