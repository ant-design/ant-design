"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[48],{68537:function(c,l,e){e.r(l);var m=e(2143),v=e(50250),_=e(59378),Z=e(78190),o=e(74775),i=e(5937),a=e(2068),h=e(74399),g=e(46004),x=e(35708),S=e(30138),f=e(56140),r=e(5388),P=e(49545),T=e(92169),C=e(13140),A=e(95127),D=e(74418),E=e(97119),s=e(28257),u=e(67294),t=e(13946);function d(){var p=(0,s.eL)(),n=p.texts;return(0,t.tZ)(s.dY,null,(0,t.tZ)(u.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,(0,t.tZ)("code",null,n[0].value),n[1].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("p",null,n[2].value),(0,t.tZ)("h3",{id:"usage-upgrade-after-4240"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usage-upgrade-after-4240"},(0,t.tZ)("span",{className:"icon icon-link"})),"Usage upgrade after 4.24.0")),(0,t.tZ)(a.Z,{message:"After version 4.24.0, we provide a simpler usage <Steps items={[...]} /> with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0."}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)(o.Z,{lang:"jsx"},n[3].value),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(r.Z,{items:[{demo:{id:"components-steps-demo-deprecated"},previewerProps:{title:"Basic (deprecated syntactic sugar)",filename:"components/steps/demo/deprecated.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const { Step } = Steps;
const description = 'This is a description.';
const App = () => (
  <Steps current={1}>
    <Step title="Finished" description={description} />
    <Step title="In Progress" description={description} subTitle="Left 00:00:08" />
    <Step title="Waiting" description={description} />
  </Steps>
);
export default App;
`,description:"<p>The most basic step bar.</p>"}},{demo:{id:"components-steps-demo-simple"},previewerProps:{title:"Basic",filename:"components/steps/demo/simple.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const description = 'This is a description.';
const App = () => (
  <Steps
    current={1}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);
export default App;
`,description:"<p>The most basic step bar.</p>"}},{demo:{id:"components-steps-demo-small-size"},previewerProps:{title:"Mini version",filename:"components/steps/demo/small-size.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const App = () => (
  <Steps
    size="small"
    current={1}
    items={[
      {
        title: 'Finished',
      },
      {
        title: 'In Progress',
      },
      {
        title: 'Waiting',
      },
    ]}
  />
);
export default App;
`,description:'<p>By setting like this: <code>&#x3C;Steps size="small"></code>, you can get a mini version.</p>'}},{demo:{id:"components-steps-demo-icon"},previewerProps:{title:"With icon",filename:"components/steps/demo/icon.tsx",jsx:`import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
const App = () => (
  <Steps
    items={[
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />,
      },
      {
        title: 'Verification',
        status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Pay',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
);
export default App;
`,description:"<p>You can use your own custom icons by setting the property <code>icon</code> for <code>items</code>.</p>"}},{demo:{id:"components-steps-demo-step-next"},previewerProps:{title:"Switch Step",filename:"components/steps/demo/step-next.tsx",jsx:`import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
const App = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default App;
`,description:"<p>Cooperate with the content and buttons, to represent the progress of a process.</p>",style:`.steps-content {
  min-height: 200px;
  margin-top: 16px;
  padding-top: 80px;
  text-align: center;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
}

.steps-action {
  margin-top: 24px;
}`}},{demo:{id:"components-steps-demo-vertical"},previewerProps:{title:"Vertical",filename:"components/steps/demo/vertical.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const description = 'This is a description.';
const App = () => (
  <Steps
    direction="vertical"
    current={1}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);
export default App;
`,description:"<p>A simple step bar in the vertical direction.</p>"}},{demo:{id:"components-steps-demo-vertical-small"},previewerProps:{title:"Vertical mini version",filename:"components/steps/demo/vertical-small.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const description = 'This is a description.';
const App = () => (
  <Steps
    direction="vertical"
    size="small"
    current={1}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);
export default App;
`,description:"<p>A simple mini version step bar in the vertical direction.</p>"}},{demo:{id:"components-steps-demo-error"},previewerProps:{title:"Error status",filename:"components/steps/demo/error.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const description = 'This is a description';
const App = () => (
  <Steps
    current={1}
    status="error"
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Process',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);
export default App;
`,description:"<p>By using <code>status</code> of <code>Steps</code>, you can specify the state for current step.</p>"}},{demo:{id:"components-steps-demo-progress-dot"},previewerProps:{title:"Dot Style",filename:"components/steps/demo/progress-dot.tsx",jsx:`import React from 'react';
import { Divider, Steps } from 'antd';
const App = () => (
  <>
    <Steps
      progressDot
      current={1}
      items={[
        {
          title: 'Finished',
          description: 'This is a description.',
        },
        {
          title: 'In Progress',
          description: 'This is a description.',
        },
        {
          title: 'Waiting',
          description: 'This is a description.',
        },
      ]}
    />
    <Divider />
    <Steps
      progressDot
      current={1}
      direction="vertical"
      items={[
        {
          title: 'Finished',
          description: 'This is a description. This is a description.',
        },
        {
          title: 'Finished',
          description: 'This is a description. This is a description.',
        },
        {
          title: 'In Progress',
          description: 'This is a description. This is a description.',
        },
        {
          title: 'Waiting',
          description: 'This is a description.',
        },
        {
          title: 'Waiting',
          description: 'This is a description.',
        },
      ]}
    />
  </>
);
export default App;
`,description:"<p>Steps with progress dot style.</p>"}},{demo:{id:"components-steps-demo-customized-progress-dot"},previewerProps:{title:"Customized Dot Style",filename:"components/steps/demo/customized-progress-dot.tsx",jsx:`import React from 'react';
import { Popover, Steps } from 'antd';
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
const description = 'You can hover on the dot.';
const App = () => (
  <Steps
    current={1}
    progressDot={customDot}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);
export default App;
`,description:"<p>You can customize the display for Steps with progress dot style.</p>"}},{demo:{id:"components-steps-demo-progress-dot-small"},previewerProps:{debug:!0,title:"Dot Style Size Small",filename:"components/steps/demo/progress-dot-small.tsx",jsx:`import React from 'react';
import { Divider, Steps } from 'antd';
const App = () => (
  <>
    <Steps
      progressDot
      current={1}
      size="small"
      items={[
        {
          title: 'Finished',
          description: 'This is a description.',
        },
        {
          title: 'In Progress',
          description: 'This is a description.',
        },
        {
          title: 'Waiting',
          description: 'This is a description.',
        },
      ]}
    />
    <Divider />
    <Steps
      progressDot
      current={1}
      direction="vertical"
      size="small"
      items={[
        {
          title: 'Finished',
          description: 'This is a description. This is a description.',
        },
        {
          title: 'Finished',
          description: 'This is a description. This is a description.',
        },
        {
          title: 'In Progress',
          description: 'This is a description. This is a description.',
        },
        {
          title: 'Waiting',
          description: 'This is a description.',
        },
        {
          title: 'Waiting',
          description: 'This is a description.',
        },
      ]}
    />
  </>
);
export default App;
`,description:"<p>Steps with progress dot style.</p>"}},{demo:{id:"components-steps-demo-clickable"},previewerProps:{title:"Clickable",filename:"components/steps/demo/clickable.tsx",jsx:`import React, { useState } from 'react';
import { Divider, Steps } from 'antd';
const App = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', current);
    setCurrent(value);
  };
  const description = 'This is a description.';
  return (
    <>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            description,
          },
          {
            title: 'Step 2',
            description,
          },
          {
            title: 'Step 3',
            description,
          },
        ]}
      />

      <Divider />

      <Steps
        current={current}
        onChange={onChange}
        direction="vertical"
        items={[
          {
            title: 'Step 1',
            description,
          },
          {
            title: 'Step 2',
            description,
          },
          {
            title: 'Step 3',
            description,
          },
        ]}
      />
    </>
  );
};
export default App;
`,description:"<p>Setting <code>onChange</code> makes Steps clickable.</p>"}},{demo:{id:"components-steps-demo-nav"},previewerProps:{title:"Navigation Steps",filename:"components/steps/demo/nav.tsx",jsx:`import React, { useState } from 'react';
import { Steps } from 'antd';
const App = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  return (
    <>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            title: 'Step 1',
            subTitle: '00:00:05',
            status: 'finish',
            description: 'This is a description.',
          },
          {
            title: 'Step 2',
            subTitle: '00:01:02',
            status: 'process',
            description: 'This is a description.',
          },
          {
            title: 'Step 3',
            subTitle: 'waiting for longlong time',
            status: 'wait',
            description: 'This is a description.',
          },
        ]}
      />
      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            status: 'finish',
            title: 'Step 1',
          },
          {
            status: 'process',
            title: 'Step 2',
          },
          {
            status: 'wait',
            title: 'Step 3',
          },
          {
            status: 'wait',
            title: 'Step 4',
          },
        ]}
      />
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            status: 'finish',
            title: 'finish 1',
          },
          {
            status: 'finish',
            title: 'finish 2',
          },
          {
            status: 'process',
            title: 'current process',
          },
          {
            status: 'wait',
            title: 'wait',
            disabled: true,
          },
        ]}
      />
    </>
  );
};
export default App;
`,description:"<p>Navigation steps.</p>",style:`[data-theme='compact'] .site-navigation-steps.ant-steps.ant-steps-navigation,
.site-navigation-steps.ant-steps.ant-steps-navigation {
  margin-bottom: 60px;
  box-shadow: 0px -1px 0 0 #e8e8e8 inset;
}`}},{demo:{id:"components-steps-demo-progress"},previewerProps:{title:"Steps with progress",filename:"components/steps/demo/progress.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const description = 'This is a description.';
const App = () => (
  <Steps
    current={1}
    percent={60}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        subTitle: 'Left 00:00:08',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);
export default App;
`,description:"<p>Steps with progress.</p>"}},{demo:{id:"components-steps-demo-label-placement"},previewerProps:{title:"Label Placement",filename:"components/steps/demo/label-placement.tsx",jsx:`import React from 'react';
import { Steps } from 'antd';
const description = 'This is a description.';
const items = [
  {
    title: 'Finished',
    description,
  },
  {
    title: 'In Progress',
    description,
  },
  {
    title: 'Waiting',
    description,
  },
];
const App = () => (
  <>
    <Steps current={1} labelPlacement="vertical" items={items} />
    <br />
    <Steps current={1} percent={60} labelPlacement="vertical" items={items} />
    <br />
    <Steps current={1} size="small" labelPlacement="vertical" items={items} />
  </>
);
export default App;
`,description:"<p>Set labelPlacement to <code>vertical</code>.</p>"}},{demo:{id:"components-steps-demo-progress-debug"},previewerProps:{debug:!0,title:"Progress Debug",filename:"components/steps/demo/progress-debug.tsx",jsx:`import React, { useState } from 'react';
import { Button, Steps, Space } from 'antd';
const App = () => {
  const [percent, setPercentage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [status, setStatus] = useState('process');
  const description = 'This is a description.';
  const items = [
    {
      title: 'Finished',
      description,
    },
    {
      title: 'In Progress',
      subTitle: 'Left 00:00:08',
      description,
    },
    {
      title: 'Waiting',
      description,
    },
  ];
  return (
    <>
      <Space.Compact block>
        <Button onClick={() => setPercentage(undefined)}>Percentage to undefined</Button>
        <Button onClick={() => setPercentage((prev) => ((prev ?? 0) + 10) % 100)}>
          Percentage +
        </Button>
        <Button onClick={() => setCurrent((prev) => (prev + 1) % 3)}>Current +</Button>
        <Button onClick={() => setStatus('wait')}>Status Wait</Button>
        <Button onClick={() => setStatus('process')}>Status Process</Button>
        <Button onClick={() => setStatus('finish')}>Status Finish</Button>
        <Button onClick={() => setStatus('error')}>Status Error</Button>
      </Space.Compact>
      <br />
      <Steps current={current} percent={percent} status={status} items={items} />
      <Steps current={current} percent={percent} status={status} size="small" items={items} />
      <Steps
        current={current}
        percent={percent}
        status={status}
        direction="vertical"
        items={items}
      />
      <Steps
        current={current}
        percent={percent}
        status={status}
        size="small"
        direction="vertical"
        items={items}
      />
    </>
  );
};
export default App;
`,description:"<p>Buggy!</p>"}},{demo:{id:"components-steps-demo-steps-in-steps"},previewerProps:{debug:!0,title:"Steps inside Steps",filename:"components/steps/demo/steps-in-steps.tsx",jsx:`import React, { useState } from 'react';
import { Card, Radio, Steps } from 'antd';
const App = () => {
  const [size, setSize] = useState('default');
  const description = 'This is a description.';
  const horizontalSteps = (
    <Card>
      <Steps
        size={size}
        items={[
          {
            title: 'Finished',
            description,
          },
          {
            title: 'In Progress',
            description,
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />
    </Card>
  );
  return (
    <>
      <Radio.Group
        style={{
          marginBottom: 16,
        }}
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <Radio value="small">Small</Radio>
        <Radio value="default">Default</Radio>
      </Radio.Group>
      <Steps
        size={size}
        direction="vertical"
        items={[
          {
            title: 'Finished',
            description: horizontalSteps,
          },
          {
            title: 'In Progress',
            description,
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />
    </>
  );
};
export default App;
`,description:"<p>Test style of Steps inside Steps.</p>"}},{demo:{id:"components-steps-demo-inline"},previewerProps:{title:"Inline Steps",filename:"components/steps/demo/inline.tsx",jsx:`import React from 'react';
import { Steps, List, Avatar } from 'antd';
const data = [
  {
    title: 'Ant Design Title 1',
    current: 0,
  },
  {
    title: 'Ant Design Title 2',
    current: 1,
    status: 'error',
  },
  {
    title: 'Ant Design Title 3',
    current: 2,
  },
  {
    title: 'Ant Design Title 4',
    current: 1,
  },
];
const items = [
  {
    title: 'Step 1',
    description: 'This is a Step 1.',
  },
  {
    title: 'Step 2',
    description: 'This is a Step 2.',
  },
  {
    title: 'Step 3',
    description: 'This is a Step 3.',
  },
];
const App = () => (
  <div>
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
          <Steps
            style={{
              marginTop: 8,
            }}
            type="inline"
            current={item.current}
            status={item.status}
            items={items}
          />
        </List.Item>
      )}
    />
  </div>
);
export default App;
`,description:"<p>Inline type steps, suitable for displaying the process and current state of the object in the list content scene.</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("h3",{id:"steps"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#steps"},(0,t.tZ)("span",{className:"icon icon-link"})),"Steps"),(0,t.tZ)("p",null,n[4].value),(0,t.tZ)(i.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value),(0,t.tZ)("th",null,n[8].value),(0,t.tZ)("th",null,n[9].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,n[11].value),(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value,(0,t.tZ)("code",null,n[16].value),n[17].value,(0,t.tZ)("code",null,n[18].value)),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value,(0,t.tZ)("code",null,n[23].value),n[24].value,(0,t.tZ)("code",null,n[25].value)),(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[27].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null,n[29].value),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,n[31].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null,n[33].value,(0,t.tZ)("code",null,n[34].value),n[35].value,(0,t.tZ)("code",null,n[36].value),n[37].value),(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[39].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value,(0,t.tZ)("code",null,n[42].value),n[43].value),(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null,n[46].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null,n[48].value,(0,t.tZ)("code",null,n[49].value)),(0,t.tZ)("td",null,n[50].value),(0,t.tZ)("td",null,n[51].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[52].value),(0,t.tZ)("td",null,n[53].value,(0,t.tZ)("code",null,n[54].value)),(0,t.tZ)("td",null,n[55].value),(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[57].value),(0,t.tZ)("td",null,n[58].value,(0,t.tZ)("code",null,n[59].value),n[60].value,(0,t.tZ)("code",null,n[61].value),n[62].value),(0,t.tZ)("td",null,n[63].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[64].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[65].value),(0,t.tZ)("td",null,n[66].value,(0,t.tZ)("code",null,n[67].value),n[68].value,(0,t.tZ)("code",null,n[69].value),n[70].value,(0,t.tZ)("code",null,n[71].value),n[72].value,(0,t.tZ)("code",null,n[73].value)),(0,t.tZ)("td",null,n[74].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[75].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[76].value),(0,t.tZ)("td",null,n[77].value,(0,t.tZ)("code",null,n[78].value),n[79].value,(0,t.tZ)("code",null,n[80].value),n[81].value,(0,t.tZ)("code",null,n[82].value)),(0,t.tZ)("td",null,n[83].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[84].value)),(0,t.tZ)("td",null,n[85].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[86].value),(0,t.tZ)("td",null,n[87].value),(0,t.tZ)("td",null,n[88].value),(0,t.tZ)("td",null,n[89].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null,(0,t.tZ)(s.rU,{to:"#StepItem"},n[92].value)),(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null,n[94].value)))),(0,t.tZ)("h3",{id:"typeinline"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typeinline"},(0,t.tZ)("span",{className:"icon icon-link"})),(0,t.tZ)("code",null,n[95].value)),(0,t.tZ)(i.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[96].value),(0,t.tZ)("th",null,n[97].value),(0,t.tZ)("th",null,n[98].value),(0,t.tZ)("th",null,n[99].value),(0,t.tZ)("th",null,n[100].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[101].value),(0,t.tZ)("td",null,n[102].value),(0,t.tZ)("td",null,n[103].value),(0,t.tZ)("td",null,n[104].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[105].value),(0,t.tZ)("td",null,n[106].value,(0,t.tZ)("code",null,n[107].value),n[108].value,(0,t.tZ)("code",null,n[109].value)),(0,t.tZ)("td",null,n[110].value),(0,t.tZ)("td",null,n[111].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[112].value),(0,t.tZ)("td",null,n[113].value),(0,t.tZ)("td",null,n[114].value),(0,t.tZ)("td",null,n[115].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[116].value),(0,t.tZ)("td",null,n[117].value,(0,t.tZ)("code",null,n[118].value),n[119].value,(0,t.tZ)("code",null,n[120].value),n[121].value,(0,t.tZ)("code",null,n[122].value),n[123].value,(0,t.tZ)("code",null,n[124].value)),(0,t.tZ)("td",null,n[125].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[126].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[127].value),(0,t.tZ)("td",null,n[128].value),(0,t.tZ)("td",null,n[129].value),(0,t.tZ)("td",null,n[130].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[131].value),(0,t.tZ)("td",null,n[132].value,(0,t.tZ)("code",null,n[133].value),n[134].value,(0,t.tZ)("code",null,n[135].value)),(0,t.tZ)("td",null,(0,t.tZ)(s.rU,{to:"#StepItem"},n[136].value)),(0,t.tZ)("td",null,n[137].value),(0,t.tZ)("td",null,n[138].value)))),(0,t.tZ)("h3",{id:"stepitem"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#stepitem"},(0,t.tZ)("span",{className:"icon icon-link"})),"StepItem"),(0,t.tZ)("p",null,n[139].value),(0,t.tZ)(i.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[140].value),(0,t.tZ)("th",null,n[141].value),(0,t.tZ)("th",null,n[142].value),(0,t.tZ)("th",null,n[143].value),(0,t.tZ)("th",null,n[144].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[145].value),(0,t.tZ)("td",null,n[146].value),(0,t.tZ)("td",null,n[147].value),(0,t.tZ)("td",null,n[148].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[149].value),(0,t.tZ)("td",null,n[150].value),(0,t.tZ)("td",null,n[151].value),(0,t.tZ)("td",null,n[152].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[153].value),(0,t.tZ)("td",null,n[154].value),(0,t.tZ)("td",null,n[155].value),(0,t.tZ)("td",null,n[156].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[157].value),(0,t.tZ)("td",null,n[158].value,(0,t.tZ)("code",null,n[159].value),n[160].value,(0,t.tZ)("code",null,n[161].value),n[162].value,(0,t.tZ)("code",null,n[163].value),n[164].value,(0,t.tZ)("code",null,n[165].value),n[166].value,(0,t.tZ)("code",null,n[167].value),n[168].value,(0,t.tZ)("code",null,n[169].value)),(0,t.tZ)("td",null,n[170].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[171].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[172].value),(0,t.tZ)("td",null,n[173].value),(0,t.tZ)("td",null,n[174].value),(0,t.tZ)("td",null,n[175].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[176].value),(0,t.tZ)("td",null,n[177].value),(0,t.tZ)("td",null,n[178].value),(0,t.tZ)("td",null,n[179].value),(0,t.tZ)("td",null)))))))}l.default=d}}]);
