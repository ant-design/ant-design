import React from 'react';
import { getSandpackCssText, Sandpack as OriginSandpack } from '@codesandbox/sandpack-react';
import { useServerInsertedHTML } from 'dumi';

const Sandpack: React.FC<React.ComponentProps<typeof OriginSandpack>> = (props) => {
  useServerInsertedHTML(() => (
    <style
      data-sandpack="true"
      id="sandpack"
      dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
    />
  ));

  return <OriginSandpack {...props} />;
};

export default Sandpack;
