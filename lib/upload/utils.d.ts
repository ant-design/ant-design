import { RcFile, UploadFile } from './interface';
export declare function T(): boolean;
export declare function fileToObject(file: RcFile): UploadFile;
/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
export declare function genPercentAdd(): (s: number) => number;
export declare function getFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile;
export declare function removeFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile[] | null;
