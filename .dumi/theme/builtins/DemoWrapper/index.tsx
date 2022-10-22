import React, { useState } from 'react';
import { DumiDemoGrid, FormattedMessage } from 'dumi';
import { Tooltip } from 'antd';
import { BugFilled, BugOutlined, CodeFilled, CodeOutlined } from '@ant-design/icons';
import classNames from 'classnames';

const DemoWrapper: typeof DumiDemoGrid = ({ items }) => {
  // TODO: implement demo toolbar
  // from: https://github.com/ant-design/ant-design/blob/86891775dd6deb4e154b885718a370d31bc78288/site/theme/template/Content/ComponentDoc.jsx#L187-L214
  //  1. Expand source code for all previewer
  //  2. Display debug demo
  const [visibleAll, setVisibleAll] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  const expandTriggerClass = classNames('code-box-expand-trigger', {
    'code-box-expand-trigger-active': expandAll,
  });

  const handleVisibleToggle = () => {
    setVisibleAll(!visibleAll);
  };

  const handleExpandToggle = () => {
    setExpandAll(!expandAll);
  };

  const visibleItems = visibleAll ? items : items.filter(item => !item.previewerProps.debug);
  const filteredItems = visibleItems.map(item => ({
    ...item,
    previewerProps: { ...item.previewerProps, expand: expandAll },
  }));

  return (
    <div className="demo-wrapper">
      <span className="all-code-box-controls">
        <Tooltip
          title={
            <FormattedMessage id={`app.component.examples.${expandAll ? 'collapse' : 'expand'}`} />
          }
        >
          {expandAll ? (
            <CodeFilled className={expandTriggerClass} onClick={handleExpandToggle} />
          ) : (
            <CodeOutlined className={expandTriggerClass} onClick={handleExpandToggle} />
          )}
        </Tooltip>
        <Tooltip
          title={
            <FormattedMessage id={`app.component.examples.${visibleAll ? 'hide' : 'visible'}`} />
          }
        >
          {visibleAll ? (
            <BugFilled className={expandTriggerClass} onClick={handleVisibleToggle} />
          ) : (
            <BugOutlined className={expandTriggerClass} onClick={handleVisibleToggle} />
          )}
        </Tooltip>
      </span>
      <DumiDemoGrid items={filteredItems} key={expandAll + '' + visibleAll} />
    </div>
  );
};

export default DemoWrapper;
