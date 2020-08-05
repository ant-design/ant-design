import OriginTypography from './Typography';
import Text from './Text';
import Link from './Link';
import Title from './Title';
import Paragraph from './Paragraph';
import * as VarnishAdditions from './varnish'; // Added by Varnish

export type TypographyProps = typeof OriginTypography & {
  Text: typeof Text;
  Link: typeof Link;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
  BodyJumbo: typeof VarnishAdditions.BodyJumbo; // Added by Varnish
  Body: typeof VarnishAdditions.Body;
  BodyBig: typeof VarnishAdditions.BodyBig;
  BodyBold: typeof VarnishAdditions.BodyBold;
  BodySmall: typeof VarnishAdditions.BodySmall;
  BodySmallBold: typeof VarnishAdditions.BodySmallBold;
  BodyMicro: typeof VarnishAdditions.BodyMicro;
  Notification: typeof VarnishAdditions.Notification;
  NotificationBold: typeof VarnishAdditions.NotificationBold;
  Quote: typeof VarnishAdditions.Quote;
  Author: typeof VarnishAdditions.Author;
  Code: typeof VarnishAdditions.Code;
  InlineCode: typeof VarnishAdditions.InlineCode;
};

const Typography = OriginTypography as TypographyProps;
Typography.Text = Text;
Typography.Link = Link;
Typography.Title = Title;
Typography.Paragraph = Paragraph;
Object.assign(Typography, VarnishAdditions); // Added by Varnish

export default Typography;
