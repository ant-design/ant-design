import React from 'react';

import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';

const ContextIsolator: React.FC<
  Readonly<
    React.PropsWithChildren<Partial<Record<'isolateSpaceContext' | 'isolateFormContext', boolean>>>
  >
> = (props) => {
  const { isolateSpaceContext, isolateFormContext, children } = props;
  if (children === undefined || children === null) {
    return null;
  }
  let result: React.ReactNode = children;
  if (isolateFormContext) {
    result = (
      <NoFormStyle override status>
        {result}
      </NoFormStyle>
    );
  }
  if (isolateSpaceContext) {
    result = <NoCompactStyle>{result}</NoCompactStyle>;
  }
  return result;
};

export default ContextIsolator;
