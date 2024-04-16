import React, { useContext } from 'react';
import {
  BugFilled,
  BugOutlined,
  CodeFilled,
  CodeOutlined,
  ExperimentFilled,
  ExperimentOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Tooltip } from 'antd';
import classNames from 'classnames';
import { DumiDemoGrid, FormattedMessage } from 'dumi';

import useLayoutState from '../../../hooks/useLayoutState';
import useLocale from '../../../hooks/useLocale';
import DemoContext from '../../slots/DemoContext';

const locales = {
  cn: {
    enableCssVar: '启用 CSS 变量',
    disableCssVar: '禁用 CSS 变量',
  },
  en: {
    enableCssVar: 'Enable CSS Var',
    disableCssVar: 'Disable CSS Var',
  },
};

const DemoWrapper: typeof DumiDemoGrid = ({ items }) => {
  const { showDebug, setShowDebug } = useContext(DemoContext);
  const [locale] = useLocale(locales);

  const [expandAll, setExpandAll] = useLayoutState(false);
  const [enableCssVar, setEnableCssVar] = useLayoutState(true);

  const expandTriggerClass = classNames('code-box-expand-trigger', {
    'code-box-expand-trigger-active': expandAll,
  });

  const handleVisibleToggle = () => {
    setShowDebug?.(!showDebug);
  };

  const handleExpandToggle = () => {
    setExpandAll(!expandAll);
  };

  const handleCssVarToggle = () => {
    setEnableCssVar((v) => !v);
  };

  const demos = React.useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          const { previewerProps } = item;
          const { debug } = previewerProps;

          if (debug && !showDebug) {
            return acc;
          }

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
            },
          });
        },
        [] as typeof items,
      ),
    [expandAll, showDebug],
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
        <Tooltip title={enableCssVar ? locale.disableCssVar : locale.enableCssVar}>
          {enableCssVar ? (
            <ExperimentFilled className={expandTriggerClass} onClick={handleCssVarToggle} />
          ) : (
            <ExperimentOutlined className={expandTriggerClass} onClick={handleCssVarToggle} />
          )}
        </Tooltip>
      </span>
      <ConfigProvider theme={{ cssVar: enableCssVar, hashed: !enableCssVar }}>
        <DumiDemoGrid items={demos} />
      </ConfigProvider>
    </div>
  );
};

export default DemoWrapper;
