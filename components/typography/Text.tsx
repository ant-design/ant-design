import * as React from 'react';

import Base, { BlockProps } from './Base';

import warning from '../_util/warning';

interface TextProps extends BlockProps {
  ellipsis?: boolean;
}

const Text: React.SFC<TextProps> = ({ ellipsis, ...restProps }) => {
  warning(
    typeof ellipsis !== 'object',
    'Typography.Text',
    '`ellipsis` is only support boolean value.',
  );
  return <Base {...restProps} ellipsis={!!ellipsis} component="span" />;
};

export default Text;
