import * as React from 'react';
import Base, { BaseProps } from './Base';

interface ParagraphProps extends BaseProps {}

const Paragraph: React.SFC<ParagraphProps> = props => <Base {...props} component="div" />;

export default Paragraph;
