import * as React from 'react';
import { useDelayState, useEvent } from '@rc-component/util';

import copy from '../../_util/copy';
import { isFunction } from '../../_util/is';
import toList from '../../_util/toList';
import type { CopyConfig } from '../Base';

const useCopyClick = ({
  copyConfig,
  children,
}: {
  copyConfig: CopyConfig;
  children?: React.ReactNode;
}) => {
  const [copied, setCopied] = useDelayState(false);

  const [copyLoading, setCopyLoading] = React.useState(false);

  const copyOptions: Pick<CopyConfig, 'format'> = {};
  if (copyConfig.format) {
    copyOptions.format = copyConfig.format;
  }

  // Keep copy action up to date
  const onClick = useEvent(async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCopyLoading(true);
    try {
      const text = isFunction(copyConfig.text) ? await copyConfig.text() : copyConfig.text;
      await copy(text || toList(children, { skipEmpty: true }).join('') || '', copyOptions);
      setCopyLoading(false);

      setCopied(true, true);

      // Trigger tips update
      setCopied(false, { ms: 3000 });

      copyConfig.onCopy?.(e);
    } catch (error) {
      setCopyLoading(false);
      throw error;
    }
  });

  return {
    copied,
    copyLoading,
    onClick,
  };
};

export default useCopyClick;
