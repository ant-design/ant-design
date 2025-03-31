import React, { Suspense } from 'react';
import { BugOutlined, CodeOutlined } from '@ant-design/icons';
import { css, Global } from '@emotion/react';
import { Button, Tooltip } from 'antd';
import { DumiDemo, DumiDemoGrid, FormattedMessage } from 'dumi';

import useLayoutState from '../../../hooks/useLayoutState';
import DemoContext from '../../slots/DemoContext';
import DemoFallback from '../Previewer/DemoFallback';

const DemoWrapper: typeof DumiDemoGrid = ({ items }) => {
  const { showDebug, setShowDebug } = React.use(DemoContext);

  const [expandAll, setExpandAll] = useLayoutState(false);

  const handleVisibleToggle = () => {
    setShowDebug?.(!showDebug);
  };

  const handleExpandToggle = () => {
    setExpandAll(!expandAll);
  };

  const demos = React.useMemo(
    () =>
      items.reduce<typeof items>((acc, item) => {
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
      }, []),
    [expandAll, showDebug],
  );

  return (
    <div className="demo-wrapper">
      <Global
        styles={css`
          :root {
            --antd-site-api-deprecated-display: ${showDebug ? 'table-row' : 'none'};
          }
        `}
      />
      <span className="all-code-box-controls">
        <Tooltip
          title={
            <FormattedMessage id={`app.component.examples.${expandAll ? 'collapse' : 'expand'}`} />
          }
        >
          <Button
            type="text"
            size="small"
            icon={<CodeOutlined />}
            onClick={handleExpandToggle}
            className={expandAll ? 'icon-enabled' : ''}
          />
        </Tooltip>
        <Tooltip
          title={
            <FormattedMessage id={`app.component.examples.${showDebug ? 'hide' : 'visible'}`} />
          }
        >
          <Button
            type="text"
            size="small"
            icon={<BugOutlined />}
            onClick={handleVisibleToggle}
            className={showDebug ? 'icon-enabled' : ''}
          />
        </Tooltip>
      </span>
      <DumiDemoGrid
        items={demos}
        demoRender={(item) => (
          <Suspense key={item.demo.id} fallback={<DemoFallback />}>
            <DumiDemo {...item} />
          </Suspense>
        )}
      />
    </div>
  );
};

export default DemoWrapper;
