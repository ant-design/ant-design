import OriText from './Text';
import Title from './Title';
import Paragraph from './Paragraph';

type TextDef = typeof OriText & {
  Title: typeof Title;
  Paragraph: typeof Paragraph;
};

const Text = OriText as TextDef;
Text.Title = Title;
Text.Paragraph = Paragraph;

export default Text;
