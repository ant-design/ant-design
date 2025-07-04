import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';

import type { CopyConfig } from '.';
import type { Locale } from '../../locale';
import Tooltip from '../../tooltip';
import { getNode, toList } from './util';

export interface CopyBtnProps extends Omit<CopyConfig, 'onCopy'> {
  prefixCls: string;
  copied: boolean;
  locale: Locale['Text'];
  onCopy: React.MouseEventHandler<HTMLButtonElement>;
  iconOnly: boolean;
  loading: boolean;
}

const CopyBtn: React.FC<CopyBtnProps> = ({
  prefixCls,
  copied,
  locale,
  iconOnly,
  tooltips,
  icon,
  tabIndex,
  onCopy,
  loading: btnLoading,
}) => {
  const tooltipNodes = toList(tooltips);
  const iconNodes = toList(icon);
  const { copied: copiedText, copy: copyText } = locale ?? {};
  const systemStr = copied ? copiedText : copyText;
  const copyTitle = getNode(tooltipNodes[copied ? 1 : 0], systemStr);
  const ariaLabel = typeof copyTitle === 'string' ? copyTitle : systemStr;

  return (
    <Tooltip title={copyTitle}>
      <button
        type="button"
        className={classNames(`${prefixCls}-copy`, {
          [`${prefixCls}-copy-success`]: copied,
          [`${prefixCls}-copy-icon-only`]: iconOnly,
        })}
        onClick={onCopy}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
      >
        {copied
          ? getNode(iconNodes[1], <CheckOutlined />, true)
          : getNode(iconNodes[0], btnLoading ? <LoadingOutlined /> : <CopyOutlined />, true)}
      </button>
    </Tooltip>
  );
};

export default CopyBtn;
