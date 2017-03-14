export function getFileItem(file, fileList) {
  const matchKey = file.uid ? 'uid' : 'name';
  const target = fileList.filter(item => item[matchKey] === file[matchKey])[0];
  return { ...target };
}

export function removeFileItem(file, fileList) {
  const matchKey = file.uid ? 'uid' : 'name';
  const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}
