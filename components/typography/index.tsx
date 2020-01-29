import OriginTypography from './Typography';
import Text from './Text';
import Title from './Title';
import Paragraph from './Paragraph';

export type TypographyProps = typeof OriginTypography & {
  Text: typeof Text;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
};

const Typography = OriginTypography as TypographyProps;
Typography.Text = Text;
Typography.Title = Title;
Typography.Paragraph = Paragraph;

export default Typography;
