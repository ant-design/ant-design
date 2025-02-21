declare namespace React {
  interface CSSProperties {
    [key: `--${string | number}`]: string | number | undefined; // 允许 CSS 变量
  }
}
