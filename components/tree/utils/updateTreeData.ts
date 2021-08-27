import { DataNode } from 'rc-tree/lib/interface';

export function updateTreeData(treeData: DataNode[], replaceField = {}) {
  let newTreeData: DataNode[] = treeData;
  const defaultFields = { children: 'children', title: 'title', key: 'key' };
  const replaceFields = { ...defaultFields, ...replaceField };
  newTreeData = newTreeData.map((item: { [x: string]: any; title?: any }) => {
    const key = item['key'];
    const children = item[replaceFields.children];
    const { ...restProps } = item;
    const treeNodeProps = {
      ...restProps,
      title: item.title || restProps[replaceFields.title],
      key,
    };
    if (children) {
      return { ...treeNodeProps, children: updateTreeData(children, replaceField) };
    }
    return treeNodeProps;
  });
  return newTreeData;
}
