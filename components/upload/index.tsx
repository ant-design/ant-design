import Dragger from './Dragger';
import InternalUpload, { LIST_IGNORE, UploadProps } from './Upload';

export { UploadProps, UploadListProps, UploadChangeParam, RcFile } from './interface';
export { DraggerProps } from './Dragger';

type InternalUploadType = typeof InternalUpload;
interface UploadInterface<T = any> extends InternalUploadType {
  <U extends T>(
    props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>,
  ): React.ReactElement;
  Dragger: typeof Dragger;
  LIST_IGNORE: string;
}

const Upload = InternalUpload as UploadInterface;
Upload.Dragger = Dragger;
Upload.LIST_IGNORE = LIST_IGNORE;

export default Upload;
