export default function splitObject(obj, parts) {
  let left = {};
  let right = {};
  Object.keys(obj).forEach((k)=> {
    if (parts.indexOf(k) !== -1) {
      left[k] = obj[k];
    } else {
      right = obj[k];
    }
  });
  return [left, right];
}