"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6507],{19149:function(_,a,t){t.r(a);var c=t(2143),m=t(50250),v=t(59378),p=t(78190),u=t(74775),s=t(5937),Z=t(2068),h=t(74399),E=t(46004),x=t(35708),C=t(30138),D=t(56140),o=t(5388),g=t(49545),f=t(92169),P=t(13140),B=t(95127),M=t(74418),y=t(97119),l=t(28257),d=t(67294),n=t(13946);function r(){var i=(0,l.eL)(),e=i.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(d.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(o.Z,{items:[{demo:{id:"components-calendar-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/calendar/demo/basic.tsx",jsx:`import React from 'react';
import { Calendar } from 'antd';
const App = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return <Calendar onPanelChange={onPanelChange} />;
};
export default App;
`,description:"<p>\u4E00\u4E2A\u901A\u7528\u7684\u65E5\u5386\u9762\u677F\uFF0C\u652F\u6301\u5E74/\u6708\u5207\u6362\u3002</p>"}},{demo:{id:"components-calendar-demo-notice-calendar"},previewerProps:{title:"\u901A\u77E5\u4E8B\u9879\u65E5\u5386",filename:"components/calendar/demo/notice-calendar.tsx",jsx:`import React from 'react';
import { Badge, Calendar } from 'antd';
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event\u3002\u3002....',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const App = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
};
export default App;
`,description:"<p>\u4E00\u4E2A\u590D\u6742\u7684\u5E94\u7528\u793A\u4F8B\uFF0C\u7528 <code>dateCellRender</code> \u548C <code>monthCellRender</code> \u51FD\u6570\u6765\u81EA\u5B9A\u4E49\u9700\u8981\u6E32\u67D3\u7684\u6570\u636E\u3002</p>",style:`.events {
  margin: 0;
  padding: 0;
  list-style: none;
}
.events .ant-badge-status {
  width: 100%;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.notes-month {
  font-size: 28px;
  text-align: center;
}
.notes-month section {
  font-size: 28px;
}`}},{demo:{id:"components-calendar-demo-card"},previewerProps:{title:"\u5361\u7247\u6A21\u5F0F",filename:"components/calendar/demo/card.tsx",jsx:`import React from 'react';
import { Calendar } from 'antd';
const App = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <div className="site-calendar-demo-card">
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
};
export default App;
`,description:"<p>\u7528\u4E8E\u5D4C\u5957\u5728\u7A7A\u95F4\u6709\u9650\u7684\u5BB9\u5668\u4E2D\u3002</p>",style:`.site-calendar-demo-card {
  width: 300px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
}`}},{demo:{id:"components-calendar-demo-select"},previewerProps:{title:"\u9009\u62E9\u529F\u80FD",filename:"components/calendar/demo/select.tsx",jsx:`import React, { useState } from 'react';
import { Alert, Calendar } from 'antd';
import dayjs from 'dayjs';
const App = () => {
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Alert message={\`You selected date: \${selectedValue?.format('YYYY-MM-DD')}\`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  );
};
export default App;
`,description:"<p>\u4E00\u4E2A\u901A\u7528\u7684\u65E5\u5386\u9762\u677F\uFF0C\u652F\u6301\u5E74/\u6708\u5207\u6362\u3002</p>"}},{demo:{id:"components-calendar-demo-customize-header"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u5934\u90E8",filename:"components/calendar/demo/customize-header.tsx",jsx:`import React from 'react';
import { Calendar, Col, Radio, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
const App = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <div className="site-calendar-customize-header-wrapper">
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }
          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }
          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
            <div
              style={{
                padding: 8,
              }}
            >
              <Typography.Title level={4}>Custom header</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u65E5\u5386\u5934\u90E8\u5185\u5BB9\u3002</p>",style:`.site-calendar-customize-header-wrapper {
  width: 300px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
}`}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("p",null,(0,n.tZ)("strong",null,e[2].value),e[3].value),(0,n.tZ)(u.Z,{lang:"jsx"},e[4].value),(0,n.tZ)(s.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value),(0,n.tZ)("th",null,e[8].value),(0,n.tZ)("th",null,e[9].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://day.js.org/"},e[20].value)),(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value,(0,n.tZ)("code",null,e[24].value),e[25].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/30987"},e[26].value)),(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json"},e[40].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[43].value),e[44].value,(0,n.tZ)("code",null,e[45].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[46].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null,e[57].value,(0,n.tZ)("a",{href:"https://day.js.org/"},e[58].value),e[59].value,(0,n.tZ)("a",{href:"https://day.js.org/"},e[60].value),e[61].value),(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://day.js.org/"},e[65].value)),(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null,e[77].value),(0,n.tZ)("td",null,e[78].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u5982\u4F55\u5728-calendar-\u4E2D\u4F7F\u7528\u81EA\u5B9A\u4E49\u65E5\u671F\u5E93"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u5728-calendar-\u4E2D\u4F7F\u7528\u81EA\u5B9A\u4E49\u65E5\u671F\u5E93"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u5728 Calendar \u4E2D\u4F7F\u7528\u81EA\u5B9A\u4E49\u65E5\u671F\u5E93"),(0,n.tZ)("p",null,e[79].value,(0,n.tZ)(l.rU,{to:"/docs/react/use-custom-date-library#Calendar"},e[80].value),e[81].value),(0,n.tZ)("h3",{id:"\u5982\u4F55\u7ED9\u65E5\u671F\u7C7B\u7EC4\u4EF6\u914D\u7F6E\u56FD\u9645\u5316"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u7ED9\u65E5\u671F\u7C7B\u7EC4\u4EF6\u914D\u7F6E\u56FD\u9645\u5316"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u7ED9\u65E5\u671F\u7C7B\u7EC4\u4EF6\u914D\u7F6E\u56FD\u9645\u5316\uFF1F"),(0,n.tZ)("p",null,e[82].value,(0,n.tZ)(l.rU,{to:"/components/date-picker/#%E5%9B%BD%E9%99%85%E5%8C%96%E9%85%8D%E7%BD%AE"},e[83].value),e[84].value),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316-locale-\u8BBE\u7F6E\u4E0D\u751F\u6548"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316-locale-\u8BBE\u7F6E\u4E0D\u751F\u6548"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316 locale \u8BBE\u7F6E\u4E0D\u751F\u6548\uFF1F"),(0,n.tZ)("p",null,e[85].value,(0,n.tZ)(l.rU,{to:"/docs/react/faq#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9B%BD%E9%99%85%E5%8C%96-locale-%E8%AE%BE%E7%BD%AE%E4%B8%8D%E7%94%9F%E6%95%88%EF%BC%9F"},e[86].value),e[87].value))))}a.default=r}}]);
