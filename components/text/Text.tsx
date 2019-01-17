import * as React from 'react';
import Base, { BaseProps } from './Base';

interface TextProps extends BaseProps {}

const Text: React.SFC<TextProps> = props => <Base {...props} component="span" />;

export default Text;
