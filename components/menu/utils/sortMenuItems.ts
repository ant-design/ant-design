import type { ItemType } from '../interface';

const extractTextFromNode = (node: any): string => {
  if (!node) return '';

  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);

  if (typeof node === 'object') {
    if (Array.isArray(node)) {
      return node.map(extractTextFromNode).join('');
    }

    if (node.props && node.props.children) {
      return extractTextFromNode(node.props.children);
    }
  }

  return '';
};

const getLabel = (item: ItemType): string => {
  if (!item || typeof item !== 'object') return '';
  if (!('label' in item)) return '';

  const { label } = item;
  if (typeof label === 'string') return label;
  if (typeof label === 'number') return String(label);

  return extractTextFromNode(label);
};

export const sortMenuItems = <T extends ItemType>(items?: T[]): T[] | undefined => {
  if (!items?.length) return items;

  const sorted = [...items].sort((a, b) => {
    const labelA = getLabel(a);
    const labelB = getLabel(b);
    return labelA.localeCompare(labelB, undefined, { sensitivity: 'base' });
  });

  return sorted.map((item) => {
    if (!item || typeof item !== 'object') return item;
    if (!('children' in item) || !Array.isArray(item.children)) return item;

    return { ...item, children: sortMenuItems(item.children) } as T;
  });
};
