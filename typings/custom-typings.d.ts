declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module 'rc-util*';

declare module 'jsonml-to-react-element';

declare module 'jsonml.js/*';

declare module '*.json' {
  const value: any;
  export const version: string;
  export default value;
}

declare module '@npmcli/run-script' {
  export default function runScript(options: {
    [key: string]: string | string[] | boolean | NodeJS.ProcessEnv;
  }): Promise<void>;
}

declare module '@microflash/rehype-figure';

declare module 'dekko';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string | number}`]: string | number | undefined; // 允许 CSS 变量
  }
}
