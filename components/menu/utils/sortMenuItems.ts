import type { ItemType } from '../interface';

const getLabel = (item: ItemType): string => {
  if (!item || typeof item !== 'object') return '';
  if (!('label' in item)) return '';

  const { label } = item;
  if (typeof label === 'string') return label;
  if (typeof label === 'number') return String(label);
  return '';
};

export const sortMenuItems = <T extends ItemType>(items?: T[]): T[] | undefined => {
  if (!items?.length) return items;

  const sorted = [...items].sort((a, b) => {
    const labelA = getLabel(a).toLowerCase();
    const labelB = getLabel(b).toLowerCase();
    return labelA.localeCompare(labelB);
  });

  return sorted.map((item) => {
    if (!item || typeof item !== 'object') return item;
    if (!('children' in item) || !Array.isArray(item.children)) return item;

    return { ...item, children: sortMenuItems(item.children) } as T;
  });
};
