import * as React from 'react';
import devWarning from '../_util/devWarning';
import Base, { BlockProps } from './Base';

export interface TextProps extends BlockProps {
  ellipsis?: boolean;
}

const Text: React.FC<TextProps> = ({ ellipsis, ...restProps }) => {
  devWarning(
    typeof ellipsis !== 'object',
    'Typography.Text',
    '`ellipsis` only supports boolean value.',
  );
  return <Base {...restProps} ellipsis={!!ellipsis} component="span" />;
};

export default Text;
