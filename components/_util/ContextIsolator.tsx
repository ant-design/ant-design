import React from 'react';

import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import { isReactRenderable } from './is';

const ContextIsolator: React.FC<
  Readonly<React.PropsWithChildren<Partial<Record<'space' | 'form', boolean>>>>
> = (props) => {
  const { space, form, children } = props;
  if (!isReactRenderable(children)) {
    return null;
  }
  let result: React.ReactNode = children;
  if (form) {
    result = (
      <NoFormStyle override status>
        {result}
      </NoFormStyle>
    );
  }
  if (space) {
    result = <NoCompactStyle>{result}</NoCompactStyle>;
  }
  return result;
};

export default ContextIsolator;
