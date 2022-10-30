/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import type {
  InternalNamePath,
  Store,
  ValuedNotifyInfo,
  FieldEntity,
  NamePath,
} from 'rc-field-form/es/interface';
import * as valueUtil from 'rc-field-form/es/utils/valueUtil';
import { isPlainObject } from '../util';

const { getValue, containsNamePath } = valueUtil;

export type Trigger = 'exact' | 'contain' | 'lower' | 'all';
export type ChangeType = 'valueUpdate' | 'reset' | 'setField';

export interface ChangeInfo {
  prevStore: any;
  curStore: any;
  namePathList: InternalNamePath[];
  type: ChangeType;
}

export interface FieldEntityOptions {
  names: InternalNamePath[];
  trigger?: Trigger;
  requirePathExist?: boolean;
}

abstract class AbstractFakeField implements FieldEntity {
  props: { name?: NamePath };

  protected readonly names: InternalNamePath[];

  protected readonly trigger: Trigger | undefined;

  protected readonly requirePathExist: boolean = true;

  protected constructor(options: FieldEntityOptions) {
    const { names, requirePathExist, trigger } = options;
    this.props = { name: ['FAKE_FIELD'] };
    this.names = names;
    this.trigger = trigger ?? this.trigger;
    this.requirePathExist = requirePathExist ?? this.requirePathExist;
  }

  getWarnings: () => string[];

  getErrors = () => [];

  getMeta = () => ({
    touched: false,
    validating: false,
    errors: [],
    warnings: [],
    name: ['FAKE_FIELD'],
  });

  getNamePath = () => ['FAKE_FIELD'];

  isFieldDirty = () => false;

  isFieldTouched = () => false;

  isFieldValidating = () => false;

  isPreserve = () => false;

  validateRules = () => Promise.resolve([]);

  isList = () => false;

  isListField = () => false;

  onStoreChange = (
    prevStore: Store,
    namePathList: InternalNamePath[] | null,
    info: ValuedNotifyInfo,
  ) => {
    if (info.type !== 'valueUpdate' && info.type !== 'reset' && info.type !== 'setField') {
      return;
    }
    // 如果 namePathList 是 null，则可以认为一定是调用了原生的 resetFields 或 setFieldsValue
    // 所以我们手动设置一个 namePathList 为 [[]] 代表该变更是最顶层设置，方便后续判断
    const _namePathList = namePathList || [[]];
    for (const name of this.names) {
      if (this.shouldTrigger(name, prevStore, _namePathList, info)) {
        this.onValueChange({
          namePathList: _namePathList,
          prevStore,
          curStore: info.store,
          type: info.type,
        });
        return;
      }
    }
  };

  private shouldTrigger = (
    name: InternalNamePath,
    prevStore: Store,
    namePathList: InternalNamePath[],
    info: ValuedNotifyInfo,
  ) => {
    if (this.requirePathExist && !this.pathExist(info.store, name)) {
      return false;
    }
    const prevValue = getValue(prevStore, name);
    const curValue = getValue(info.store, name);
    if (prevValue === curValue) {
      return false;
    }
    // 如果定义了 trigger，则按照 trigger 指定的规则决定是否触发回调
    if (this.trigger) {
      return this.checkTrigger(name, namePathList);
    }
    // 如果没有定义 trigger，则进行两个判断
    // 1. 变更的 namePath 是否为该 FakeField 的祖先（包含自身），否则不执行回调
    //    因为如果变更的路径不是该 FakeField 的祖先（包含自身），则这个变更和该 FakeField 没有半毛钱关系
    // 2. 如果第一条成立，则判断从变更路径到该 FakeField 之间是否存在数组，有则不执行回调
    //    如果存在数组，有三种情况
    //    a. 该数组未被更新，这种情况下无需触发
    //    b. 该数组是被 FormList 内部方法更新的，数组里的值不会变，也不需要触发
    //    c. 该数组从外部被设置了值，比如 setFieldsValue({arr: [..]})，这种情况 FormList 会重置 key，所有子组件全部重新渲染，所以也无需触发了
    //    综上所述，如果存在数组，则无需触发回调
    return this.isContain(name, namePathList) && !this.isUnderList(name, namePathList, prevStore);
  };

  /** – 根据 trigger 检查当前变更的 namePath，判断是否需要触发更新 – */
  private checkTrigger = (name: InternalNamePath, namePathList: InternalNamePath[]) => {
    switch (this.trigger) {
      case 'contain':
        return this.isContain(name, namePathList);
      case 'exact':
        return this.isEqual(name, namePathList);
      case 'lower':
        return this.isLower(name, namePathList);
      default:
        return true;
    }
  };

  /** – namePath 正好相同 – */
  private isEqual = (path: InternalNamePath, namePathList: InternalNamePath[]) =>
    !!namePathList && containsNamePath(namePathList, path);

  /** – 变更的 namePath 是该实例 namePath 的子路径 – */
  private isLower = (path: InternalNamePath, namePathList: InternalNamePath[]) => {
    if (!namePathList) {
      return false;
    }
    for (const namePath of namePathList) {
      if (namePath.length >= path.length && path.every((item, i) => item === namePath[i])) {
        return true;
      }
    }
    return false;
  };

  /** – 该实例的 namePath 是变更的 namePath 的子路径 – */
  private isContain = (path: InternalNamePath, namePathList: InternalNamePath[]) => {
    for (const namePath of namePathList) {
      if (namePath.every((item, i) => item === path[i])) {
        return true;
      }
    }
    return false;
  };

  /** – 变更的路径和本 FakeField 之间是否存在数组 – */
  private isUnderList = (
    name: InternalNamePath,
    namePathList: InternalNamePath[],
    prevStore: Store,
  ) => {
    const [namePath] = namePathList;
    if (namePath.length >= name.length) {
      return false;
    }
    let i = namePath.length;
    let value = getValue(prevStore, namePath);
    do {
      if (!value) {
        return false;
      }
      if (Array.isArray(value)) {
        return true;
      }
      value = value[name[i++]];
    } while (i < name.length);
    return false;
  };

  /** – form store 是否能触达 namePath – */
  private pathExist = (store: Store, namePath: InternalNamePath) => {
    let track = store;
    const parentNamePath = namePath.slice(0, namePath.length - 1);
    for (const path of parentNamePath) {
      if (!isPlainObject(track) && !Array.isArray(track)) {
        return false;
      }
      track = track[path];
    }
    return true;
  };

  abstract onValueChange(changeInfo: ChangeInfo): void;
}

/** – 模拟 Field 实现类 – */
class FakeField extends AbstractFakeField {
  private readonly onChange: (changeInfo: ChangeInfo) => void;

  constructor(onChange: (changeInfo: ChangeInfo) => void, options: FieldEntityOptions) {
    super(options);
    this.onChange = onChange;
  }

  onValueChange(changeInfo: ChangeInfo) {
    this.onChange(changeInfo);
  }
}
export { AbstractFakeField, FakeField };
