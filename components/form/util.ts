import * as React from 'react';
import { useRef } from 'react';
import raf from 'raf';
import { InternalNamePath } from './interface';

/**
 * Always debounce error to avoid [error -> null -> error] blink
 */
export function useCacheErrors(
  errors: React.ReactNode[],
  changeTrigger: (visible: boolean) => void,
  directly: boolean,
): [boolean, React.ReactNode[]] {
  const cacheRef = useRef({
    errors,
    visible: !!errors.length,
  });

  const [, forceUpdate] = React.useState({});

  const update = () => {
    const prevVisible = cacheRef.current.visible;
    const newVisible = !!errors.length;

    const prevErrors = cacheRef.current.errors;
    cacheRef.current.errors = errors;
    cacheRef.current.visible = newVisible;

    if (prevVisible !== newVisible) {
      changeTrigger(newVisible);
    } else if (
      prevErrors.length !== errors.length ||
      prevErrors.some((prevErr, index) => prevErr !== errors[index])
    ) {
      forceUpdate({});
    }
  };

  React.useEffect(() => {
    if (!directly) {
      const timeout = setTimeout(update, 10);
      return () => clearTimeout(timeout);
    }
  }, [errors]);

  if (directly) {
    update();
  }

  return [cacheRef.current.visible, cacheRef.current.errors];
}

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return [];

  return Array.isArray(candidate) ? candidate : [candidate];
}

export function getFieldId(namePath: InternalNamePath, formName?: string): string | undefined {
  if (!namePath.length) return undefined;

  const mergedId = namePath.join('_');
  return formName ? `${formName}_${mergedId}` : mergedId;
}

type Updater<ValueType> = (prev?: ValueType) => ValueType;

export function useFrameState<ValueType>(
  defaultValue: ValueType,
): [ValueType, (updater: Updater<ValueType>) => void] {
  const [value, setValue] = React.useState(defaultValue);
  const frameRef = useRef<number | null>(null);
  const batchRef = useRef<Updater<ValueType>[]>([]);
  const destroyRef = useRef(false);

  React.useEffect(
    () => () => {
      destroyRef.current = true;
      raf.cancel(frameRef.current!);
    },
    [],
  );

  function setFrameValue(updater: Updater<ValueType>) {
    if (destroyRef.current) {
      return;
    }

    if (frameRef.current === null) {
      batchRef.current = [];
      frameRef.current = raf(() => {
        frameRef.current = null;
        setValue(prevValue => {
          let current = prevValue;

          batchRef.current.forEach(func => {
            current = func(current);
          });

          return current;
        });
      });
    }

    batchRef.current.push(updater);
  }

  return [value, setFrameValue];
}
