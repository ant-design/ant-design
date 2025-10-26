import type { ReactNode } from 'react';
export default function isValidNode(node: ReactNode): boolean {
  return node !== undefined && node !== null;
}
