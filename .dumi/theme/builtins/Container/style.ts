import { createStyles } from 'antd-style';

const useStyles = createStyles(({ prefixCls, css }) => ({
  container: css`
      margin: 8px 0;
    `,

  alert: css`
      .${prefixCls}-alert-message {
        font-weight: bold;
      }
    `,

  /* 使用 `&&` 加一点点权重 */
  desc: css`
       && p {
        margin: 0;
      }
    `,
}));

export default useStyles;
