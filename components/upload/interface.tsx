import React from 'react';

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface HttpRequestHeader {
  [key: string]: string;
}

export interface UploadFile {
  uid: number;
  size: number;
  name: string;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  originFileObj?: File;
  response?: any;
  error?: any;
}

export interface UploadChangeParam {
  file: UploadFile;
  fileList: Array<UploadFile>;
  event?: { percent: number };
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
}

export interface UploadLocale {
  uploading?: string;
  removeFile?: string;
  uploadError?: string;
  previewFile?: string;
}

export interface UploadProps {
  type?: 'drag' | 'select';
  name?: string;
  defaultFileList?: Array<UploadFile>;
  fileList?: Array<UploadFile>;
  action?: string;
  data?: Object | ((file: UploadFile) => any);
  headers?: HttpRequestHeader;
  showUploadList?: boolean | ShowUploadListInterface;
  multiple?: boolean;
  accept?: string;
  beforeUpload?: (file: UploadFile, FileList: UploadFile[]) => boolean | PromiseLike<any>;
  onChange?: (info: UploadChangeParam) => void;
  listType?: 'text' | 'picture' | 'picture-card';
  className?: string;
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void | boolean;
  supportServerRender?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  prefixCls?: string;
  customRequest?: (option: any) => void;
  withCredentials?: boolean;
  locale?: UploadLocale;
}

export interface UploadListProps {
  listType?: 'text' | 'picture' | 'picture-card';
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void | boolean;
  items?: Array<UploadFile>;
  progressAttr?: Object;
  prefixCls?: string;
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  locale: UploadLocale;
}
