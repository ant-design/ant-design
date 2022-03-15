export default function getDataOrAriaProps(props: any) {
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (
      (key.startsWith('data-') || key.startsWith('aria-') || key === 'role') &&
      !key.startsWith('data-__')
    ) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}
