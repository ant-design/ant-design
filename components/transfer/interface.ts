export type TransferKey = React.Key;

export type PaginationType =
  | boolean
  | {
      pageSize?: number;
      simple?: boolean;
      showSizeChanger?: boolean;
      showLessItems?: boolean;
    };
