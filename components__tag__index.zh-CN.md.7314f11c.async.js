"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[633],{56227:function(r,a,t){t.r(a);var c=t(2143),g=t(50250),p=t(59378),_=t(78190),m=t(74775),o=t(5937),T=t(2068),f=t(74399),v=t(46004),x=t(35708),h=t(30138),I=t(56140),s=t(5388),E=t(49545),C=t(92169),Z=t(13140),b=t(95127),O=t(74418),P=t(97119),l=t(28257),i=t(67294),n=t(13946);function u(){var d=(0,l.eL)(),e=d.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(i.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[1].value),(0,n.tZ)("li",null,e[2].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(s.Z,{items:[{demo:{id:"components-tag-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/tag/demo/basic.tsx",jsx:`import React from 'react';
import { Tag } from 'antd';
const log = (e) => {
  console.log(e);
};
const preventDefault = (e) => {
  e.preventDefault();
  console.log('Clicked! But prevent default.');
};
const App = () => (
  <>
    <Tag>Tag 1</Tag>
    <Tag>
      <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
    </Tag>
    <Tag closable onClose={log}>
      Tag 2
    </Tag>
    <Tag closable onClose={preventDefault}>
      Prevent Default
    </Tag>
  </>
);
export default App;
`,description:"<p>\u57FA\u672C\u6807\u7B7E\u7684\u7528\u6CD5\uFF0C\u53EF\u4EE5\u901A\u8FC7\u6DFB\u52A0 <code>closable</code> \u53D8\u4E3A\u53EF\u5173\u95ED\u6807\u7B7E\u3002\u53EF\u5173\u95ED\u6807\u7B7E\u5177\u6709 <code>onClose</code> \u4E8B\u4EF6\u3002</p>"}},{demo:{id:"components-tag-demo-colorful"},previewerProps:{title:"\u591A\u5F69\u6807\u7B7E",filename:"components/tag/demo/colorful.tsx",jsx:`import React from 'react';
import { Divider, Tag } from 'antd';
const App = () => (
  <>
    <Divider orientation="left">Presets</Divider>
    <div>
      <Tag color="magenta">magenta</Tag>
      <Tag color="red">red</Tag>
      <Tag color="volcano">volcano</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="gold">gold</Tag>
      <Tag color="lime">lime</Tag>
      <Tag color="green">green</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="geekblue">geekblue</Tag>
      <Tag color="purple">purple</Tag>
    </div>
    <Divider orientation="left">Custom</Divider>
    <div>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </div>
  </>
);
export default App;
`,description:"<p>\u6211\u4EEC\u6DFB\u52A0\u4E86\u591A\u79CD\u9884\u8BBE\u8272\u5F69\u7684\u6807\u7B7E\u6837\u5F0F\uFF0C\u7528\u4F5C\u4E0D\u540C\u573A\u666F\u4F7F\u7528\u3002\u5982\u679C\u9884\u8BBE\u503C\u4E0D\u80FD\u6EE1\u8DB3\u4F60\u7684\u9700\u6C42\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u4E3A\u5177\u4F53\u7684\u8272\u503C\u3002</p>",style:`.code-box-demo .ant-tag {
  margin-bottom: 8px;
}`}},{demo:{id:"components-tag-demo-colorful-inverse"},previewerProps:{debug:!0,title:"\u53CD\u8272\u591A\u5F69\u6807\u7B7E",filename:"components/tag/demo/colorful-inverse.tsx",jsx:`import React from 'react';
import { Divider, Tag } from 'antd';
const App = () => (
  <>
    <Divider orientation="left">Presets Inverse</Divider>
    <div>
      <Tag color="magenta-inverse">magenta</Tag>
      <Tag color="red-inverse">red</Tag>
      <Tag color="volcano-inverse">volcano</Tag>
      <Tag color="orange-inverse">orange</Tag>
      <Tag color="gold-inverse">gold</Tag>
      <Tag color="lime-inverse">lime</Tag>
      <Tag color="green-inverse">green</Tag>
      <Tag color="cyan-inverse">cyan</Tag>
      <Tag color="blue-inverse">blue</Tag>
      <Tag color="geekblue-inverse">geekblue</Tag>
      <Tag color="purple-inverse">purple</Tag>
    </div>
  </>
);
export default App;
`,description:"<p>\u5185\u90E8\u53CD\u8272\u6807\u7B7E</p>",style:`.code-box-demo .ant-tag {
  margin-bottom: 8px;
}`}},{demo:{id:"components-tag-demo-control"},previewerProps:{title:"\u52A8\u6001\u6DFB\u52A0\u548C\u5220\u9664",filename:"components/tag/demo/control.tsx",jsx:`import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, Tooltip } from 'antd';
const App = () => {
  const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };
  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? \`\${tag.slice(0, 20)}...\` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};
export default App;
`,description:"<p>\u7528\u6570\u7EC4\u751F\u6210\u4E00\u7EC4\u6807\u7B7E\uFF0C\u53EF\u4EE5\u52A8\u6001\u6DFB\u52A0\u548C\u5220\u9664\u3002</p>",style:`.site-tag-plus {
  background: #fff;
  border-style: dashed;
}
.edit-tag {
  user-select: none;
}
.tag-input {
  width: 78px;
  margin-right: 8px;
  vertical-align: top;
}`}},{demo:{id:"components-tag-demo-checkable"},previewerProps:{title:"\u53EF\u9009\u62E9\u6807\u7B7E",filename:"components/tag/demo/checkable.tsx",jsx:`import React, { useState } from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;
const tagsData = ['Movies', 'Books', 'Music', 'Sports'];
const App = () => {
  const [selectedTags, setSelectedTags] = useState(['Books']);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  return (
    <>
      <span
        style={{
          marginRight: 8,
        }}
      >
        Categories:
      </span>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );
};
export default App;
`,description:`<p>\u53EF\u901A\u8FC7 <code>CheckableTag</code> \u5B9E\u73B0\u7C7B\u4F3C Checkbox \u7684\u6548\u679C\uFF0C\u70B9\u51FB\u5207\u6362\u9009\u4E2D\u6548\u679C\u3002</p>
<blockquote>
<p>\u8BE5\u7EC4\u4EF6\u4E3A\u5B8C\u5168\u53D7\u63A7\u7EC4\u4EF6\uFF0C\u4E0D\u652F\u6301\u975E\u53D7\u63A7\u7528\u6CD5\u3002</p>
</blockquote>`}},{demo:{id:"components-tag-demo-animation"},previewerProps:{title:"\u6DFB\u52A0\u52A8\u753B",filename:"components/tag/demo/animation.tsx",jsx:`import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
const App = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, []);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags.map(forMap);
  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};
export default App;
`,description:'<p>\u4F7F\u7528 <a href="https://github.com/react-component/tween-one">rc-tween-one</a> \u7ED9\u6807\u7B7E\u589E\u52A0\u6DFB\u52A0\u6216\u5220\u9664\u52A8\u753B\u3002</p>',style:`.site-tag-plus {
  background: #fff;
  border-style: dashed;
}`}},{demo:{id:"components-tag-demo-icon"},previewerProps:{title:"\u56FE\u6807\u6309\u94AE",filename:"components/tag/demo/icon.tsx",jsx:`import React from 'react';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
const App = () => (
  <>
    <Tag icon={<TwitterOutlined />} color="#55acee">
      Twitter
    </Tag>
    <Tag icon={<YoutubeOutlined />} color="#cd201f">
      Youtube
    </Tag>
    <Tag icon={<FacebookOutlined />} color="#3b5999">
      Facebook
    </Tag>
    <Tag icon={<LinkedinOutlined />} color="#55acee">
      LinkedIn
    </Tag>
  </>
);
export default App;
`,description:`<p>\u5F53\u9700\u8981\u5728 <code>Tag</code> \u5185\u5D4C\u5165 <code>Icon</code> \u65F6\uFF0C\u53EF\u4EE5\u8BBE\u7F6E <code>icon</code> \u5C5E\u6027\uFF0C\u6216\u8005\u76F4\u63A5\u5728 <code>Tag</code> \u5185\u4F7F\u7528 <code>Icon</code> \u7EC4\u4EF6\u3002</p>
<p>\u5982\u679C\u60F3\u63A7\u5236 <code>Icon</code> \u5177\u4F53\u7684\u4F4D\u7F6E\uFF0C\u53EA\u80FD\u76F4\u63A5\u4F7F\u7528 <code>Icon</code> \u7EC4\u4EF6\uFF0C\u800C\u975E <code>icon</code> \u5C5E\u6027\u3002</p>`}},{demo:{id:"components-tag-demo-status"},previewerProps:{title:"\u9884\u8BBE\u72B6\u6001\u7684\u6807\u7B7E",filename:"components/tag/demo/status.tsx",jsx:`import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Divider, Tag } from 'antd';
const App = () => (
  <>
    <Divider orientation="left">Without icon</Divider>
    <div>
      <Tag color="success">success</Tag>
      <Tag color="processing">processing</Tag>
      <Tag color="error">error</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="default">default</Tag>
    </div>
    <Divider orientation="left">With icon</Divider>
    <div>
      <Tag icon={<CheckCircleOutlined />} color="success">
        success
      </Tag>
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error">
        error
      </Tag>
      <Tag icon={<ExclamationCircleOutlined />} color="warning">
        warning
      </Tag>
      <Tag icon={<ClockCircleOutlined />} color="default">
        waiting
      </Tag>
      <Tag icon={<MinusCircleOutlined />} color="default">
        stop
      </Tag>
    </div>
  </>
);
export default App;
`,description:"<p>\u9884\u8BBE\u4E94\u79CD\u72B6\u6001\u989C\u8272\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E <code>color</code> \u4E3A <code>success</code>\u3001 <code>processing</code>\u3001<code>error</code>\u3001<code>default</code>\u3001<code>warning</code> \u6765\u4EE3\u8868\u4E0D\u540C\u7684\u72B6\u6001\u3002</p>"}},{demo:{id:"components-tag-demo-customize"},previewerProps:{debug:!0,title:"\u81EA\u5B9A\u4E49\u5173\u95ED\u6309\u94AE",filename:"components/tag/demo/customize.tsx",jsx:`import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
const App = () => (
  <>
    <Tag closable closeIcon="\u5173 \u95ED">
      Tag1
    </Tag>
    <Tag closable closeIcon={<CloseCircleOutlined />}>
      Tag2
    </Tag>
  </>
);
export default App;
`,description:"<p>\u53EF\u7528 <code>closeIcon</code> \u81EA\u5B9A\u4E49\u5173\u95ED\u6309\u94AE\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"tag"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tag"},(0,n.tZ)("span",{className:"icon icon-link"})),"Tag"),(0,n.tZ)(o.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[3].value),(0,n.tZ)("th",null,e[4].value),(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[8].value),(0,n.tZ)("td",null,e[9].value),(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value,(0,n.tZ)("code",null,e[27].value),e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"tagcheckabletag"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tagcheckabletag"},(0,n.tZ)("span",{className:"icon icon-link"})),"Tag.CheckableTag"),(0,n.tZ)(o.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[31].value),(0,n.tZ)("th",null,e[32].value),(0,n.tZ)("th",null,e[33].value),(0,n.tZ)("th",null,e[34].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value)))))))}a.default=u}}]);
