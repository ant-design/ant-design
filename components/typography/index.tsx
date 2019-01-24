import Text from './Text';
import Title from './Title';
import Paragraph from './Paragraph';

interface TypographyProps {
  Text: typeof Text;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
}

const Typography: TypographyProps = {
  Text,
  Title,
  Paragraph,
};

export default Typography;
