import { RcFile, UploadFile } from './interface';

export function T() {
  return true;
}

// Fix IE file.status problem
// via coping a new Object
export function fileToObject(file: RcFile): UploadFile {
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file,
  } as UploadFile;
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
export function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return function(s: number) {
    let start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start;
  };
}

export function getFileItem(file: UploadFile, fileList: UploadFile[]) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}

export function removeFileItem(file: UploadFile, fileList: UploadFile[]) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}

// ===================== Process Image Preview =====================
const BUFFER_CHUNK_SIZE = 1024 * 500;
const BASE64_CHUNK_SIZE = 3 * 1024 * 200; // Must be 3x

function readBuffers(file: File | Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    let offset = 0;
    let binary: string = '';

    reader.onload = function() {
      const buffer = new Uint8Array(reader.result as ArrayBuffer);
      const len = buffer.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(buffer[i]);
      }
      offset += BUFFER_CHUNK_SIZE;
      seek();
    };
    reader.onerror = function(event) {
      reader.abort();
      reject(event);
    };
    seek();

    function seek() {
      if (offset >= file.size) {
        resolve(binary);
        return;
      }
      const slice = file.slice(offset, offset + BUFFER_CHUNK_SIZE);
      reader.readAsArrayBuffer(slice);
    }
  });
}

/**
 * Async convert file to base64 image.
 * We split file into chunk which is size of 3x to make base64 work.
 */
export function previewImage(file: File | Blob): PromiseLike<any> {
  return readBuffers(file).then(
    (binary: string) =>
      new Promise(resolve => {
        let baseStr: string = '';
        let offset: number = 0;

        // Use macro task here to prevent it block UI render.
        // TODO: Optimize this with `requestIdleCallback` after we don't support old browser.
        let id: number;
        function step() {
          const subStr = binary.substr(offset, BASE64_CHUNK_SIZE);
          baseStr += btoa(subStr);
          offset += BASE64_CHUNK_SIZE;

          if (offset > binary.length) {
            window.clearInterval(id);
            resolve(`data:image;base64, ${baseStr}`);
          }
        }

        id = window.setInterval(step, 5);
        step();
      }),
  );
}
