import { unit } from '@ant-design/cssinjs';

import { genNoticeStyle, prepareComponentToken, prepareNotificationToken } from '.';
import { genSubStyleComponent } from '../../theme/internal';

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
