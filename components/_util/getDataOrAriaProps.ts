export default function getDataOrAriaProps(props: any) {
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (
      (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') &&
      key.substr(0, 7) !== 'data-__'
    ) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}
