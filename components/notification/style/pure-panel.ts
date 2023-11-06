import { genSubStyleComponent } from '../../theme/internal';
import { prepareComponentToken, genNoticeStyle, prepareNotificationToken } from '.';

export default genSubStyleComponent(
  ['Notification', 'PurePanel'],
  (token) => {
    const noticeCls = `${token.componentCls}-notice`;
    const notificationToken = prepareNotificationToken(token);

    return {
      [`${noticeCls}-pure-panel`]: {
        ...genNoticeStyle(notificationToken),
        width: notificationToken.width,
        maxWidth: `calc(100vw - ${notificationToken.notificationMarginEdge * 2}px)`,
        margin: 0,
      },
    };
  },
  prepareComponentToken,
);
