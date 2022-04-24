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

declare module 'rc-util*';

declare module 'rc-checkbox';

declare module 'rc-rate';

declare module 'rc-switch';

declare module '*.json' {
  const value: any;
  export const version: string;
  export default value;
}

declare module 'docsearch-react-fork/style/modal';

declare module 'docsearch-react-fork/modal' {
  import { DocSearchModal as value } from 'docsearch-react-fork';
  export const DocSearchModal = value;
}

declare module 'docsearch.js';
