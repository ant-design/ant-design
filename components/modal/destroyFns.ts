// todo: maybe use WeakMap? but destroyAll must needs keys
const destroyFns = new Map<DocumentFragment, VoidFunction>();
export default destroyFns;
