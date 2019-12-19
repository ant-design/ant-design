// https://github.com/facebook/create-react-app/blob/f09d3d3a52c1b938cecc977c2bbc0942ea0a7e70/packages/react-scripts/lib/react-app.d.ts#L42-L49
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module 'rc-calendar*';

declare module 'rc-time-picker*';

declare module 'rc-pagination/*';

declare module 'omit.js';

declare module 'rc-animate';

declare module 'rc-util*';

declare module 'css-animation*';

declare module 'rc-select';

declare module 'rc-cascader';

declare module 'rc-checkbox';

declare module 'rc-dropdown';

declare module 'rc-editor-mention';

declare module 'rc-tabs*';

declare module 'rc-tree';
declare module 'rc-tree/lib/util';

declare module 'rc-tooltip*';

declare module 'rc-calendar';

declare module 'rc-input-number';

declare module 'rc-collapse';

declare module 'rc-notification';

declare module 'rc-dialog';

declare module 'rc-rate';

declare module 'rc-queue-anim';

declare module 'rc-slider';

declare module 'rc-slider/lib/Slider';

declare module 'rc-slider/lib/Range';

declare module 'rc-slider/lib/Handle';

declare module 'rc-steps';

declare module 'rc-switch';

declare module 'rc-table';

declare module 'rc-tree-select';

declare module 'rc-upload';

declare module 'rc-form*';

declare module 'react-lazy-load';

declare module 'dom-closest';

declare module '*.json' {
  const value: any;
  export const version: string;
  export default value;
}

declare module 'react-copy-to-clipboard';

// https://github.com/ant-design/ant-design/pull/19254
declare module 'react-lifecycles-compat';
