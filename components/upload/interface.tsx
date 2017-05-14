import React from 'react';

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface HttpRequestHeader {
  [key: string]: string;
}

export interface File {
  uid: number;
  size: number;
  name: string;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  originFileObj?: File;
  response?: string;
  error?: any;
}

export interface UploadChangeParam {
  file: File;
  fileList: Array<File>;
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
  defaultFileList?: Array<File>;
  fileList?: Array<File>;
  action: string;
  data?: Object | ((file: File) => any);
  headers?: HttpRequestHeader;
  showUploadList?: boolean | ShowUploadListInterface;
  multiple?: boolean;
  accept?: string;
  beforeUpload?: (file: File, FileList: File[]) => boolean | PromiseLike<any>;
  onChange?: (info: UploadChangeParam) => void;
  listType?: 'text' | 'picture' | 'picture-card';
  className?: string;
  onPreview?: (file: File) => void;
  onRemove?: (file: File) => void | boolean;
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
  onPreview?: (file: File) => void;
  onRemove?: (file: File) => void | boolean;
  items?: Array<File>;
  progressAttr?: Object;
  prefixCls?: string;
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  locale: UploadLocale;
}
