type RecordType = Record<string, any>;

function extendsObject<T extends RecordType>(...list: T[]) {
  const result: RecordType = { ...list[0] };

  for (let i = 1; i < list.length; i++) {
    const obj = list[i];
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (val !== undefined) {
          result[key] = val;
        }
      });
    }
  }

  return result;
}

export default extendsObject;
