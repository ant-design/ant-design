import * as React from 'react';
import Base, { BlockProps } from './Base';

export interface ParagraphProps extends BlockProps {}

const Paragraph: React.FC<ParagraphProps> = props => <Base {...props} component="div" />;

export default Paragraph;
