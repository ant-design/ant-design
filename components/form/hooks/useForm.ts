import * as React from 'react';
import type { FormInstance as RcFormInstance } from 'rc-field-form';
import { useForm as useRcForm } from 'rc-field-form';
import { getDOM } from 'rc-util/lib/Dom/findDOMNode';
import scrollIntoView from 'scroll-into-view-if-needed';

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

function toNamePathStr(name: NamePath) {
  const namePath = toArray(name);
  return namePath.join('_');
}

function getFieldDOMNode(name: NamePath, wrapForm: FormInstance) {
  const field = wrapForm.getFieldInstance(name);
  const fieldDom = getDOM(field);

  if (fieldDom) {
    return fieldDom;
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
          const node = getFieldDOMNode(name, wrapForm);

          if (node) {
            scrollIntoView(node, {
              scrollMode: 'if-needed',
              block: 'nearest',
              ...options,
            } as any);
          }
        },
        focusField: (name: NamePath) => {
          const node = getFieldDOMNode(name, wrapForm);

          if (node) {
            node.focus?.();
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
