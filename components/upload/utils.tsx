import { RcFile, UploadFile } from './interface';

export function T() {
  return true;
}

type WrapFile = RcFile | UploadFile;

/**
 * Wrap file with Proxy to provides more info. Will fallback to object if Proxy not support.
 *
 * Origin comment: Fix IE file.status problem via coping a new Object
 */
export function wrapFile(file: WrapFile): UploadFile {
  const filledProps = {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file,
  };

  if (typeof Proxy !== 'undefined') {
    const data = new Map<string | symbol, any>(Object.entries(filledProps));

    const getValue = (key: string | symbol) => {
      if (data.has(key)) {
        return data.get(key);
      }
      return (file as any)[key];
    };

    return new Proxy(file, {
      get(_, key) {
        return getValue(key);
      },
      set(_, key, value) {
        data.set(key, value);
        return true;
      },
      has(target, prop) {
        return data.has(prop) || prop in target;
      },
      ownKeys(target) {
        const keys = [...Object.keys(target), ...data.keys()];
        return [...new Set(keys)];
      },

      /**
       * Lodash cloneDeep will use `Object.create(Object.getPrototypeOf(file))` which do not map to
       * the correct context. We need do a sub class to make skip fetch the context and still
       * instance of File. ref: https://github.com/ant-design/ant-design/issues/29646
       */
      getPrototypeOf() {
        class ProxyFile extends File {}

        const fileProtoKeys = Object.keys(File.prototype);

        [...fileProtoKeys, 'size', 'type'].forEach(key => {
          Object.defineProperty(ProxyFile.prototype, key, {
            // Get will never reach but we provide fallback here
            /* istanbul ignore next */
            get: () => getValue(key),
          });
        });

        return ProxyFile.prototype;
      },
      getOwnPropertyDescriptor(target, prop) {
        if (data.has(prop)) {
          return {
            value: data.get(prop),
            writable: true,
            enumerable: true,
            configurable: true,
          };
        }

        const descriptor = Object.getOwnPropertyDescriptor(target, prop);
        return descriptor;
      },
    });
  }

  return {
    ...file,
    ...filledProps,
  } as UploadFile;
}

export function replaceFileList(file: UploadFile<any>, fileList: UploadFile<any>[]) {
  const nextFileList = [...fileList];
  const fileIndex = nextFileList.findIndex(({ uid }: UploadFile) => uid === file.uid);
  if (fileIndex === -1) {
    nextFileList.push(file);
  } else {
    nextFileList[fileIndex] = file;
  }
  return nextFileList;
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

// ==================== Default Image Preview ====================
const extname = (url: string = '') => {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0;

export const isImageUrl = (file: UploadFile): boolean => {
  if (file.type && !file.thumbUrl) {
    return isImageFileType(file.type);
  }
  const url: string = (file.thumbUrl || file.url) as string;
  const extension = extname(url);
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

const MEASURE_SIZE = 200;
export function previewImage(file: File | Blob): Promise<string> {
  return new Promise(resolve => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      let drawWidth = MEASURE_SIZE;
      let drawHeight = MEASURE_SIZE;
      let offsetX = 0;
      let offsetY = 0;

      if (width > height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);

      resolve(dataURL);
    };
    img.src = window.URL.createObjectURL(file);
  });
}
