import { genSubStyleComponent } from '../../theme/internal';
import { prepareComponentToken, genNoticeStyle, prepareNotificationToken } from '.';
import { unit } from '@ant-design/cssinjs';

export default genSubStyleComponent(
  ['Notification', 'PurePanel'],
  (token) => {
    const noticeCls = `${token.componentCls}-notice`;
    const notificationToken = prepareNotificationToken(token);

    return {
      [`${noticeCls}-pure-panel`]: {
        ...genNoticeStyle(notificationToken),
        width: notificationToken.width,
        maxWidth: `calc(100vw - ${unit(
          token.calc(notificationToken.notificationMarginEdge).mul(2).equal(),
        )})`,
        margin: 0,
      },
    };
  },
  prepareComponentToken,
);
