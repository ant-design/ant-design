import type { RcFile, UploadFile } from '../interface';
import {
  file2Obj,
  getFileItem,
  isImageUrl,
  previewImage,
  removeFileItem,
  updateFileList,
} from '../utils';

describe('Upload utils', () => {
  describe('file2Obj', () => {
    it('should convert RcFile to InternalUploadFile with percent 0 and originFileObj', () => {
      const file = {
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        lastModified: 1234567890,
        lastModifiedDate: new Date(1234567890),
      } as RcFile;
      const result = file2Obj(file);
      expect(result).toMatchObject({
        uid: '1',
        name: 'test.png',
        size: 1024,
        type: 'image/png',
        percent: 0,
        originFileObj: file,
      });
      expect(result.lastModified).toBe(1234567890);
      expect(result.lastModifiedDate).toEqual(new Date(1234567890));
    });
  });

  describe('updateFileList', () => {
    it('should append file when uid does not exist in list', () => {
      const file = { uid: '2', name: 'new.png' } as UploadFile;
      const fileList: UploadFile[] = [{ uid: '1', name: 'a.png' } as UploadFile];
      const result = updateFileList(file, fileList);
      expect(result).toHaveLength(2);
      expect(result[1]).toBe(file);
    });

    it('should replace file when uid exists in list', () => {
      const file = { uid: '1', name: 'updated.png', status: 'done' } as UploadFile;
      const fileList: UploadFile[] = [
        { uid: '1', name: 'a.png' } as UploadFile,
        { uid: '2', name: 'b.png' } as UploadFile,
      ];
      const result = updateFileList(file, fileList);
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(file);
      expect(result[1].uid).toBe('2');
    });
  });

  describe('getFileItem', () => {
    it('should find file by uid when file has uid', () => {
      const file = { uid: '1', name: 'item.jpg' } as RcFile;
      const fileList = [
        { uid: '1', name: 'item.jpg' },
        { uid: '2', name: 'other.jpg' },
      ] as UploadFile[];
      const result = getFileItem(file, fileList);
      expect(result).toBe(fileList[0]);
    });

    it('should find file by name when file has no uid', () => {
      const file = { name: 'item.jpg' } as RcFile;
      const fileList = [
        { uid: '1', name: 'item.jpg' },
        { uid: '2', name: 'other.jpg' },
      ] as UploadFile[];
      const result = getFileItem(file, fileList);
      expect(result).toBe(fileList[0]);
    });

    it('should return undefined when file not found', () => {
      const file = { uid: '99', name: 'missing.jpg' } as RcFile;
      const fileList = [{ uid: '1', name: 'item.jpg' }] as UploadFile[];
      const result = getFileItem(file, fileList);
      expect(result).toBeUndefined();
    });
  });

  describe('removeFileItem', () => {
    it('should remove file by uid and return new list', () => {
      const file = { uid: '1', name: 'item.jpg' } as UploadFile;
      const fileList = [
        { uid: '1', name: 'item.jpg' },
        { uid: '2', name: 'item2.jpg' },
      ] as UploadFile[];
      const result = removeFileItem(file, fileList);
      expect(result).toHaveLength(1);
      expect(result![0].uid).toBe('2');
    });

    it('should return null when file not in list', () => {
      const file = { uid: '99', name: 'missing.jpg' } as UploadFile;
      const fileList = [{ uid: '1', name: 'item.jpg' }] as UploadFile[];
      const result = removeFileItem(file, fileList);
      expect(result).toBeNull();
    });

    it('should remove by name when file has no uid', () => {
      const file = { name: 'item2.jpg' } as UploadFile;
      const fileList = [
        { uid: '1', name: 'item.jpg' },
        { uid: '2', name: 'item2.jpg' },
      ] as UploadFile[];
      const result = removeFileItem(file, fileList);
      expect(result).toHaveLength(1);
      expect(result![0].name).toBe('item.jpg');
    });
  });

  describe('isImageUrl', () => {
    it('should return true when file has image type and no thumbUrl', () => {
      expect(isImageUrl({ type: 'image/png' } as UploadFile)).toBe(true);
      expect(isImageUrl({ type: 'image/jpeg' } as UploadFile)).toBe(true);
      expect(isImageUrl({ type: 'image/gif' } as UploadFile)).toBe(true);
      expect(isImageUrl({ type: 'image/webp' } as UploadFile)).toBe(true);
    });

    it('should return true for data:image/ URL', () => {
      expect(isImageUrl({ url: 'data:image/png;base64,abc' } as UploadFile)).toBe(true);
      expect(isImageUrl({ thumbUrl: 'data:image/jpeg;base64,xyz' } as UploadFile)).toBe(true);
    });

    it('should return false for non-image data: URL', () => {
      expect(isImageUrl({ url: 'data:application/pdf;base64,abc' } as UploadFile)).toBe(false);
    });

    it('should return false when url has non-image extension', () => {
      expect(isImageUrl({ url: 'https://example.com/file.pdf' } as UploadFile)).toBe(false);
      expect(isImageUrl({ url: 'https://example.com/file.doc' } as UploadFile)).toBe(false);
    });

    it('should return true when url has image extension', () => {
      expect(isImageUrl({ url: 'https://example.com/image.webp' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.svg' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.png' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.gif' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.jpg' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.jpeg' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.jfif' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.bmp' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.dpg' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.ico' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.heic' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.heif' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.tif' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.tiff' } as UploadFile)).toBe(true);
      expect(isImageUrl({ url: 'https://example.com/image.webp' } as UploadFile)).toBe(true);
    });

    it('should return true when url has no extension (treated as image)', () => {
      expect(isImageUrl({ url: 'https://example.com/image' } as UploadFile)).toBe(true);
    });

    it('should return true when file.url is null', () => {
      expect(isImageUrl({ url: null } as unknown as UploadFile)).toBe(true);
    });

    it('should return true when url is empty string', () => {
      expect(isImageUrl({} as UploadFile)).toBe(true);
    });
  });

  describe('previewImage', () => {
    it('should resolve to empty string for non-image file type', async () => {
      const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' });
      const result = await previewImage(file);
      expect(result).toBe('');
    });

    it('should resolve to empty string when file has no type', async () => {
      const file = new File(['content'], 'file', { type: '' });
      const result = await previewImage(file);
      expect(result).toBe('');
    });
  });
});
