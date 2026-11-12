import * as React from 'react';
import type { FormInstance as RcFormInstance } from '@rc-component/form';
import { useForm as useRcForm } from '@rc-component/form';
import scrollIntoView from 'scroll-into-view-if-needed';

import { isFunction } from '../../_util/is';
import type { InternalNamePath, NamePath, ScrollOptions } from '../interface';
import { getFieldId, toArray } from '../util';

export interface FormInstance<Values = any> extends RcFormInstance<Values> {
  scrollToField: (name: NamePath, options?: ScrollOptions) => void;
  focusField: (name: NamePath) => void;
  /** @internal: This is an internal usage. Do not use in your prod */
  __INTERNAL__: {
    /** No! Do not use this in your code! */
    name?: string;
    /** No! Do not use this in your code! */
    itemRef: (name: InternalNamePath) => (node: React.ReactElement) => void;
  };
  getFieldInstance: (name: NamePath) => any;
}

export function toNamePathStr(name: NamePath) {
  const namePath = toArray(name);
  return namePath.join('_');
}

// Not `instanceof HTMLElement`, which fails for nodes from another realm (e.g. an iframe)
const isElement = (node: any): node is HTMLElement =>
  !!node && typeof node === 'object' && node.nodeType === Node.ELEMENT_NODE;

function getFieldDOMNode(name: NamePath, wrapForm: FormInstance) {
  const field = wrapForm.getFieldInstance(name);

  if (isElement(field?.nativeElement)) {
    return field.nativeElement;
  }
  if (isElement(field)) {
    return field;
  }

  const fieldId = getFieldId(toArray(name), wrapForm.__INTERNAL__.name);
  if (fieldId) {
    return document.getElementById(fieldId);
  }
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
          const { focus, ...restOpt } = options;
          const node = getFieldDOMNode(name, wrapForm);

          if (node) {
            const { behavior, block = 'nearest', inline } = restOpt;
            const nodeWindow = node.ownerDocument?.defaultView;

            // `scroll-into-view-if-needed` measures against the global `window`, so it scrolls
            // to the wrong place when the field is rendered into an iframe (e.g. via portal).
            // https://github.com/ant-design/ant-design/issues/30048
            if (nodeWindow && nodeWindow !== window) {
              node.scrollIntoView({
                block,
                inline,
                behavior: isFunction(behavior) ? undefined : behavior,
              });
            } else {
              scrollIntoView(node, {
                scrollMode: 'if-needed',
                block: 'nearest',
                ...restOpt,
              } as any);
            }

            // Focus if scroll success
            if (focus) {
              wrapForm.focusField(name);
            }
          }
        },
        focusField: (name: NamePath) => {
          const itemRef = wrapForm.getFieldInstance(name);
          if (isFunction(itemRef?.focus)) {
            itemRef.focus();
          } else {
            getFieldDOMNode(name, wrapForm)?.focus?.();
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
