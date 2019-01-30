import * as React from 'react';
import Base, { BlockProps } from './Base';

interface TextProps extends BlockProps {}

const Text: React.SFC<TextProps> = props => <Base {...props} component="span" />;

export default Text;
