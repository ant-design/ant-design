import * as React from 'react';
import Base, { BaseProps } from './Base';

interface ParagraphProps extends BaseProps {}

const Paragraph: React.SFC<ParagraphProps> = (props: ParagraphProps) => (
  <Base {...props} component="p" />
);

export default Paragraph;
