import * as React from 'react';
import { useForm as useRcForm, FormInstance as RcFormInstance } from 'rc-field-form';
import scrollIntoView from 'scroll-into-view-if-needed';
import { ScrollOptions, NamePath, InternalNamePath } from '../interface';
import { toArray, getFieldId } from '../util';

export interface FormInstance<Values = any> extends RcFormInstance<Values> {
  scrollToField: (name: NamePath | HTMLElement, options?: ScrollOptions) => void;
  /** This is an internal usage. Do not use in your prod */
  __INTERNAL__: {
    /** No! Do not use this in your code! */
    name?: string;
    prefixCls?: string;
    /** No! Do not use this in your code! */
    itemRef: (name: InternalNamePath) => (node: React.ReactElement) => void;
  };
  getFieldInstance: (name: NamePath) => any;
}

function toNamePathStr(name: NamePath) {
  const namePath = toArray(name);
  return namePath.join('_');
}

export function getNodeByClass(node: HTMLElement, className: string): HTMLElement {
  let newNode: HTMLElement | null = node.parentElement;
  let rtNode: HTMLElement | null = null;
  let levelCount = 8;
  do {
    if (!newNode) return node;
    // find dom that's classname include ant-form-item-control
    if (newNode?.className.split(' ').includes(className)) {
      rtNode = newNode;
      break;
    }
    newNode = newNode.parentElement;
    levelCount--;
  } while (levelCount);
  return rtNode || node;
}

export default function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
  const [rcForm] = useRcForm();
  const itemsRef = React.useRef<Record<string, React.ReactElement>>({});

  const wrapForm: FormInstance<Values> = React.useMemo(
    () =>
      form || {
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
        scrollToField: (name: string | HTMLElement, options: ScrollOptions = {}) => {
          let node: HTMLElement | null = null;
          if (typeof name === 'string') {
            const namePath = toArray(name);
            const fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
            node = fieldId ? document.getElementById(fieldId) : null;
          } else {
            node = name;
          }

          if (node) {
            const newNode = getNodeByClass(node, `${wrapForm.__INTERNAL__.prefixCls}-item-control`);
            scrollIntoView(newNode, {
              scrollMode: 'if-needed',
              block: 'nearest',
              ...options,
            });
          }
        },
        getFieldInstance: (name: string) => {
          const namePathStr = toNamePathStr(name);
          return itemsRef.current[namePathStr];
        },
      },
    [form, rcForm],
  );

  return [wrapForm];
}
