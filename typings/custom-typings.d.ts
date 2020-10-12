// https://github.com/facebook/create-react-app/blob/f09d3d3a52c1b938cecc977c2bbc0942ea0a7e70/packages/react-scripts/lib/react-app.d.ts#L42-L49
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module 'bisheng/collect';

declare module 'bisheng/router';

declare module 'react-github-button';

declare module 'jsonml.js/*';

declare module 'rc-pagination/*';

declare module 'omit.js';

declare module 'rc-animate*';

declare module 'rc-util*';

declare module '@ant-design/css-animation*';

declare module 'rc-checkbox';

declare module 'rc-radio';

declare module 'rc-editor-mention';

declare module 'rc-tabs*';

declare module 'rc-tree/lib/util';

declare module 'rc-input-number';

declare module 'rc-collapse';

declare module 'rc-dialog';

declare module 'rc-rate';

declare module 'rc-queue-anim';

declare module 'rc-steps';

declare module 'rc-switch';

declare module 'rc-upload';

declare module '*.json' {
  const value: any;
  export const version: string;
  export default value;
}
