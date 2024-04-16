export interface TypingOption {
  /**
   * @since 5.17.0
   * @default 1
   */
  step?: number;
  /**
   * @since 5.17.0
   * @default 100
   */
  interval?: number;
}

export interface ChatboxProps {
  prefixCls?: string;
  rootClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    avatar?: string;
    content?: string;
  };
  styles?: {
    avatar?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  avatar?: React.ReactNode;
  placement?: 'start' | 'end';
  loading?: boolean;
  typing?: boolean | TypingOption;
  content: string;
  contentRender?: (content?: string) => React.ReactNode;
}
