export default function splitObject(obj, parts): Array<any> {
  const left = {};
  const right = {};
  Object.keys(obj).forEach((k) => {
    if (parts.indexOf(k) !== -1) {
      left[k] = obj[k];
    } else {
      right[k] = obj[k];
    }
  });
  return [left, right];
}
