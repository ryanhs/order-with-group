import { OWG_Item } from './types';

export function getItem<T = number>(
  items: OWG_Item<T>[],
  id: T
): OWG_Item<T> | undefined {
  return items.find(item => item.id === id);
}

export function getSiblings<T = number>(
  items: OWG_Item<T>[],
  currentId: T
): OWG_Item<T>[] {
  const parentId = getItem(items, currentId)?.parentId;
  return items
    .filter(item => item.parentId === parentId)
    .sort((a, b) => a.order - b.order);
}

export function getNextItem<T = number>(
  items: OWG_Item<T>[],
  currentId: T
): OWG_Item<T> | undefined {
  const current = getItem(items, currentId);
  if (!current) return undefined;

  // Find children
  const children = items
    .filter(item => item.parentId === current.id)
    .sort((a, b) => a.order - b.order);
  if (children.length) return children[0];

  // Find next sibling
  const siblings = getSiblings(items, current.id);
  const currentIndex = siblings.findIndex(item => item.id === current.id);
  if (currentIndex >= 0 && currentIndex < siblings.length - 1)
    return siblings[currentIndex + 1];

  // Traverse up the tree
  let ancestor: OWG_Item<T> | undefined = current;
  while (ancestor?.parentId) {
    const parent: OWG_Item<T> | undefined = getItem(items, ancestor.parentId);
    if (!parent) return undefined;
    const parentSiblings = getSiblings(items, parent.id);
    const parentIndex = parentSiblings.findIndex(item => item.id === parent.id);
    if (parentIndex >= 0 && parentIndex < parentSiblings.length - 1)
      return parentSiblings[parentIndex + 1];
    ancestor = parent;
  }
  return undefined;
}

export function isFirst<T = number>(
  items: OWG_Item<T>[],
  currentId: T
): boolean {
  const siblings = getSiblings(items, currentId);
  return siblings.length > 0 && siblings[0].id === currentId;
}

export function isLast<T = number>(
  items: OWG_Item<T>[],
  currentId: T
): boolean {
  const siblings = getSiblings(items, currentId);
  return siblings.length > 0 && siblings[siblings.length - 1].id === currentId;
}
