import { isValidElement, useMemo } from 'react';

import type { PreviewConfig } from '..';
import type { MaskType } from '../../_util/hooks';
import { devUseWarning } from '../../_util/warning';
import type { GroupPreviewConfig } from '../PreviewGroup';

function normalizeMask(mask?: MaskType | React.ReactNode) {
  if (isValidElement(mask)) {
    return [mask, undefined];
  }
  if (typeof mask === 'boolean' || (mask && typeof mask === 'object')) {
    return [undefined, mask];
  }
  return [undefined, undefined];
}

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
      forceRender: _forceRender,
      destroyOnClose: _destroyOnClose,
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

    const [coverElement, maskConfig] = normalizeMask(mask);

    return [
      {
        ...restPreviewConfig,
        open: open ?? visible,
        onOpenChange: onInternalOpenChange,
        cover: cover ?? coverElement,
        mask: maskConfig,
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
        ['toolbarRender', 'actionsRender'],
      ].forEach(([deprecatedName, newName]) => {
        warning.deprecated(!(deprecatedName in rawPreviewConfig), deprecatedName, newName);
      });
      warning(
        !isValidElement(rawPreviewConfig.mask),
        'deprecated',
        '`mask` used as ReactNode is deprecated. Please use `cover` instead.',
      );
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
