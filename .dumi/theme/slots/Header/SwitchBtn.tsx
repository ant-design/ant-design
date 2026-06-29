import React from 'react';
import { omit } from '@rc-component/util';
import { Button, Tooltip } from 'antd';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';

export interface SwitchBtnProps {
  label1: React.ReactNode;
  label2: React.ReactNode;
  tooltip1?: React.ReactNode;
  tooltip2?: React.ReactNode;
  value: 1 | 2;
  pure?: boolean;
  onClick?: React.MouseEventHandler;
  'aria-label'?: string;
  className?: string;
}

const BASE_SIZE = '1.2em';

const styles = createStaticStyles(({ cssVar, css }) => {
  return {
    btn: css`
      width: ${cssVar.controlHeight};
      .btn-inner {
        transition: all ${cssVar.motionDurationMid};
        display: flex;
      }
      img {
        width: ${BASE_SIZE};
        height: ${BASE_SIZE};
      }
    `,
    innerDiv: css`
      position: relative;
      width: ${BASE_SIZE};
      height: ${BASE_SIZE};
    `,
    labelStyle: css`
      position: absolute;
      font-size: ${BASE_SIZE};
      line-height: 1;
      border: 1px solid ${cssVar.colorText};
      color: ${cssVar.colorText};
    `,
    label1Style: css`
      inset-inline-start: -5%;
      top: 0;
      z-index: 1;
      background-color: ${cssVar.colorText};
      color: ${cssVar.colorBgContainer};
      transform: scale(0.7);
      transform-origin: 0 0;
    `,
    label2Style: css`
      inset-inline-end: -5%;
      bottom: 0;
      z-index: 0;
      transform: scale(0.5);
      transform-origin: 100% 100%;
    `,
  };
});

const SwitchBtn: React.FC<SwitchBtnProps> = (props) => {
  const { label1, label2, tooltip1, tooltip2, value, pure, onClick, ...rest } = props;

  const { btn, innerDiv, labelStyle, label1Style, label2Style } = styles;

  const node = (
    <Button
      type="text"
      onClick={onClick}
      className={btn}
      key="lang-button"
      {...omit(rest, ['className'])}
    >
      <div className="btn-inner">
        {pure && (value === 1 ? label1 : label2)}
        {!pure && (
          <div className={innerDiv}>
            <span className={clsx(labelStyle, value === 1 ? label1Style : label2Style)}>
              {label1}
            </span>
            <span className={clsx(labelStyle, value === 1 ? label2Style : label1Style)}>
              {label2}
            </span>
          </div>
        )}
      </div>
    </Button>
  );

  if (tooltip1 || tooltip2) {
    return <Tooltip title={value === 1 ? tooltip1 : tooltip2}>{node}</Tooltip>;
  }

  return node;
};

export default SwitchBtn;
