import type { FormInstance as RcFormInstance } from 'rc-field-form';
import { useForm as useRcForm } from 'rc-field-form';
import * as React from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import type { InternalNamePath, NamePath, ScrollOptions } from '../interface';
import { getFieldId, toArray } from '../util';

export interface FormInstance<Values = any> extends RcFormInstance<Values> {
  scrollToField: (name: NamePath, options?: ScrollOptions) => void;
  /** @internal: This is an internal usage. Do not use in your prod */
  __INTERNAL__: {
    /** No! Do not use this in your code! */
    name?: string;
    /** No! Do not use this in your code! */
    itemRef: (name: InternalNamePath) => (node: React.ReactElement) => void;
  };
  getFieldInstance: (name: NamePath) => any;
}

function toNamePathStr(name: NamePath) {
  const namePath = toArray(name);
  return namePath.join('_');
}

export default function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
  const [rcForm] = useRcForm();
  const itemsRef = React.useRef<Record<string, React.ReactElement>>({});

  const wrapForm: FormInstance<Values> = React.useMemo(
    () =>
      form ?? {
        ...rcForm,
        __INTERNAL__: {
          itemRef: (name: InternalNamePath) => (node: React.ReactElement) => {
            const namePathStr = toNamePathStr(name);
            if (node) {
              itemsRef.current[namePathStr] = node;
            } else {
              delete itemsRef.current[namePathStr];
            }
          },
        },
        scrollToField: (name: NamePath, options: ScrollOptions = {}) => {
          let node: HTMLElement | null = null;
          const fieldRef = wrapForm.getFieldInstance(name);

          /**
           * Starting from 5.17.0, it is added that the dom node is preferably obtained from ref
           * and then obtained according to id.
           */
          if (fieldRef instanceof HTMLElement) {
            node = fieldRef;
          } else if (fieldRef?.nativeElement instanceof HTMLElement) {
            node = fieldRef.nativeElement;
          } else {
            const fieldId = getFieldId(toArray(name), wrapForm.__INTERNAL__.name);
            if (fieldId) {
              node = document.getElementById(fieldId);
            }
          }

          if (node) {
            scrollIntoView(node, {
              scrollMode: 'if-needed',
              block: 'nearest',
              ...options,
            } as any);
          }
        },
        getFieldInstance: (name: NamePath) => {
          const namePathStr = toNamePathStr(name);
          return itemsRef.current[namePathStr];
        },
      },
    [form, rcForm],
  );

  return [wrapForm];
}
