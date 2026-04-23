import { prepareComponentToken, prepareNotificationToken } from '.';
import { genNoticeStyle } from './notice';
import { genSubStyleComponent } from '../../theme/internal';

export default genSubStyleComponent(
  ['Notification', 'PurePanel'],
  (token) => {
    const noticeCls = `${token.componentCls}-notice`;
    const notificationToken = prepareNotificationToken(token);

    return {
      [`${noticeCls}-pure-panel`]: {
        width: notificationToken.width,
        maxWidth: '100%',
        margin: 0,

        [noticeCls]: {
          ...genNoticeStyle(notificationToken),
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
        },
      },
    };
  },
  prepareComponentToken,
);
