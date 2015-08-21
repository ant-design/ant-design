export default function getFileItem(file, fileList) {
  let matchWay = (!file.uid) ? 'byName' : 'byUid';
  let target = fileList.filter((item) => {
    if (matchWay === 'byName') {
      return item.filename === file.filename;
    } else {
      return item.uid === file.uid;
    }
  })[0];
  return target;
};
