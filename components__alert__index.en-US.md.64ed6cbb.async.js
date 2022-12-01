"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7743],{88652:function(d,o,t){t.r(o);var u=t(2143),p=t(50250),m=t(59378),_=t(78190),x=t(74775),r=t(5937),v=t(2068),Z=t(74399),g=t(46004),h=t(35708),f=t(30138),A=t(56140),s=t(5388),E=t(49545),D=t(92169),y=t(13140),I=t(95127),T=t(74418),P=t(97119),l=t(28257),a=t(67294),e=t(13946);function i(){var c=(0,l.eL)(),n=c.texts;return(0,e.tZ)(l.dY,null,(0,e.tZ)(a.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[1].value),(0,e.tZ)("li",null,n[2].value)),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(s.Z,{items:[{demo:{id:"components-alert-demo-basic"},previewerProps:{title:"Basic",filename:"components/alert/demo/basic.tsx",jsx:`import React from 'react';
import { Alert } from 'antd';
const App = () => <Alert message="Success Text" type="success" />;
export default App;
`,description:"<p>The simplest usage for short messages.</p>"}},{demo:{id:"components-alert-demo-style"},previewerProps:{title:"More types",filename:"components/alert/demo/style.tsx",jsx:`import React from 'react';
import { Alert, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Success Text" type="success" />
    <Alert message="Info Text" type="info" />
    <Alert message="Warning Text" type="warning" />
    <Alert message="Error Text" type="error" />
  </Space>
);
export default App;
`,description:"<p>There are 4 types of Alert: <code>success</code>, <code>info</code>, <code>warning</code>, <code>error</code>.</p>"}},{demo:{id:"components-alert-demo-closable"},previewerProps:{title:"Closable",filename:"components/alert/demo/closable.tsx",jsx:`import React from 'react';
import { Alert, Space } from 'antd';
const onClose = (e) => {
  console.log(e, 'I was closed.');
};
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
      type="warning"
      closable
      onClose={onClose}
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable
      onClose={onClose}
    />
  </Space>
);
export default App;
`,description:"<p>To show close button.</p>"}},{demo:{id:"components-alert-demo-description"},previewerProps:{title:"Description",filename:"components/alert/demo/description.tsx",jsx:`import React from 'react';
import { Alert, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      message="Success Text"
      description="Success Description Success Description Success Description"
      type="success"
    />
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <Alert
      message="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </Space>
);
export default App;
`,description:"<p>Additional description for alert message.</p>"}},{demo:{id:"components-alert-demo-icon"},previewerProps:{title:"Icon",filename:"components/alert/demo/icon.tsx",jsx:`import React from 'react';
import { Alert, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon closable />
    <Alert message="Error" type="error" showIcon />
    <Alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <Alert
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <Alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
      closable
    />
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </Space>
);
export default App;
`,description:"<p>A relevant icon will make information clearer and more friendly.</p>"}},{demo:{id:"components-alert-demo-close-text"},previewerProps:{title:"Customized Close Text",filename:"components/alert/demo/close-text.tsx",jsx:`import React from 'react';
import { Alert } from 'antd';
const App = () => <Alert message="Info Text" type="info" closeText="Close Now" />;
export default App;
`,description:"<p>Replace the default icon with customized text.</p>"}},{demo:{id:"components-alert-demo-banner"},previewerProps:{iframe:"250",title:"Banner",filename:"components/alert/demo/banner.tsx",jsx:`import React from 'react';
import { Alert, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Warning text" banner />
    <Alert
      message="Very long warning text warning text text text text text text text"
      banner
      closable
    />
    <Alert showIcon={false} message="Warning text without icon" banner />
    <Alert type="error" message="Error text" banner />
  </Space>
);
export default App;
`,description:"<p>Display Alert as a banner at top of page.</p>"}},{demo:{id:"components-alert-demo-loop-banner"},previewerProps:{title:"Loop Banner",filename:"components/alert/demo/loop-banner.tsx",jsx:`import React from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
const App = () => (
  <Alert
    banner
    message={
      <Marquee pauseOnHover gradient={false}>
        I can be a React component, multiple React components, or just some text.
      </Marquee>
    }
  />
);
export default App;
`,description:'<p>Show a loop banner by using with <a href="https://npmjs.com/package/react-text-loop-next">react-text-loop-next</a> or <a href="https://npmjs.com/package/react-fast-marquee">react-fast-marquee</a>.</p>'}},{demo:{id:"components-alert-demo-smooth-closed"},previewerProps:{title:"Smoothly Unmount",filename:"components/alert/demo/smooth-closed.tsx",jsx:`import React, { useState } from 'react';
import { Alert, Switch, Space } from 'antd';
const App = () => {
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      {visible && (
        <Alert message="Alert Message Text" type="success" closable afterClose={handleClose} />
      )}
      <p>click the close button to see the effect</p>
      <Switch onChange={setVisible} checked={visible} disabled={visible} />
    </Space>
  );
};
export default App;
`,description:"<p>Smoothly unmount Alert upon close.</p>"}},{demo:{id:"components-alert-demo-error-boundary"},previewerProps:{title:"ErrorBoundary",filename:"components/alert/demo/error-boundary.tsx",jsx:`import React, { useState } from 'react';
import { Alert, Button } from 'antd';
const { ErrorBoundary } = Alert;
const ThrowError = () => {
  const [error, setError] = useState();
  const onClick = () => {
    setError(new Error('An Uncaught Error'));
  };
  if (error) {
    throw error;
  }
  return (
    <Button danger onClick={onClick}>
      Click me to throw a error
    </Button>
  );
};
const App = () => (
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>
);
export default App;
`,description:'<p>ErrorBoundary Component for making error handling easier in <a href="https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html">React</a>.</p>'}},{demo:{id:"components-alert-demo-custom-icon"},previewerProps:{debug:!0,title:"Custom Icon",filename:"components/alert/demo/custom-icon.tsx",jsx:`import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Alert, Space } from 'antd';
const icon = <SmileOutlined />;
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert icon={icon} message="showIcon = false" type="success" />
    <Alert icon={icon} message="Success Tips" type="success" showIcon />
    <Alert icon={icon} message="Informational Notes" type="info" showIcon />
    <Alert icon={icon} message="Warning" type="warning" showIcon />
    <Alert icon={icon} message="Error" type="error" showIcon />
    <Alert
      icon={icon}
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      showIcon
    />
    <Alert
      icon={icon}
      message="Informational Notes"
      description="Additional description and informations about copywriting."
      type="info"
      showIcon
    />
    <Alert
      icon={icon}
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
    />
    <Alert
      icon={icon}
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </Space>
);
export default App;
`,description:"<p>A relevant icon makes information clearer and more friendly.</p>"}},{demo:{id:"components-alert-demo-action"},previewerProps:{title:"Custom action",filename:"components/alert/demo/action.tsx",jsx:`import React from 'react';
import { Alert, Button, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      message="Success Tips"
      type="success"
      showIcon
      action={
        <Button size="small" type="text">
          UNDO
        </Button>
      }
      closable
    />
    <Alert
      message="Error Text"
      showIcon
      description="Error Description Error Description Error Description Error Description"
      type="error"
      action={
        <Button size="small" danger>
          Detail
        </Button>
      }
    />
    <Alert
      message="Warning Text"
      type="warning"
      action={
        <Space>
          <Button size="small" type="ghost">
            Done
          </Button>
        </Space>
      }
      closable
    />
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      action={
        <Space direction="vertical">
          <Button size="small" type="primary">
            Accept
          </Button>
          <Button size="small" danger type="ghost">
            Decline
          </Button>
        </Space>
      }
      closable
    />
  </Space>
);
export default App;
`,description:"<p>Custom action.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)(r.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[3].value),(0,e.tZ)("th",null,n[4].value),(0,e.tZ)("th",null,n[5].value),(0,e.tZ)("th",null,n[6].value),(0,e.tZ)("th",null,n[7].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[8].value),(0,e.tZ)("td",null,n[9].value),(0,e.tZ)("td",null,n[10].value),(0,e.tZ)("td",null,n[11].value),(0,e.tZ)("td",null,n[12].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[13].value),(0,e.tZ)("td",null,n[14].value),(0,e.tZ)("td",null,n[15].value),(0,e.tZ)("td",null,n[16].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[17].value),(0,e.tZ)("td",null,n[18].value),(0,e.tZ)("td",null,n[19].value),(0,e.tZ)("td",null,n[20].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[21].value),(0,e.tZ)("td",null,n[22].value),(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null,n[26].value),(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,n[28].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null,n[30].value),(0,e.tZ)("td",null,n[31].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[32].value)),(0,e.tZ)("td",null,n[33].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[34].value),(0,e.tZ)("td",null,n[35].value),(0,e.tZ)("td",null,n[36].value),(0,e.tZ)("td",null,n[37].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[38].value),(0,e.tZ)("td",null,n[39].value,(0,e.tZ)("code",null,n[40].value),n[41].value),(0,e.tZ)("td",null,n[42].value),(0,e.tZ)("td",null,n[43].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[44].value),(0,e.tZ)("td",null,n[45].value),(0,e.tZ)("td",null,n[46].value),(0,e.tZ)("td",null,n[47].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[48].value),(0,e.tZ)("td",null,n[49].value),(0,e.tZ)("td",null,n[50].value),(0,e.tZ)("td",null,n[51].value,(0,e.tZ)("code",null,n[52].value),n[53].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[54].value),(0,e.tZ)("td",null,n[55].value,(0,e.tZ)("code",null,n[56].value),n[57].value,(0,e.tZ)("code",null,n[58].value),n[59].value,(0,e.tZ)("code",null,n[60].value),n[61].value,(0,e.tZ)("code",null,n[62].value)),(0,e.tZ)("td",null,n[63].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[64].value),n[65].value,(0,e.tZ)("code",null,n[66].value),n[67].value,(0,e.tZ)("code",null,n[68].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[69].value),(0,e.tZ)("td",null,n[70].value),(0,e.tZ)("td",null,n[71].value),(0,e.tZ)("td",null,n[72].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"alerterrorboundary"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#alerterrorboundary"},(0,e.tZ)("span",{className:"icon icon-link"})),"Alert.ErrorBoundary"),(0,e.tZ)(r.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[73].value),(0,e.tZ)("th",null,n[74].value),(0,e.tZ)("th",null,n[75].value),(0,e.tZ)("th",null,n[76].value),(0,e.tZ)("th",null,n[77].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[78].value),(0,e.tZ)("td",null,n[79].value),(0,e.tZ)("td",null,n[80].value),(0,e.tZ)("td",null,n[81].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[82].value),(0,e.tZ)("td",null,n[83].value),(0,e.tZ)("td",null,n[84].value),(0,e.tZ)("td",null,n[85].value),(0,e.tZ)("td",null)))))))}o.default=i}}]);
