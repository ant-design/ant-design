"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2600],{57114:function(u,a,t){t.r(a);var c=t(2143),g=t(50250),p=t(59378),_=t(78190),m=t(74775),o=t(5937),T=t(2068),f=t(74399),v=t(46004),h=t(35708),x=t(30138),I=t(56140),s=t(5388),C=t(49545),E=t(92169),b=t(13140),Z=t(95127),O=t(74418),P=t(97119),l=t(28257),i=t(67294),n=t(13946);function d(){var r=(0,l.eL)(),e=r.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(i.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("p",null,e[1].value)),(0,n.tZ)("li",null,(0,n.tZ)("p",null,e[2].value))),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(s.Z,{items:[{demo:{id:"components-tag-demo-basic"},previewerProps:{title:"Basic",filename:"components/tag/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>Usage of basic Tag, and it could be closable by set <code>closable</code> property. Closable Tag supports <code>onClose</code> events.</p>"}},{demo:{id:"components-tag-demo-colorful"},previewerProps:{title:"Colorful Tag",filename:"components/tag/demo/colorful.tsx",jsx:`import React from 'react';
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
`,description:"<p>We preset a series of colorful tag styles for use in different situations. You can also set it to a hex color string for custom color.</p>",style:`.code-box-demo .ant-tag {
  margin-bottom: 8px;
}`}},{demo:{id:"components-tag-demo-colorful-inverse"},previewerProps:{debug:!0,title:"Inverse Colorful Tag",filename:"components/tag/demo/colorful-inverse.tsx",jsx:`import React from 'react';
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
`,description:"<p>Internal inverse color tag</p>",style:`.code-box-demo .ant-tag {
  margin-bottom: 8px;
}`}},{demo:{id:"components-tag-demo-control"},previewerProps:{title:"Add & Remove Dynamically",filename:"components/tag/demo/control.tsx",jsx:`import React, { useEffect, useRef, useState } from 'react';
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
`,description:"<p>Generating a set of Tags by array, you can add and remove dynamically.</p>",style:`.site-tag-plus {
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
}`}},{demo:{id:"components-tag-demo-checkable"},previewerProps:{title:"Checkable",filename:"components/tag/demo/checkable.tsx",jsx:`import React, { useState } from 'react';
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
`,description:`<p><code>CheckableTag</code> works like Checkbox, click it to toggle checked state.</p>
<blockquote>
<p>it is an absolute controlled component and has no uncontrolled mode.</p>
</blockquote>`}},{demo:{id:"components-tag-demo-animation"},previewerProps:{title:"Animate",filename:"components/tag/demo/animation.tsx",jsx:`import React, { useEffect, useRef, useState } from 'react';
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
`,description:'<p>Animating the Tag by using <a href="https://github.com/react-component/tween-one">rc-tween-one</a>.</p>',style:`.site-tag-plus {
  background: #fff;
  border-style: dashed;
}`}},{demo:{id:"components-tag-demo-icon"},previewerProps:{title:"Icon",filename:"components/tag/demo/icon.tsx",jsx:`import React from 'react';
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
`,description:`<p><code>Tag</code> components can contain an <code>Icon</code>. This is done by setting the <code>icon</code> property or placing an <code>Icon</code> component within the <code>Tag</code>.</p>
<p>If you want specific control over the positioning and placement of the <code>Icon</code>, then that should be done by placing the <code>Icon</code> component within the <code>Tag</code> rather than using the <code>icon</code> property.</p>`}},{demo:{id:"components-tag-demo-status"},previewerProps:{title:"Status Tag",filename:"components/tag/demo/status.tsx",jsx:`import React from 'react';
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
`,description:"<p>We preset five different colors, you can set color property such as <code>success</code>,<code>processing</code>,<code>error</code>,<code>default</code> and <code>warning</code> to indicate specific status.</p>"}},{demo:{id:"components-tag-demo-customize"},previewerProps:{debug:!0,title:"Customize close",filename:"components/tag/demo/customize.tsx",jsx:`import React from 'react';
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
`,description:"<p>The close icon can be customized using <code>closeIcon</code>.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"tag"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tag"},(0,n.tZ)("span",{className:"icon icon-link"})),"Tag"),(0,n.tZ)(o.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[3].value),(0,n.tZ)("th",null,e[4].value),(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[8].value),(0,n.tZ)("td",null,e[9].value),(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"tagcheckabletag"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tagcheckabletag"},(0,n.tZ)("span",{className:"icon icon-link"})),"Tag.CheckableTag"),(0,n.tZ)(o.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[29].value),(0,n.tZ)("th",null,e[30].value),(0,n.tZ)("th",null,e[31].value),(0,n.tZ)("th",null,e[32].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value)))))))}a.default=d}}]);
