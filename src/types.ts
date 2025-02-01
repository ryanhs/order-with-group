export type OWG_Item<T> = {
  id: T;
  order: number;
  title?: string;
  parentId?: T | null;
};
