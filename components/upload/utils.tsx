export function T() {
  return true;
}

// Fix IE file.status problem
// via coping a new Object
export function fileToObject(file): any {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0,
    originFileObj: file,
    status: null,
  };
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
export function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return function (s) {
    let start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start * 100;
  };
}

export function getFileItem(file, fileList) {
  const matchKey = file.uid ? 'uid' : 'name';
  return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}

export function removeFileItem(file, fileList) {
  const matchKey = file.uid ? 'uid' : 'name';
  const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}
