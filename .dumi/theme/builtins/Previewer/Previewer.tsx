import React from 'react';
import type { IPreviewerProps } from 'dumi';
import { LiveProvider, useTabMeta } from 'dumi';

import CodePreviewer from './CodePreviewer';
import DesignPreviewer from './DesignPreviewer';

export interface AntdPreviewerProps extends IPreviewerProps {
  originDebug?: IPreviewerProps['debug'];
}

const Previewer: React.FC<AntdPreviewerProps> = (props) => {
  const tab = useTabMeta();

  if (tab?.frontmatter.title === 'Design') {
    return <DesignPreviewer {...props} />;
  }

  const codePreviewer = <CodePreviewer {...props} />;

  if (props.live === false || props.iframe) {
    return codePreviewer;
  }

  return (
    <LiveProvider
      initialCode={
        Object.entries(props.asset.dependencies).filter(([, { type }]) => type === 'FILE')[0][1]
          .value
      }
      demoId={props.asset.id}
    >
      {codePreviewer}
    </LiveProvider>
  );
};

export default Previewer;
