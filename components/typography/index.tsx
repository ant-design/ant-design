import OriTypography from './Typography';
import Text from './Text';
import Title from './Title';
import Paragraph from './Paragraph';

type TypographyProps = typeof OriTypography & {
  Text: typeof Text;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
};

const Typography = OriTypography as TypographyProps;
Typography.Text = Text;
Typography.Title = Title;
Typography.Paragraph = Paragraph;

export default Typography;
