import { useRef, useState } from 'react';

export interface UseFileDropProps {
  /** Whether to allow dropping files from the file system */
  allowFileDrop?: boolean;
  /** Callback function for when files are dropped from the file system */
  onFileDrop?: (info: { event: React.DragEvent; nodeKey: string; files: FileList }) => void;
}

export function useFileDrop({ allowFileDrop, onFileDrop }: UseFileDropProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hoverNodeKey, setHoverNodeKey] = useState<string | null>(null);

  // Prevent default behavior for drag events
  const prevent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Get the node key from the event target
  const getNodeKey = (e: React.DragEvent): string | null => {
    let el = e.target as HTMLElement;
    while (el && el !== rootRef.current) {
      if (el.dataset?.key) return el.dataset.key;
      el = el.parentElement as HTMLElement;
    }
    return null;
  };

  const onDragEnter = (e: React.DragEvent) => {
    allowFileDrop && prevent(e);
  };

  const onDragOver = (e: React.DragEvent) => {
    prevent(e);
    e.dataTransfer.dropEffect = 'copy';
    const key = getNodeKey(e);
    if (key) setHoverNodeKey(key);
  };

  const onDrop = (e: React.DragEvent) => {
    if (!allowFileDrop || !onFileDrop) {
      return;
    }
    prevent(e);

    const files = e.dataTransfer.files;
    if (!files.length) {
      return;
    }

    const nodeKey = getNodeKey(e);
    if (!nodeKey) {
      return;
    }

    setHoverNodeKey(null);

    onFileDrop({
      event: e,
      nodeKey,
      files,
    });
  };

  return {
    rootRef,
    hoverNodeKey,
    dropEvents: {
      onDragEnter,
      onDragOver,
      onDrop,
    },
  };
}
