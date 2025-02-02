import { OWG_Item } from '../src/types';
import * as owg from '../src';

describe('complex 2 - chaos order, simple swap', () => {
  const items: OWG_Item<number>[] = [
    { id: 1, order: 1, title: '1', parentId: null },

    { id: 2, order: 3, title: '2', parentId: null },
    { id: 3, order: 1, title: '2.1', parentId: 2 },

    // swap 4 and  5
    { id: 4, order: 4, title: '4', parentId: null },
    { id: 5, order: 3, title: '2.2', parentId: 2 },

    { id: 6, order: 6, title: '6', parentId: null },

    // swap 7 and 8
    { id: 7, order: 7, title: '7', parentId: null },
    { id: 8, order: 2, title: '6.1', parentId: 6 },
  ];

  it.each([
    [1, 3],
    [2, 3],
    [3, 5],
    [4, 8],
    [5, 4],
    [6, 8],
    // [7, undefined],
    [8, 7],
  ])('getNextItem #%d => %s', (currentId, nextId) => {
    expect(owg.getNextItem(items, currentId)).toEqual(
      expect.objectContaining({ id: nextId })
    );
  });

  it.each([[7]])('getNextItem #%d => undefined', currentId => {
    expect(owg.getNextItem(items, currentId)).toBeUndefined();
  });
});
