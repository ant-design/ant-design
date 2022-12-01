"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6518],{41603:function(c,a,n){n.r(a);var m=n(2143),_=n(50250),p=n(59378),Z=n(78190),o=n(74775),l=n(5937),v=n(2068),g=n(74399),x=n(46004),h=n(35708),f=n(30138),P=n(56140),u=n(5388),E=n(49545),A=n(92169),D=n(13140),M=n(95127),y=n(74418),B=n(97119),s=n(28257),i=n(67294),e=n(13946);function d(){var r=(0,s.eL)(),t=r.texts;return(0,e.tZ)(s.dY,null,(0,e.tZ)(i.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[1].value),(0,e.tZ)("li",null,t[2].value)),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(u.Z,{items:[{demo:{id:"components-message-demo-hooks"},previewerProps:{title:"Hooks usage (recommended)",filename:"components/message/demo/hooks.tsx",jsx:`import React from 'react';
import { Button, message } from 'antd';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={info}>
        Display normal message
      </Button>
    </>
  );
};
export default App;
`,description:"<p>Use <code>message.useMessage</code> to get <code>contextHolder</code> with context accessible issue. Please note that, we recommend to use top level registration instead of <code>message</code> static method, because static method cannot consume context, and ConfigProvider data will not work.</p>"}},{demo:{id:"components-message-demo-other"},previewerProps:{title:"Other types of message",filename:"components/message/demo/other.tsx",jsx:`import React from 'react';
import { Button, message, Space } from 'antd';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };
  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </Space>
    </>
  );
};
export default App;
`,description:"<p>Messages of success, error and warning types.</p>"}},{demo:{id:"components-message-demo-duration"},previewerProps:{title:"Customize duration",filename:"components/message/demo/duration.tsx",jsx:`import React from 'react';
import { Button, message } from 'antd';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a prompt message for success, and it will disappear in 10 seconds',
      duration: 10,
    });
  };
  return (
    <>
      {contextHolder}
      <Button onClick={success}>Customized display duration</Button>
    </>
  );
};
export default App;
`,description:"<p>Customize message display duration from default <code>3s</code> to <code>10s</code>.</p>"}},{demo:{id:"components-message-demo-loading"},previewerProps:{title:"Message with loading indicator",filename:"components/message/demo/loading.tsx",jsx:`import React from 'react';
import { Button, message } from 'antd';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'loading',
      content: 'Action in progress..',
      duration: 0,
    });
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 2500);
  };
  return (
    <>
      {contextHolder}
      <Button onClick={success}>Display a loading indicator</Button>
    </>
  );
};
export default App;
`,description:"<p>Display a global loading indicator, which is dismissed by itself asynchronously.</p>"}},{demo:{id:"components-message-demo-thenable"},previewerProps:{title:"Promise interface",filename:"components/message/demo/thenable.tsx",jsx:`import React from 'react';
import { Button, message } from 'antd';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Action in progress..',
        duration: 2.5,
      })
      .then(() => message.success('Loading finished', 2.5))
      .then(() => message.info('Loading finished', 2.5));
  };
  return (
    <>
      {contextHolder}
      <Button onClick={success}>Display sequential messages</Button>
    </>
  );
};
export default App;
`,description:"<p><code>message</code> provides a promise interface for <code>onClose</code>. The above example will display a new message when the old message is about to close.</p>"}},{demo:{id:"components-message-demo-custom-style"},previewerProps:{title:"Customized style",filename:"components/message/demo/custom-style.tsx",jsx:`import React from 'react';
import { Button, message } from 'antd';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a prompt message with custom className and style',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  return (
    <>
      {contextHolder}
      <Button onClick={success}>Customized style</Button>
    </>
  );
};
export default App;
`,description:"<p>The <code>style</code> and <code>className</code> are available to customize Message.</p>"}},{demo:{id:"components-message-demo-update"},previewerProps:{title:"Update Message Content",filename:"components/message/demo/update.tsx",jsx:`import React from 'react';
import { Button, message } from 'antd';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
    }, 1000);
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openMessage}>
        Open the message box
      </Button>
    </>
  );
};
export default App;
`,description:"<p>Update message content with unique <code>key</code>.</p>"}},{demo:{id:"components-message-demo-info"},previewerProps:{title:"Normal prompt",filename:"components/message/demo/info.tsx",jsx:`import React from 'react';
import { Button, message } from 'antd';
const info = () => {
  message.info('This is a normal message');
};
const App = () => (
  <Button type="primary" onClick={info}>
    Display normal message
  </Button>
);
export default App;
`,description:"<p>Normal message for information.</p>"}},{demo:{id:"components-message-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/message/demo/render-panel.tsx",jsx:`import React from 'react';
import { message } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = message;
export default () => <InternalPanel content="Hello World!" type="error" />;
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("p",null,t[3].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[4].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[5].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[6].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[7].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[8].value))),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[9].value),(0,e.tZ)("th",null,t[10].value),(0,e.tZ)("th",null,t[11].value),(0,e.tZ)("th",null,t[12].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[13].value),(0,e.tZ)("td",null,t[14].value),(0,e.tZ)("td",null,t[15].value),(0,e.tZ)("td",null,t[16].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[17].value),(0,e.tZ)("td",null,t[18].value),(0,e.tZ)("td",null,t[19].value),(0,e.tZ)("td",null,t[20].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[21].value),(0,e.tZ)("td",null,t[22].value),(0,e.tZ)("td",null,t[23].value),(0,e.tZ)("td",null,t[24].value)))),(0,e.tZ)("p",null,(0,e.tZ)("code",null,t[25].value),t[26].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[27].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[28].value))),(0,e.tZ)("p",null,t[29].value,(0,e.tZ)("code",null,t[30].value),t[31].value,(0,e.tZ)("code",null,t[32].value),t[33].value,(0,e.tZ)("code",null,t[34].value),t[35].value),(0,e.tZ)("p",null,t[36].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[37].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[38].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[39].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[40].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[41].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[42].value))),(0,e.tZ)("p",null,t[43].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[44].value),(0,e.tZ)("th",null,t[45].value),(0,e.tZ)("th",null,t[46].value),(0,e.tZ)("th",null,t[47].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[48].value),(0,e.tZ)("td",null,t[49].value),(0,e.tZ)("td",null,t[50].value),(0,e.tZ)("td",null,t[51].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[52].value),(0,e.tZ)("td",null,t[53].value),(0,e.tZ)("td",null,t[54].value),(0,e.tZ)("td",null,t[55].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[56].value),(0,e.tZ)("td",null,t[57].value),(0,e.tZ)("td",null,t[58].value),(0,e.tZ)("td",null,t[59].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[60].value),(0,e.tZ)("td",null,t[61].value),(0,e.tZ)("td",null,t[62].value),(0,e.tZ)("td",null,t[63].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[64].value),(0,e.tZ)("td",null,t[65].value),(0,e.tZ)("td",null,t[66].value),(0,e.tZ)("td",null,t[67].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[68].value),(0,e.tZ)("td",null,t[69].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794"},t[70].value)),(0,e.tZ)("td",null,t[71].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[72].value),(0,e.tZ)("td",null,t[73].value),(0,e.tZ)("td",null,t[74].value),(0,e.tZ)("td",null,t[75].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[76].value),(0,e.tZ)("td",null,t[77].value),(0,e.tZ)("td",null,t[78].value),(0,e.tZ)("td",null,t[79].value)))),(0,e.tZ)("h3",{id:"global-static-methods"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#global-static-methods"},(0,e.tZ)("span",{className:"icon icon-link"})),"Global static methods"),(0,e.tZ)("p",null,t[80].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[81].value)),(0,e.tZ)("li",null,(0,e.tZ)("code",null,t[82].value))),(0,e.tZ)("blockquote",null,(0,e.tZ)("p",null,t[83].value,(0,e.tZ)("code",null,t[84].value),t[85].value)),(0,e.tZ)("h4",{id:"messageconfig"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#messageconfig"},(0,e.tZ)("span",{className:"icon icon-link"})),"message.config"),(0,e.tZ)("blockquote",null,(0,e.tZ)("p",null,t[86].value,(0,e.tZ)("code",null,t[87].value),t[88].value),(0,e.tZ)("p",null,t[89].value)),(0,e.tZ)(o.Z,{lang:"js"},t[90].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[91].value),(0,e.tZ)("th",null,t[92].value),(0,e.tZ)("th",null,t[93].value),(0,e.tZ)("th",null,t[94].value),(0,e.tZ)("th",null,t[95].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[96].value),(0,e.tZ)("td",null,t[97].value),(0,e.tZ)("td",null,t[98].value),(0,e.tZ)("td",null,t[99].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[100].value),(0,e.tZ)("td",null,t[101].value),(0,e.tZ)("td",null,t[102].value),(0,e.tZ)("td",null,t[103].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[104].value),(0,e.tZ)("td",null,t[105].value),(0,e.tZ)("td",null,t[106].value),(0,e.tZ)("td",null,t[107].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[108].value),(0,e.tZ)("td",null,t[109].value),(0,e.tZ)("td",null,t[110].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[111].value)),(0,e.tZ)("td",null,t[112].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[113].value),(0,e.tZ)("td",null,t[114].value),(0,e.tZ)("td",null,t[115].value),(0,e.tZ)("td",null,t[116].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[117].value),(0,e.tZ)("td",null,t[118].value),(0,e.tZ)("td",null,t[119].value),(0,e.tZ)("td",null,t[120].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h2",{id:"faq"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,e.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,e.tZ)("h3",{id:"why-i-can-not-access-context-redux-configprovider-localeprefixclstheme-in-message"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-i-can-not-access-context-redux-configprovider-localeprefixclstheme-in-message"},(0,e.tZ)("span",{className:"icon icon-link"})),"Why I can not access context, redux, ConfigProvider ",(0,e.tZ)("code",null,t[121].value)," in message?"),(0,e.tZ)("p",null,t[122].value,(0,e.tZ)("code",null,t[123].value),t[124].value),(0,e.tZ)("p",null,t[125].value,(0,e.tZ)("code",null,t[126].value),t[127].value,(0,e.tZ)("code",null,t[128].value),t[129].value,(0,e.tZ)("code",null,t[130].value),t[131].value),(0,e.tZ)(o.Z,{lang:"tsx"},t[132].value),(0,e.tZ)("p",null,(0,e.tZ)("strong",null,t[133].value),t[134].value,(0,e.tZ)("code",null,t[135].value),t[136].value),(0,e.tZ)("h3",{id:"how-to-set-static-methods-prefixcls-"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-set-static-methods-prefixcls-"},(0,e.tZ)("span",{className:"icon icon-link"})),"How to set static methods prefixCls \uFF1F"),(0,e.tZ)("p",null,t[137].value,(0,e.tZ)(s.rU,{to:"/components/config-provider/#ConfigProvider.config()-4.13.0+"},(0,e.tZ)("code",null,t[138].value))))))}a.default=d}}]);
