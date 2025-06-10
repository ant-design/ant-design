import * as React from 'react';
import copy from 'copy-to-clipboard';
import useEvent from 'rc-util/lib/hooks/useEvent';

import toList from '../../_util/toList';
import type { CopyConfig } from '../Base';

const useCopyClick = ({
  copyConfig,
  children,
}: {
  copyConfig: CopyConfig;
  children?: React.ReactNode;
}) => {
  const [copied, setCopied] = React.useState(false);

  const [copyLoading, setCopyLoading] = React.useState(false);

  const copyIdRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanCopyId = () => {
    if (copyIdRef.current) {
      clearTimeout(copyIdRef.current);
    }
  };

  const copyOptions: Pick<CopyConfig, 'format'> = {};
  if (copyConfig.format) {
    copyOptions.format = copyConfig.format;
  }

  React.useEffect(() => cleanCopyId, []);

  // Keep copy action up to date
  const onClick = useEvent(async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCopyLoading(true);
    try {
      const text =
        typeof copyConfig.text === 'function' ? await copyConfig.text() : copyConfig.text;
      copy(text || toList(children, true).join('') || '', copyOptions);
      setCopyLoading(false);

      setCopied(true);

      // Trigger tips update
      cleanCopyId();
      copyIdRef.current = setTimeout(() => {
        setCopied(false);
      }, 3000);

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
