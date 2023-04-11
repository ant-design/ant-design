import React, { useContext, useState } from 'react';
import { DumiDemoGrid, FormattedMessage } from 'dumi';
import { Tooltip } from 'antd';
import {
  BugFilled,
  BugOutlined,
  CodeFilled,
  CodeOutlined,
  ExperimentFilled,
  ExperimentOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import DemoContext from '../../slots/DemoContext';

const DemoWrapper: typeof DumiDemoGrid = ({ items }) => {
  const { showDebug, setShowDebug } = useContext(DemoContext);

  const [expandAll, setExpandAll] = useState(false);
  const [showToken, setShowToken] = useState(process.env.NODE_ENV === 'development');

  const expandTriggerClass = classNames('code-box-expand-trigger', {
    'code-box-expand-trigger-active': expandAll,
  });

  const handleVisibleToggle = () => {
    setShowDebug?.(!showDebug);
  };

  const handleExpandToggle = () => {
    setExpandAll(!expandAll);
  };

  const handleTokenToggle = () => {
    setShowToken(!showToken);
  };

  const demos = React.useMemo(
    () =>
      items.reduce((acc, item) => {
        const { previewerProps } = item;
        const { debug } = previewerProps;

        if (debug && !showDebug) return acc;

        return acc.concat({
          ...item,
          previewerProps: {
            ...previewerProps,
            expand: expandAll,
            // always override debug property, because dumi will hide debug demo in production
            debug: false,
            /**
             * antd extra marker for the original debug
             * @see https://github.com/ant-design/ant-design/pull/40130#issuecomment-1380208762
             */
            originDebug: debug,
            showToken,
          },
        });
      }, [] as typeof items),
    [expandAll, showDebug, showToken],
  );

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
            <FormattedMessage id={`app.component.examples.${showDebug ? 'hide' : 'visible'}`} />
          }
        >
          {showDebug ? (
            <BugFilled className={expandTriggerClass} onClick={handleVisibleToggle} />
          ) : (
            <BugOutlined className={expandTriggerClass} onClick={handleVisibleToggle} />
          )}
        </Tooltip>
        <Tooltip
          title={
            <FormattedMessage
              id={`app.component.examples.${showToken ? 'hideToken' : 'showToken'}`}
            />
          }
        >
          {showToken ? (
            <ExperimentFilled className={expandTriggerClass} onClick={handleTokenToggle} />
          ) : (
            <ExperimentOutlined className={expandTriggerClass} onClick={handleTokenToggle} />
          )}
        </Tooltip>
      </span>
      {/* FIXME: find a new way instead of `key` to trigger re-render */}
      <DumiDemoGrid items={demos} key={`${expandAll}${showDebug}${showToken}`} />
    </div>
  );
};

export default DemoWrapper;
