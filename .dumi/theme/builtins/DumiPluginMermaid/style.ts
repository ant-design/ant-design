import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, prefixCls, token }) => ({
  wrapper: css`
    overflow: hidden;
    border: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;

    && > .dumi-default-source-code {
      margin: 0;
      border-radius: 0;
    }
  `,
  preview: css`
    padding: 1em;
    cursor: zoom-in;
  `,
  header: css`
    display: flex;
    justify-content: flex-end;
    padding: ${token.paddingXS}px ${token.paddingSM}px;
    border-block-end: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
    background: ${token.colorFillQuaternary};
  `,
  previewActions: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${token.paddingXS}px;

    .${prefixCls}-image-preview-actions {
      color: ${token.colorText};
      background: ${token.colorBgElevated};
      box-shadow: ${token.boxShadowSecondary};

      .${prefixCls}-image-preview-actions-action {
        color: ${token.colorText};

        &:not(.${prefixCls}-image-preview-actions-action-disabled):hover {
          color: ${token.colorPrimary};
          background: ${token.colorPrimaryBgHover};
        }

        &-disabled,
        &:disabled {
          color: ${token.colorTextDisabled};
        }
      }
    }
  `,
  backgroundOptions: css`
    display: flex;
    gap: ${token.paddingXS}px;
    padding: ${token.paddingXS}px ${token.paddingSM}px;
    background: ${token.colorBgElevated};
    border-radius: 100px;
    box-shadow: ${token.boxShadowSecondary};
  `,
  backgroundOption: css`
    width: ${token.controlHeightXS}px;
    height: ${token.controlHeightXS}px;
    padding: 0;
    border: ${token.lineWidth}px ${token.lineType} ${token.colorBorder};
    border-radius: ${token.borderRadiusSM}px;
    box-shadow: inset 0 0 0 ${token.lineWidth}px ${token.colorBorderSecondary};
    cursor: pointer;

    &[data-transparent='true'] {
      background-color: ${token.colorBgContainer};
      background-image: conic-gradient(
        ${token.colorFillSecondary} 25%,
        transparent 25% 50%,
        ${token.colorFillSecondary} 50% 75%,
        transparent 75% 100%
      );
      background-size: 50% 50%;
    }

    &[aria-pressed='true'] {
      outline: ${token.lineWidthFocus}px solid ${token.colorPrimaryBorder};
      outline-offset: ${token.lineWidth}px;
    }

    &:focus-visible {
      outline: ${token.lineWidthFocus}px solid ${token.colorPrimaryBorder};
      outline-offset: ${token.lineWidth}px;
    }
  `,
}));

export default useStyles;
