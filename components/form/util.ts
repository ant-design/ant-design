import * as React from 'react';
import { useForm as useRcForm, FormInstance as RcFormInstance } from 'rc-field-form';
import scrollIntoView from 'scroll-into-view-if-needed';
import { ScrollOptions } from './interface';

type InternalNamePath = (string | number)[];

/**
 * Always debounce error to avoid [error -> null -> error] blink
 */
export function useCacheErrors(
  errors: React.ReactNode[],
  changeTrigger: (visible: boolean) => void,
  directly: boolean,
): [boolean, React.ReactNode[]] {
  const cacheRef = React.useRef({
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

export interface FormInstance extends RcFormInstance {
  scrollToField: (name: string | number | InternalNamePath, options?: ScrollOptions) => void;
  __INTERNAL__: {
    name?: string;
  };
}

export function useForm(form?: FormInstance): [FormInstance] {
  const wrapForm: FormInstance = form || {
    ...useRcForm()[0],
    __INTERNAL__: {},
    scrollToField: (name: string, options: ScrollOptions = {}) => {
      const namePath = toArray(name);
      const fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
      const node: HTMLElement | null = fieldId ? document.getElementById(fieldId) : null;

      if (node) {
        scrollIntoView(node, {
          scrollMode: 'if-needed',
          block: 'nearest',
          ...options,
        });
      }
    },
  };

  return [wrapForm];
}
