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
