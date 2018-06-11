export default function getDataAttributes(props: any) {
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (key.substr(0, 5) === 'data-') {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}
