import Link from './Link';
import Paragraph from './Paragraph';
import Shimmer from './Shimmer';
import Text from './Text';
import Title from './Title';
import OriginTypography from './Typography';

export type { TypographyProps } from './Typography';

type CompoundedComponent = typeof OriginTypography & {
  Text: typeof Text;
  Link: typeof Link;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
  Shimmer: typeof Shimmer;
};

const Typography = OriginTypography as CompoundedComponent;
Typography.Text = Text;
Typography.Link = Link;
Typography.Title = Title;
Typography.Paragraph = Paragraph;
Typography.Shimmer = Shimmer;

export default Typography;
