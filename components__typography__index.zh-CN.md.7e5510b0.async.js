"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6937],{50654:function(p,i,e){e.r(i);var c=e(2143),Z=e(50250),v=e(59378),h=e(78190),u=e(74775),a=e(5937),g=e(2068),m=e(74399),x=e(46004),f=e(35708),_=e(30138),T=e(56140),d=e(5388),y=e(49545),b=e(92169),P=e(13140),E=e(95127),D=e(74418),A=e(97119),l=e(28257),o=e(67294),t=e(13946);function r(){var s=(0,l.eL)(),n=s.texts;return(0,t.tZ)(l.dY,null,(0,t.tZ)(o.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,n[1].value),(0,t.tZ)("li",null,n[2].value)),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(d.Z,{items:[{demo:{id:"components-typography-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/typography/demo/basic.tsx",jsx:`import React from 'react';
import { Divider, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const blockContent = \`AntV \u662F\u8682\u8681\u91D1\u670D\u5168\u65B0\u4E00\u4EE3\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848\uFF0C\u81F4\u529B\u4E8E\u63D0\u4F9B\u4E00\u5957\u7B80\u5355\u65B9\u4FBF\u3001\u4E13\u4E1A\u53EF\u9760\u3001\u4E0D\u9650\u53EF\u80FD\u7684\u6570\u636E\u53EF\u89C6\u5316\u6700\u4F73\u5B9E\u8DF5\u3002\u5F97\u76CA\u4E8E\u4E30\u5BCC\u7684\u4E1A\u52A1\u573A\u666F\u548C\u7528\u6237\u9700\u6C42\u6311\u6218\uFF0CAntV \u7ECF\u5386\u591A\u5E74\u79EF\u7D2F\u4E0E\u4E0D\u65AD\u6253\u78E8\uFF0C\u5DF2\u652F\u6491\u6574\u4E2A\u963F\u91CC\u96C6\u56E2\u5185\u5916 20000+ \u4E1A\u52A1\u7CFB\u7EDF\uFF0C\u901A\u8FC7\u4E86\u65E5\u5747\u5343\u4E07\u7EA7 UV \u4EA7\u54C1\u7684\u4E25\u82DB\u8003\u9A8C\u3002
\u6211\u4EEC\u6B63\u5728\u57FA\u7840\u56FE\u8868\uFF0C\u56FE\u5206\u6790\uFF0C\u56FE\u7F16\u8F91\uFF0C\u5730\u7406\u7A7A\u95F4\u53EF\u89C6\u5316\uFF0C\u667A\u80FD\u53EF\u89C6\u5316\u7B49\u5404\u4E2A\u53EF\u89C6\u5316\u7684\u9886\u57DF\u8015\u8018\uFF0C\u6B22\u8FCE\u540C\u8DEF\u4EBA\u4E00\u8D77\u524D\u884C\u3002\`;
const App = () => (
  <Typography>
    <Title>Introduction</Title>
    <Paragraph>
      In the process of internal desktop applications development, many different design specs and
      implementations would be involved, which might cause designers and developers difficulties and
      duplication and reduce the efficiency of development.
    </Paragraph>
    <Paragraph>
      After massive project practice and summaries, Ant Design, a design language for background
      applications, is refined by Ant UED Team, which aims to{' '}
      <Text strong>
        uniform the user interface specs for internal background projects, lower the unnecessary
        cost of design differences and implementation and liberate the resources of design and
        front-end development
      </Text>
      .
    </Paragraph>
    <Title level={2}>Guidelines and Resources</Title>
    <Paragraph>
      We supply a series of design principles, practical patterns and high quality design resources
      (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
      prototypes beautifully and efficiently.
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <Link href="/docs/spec/proximity">Principles</Link>
        </li>
        <li>
          <Link href="/docs/spec/overview">Patterns</Link>
        </li>
        <li>
          <Link href="/docs/resources">Resource Download</Link>
        </li>
      </ul>
    </Paragraph>

    <Paragraph>
      Press <Text keyboard>Esc</Text> to exit...
    </Paragraph>

    <Divider />

    <Title>\u4ECB\u7ECD</Title>
    <Paragraph>
      \u8682\u8681\u7684\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u662F\u4E00\u4E2A\u5E9E\u5927\u4E14\u590D\u6742\u7684\u4F53\u7CFB\u3002\u8FD9\u7C7B\u4EA7\u54C1\u4E0D\u4EC5\u91CF\u7EA7\u5DE8\u5927\u4E14\u529F\u80FD\u590D\u6742\uFF0C\u800C\u4E14\u53D8\u52A8\u548C\u5E76\u53D1\u9891\u7E41\uFF0C\u5E38\u5E38\u9700\u8981\u8BBE\u8BA1\u4E0E\u5F00\u53D1\u80FD\u591F\u5FEB\u901F\u7684\u505A\u51FA\u54CD\u5E94\u3002\u540C\u65F6\u8FD9\u7C7B\u4EA7\u54C1\u4E2D\u6709\u5B58\u5728\u5F88\u591A\u7C7B\u4F3C\u7684\u9875\u9762\u4EE5\u53CA\u7EC4\u4EF6\uFF0C\u53EF\u4EE5\u901A\u8FC7\u62BD\u8C61\u5F97\u5230\u4E00\u4E9B\u7A33\u5B9A\u4E14\u9AD8\u590D\u7528\u6027\u7684\u5185\u5BB9\u3002
    </Paragraph>
    <Paragraph>
      \u968F\u7740\u5546\u4E1A\u5316\u7684\u8D8B\u52BF\uFF0C\u8D8A\u6765\u8D8A\u591A\u7684\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u5BF9\u66F4\u597D\u7684\u7528\u6237\u4F53\u9A8C\u6709\u4E86\u8FDB\u4E00\u6B65\u7684\u8981\u6C42\u3002\u5E26\u7740\u8FD9\u6837\u7684\u4E00\u4E2A\u7EC8\u6781\u76EE\u6807\uFF0C\u6211\u4EEC\uFF08\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u6280\u672F\u90E8\uFF09\u7ECF\u8FC7\u5927\u91CF\u7684\u9879\u76EE\u5B9E\u8DF5\u548C\u603B\u7ED3\uFF0C\u9010\u6B65\u6253\u78E8\u51FA\u4E00\u4E2A\u670D\u52A1\u4E8E\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u7684\u8BBE\u8BA1\u4F53\u7CFB
      Ant Design\u3002\u57FA\u4E8E<Text mark>\u300E\u786E\u5B9A\u300F\u548C\u300E\u81EA\u7136\u300F</Text>
      \u7684\u8BBE\u8BA1\u4EF7\u503C\u89C2\uFF0C\u901A\u8FC7\u6A21\u5757\u5316\u7684\u89E3\u51B3\u65B9\u6848\uFF0C\u964D\u4F4E\u5197\u4F59\u7684\u751F\u4EA7\u6210\u672C\uFF0C\u8BA9\u8BBE\u8BA1\u8005\u4E13\u6CE8\u4E8E
      <Text strong>\u66F4\u597D\u7684\u7528\u6237\u4F53\u9A8C</Text>\u3002
    </Paragraph>
    <Title level={2}>\u8BBE\u8BA1\u8D44\u6E90</Title>
    <Paragraph>
      \u6211\u4EEC\u63D0\u4F9B\u5B8C\u5584\u7684\u8BBE\u8BA1\u539F\u5219\u3001\u6700\u4F73\u5B9E\u8DF5\u548C\u8BBE\u8BA1\u8D44\u6E90\u6587\u4EF6\uFF08<Text code>Sketch</Text> \u548C
      <Text code>Axure</Text>\uFF09\uFF0C\u6765\u5E2E\u52A9\u4E1A\u52A1\u5FEB\u901F\u8BBE\u8BA1\u51FA\u9AD8\u8D28\u91CF\u7684\u4EA7\u54C1\u539F\u578B\u3002
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <Link href="/docs/spec/proximity-cn">\u8BBE\u8BA1\u539F\u5219</Link>
        </li>
        <li>
          <Link href="/docs/spec/overview-cn">\u8BBE\u8BA1\u6A21\u5F0F</Link>
        </li>
        <li>
          <Link href="/docs/resources-cn">\u8BBE\u8BA1\u8D44\u6E90</Link>
        </li>
      </ul>
    </Paragraph>

    <Paragraph>
      <blockquote>{blockContent}</blockquote>
      <pre>{blockContent}</pre>
    </Paragraph>

    <Paragraph>
      \u6309<Text keyboard>Esc</Text>\u952E\u9000\u51FA\u9605\u8BFB\u2026\u2026
    </Paragraph>
  </Typography>
);
export default App;
`,description:"<p>\u5C55\u793A\u6587\u6863\u6837\u4F8B\u3002</p>"}},{demo:{id:"components-typography-demo-title"},previewerProps:{title:"\u6807\u9898\u7EC4\u4EF6",filename:"components/typography/demo/title.tsx",jsx:`import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;
const App = () => (
  <>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>
  </>
);
export default App;
`,description:"<p>\u5C55\u793A\u4E0D\u540C\u7EA7\u522B\u7684\u6807\u9898\u3002</p>"}},{demo:{id:"components-typography-demo-paragraph-debug"},previewerProps:{debug:!0,title:"\u6807\u9898\u4E0E\u6BB5\u843D",filename:"components/typography/demo/paragraph-debug.tsx",jsx:`import React from 'react';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
const App = () => (
  <>
    <Title>Introduction</Title>
    <Paragraph>
      In the process of internal desktop applications development, many different design specs and
      implementations would be involved, which might cause designers and developers difficulties and
      duplication and reduce the efficiency of development.
    </Paragraph>
    <Paragraph>
      After massive project practice and summaries, Ant Design, a design language for background
      applications, is refined by Ant UED Team, which aims to
      <Text strong>
        uniform the user interface specs for internal background projects, lower the unnecessary
        cost of design differences and implementation and liberate the resources of design and
        front-end development
      </Text>
      .
    </Paragraph>
    <Title level={2}>Guidelines and Resources</Title>
    <Paragraph>
      We supply a series of design principles, practical patterns and high quality design resources
      (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
      prototypes beautifully and efficiently.
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <a href="/docs/spec/proximity">Principles</a>
        </li>
        <li>
          <a href="/docs/pattern/navigation">Patterns</a>
        </li>
        <li>
          <a href="/docs/resource/download">Resource Download</a>
        </li>
      </ul>
    </Paragraph>

    <Title id="intro">\u4ECB\u7ECD</Title>
    <Paragraph>
      \u8682\u8681\u7684\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u662F\u4E00\u4E2A\u5E9E\u5927\u4E14\u590D\u6742\u7684\u4F53\u7CFB\u3002\u8FD9\u7C7B\u4EA7\u54C1\u4E0D\u4EC5\u91CF\u7EA7\u5DE8\u5927\u4E14\u529F\u80FD\u590D\u6742\uFF0C\u800C\u4E14\u53D8\u52A8\u548C\u5E76\u53D1\u9891\u7E41\uFF0C\u5E38\u5E38\u9700\u8981\u8BBE\u8BA1\u4E0E\u5F00\u53D1\u80FD\u591F\u5FEB\u901F\u7684\u505A\u51FA\u54CD\u5E94\u3002\u540C\u65F6\u8FD9\u7C7B\u4EA7\u54C1\u4E2D\u6709\u5B58\u5728\u5F88\u591A\u7C7B\u4F3C\u7684\u9875\u9762\u4EE5\u53CA\u7EC4\u4EF6\uFF0C\u53EF\u4EE5\u901A\u8FC7\u62BD\u8C61\u5F97\u5230\u4E00\u4E9B\u7A33\u5B9A\u4E14\u9AD8\u590D\u7528\u6027\u7684\u5185\u5BB9\u3002
    </Paragraph>
    <Paragraph>
      \u968F\u7740\u5546\u4E1A\u5316\u7684\u8D8B\u52BF\uFF0C\u8D8A\u6765\u8D8A\u591A\u7684\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u5BF9\u66F4\u597D\u7684\u7528\u6237\u4F53\u9A8C\u6709\u4E86\u8FDB\u4E00\u6B65\u7684\u8981\u6C42\u3002\u5E26\u7740\u8FD9\u6837\u7684\u4E00\u4E2A\u7EC8\u6781\u76EE\u6807\uFF0C\u6211\u4EEC\uFF08\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u6280\u672F\u90E8\uFF09\u7ECF\u8FC7\u5927\u91CF\u7684\u9879\u76EE\u5B9E\u8DF5\u548C\u603B\u7ED3\uFF0C\u9010\u6B65\u6253\u78E8\u51FA\u4E00\u4E2A\u670D\u52A1\u4E8E\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u7684\u8BBE\u8BA1\u4F53\u7CFB
      Ant Design\u3002\u57FA\u4E8E<Text mark>\u300E\u786E\u5B9A\u300F\u548C\u300E\u81EA\u7136\u300F</Text>
      \u7684\u8BBE\u8BA1\u4EF7\u503C\u89C2\uFF0C\u901A\u8FC7\u6A21\u5757\u5316\u7684\u89E3\u51B3\u65B9\u6848\uFF0C\u964D\u4F4E\u5197\u4F59\u7684\u751F\u4EA7\u6210\u672C\uFF0C\u8BA9\u8BBE\u8BA1\u8005\u4E13\u6CE8\u4E8E
      <Text strong>\u66F4\u597D\u7684\u7528\u6237\u4F53\u9A8C</Text>\u3002
    </Paragraph>
    <Title level={2}>\u8BBE\u8BA1\u8D44\u6E90</Title>
    <Paragraph>
      \u6211\u4EEC\u63D0\u4F9B\u5B8C\u5584\u7684\u8BBE\u8BA1\u539F\u5219\u3001\u6700\u4F73\u5B9E\u8DF5\u548C\u8BBE\u8BA1\u8D44\u6E90\u6587\u4EF6\uFF08<Text code>Sketch</Text> \u548C
      <Text code>Axure</Text>\uFF09\uFF0C\u6765\u5E2E\u52A9\u4E1A\u52A1\u5FEB\u901F\u8BBE\u8BA1\u51FA\u9AD8\u8D28\u91CF\u7684\u4EA7\u54C1\u539F\u578B\u3002
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <a href="/docs/spec/proximity">\u8BBE\u8BA1\u539F\u5219</a>
        </li>
        <li>
          <a href="/docs/pattern/navigation">\u8BBE\u8BA1\u6A21\u5F0F</a>
        </li>
        <li>
          <a href="/docs/resource/download">\u8BBE\u8BA1\u8D44\u6E90</a>
        </li>
      </ul>
    </Paragraph>

    <Paragraph>
      <ul>
        <li>I am an unordered item</li>
        <li>
          I am an unordered item with an ordered sublist
          <ol>
            <li>I am ordered</li>
          </ol>
          <ul>
            <li>I am unordered</li>
          </ul>
        </li>
      </ul>
      <ol>
        <li>
          Ordered list item with unordered sublist
          <ul>
            <li>I am unordered!</li>
            <li>I am also unordered!</li>
          </ul>
        </li>
      </ol>
    </Paragraph>
  </>
);
export default App;
`,description:"<p>\u5C55\u793A\u6807\u9898\u4E0E\u6BB5\u843D\u7684\u7EC4\u5408\u3002</p>"}},{demo:{id:"components-typography-demo-text"},previewerProps:{title:"\u6587\u672C\u4E0E\u8D85\u94FE\u63A5\u7EC4\u4EF6",filename:"components/typography/demo/text.tsx",jsx:`import React from 'react';
import { Space, Typography } from 'antd';
const { Text, Link } = Typography;
const App = () => (
  <Space direction="vertical">
    <Text>Ant Design (default)</Text>
    <Text type="secondary">Ant Design (secondary)</Text>
    <Text type="success">Ant Design (success)</Text>
    <Text type="warning">Ant Design (warning)</Text>
    <Text type="danger">Ant Design (danger)</Text>
    <Text disabled>Ant Design (disabled)</Text>
    <Text mark>Ant Design (mark)</Text>
    <Text code>Ant Design (code)</Text>
    <Text keyboard>Ant Design (keyboard)</Text>
    <Text underline>Ant Design (underline)</Text>
    <Text delete>Ant Design (delete)</Text>
    <Text strong>Ant Design (strong)</Text>
    <Text italic>Ant Design (italic)</Text>
    <Link href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link>
  </Space>
);
export default App;
`,description:"<p>\u5185\u7F6E\u4E0D\u540C\u6837\u5F0F\u7684\u6587\u672C\u4EE5\u53CA\u8D85\u94FE\u63A5\u7EC4\u4EF6\u3002</p>"}},{demo:{id:"components-typography-demo-interactive"},previewerProps:{title:"\u53EF\u4EA4\u4E92",filename:"components/typography/demo/interactive.tsx",jsx:`import React, { useState, useMemo } from 'react';
import { CheckOutlined, HighlightOutlined, SmileFilled, SmileOutlined } from '@ant-design/icons';
import { Divider, Radio, Typography } from 'antd';
const { Paragraph } = Typography;
const App = () => {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [editableStrWithSuffix, setEditableStrWithSuffix] = useState(
    'This is a loooooooooooooooooooooooooooooooong editable text with suffix.',
  );
  const [editableStrWithSuffixStartPart, editableStrWithSuffixSuffixPart] = useMemo(
    () => [editableStrWithSuffix.slice(0, -12), editableStrWithSuffix.slice(-12)],
    [editableStrWithSuffix],
  );
  const [customIconStr, setCustomIconStr] = useState('Custom Edit icon and replace tooltip text.');
  const [clickTriggerStr, setClickTriggerStr] = useState(
    'Text or icon as trigger - click to start editing.',
  );
  const [chooseTrigger, setChooseTrigger] = useState(['icon']);
  const [customEnterIconStr, setCustomEnterIconStr] = useState(
    'Editable text with a custom enter icon in edit field.',
  );
  const [noEnterIconStr, setNoEnterIconStr] = useState(
    'Editable text with no enter icon in edit field.',
  );
  const [hideTooltipStr, setHideTooltipStr] = useState('Hide Edit tooltip.');
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    'This is an editable text with limited length.',
  );
  const radioToState = (input) => {
    switch (input) {
      case 'text':
        return ['text'];
      case 'both':
        return ['icon', 'text'];
      case 'icon':
      default:
        return ['icon'];
    }
  };
  const stateToRadio = () => {
    if (chooseTrigger.indexOf('text') !== -1) {
      return chooseTrigger.indexOf('icon') !== -1 ? 'both' : 'text';
    }
    return 'icon';
  };
  return (
    <>
      <Paragraph
        editable={{
          onChange: setEditableStr,
        }}
      >
        {editableStr}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: setEditableStrWithSuffix,
          text: editableStrWithSuffix,
        }}
        ellipsis={{
          suffix: editableStrWithSuffixSuffixPart,
        }}
      >
        {editableStrWithSuffixStartPart}
      </Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined />,
          tooltip: 'click to edit text',
          onChange: setCustomIconStr,
        }}
      >
        {customIconStr}
      </Paragraph>
      Trigger edit with:{' '}
      <Radio.Group
        onChange={(e) => setChooseTrigger(radioToState(e.target.value))}
        value={stateToRadio()}
      >
        <Radio value="icon">icon</Radio>
        <Radio value="text">text</Radio>
        <Radio value="both">both</Radio>
      </Radio.Group>
      <Paragraph
        editable={{
          tooltip: 'click to edit text',
          onChange: setClickTriggerStr,
          triggerType: chooseTrigger,
        }}
      >
        {clickTriggerStr}
      </Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined />,
          tooltip: 'click to edit text',
          onChange: setCustomEnterIconStr,
          enterIcon: <CheckOutlined />,
        }}
      >
        {customEnterIconStr}
      </Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined />,
          tooltip: 'click to edit text',
          onChange: setNoEnterIconStr,
          enterIcon: null,
        }}
      >
        {noEnterIconStr}
      </Paragraph>
      <Paragraph
        editable={{
          tooltip: false,
          onChange: setHideTooltipStr,
        }}
      >
        {hideTooltipStr}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: setLengthLimitedStr,
          maxLength: 50,
          autoSize: {
            maxRows: 5,
            minRows: 3,
          },
        }}
      >
        {lengthLimitedStr}
      </Paragraph>
      <Typography.Title
        editable
        level={1}
        style={{
          margin: 0,
        }}
      >
        h1. Ant Design
      </Typography.Title>
      <Typography.Title
        editable
        level={2}
        style={{
          margin: 0,
        }}
      >
        h2. Ant Design
      </Typography.Title>
      <Typography.Title
        editable
        level={3}
        style={{
          margin: 0,
        }}
      >
        h3. Ant Design
      </Typography.Title>
      <Typography.Title
        editable
        level={4}
        style={{
          margin: 0,
        }}
      >
        h4. Ant Design
      </Typography.Title>
      <Typography.Title
        editable
        level={5}
        style={{
          margin: 0,
        }}
      >
        h5. Ant Design
      </Typography.Title>
      <Divider />
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph
        copyable={{
          text: 'Hello, Ant Design!',
        }}
      >
        Replace copy text.
      </Paragraph>
      <Paragraph
        copyable={{
          icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />],
          tooltips: ['click here', 'you clicked!!'],
        }}
      >
        Custom Copy icon and replace tooltips text.
      </Paragraph>
      <Paragraph
        copyable={{
          tooltips: false,
        }}
      >
        Hide Copy tooltips.
      </Paragraph>
    </>
  );
};
export default App;
`,description:"<p>\u63D0\u4F9B\u53EF\u7F16\u8F91\u548C\u53EF\u590D\u5236\u7B49\u989D\u5916\u7684\u4EA4\u4E92\u80FD\u529B\u3002</p>"}},{demo:{id:"components-typography-demo-ellipsis"},previewerProps:{title:"\u7701\u7565\u53F7",filename:"components/typography/demo/ellipsis.tsx",jsx:`import React, { useState } from 'react';
import { Switch, Typography } from 'antd';
const { Paragraph, Text } = Typography;
const App = () => {
  const [ellipsis, setEllipsis] = useState(true);
  return (
    <>
      <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
      />

      <Paragraph ellipsis={ellipsis}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>

      <Paragraph
        ellipsis={
          ellipsis
            ? {
                rows: 2,
                expandable: true,
                symbol: 'more',
              }
            : false
        }
      >
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>

      <Text
        style={
          ellipsis
            ? {
                width: 100,
              }
            : undefined
        }
        ellipsis={
          ellipsis
            ? {
                tooltip: 'I am ellipsis now!',
              }
            : false
        }
      >
        Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Text>
    </>
  );
};
export default App;
`,description:"<p>\u591A\u884C\u6587\u672C\u7701\u7565\u3002\u4F60\u53EF\u4EE5\u901A\u8FC7 <code>tooltip</code> \u5C5E\u6027\u914D\u7F6E\u7701\u7565\u5C55\u793A\u5185\u5BB9\uFF0C\u5927\u91CF\u6587\u672C\u65F6\u63A8\u8350\u4F18\u5148\u4F7F\u7528 <code>expandable</code>\u3002</p>"}},{demo:{id:"components-typography-demo-ellipsis-middle"},previewerProps:{title:"\u7701\u7565\u4E2D\u95F4",filename:"components/typography/demo/ellipsis-middle.tsx",jsx:`import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;
const EllipsisMiddle = ({ suffixCount, children }) => {
  const start = children.slice(0, children.length - suffixCount).trim();
  const suffix = children.slice(-suffixCount).trim();
  return (
    <Text
      style={{
        maxWidth: '100%',
      }}
      ellipsis={{
        suffix,
      }}
    >
      {start}
    </Text>
  );
};
const App = () => (
  <EllipsisMiddle suffixCount={12}>
    In the process of internal desktop applications development, many different design specs and
    implementations would be involved, which might cause designers and developers difficulties and
    duplication and reduce the efficiency of development.
  </EllipsisMiddle>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>ellipsis={{ suffix: ... }}</code> \u53EF\u4EE5\u5C01\u88C5\u4E00\u4E2A\u4ECE\u4E2D\u95F4\u7701\u7565\u5185\u5BB9\u7684\u7EC4\u4EF6\uFF0C\u9002\u5408\u4E8E\u9700\u8981\u4FDD\u7559\u6587\u672C\u672B\u4F4D\u7279\u5F81\u7684\u5185\u5BB9\u3002</p>"}},{demo:{id:"components-typography-demo-ellipsis-debug"},previewerProps:{debug:!0,title:"\u7701\u7565\u53F7 Debug",filename:"components/typography/demo/ellipsis-debug.tsx",jsx:`import React, { useState } from 'react';
import { Slider, Switch, Typography } from 'antd';
const { Text, Paragraph } = Typography;
const App = () => {
  const [rows, setRows] = useState(1);
  const [longText, setLongText] = useState(true);
  const [copyable, setCopyable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [expandable, setExpandable] = useState(false);
  const [display, setDisplay] = useState('none');
  React.useEffect(() => {
    setTimeout(() => {
      setDisplay('block');
    }, 100);
  }, []);
  return (
    <>
      <Switch checked={longText} checkedChildren="Long Text" onChange={setLongText} />
      <Switch checked={copyable} onChange={setCopyable} />
      <Switch checked={editable} onChange={setEditable} />
      <Switch checked={expandable} onChange={setExpandable} />
      <Slider value={rows} min={1} max={10} onChange={setRows} />
      {longText ? (
        <Paragraph
          ellipsis={{
            rows,
            expandable,
          }}
          copyable={copyable}
          editable={editable}
        >
          Ant Design, a design language for background applications, is refined by Ant UED Team.
          This is a nest sample{' '}
          <Text code strong delete>
            Test
          </Text>{' '}
          case. Bnt Design, a design language for background applications, is refined by Ant UED
          Team. Cnt Design, a design language for background applications, is refined by Ant UED
          Team. Dnt Design, a design language for background applications, is refined by Ant UED
          Team. Ent Design, a design language for background applications, is refined by Ant UED
          Team.
        </Paragraph>
      ) : (
        <Paragraph
          ellipsis={{
            rows,
            expandable,
          }}
          copyable={copyable}
          editable={editable}
        >
          Hello World
        </Paragraph>
      )}

      <Text
        style={{
          maxWidth: 400,
          fontSize: 24,
        }}
        copyable
        ellipsis
      >
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.
      </Text>

      <br />

      <Text
        style={{
          maxWidth: 400,
          fontSize: 12,
        }}
        copyable
        ellipsis
      >
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.
      </Text>

      <br />

      <Text
        style={{
          width: 400,
          fontSize: 24,
        }}
        copyable
        ellipsis
      >
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.
      </Text>

      <br />

      <Text
        style={{
          width: 100,
        }}
        ellipsis
        copyable
      >
        Ant Design is a design language for background applications, is refined by Ant UED Team.
      </Text>

      <p>
        [Before]<Text ellipsis>not ellipsis</Text>[After]
      </p>

      <div
        style={{
          display,
        }}
      >
        <Text
          style={{
            width: 100,
          }}
          ellipsis={{
            tooltip: 'I am ellipsis now!',
          }}
        >
          \u9ED8\u8BA4display none \u6837\u5F0F\u7684\u8D85\u957F\u6587\u5B57\uFF0C \u60AC\u505Ctooltip\u5931\u6548\u4E86
        </Text>
      </div>
    </>
  );
};
export default App;
`,description:"<p>\u591A\u884C\u6587\u672C\u7701\u7565\u3002</p>"}},{demo:{id:"components-typography-demo-suffix"},previewerProps:{title:"\u540E\u7F00",filename:"components/typography/demo/suffix.tsx",jsx:`import React, { useState } from 'react';
import { Slider, Typography } from 'antd';
const { Paragraph } = Typography;
const App = () => {
  const [rows, setRows] = useState(1);
  const article =
    "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life";
  return (
    <>
      <Slider value={rows} min={1} max={10} onChange={setRows} />
      <Paragraph
        ellipsis={{
          rows,
          expandable: true,
          suffix: '--William Shakespeare',
          onEllipsis: (ellipsis) => {
            console.log('Ellipsis changed:', ellipsis);
          },
        }}
        title={\`\${article}--William Shakespeare\`}
      >
        {article}
      </Paragraph>
    </>
  );
};
export default App;
`,description:"<p>\u6DFB\u52A0\u540E\u7F00\u7684\u7701\u7565\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("h3",{id:"typographytext"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typographytext"},(0,t.tZ)("span",{className:"icon icon-link"})),"Typography.Text"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[3].value),(0,t.tZ)("th",null,n[4].value),(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[8].value),(0,t.tZ)("td",null,n[9].value),(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,n[11].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value,(0,t.tZ)(l.rU,{to:"#copyable"},n[15].value)),(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#copyable"},n[17].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null,n[24].value),(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null,n[28].value,(0,t.tZ)(l.rU,{to:"#editable"},n[29].value)),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#editable"},n[31].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null,n[33].value),(0,t.tZ)("td",null,n[34].value,(0,t.tZ)(l.rU,{to:"#ellipsis"},n[35].value)),(0,t.tZ)("td",null,n[36].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#ellipsis"},n[37].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value),(0,t.tZ)("td",null,n[42].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[43].value),(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null,n[46].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null,n[48].value),(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null,n[50].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[51].value),(0,t.tZ)("td",null,n[52].value),(0,t.tZ)("td",null,n[53].value),(0,t.tZ)("td",null,n[54].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[55].value),(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null,n[57].value),(0,t.tZ)("td",null,n[58].value),(0,t.tZ)("td",null,n[59].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[60].value),(0,t.tZ)("td",null,n[61].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[62].value),n[63].value,(0,t.tZ)("code",null,n[64].value),n[65].value,(0,t.tZ)("code",null,n[66].value),n[67].value,(0,t.tZ)("code",null,n[68].value)),(0,t.tZ)("td",null,n[69].value),(0,t.tZ)("td",null,n[70].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[71].value),(0,t.tZ)("td",null,n[72].value),(0,t.tZ)("td",null,n[73].value),(0,t.tZ)("td",null,n[74].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"typographytitle"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typographytitle"},(0,t.tZ)("span",{className:"icon icon-link"})),"Typography.Title"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[75].value),(0,t.tZ)("th",null,n[76].value),(0,t.tZ)("th",null,n[77].value),(0,t.tZ)("th",null,n[78].value),(0,t.tZ)("th",null,n[79].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[80].value),(0,t.tZ)("td",null,n[81].value),(0,t.tZ)("td",null,n[82].value),(0,t.tZ)("td",null,n[83].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[84].value),(0,t.tZ)("td",null,n[85].value),(0,t.tZ)("td",null,n[86].value,(0,t.tZ)(l.rU,{to:"#copyable"},n[87].value)),(0,t.tZ)("td",null,n[88].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#copyable"},n[89].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null,n[92].value),(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[94].value),(0,t.tZ)("td",null,n[95].value),(0,t.tZ)("td",null,n[96].value),(0,t.tZ)("td",null,n[97].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[98].value),(0,t.tZ)("td",null,n[99].value),(0,t.tZ)("td",null,n[100].value,(0,t.tZ)(l.rU,{to:"#editable"},n[101].value)),(0,t.tZ)("td",null,n[102].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#editable"},n[103].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[104].value),(0,t.tZ)("td",null,n[105].value),(0,t.tZ)("td",null,n[106].value,(0,t.tZ)(l.rU,{to:"#ellipsis"},n[107].value)),(0,t.tZ)("td",null,n[108].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#ellipsis"},n[109].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[110].value),(0,t.tZ)("td",null,n[111].value,(0,t.tZ)("code",null,n[112].value),n[113].value,(0,t.tZ)("code",null,n[114].value),n[115].value,(0,t.tZ)("code",null,n[116].value),n[117].value,(0,t.tZ)("code",null,n[118].value),n[119].value,(0,t.tZ)("code",null,n[120].value)),(0,t.tZ)("td",null,n[121].value),(0,t.tZ)("td",null,n[122].value),(0,t.tZ)("td",null,n[123].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[124].value),(0,t.tZ)("td",null,n[125].value),(0,t.tZ)("td",null,n[126].value),(0,t.tZ)("td",null,n[127].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[128].value),(0,t.tZ)("td",null,n[129].value),(0,t.tZ)("td",null,n[130].value),(0,t.tZ)("td",null,n[131].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[132].value),(0,t.tZ)("td",null,n[133].value),(0,t.tZ)("td",null,n[134].value),(0,t.tZ)("td",null,n[135].value),(0,t.tZ)("td",null,n[136].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[137].value),(0,t.tZ)("td",null,n[138].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[139].value),n[140].value,(0,t.tZ)("code",null,n[141].value),n[142].value,(0,t.tZ)("code",null,n[143].value),n[144].value,(0,t.tZ)("code",null,n[145].value)),(0,t.tZ)("td",null,n[146].value),(0,t.tZ)("td",null,n[147].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[148].value),(0,t.tZ)("td",null,n[149].value),(0,t.tZ)("td",null,n[150].value),(0,t.tZ)("td",null,n[151].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"typographyparagraph"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typographyparagraph"},(0,t.tZ)("span",{className:"icon icon-link"})),"Typography.Paragraph"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[152].value),(0,t.tZ)("th",null,n[153].value),(0,t.tZ)("th",null,n[154].value),(0,t.tZ)("th",null,n[155].value),(0,t.tZ)("th",null,n[156].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[157].value),(0,t.tZ)("td",null,n[158].value),(0,t.tZ)("td",null,n[159].value),(0,t.tZ)("td",null,n[160].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[161].value),(0,t.tZ)("td",null,n[162].value),(0,t.tZ)("td",null,n[163].value,(0,t.tZ)(l.rU,{to:"#copyable"},n[164].value)),(0,t.tZ)("td",null,n[165].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#copyable"},n[166].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[167].value),(0,t.tZ)("td",null,n[168].value),(0,t.tZ)("td",null,n[169].value),(0,t.tZ)("td",null,n[170].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[171].value),(0,t.tZ)("td",null,n[172].value),(0,t.tZ)("td",null,n[173].value),(0,t.tZ)("td",null,n[174].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[175].value),(0,t.tZ)("td",null,n[176].value),(0,t.tZ)("td",null,n[177].value,(0,t.tZ)(l.rU,{to:"#editable"},n[178].value)),(0,t.tZ)("td",null,n[179].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#editable"},n[180].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[181].value),(0,t.tZ)("td",null,n[182].value),(0,t.tZ)("td",null,n[183].value,(0,t.tZ)(l.rU,{to:"#ellipsis"},n[184].value)),(0,t.tZ)("td",null,n[185].value),(0,t.tZ)("td",null,(0,t.tZ)(l.rU,{to:"#ellipsis"},n[186].value))),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[187].value),(0,t.tZ)("td",null,n[188].value),(0,t.tZ)("td",null,n[189].value),(0,t.tZ)("td",null,n[190].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[191].value),(0,t.tZ)("td",null,n[192].value),(0,t.tZ)("td",null,n[193].value),(0,t.tZ)("td",null,n[194].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[195].value),(0,t.tZ)("td",null,n[196].value),(0,t.tZ)("td",null,n[197].value),(0,t.tZ)("td",null,n[198].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[199].value),(0,t.tZ)("td",null,n[200].value),(0,t.tZ)("td",null,n[201].value),(0,t.tZ)("td",null,n[202].value),(0,t.tZ)("td",null,n[203].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[204].value),(0,t.tZ)("td",null,n[205].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[206].value),n[207].value,(0,t.tZ)("code",null,n[208].value),n[209].value,(0,t.tZ)("code",null,n[210].value),n[211].value,(0,t.tZ)("code",null,n[212].value)),(0,t.tZ)("td",null,n[213].value),(0,t.tZ)("td",null,n[214].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[215].value),(0,t.tZ)("td",null,n[216].value),(0,t.tZ)("td",null,n[217].value),(0,t.tZ)("td",null,n[218].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"copyable"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#copyable"},(0,t.tZ)("span",{className:"icon icon-link"})),"copyable"),(0,t.tZ)(u.Z,null,n[219].value),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[220].value),(0,t.tZ)("th",null,n[221].value),(0,t.tZ)("th",null,n[222].value),(0,t.tZ)("th",null,n[223].value),(0,t.tZ)("th",null,n[224].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[225].value),(0,t.tZ)("td",null,n[226].value),(0,t.tZ)("td",null,n[227].value),(0,t.tZ)("td",null,n[228].value),(0,t.tZ)("td",null,n[229].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[230].value),(0,t.tZ)("td",null,n[231].value),(0,t.tZ)("td",null,n[232].value),(0,t.tZ)("td",null,n[233].value),(0,t.tZ)("td",null,n[234].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[235].value),(0,t.tZ)("td",null,n[236].value),(0,t.tZ)("td",null,n[237].value),(0,t.tZ)("td",null,n[238].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[239].value),(0,t.tZ)("td",null,n[240].value),(0,t.tZ)("td",null,n[241].value),(0,t.tZ)("td",null,n[242].value,(0,t.tZ)("code",null,n[243].value),n[244].value,(0,t.tZ)("code",null,n[245].value),n[246].value),(0,t.tZ)("td",null,n[247].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[248].value),(0,t.tZ)("td",null,n[249].value),(0,t.tZ)("td",null,n[250].value),(0,t.tZ)("td",null,n[251].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"editable"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#editable"},(0,t.tZ)("span",{className:"icon icon-link"})),"editable"),(0,t.tZ)(u.Z,null,n[252].value),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[253].value),(0,t.tZ)("th",null,n[254].value),(0,t.tZ)("th",null,n[255].value),(0,t.tZ)("th",null,n[256].value),(0,t.tZ)("th",null,n[257].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[258].value),(0,t.tZ)("td",null,n[259].value),(0,t.tZ)("td",null,n[260].value),(0,t.tZ)("td",null,n[261].value),(0,t.tZ)("td",null,n[262].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[263].value),(0,t.tZ)("td",null,n[264].value),(0,t.tZ)("td",null,n[265].value),(0,t.tZ)("td",null,n[266].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[267].value),(0,t.tZ)("td",null,n[268].value),(0,t.tZ)("td",null,n[269].value),(0,t.tZ)("td",null,n[270].value),(0,t.tZ)("td",null,n[271].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[272].value),(0,t.tZ)("td",null,n[273].value),(0,t.tZ)("td",null,n[274].value),(0,t.tZ)("td",null,n[275].value),(0,t.tZ)("td",null,n[276].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[277].value),(0,t.tZ)("td",null,n[278].value),(0,t.tZ)("td",null,n[279].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[280].value)),(0,t.tZ)("td",null,n[281].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[282].value),(0,t.tZ)("td",null,n[283].value),(0,t.tZ)("td",null,n[284].value),(0,t.tZ)("td",null,n[285].value),(0,t.tZ)("td",null,n[286].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[287].value),(0,t.tZ)("td",null,n[288].value),(0,t.tZ)("td",null,n[289].value),(0,t.tZ)("td",null,n[290].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[291].value),(0,t.tZ)("td",null,n[292].value),(0,t.tZ)("td",null,n[293].value),(0,t.tZ)("td",null,n[294].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[295].value),(0,t.tZ)("td",null,n[296].value),(0,t.tZ)("td",null,n[297].value),(0,t.tZ)("td",null,n[298].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[299].value),(0,t.tZ)("td",null,n[300].value),(0,t.tZ)("td",null,n[301].value),(0,t.tZ)("td",null,n[302].value),(0,t.tZ)("td",null,n[303].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[304].value),(0,t.tZ)("td",null,n[305].value),(0,t.tZ)("td",null,n[306].value,(0,t.tZ)("code",null,n[307].value),n[308].value,(0,t.tZ)("code",null,n[309].value),n[310].value),(0,t.tZ)("td",null,n[311].value,(0,t.tZ)("code",null,n[312].value),n[313].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[314].value),(0,t.tZ)("td",null,n[315].value),(0,t.tZ)("td",null,n[316].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[317].value)),(0,t.tZ)("td",null,n[318].value)))),(0,t.tZ)("h3",{id:"ellipsis"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#ellipsis"},(0,t.tZ)("span",{className:"icon icon-link"})),"ellipsis"),(0,t.tZ)(u.Z,null,n[319].value),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[320].value),(0,t.tZ)("th",null,n[321].value),(0,t.tZ)("th",null,n[322].value),(0,t.tZ)("th",null,n[323].value),(0,t.tZ)("th",null,n[324].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[325].value),(0,t.tZ)("td",null,n[326].value),(0,t.tZ)("td",null,n[327].value),(0,t.tZ)("td",null,n[328].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[329].value),(0,t.tZ)("td",null,n[330].value),(0,t.tZ)("td",null,n[331].value),(0,t.tZ)("td",null,n[332].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[333].value),(0,t.tZ)("td",null,n[334].value),(0,t.tZ)("td",null,n[335].value),(0,t.tZ)("td",null,n[336].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[337].value),(0,t.tZ)("td",null,n[338].value),(0,t.tZ)("td",null,n[339].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[340].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[341].value),(0,t.tZ)("td",null,n[342].value),(0,t.tZ)("td",null,n[343].value,(0,t.tZ)(l.rU,{to:"/components/tooltip/#API"},n[344].value)),(0,t.tZ)("td",null,n[345].value),(0,t.tZ)("td",null,n[346].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[347].value),(0,t.tZ)("td",null,n[348].value),(0,t.tZ)("td",null,n[349].value),(0,t.tZ)("td",null,n[350].value),(0,t.tZ)("td",null,n[351].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[352].value),(0,t.tZ)("td",null,n[353].value),(0,t.tZ)("td",null,n[354].value),(0,t.tZ)("td",null,n[355].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h2",{id:"faq"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,t.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,t.tZ)("h3",{id:"typographylink-\u5982\u4F55\u4E0E-react-router-\u5E93\u96C6\u6210"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typographylink-\u5982\u4F55\u4E0E-react-router-\u5E93\u96C6\u6210"},(0,t.tZ)("span",{className:"icon icon-link"})),"Typography.Link \u5982\u4F55\u4E0E react-router \u5E93\u96C6\u6210\uFF1F"),(0,t.tZ)("p",null,(0,t.tZ)("code",null,n[356].value),n[357].value,(0,t.tZ)("a",{href:"https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#component-reactcomponent"},n[358].value),n[359].value),(0,t.tZ)(u.Z,{lang:"tsx"},n[360].value),(0,t.tZ)("p",null,(0,t.tZ)("strong",null,n[361].value),n[362].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/pull/26737/files#r488769888"},n[363].value)))))}i.default=r}}]);
