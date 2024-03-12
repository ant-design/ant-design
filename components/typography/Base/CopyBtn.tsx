import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import classNames from 'classnames';

import type { CopyConfig } from '.';
import TransButton from '../../_util/transButton';
import { type Locale } from '../../locale';
import Tooltip from '../../tooltip';
import { getNode, toList } from './util';

export interface CopyBtnProps extends CopyConfig {
  prefixCls: string;
  copied: boolean;
  locale: Locale['Text'];
  onCopy: React.MouseEventHandler<HTMLDivElement>;
  iconOnly: boolean;
}

export default function CopyBtn(props: CopyBtnProps) {
  const { prefixCls, copied, locale = {}, onCopy, iconOnly, tooltips, icon } = props;

  const tooltipNodes = toList(tooltips);
  const iconNodes = toList(icon);

  const { copied: copiedText, copy: copyText } = locale;

  const copyTitle = copied
    ? getNode(tooltipNodes[1], copiedText)
    : getNode(tooltipNodes[0], copyText);
  const systemStr = copied ? copiedText : copyText;
  const ariaLabel = typeof copyTitle === 'string' ? copyTitle : systemStr;

  return (
    <Tooltip key="copy" title={copyTitle}>
      <TransButton
        className={classNames(`${prefixCls}-copy`, {
          [`${prefixCls}-copy-success`]: copied,
          [`${prefixCls}-copy-icon-only`]: iconOnly,
        })}
        onClick={onCopy}
        aria-label={ariaLabel}
      >
        {copied
          ? getNode(iconNodes[1], <CheckOutlined />, true)
          : getNode(iconNodes[0], <CopyOutlined />, true)}
      </TransButton>
    </Tooltip>
  );
}
