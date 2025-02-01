import { OWG_Item } from '../src/types';
import * as owg from '../src';

describe('complex 1 - just 2 group', () => {
  const items: OWG_Item<number>[] = [
    { id: 1, order: 1, title: '1', parentId: null },
    
    { id: 2, order: 3, title: '2', parentId: null },
    { id: 3, order: 1, title: '2.1', parentId: 2 },
    { id: 4, order: 5, title: '2.2', parentId: 2 },

    { id: 5, order: 5, title: '5', parentId: null },
    
    { id: 6, order: 6, title: '6', parentId: null },
    { id: 7, order: 1, title: '6.1', parentId: 6 },
    { id: 8, order: 2, title: '6.2', parentId: 6 },
  ];

  it.each([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
  ])('getNextItem #%d => %s', (currentId, nextId) => {
    expect(owg.getNextItem(items, currentId)).toEqual(
      expect.objectContaining({ id: nextId })
    );
  });

  it.each([[items[items.length - 1].id]])(
    'getNextItem #%d => undefined',
    currentId => {
      expect(owg.getNextItem(items, currentId)).toBeUndefined();
    }
  );
});
