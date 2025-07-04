import { createStyles } from 'antd-style';

const useStyles = createStyles(({ prefixCls, css }) => ({
  alert: css`
    padding: 12px 16px;
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
