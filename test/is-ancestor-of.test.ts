import { OWG_Item } from '../src/types';
import * as owg from '../src';

describe('is-ancestor-of', () => {
  const items: OWG_Item<number>[] = [
    { id: 1, order: 1, title: '1', parentId: null },

    { id: 2, order: 3, title: '2', parentId: null },
    { id: 3, order: 1, title: '2.1', parentId: 2 },
    { id: 4, order: 5, title: '2.2', parentId: 2 },

    { id: 5, order: 5, title: '5', parentId: null },

    { id: 6, order: 6, title: '6', parentId: null },
    { id: 7, order: 1, title: '6.1', parentId: 6 },
    { id: 8, order: 2, title: '6.2', parentId: 6 },
    
    { id: 9, order: 1, title: '6.2.1', parentId: 8 },
    { id: 10, order: 2, title: '6.2.2', parentId: 8 },
    { id: 11, order: 3, title: '6.2.3', parentId: 8 },
    
    { id: 12, order: 1, title: '6.2.2.1', parentId: 10 },
    { id: 13, order: 2, title: '6.2.2.2', parentId: 10 },
    { id: 14, order: 3, title: '6.2.2.3', parentId: 10 },
  ];

  it.each([
    [1, 3, false],
    [2, 3, false],

    [3, 3, false],
    [3, 4, false],
    [3, 2, true],
    
    [4, 3, false],
    [4, 4, false],
    [4, 2, true],
    
    [5, 3, false],
    [5, 4, false],
    [5, 9, false],
    
    [9, 8, true],
    [10, 8, true],
    [11, 8, true],
    
    [12, 6, true],
    [13, 6, true],
    [14, 6, true],

    [12, 7, false],
    [13, 7, false],
    [14, 7, false],
    
    [12, 8, true],
    [13, 8, true],
    [14, 8, true],
    
    [12, 10, true],
    [13, 10, true],
    [14, 10, true],
    
  ])('#%d 10 #%d => %s', (currentId, ancestorId, expected) => {
    expect(owg.isAncestorOf(items, currentId, ancestorId)).toBe(expected);
  });

});
