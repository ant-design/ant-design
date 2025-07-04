// copied https://github.com/ant-design/ant-design-mobile/blob/d3b3bae/src/utils/with-default-props.tsx
function mergeProps<A, B>(a: A, b: B): B & A;
function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A;
function mergeProps<A, B, C, D>(a: A, b: B, c: C, d: D): D & C & B & A;
function mergeProps(...items: any[]) {
  const ret: any = {};
  items.forEach((item) => {
    if (item) {
      Object.keys(item).forEach((key) => {
        if (item[key] !== undefined) {
          ret[key] = item[key];
        }
      });
    }
  });
  return ret;
}

export default mergeProps;
