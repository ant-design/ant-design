import type { FC } from 'react';
import React from 'react';
import DumiLiveEditor from 'dumi/theme-default/slots/LiveEditor';

const LiveEditor: FC = () => (
  <DumiLiveEditor
    style={{
      fontSize: 13,
      lineHeight: 2,
      fontFamily: `'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    }}
    padding={{
      top: 12,
      right: 16,
      bottom: 12,
      left: 16,
    }}
  />
);

export default LiveEditor;
