import * as React from 'react';
import Base, { BlockProps } from './Base';

interface ParagraphProps extends BlockProps {}

const Paragraph: React.SFC<ParagraphProps> = props => <Base {...props} component="div" />;

export default Paragraph;
