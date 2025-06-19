import { useMemo } from 'react';

import type { PreviewConfig } from '..';
import { devUseWarning } from '../../_util/warning';
import type { GroupPreviewConfig } from '../PreviewGroup';

export default function usePreviewConfig<T extends PreviewConfig | GroupPreviewConfig>(
  preview?: boolean | T,
): [previewConfig: T, rootClassName: string, maskClassName: string] {
  // Get origin preview config
  const rawPreviewConfig = useMemo(() => {
    if (typeof preview === 'boolean') {
      return preview ? {} : null;
    }

    return preview && typeof preview === 'object' ? preview : {};
  }, [preview]) as T;

  const splittedPreviewConfig = useMemo(() => {
    if (!rawPreviewConfig) {
      return [rawPreviewConfig, '', ''];
    }

    const {
      open,
      onOpenChange,
      cover,
      actionsRender,

      visible,
      onVisibleChange,
      rootClassName,
      maskClassName,
      mask,
      forceRender,
      destroyOnClose,
      toolbarRender,

      ...restPreviewConfig
    } = rawPreviewConfig as GroupPreviewConfig &
      Pick<PreviewConfig, 'cover' | 'mask' | 'maskClassName'>;

    let onInternalOpenChange: typeof onOpenChange;
    if (onOpenChange) {
      onInternalOpenChange = onOpenChange;
    } else if (onVisibleChange) {
      onInternalOpenChange = (nextOpen, info) => {
        const { current } = info || {};
        if (current !== undefined) {
          onVisibleChange(nextOpen, !nextOpen, current);
        } else {
          (onVisibleChange as NonNullable<PreviewConfig['onVisibleChange']>)(nextOpen, !nextOpen);
        }
      };
    }

    return [
      {
        ...restPreviewConfig,
        open: open ?? visible,
        onOpenChange: onInternalOpenChange,
        cover: cover ?? mask,
        actionsRender: actionsRender ?? toolbarRender,
      },
      rootClassName,
      maskClassName,
    ];
  }, [rawPreviewConfig]) as [T, string, string];

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Image');

    if (rawPreviewConfig) {
      [
        ['visible', 'open'],
        ['onVisibleChange', 'onOpenChange'],
        ['maskClassName', 'classNames.cover'],
        ['rootClassName', 'classNames.root'],
        ['mask', 'cover'],
        ['toolbarRender', 'actionsRender'],
      ].forEach(([deprecatedName, newName]) => {
        warning.deprecated(!(deprecatedName in rawPreviewConfig), deprecatedName, newName);
      });

      warning(
        !('forceRender' in rawPreviewConfig),
        'breaking',
        '`forceRender` is no longer supported.',
      );
      warning(
        !('destroyOnClose' in rawPreviewConfig),
        'breaking',
        '`destroyOnClose` is no longer supported.',
      );
    }
  }

  return splittedPreviewConfig;
}
