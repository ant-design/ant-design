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
    /** No! Do not use this in your code! */
    itemRef: (name: InternalNamePath) => (node: React.ReactElement) => void;
  };
  getFieldInstance: (name: NamePath) => any;
}

function toNamePathStr(name: NamePath) {
  const namePath = toArray(name);
  return namePath.join('_');
}

export function getNodeByDataScroll(node: HTMLElement, dataScroll: string): HTMLElement {
  let newNode: HTMLElement | null = node.parentElement;
  let rtNode: HTMLElement | null = null;
  let levelCount = 8;
  do {
    if (!newNode) return node;
    // find dom that's classname include ant-form-item-control
    if (newNode?.dataset?.scroll === dataScroll) {
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
        scrollToField: (name: InternalNamePath | HTMLElement, options: ScrollOptions = {}) => {
          let node: HTMLElement | null = null;
          if (Array.isArray(name)) {
            const namePath = toArray(name);
            const fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
            node = fieldId ? document.getElementById(fieldId) : null;
          } else {
            node = name;
          }

          if (node) {
            const newNode = getNodeByDataScroll(node, 'form-item');
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
