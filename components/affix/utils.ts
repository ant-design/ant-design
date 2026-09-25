export type BindElement = HTMLElement | Window | null | undefined;

export type AffixStackDirection = 'top' | 'bottom';

export interface AffixStackEntry {
  offsetBottom?: number;
  offsetTop?: number;
  placeholder: HTMLElement;
  updatePosition: () => void;
}

type AffixTarget = Exclude<BindElement, null | undefined>;

const stackRegistry = new WeakMap<AffixTarget, Set<AffixStackEntry>>();

export function getTargetRect(target: BindElement): DOMRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, bottom: window.innerHeight } as DOMRect);
}

export function getFixedTop(placeholderRect: DOMRect, targetRect: DOMRect, offsetTop?: number) {
  if (
    offsetTop !== undefined &&
    Math.round(targetRect.top) > Math.round(placeholderRect.top) - offsetTop
  ) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}

export function getFixedBottom(
  placeholderRect: DOMRect,
  targetRect: DOMRect,
  offsetBottom?: number,
) {
  if (
    offsetBottom !== undefined &&
    Math.round(targetRect.bottom) < Math.round(placeholderRect.bottom) + offsetBottom
  ) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}

export function notifyAffixStack(target: AffixTarget, source?: AffixStackEntry) {
  stackRegistry.get(target)?.forEach((entry) => {
    if (entry !== source) {
      entry.updatePosition();
    }
  });
}

export function registerAffixStack(target: AffixTarget, entry: AffixStackEntry) {
  let entries = stackRegistry.get(target);
  if (!entries) {
    entries = new Set();
    stackRegistry.set(target, entries);
  }

  entries.add(entry);
  notifyAffixStack(target, entry);

  return () => {
    const currentEntries = stackRegistry.get(target);
    currentEntries?.delete(entry);

    if (!currentEntries?.size) {
      stackRegistry.delete(target);
    } else {
      notifyAffixStack(target);
    }
  };
}

export function getStackOffset(
  target: AffixTarget,
  targetRect: DOMRect,
  currentEntry: AffixStackEntry,
  direction: AffixStackDirection,
) {
  const getOffset = (entry: AffixStackEntry) =>
    direction === 'top' ? entry.offsetTop : entry.offsetBottom;
  const entries = Array.from(stackRegistry.get(target) || []).filter(
    (entry) => getOffset(entry) !== undefined,
  );

  entries.sort((a, b) => {
    const position = a.placeholder.compareDocumentPosition(b.placeholder);
    let order = 0;

    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
      order = -1;
    } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
      order = 1;
    }

    return direction === 'top' ? order : -order;
  });

  let nextOffset: number | undefined;

  for (const entry of entries) {
    const entryOffset = getOffset(entry)!;
    const offset = nextOffset === undefined ? entryOffset : Math.max(entryOffset, nextOffset);
    if (entry === currentEntry) {
      return offset;
    }

    const placeholderRect = getTargetRect(entry.placeholder);
    const fixedPosition =
      direction === 'top'
        ? getFixedTop(placeholderRect, targetRect, offset)
        : getFixedBottom(placeholderRect, targetRect, offset);

    if (fixedPosition !== undefined) {
      nextOffset = offset + placeholderRect.height;
    }
  }

  return getOffset(currentEntry);
}
