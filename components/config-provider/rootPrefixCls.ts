class RootPrefixCls {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  get() {
    return this.value;
  }

  set(value: string) {
    this.value = value;
  }
}

export default new RootPrefixCls('ant');
