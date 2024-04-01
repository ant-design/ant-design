import * as React from 'react';
import copy from 'copy-to-clipboard';

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

  return {
    copied,
    copyLoading,
    onClick: async (e?: React.MouseEvent<HTMLDivElement>) => {
      e?.preventDefault();
      e?.stopPropagation();
      setCopyLoading(true);
      try {
        const text =
          typeof copyConfig.text === 'function' ? await copyConfig.text() : copyConfig.text;
        copy(text || String(children) || '', copyOptions);
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
    },
  };
};

export default useCopyClick;
