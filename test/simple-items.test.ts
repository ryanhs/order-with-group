import { OWG_Item } from '../src/types';
import * as owg from '../src';

describe('simple items', () => {
  const items: OWG_Item<number>[] = [
    { id: 1, order: 1, title: '1', parentId: null },
    { id: 2, order: 2, title: '2', parentId: null },
    { id: 3, order: 3, title: '3', parentId: null },
    { id: 4, order: 4, title: '4', parentId: null },
    { id: 5, order: 5, title: '5', parentId: null },
  ];

  describe('getItem', () => {
    it.each([
      [1, '1'],
      [2, '2'],
      [3, '3'],
      [4, '4'],
      [5, '5'],
    ])('getItem #%d => %s', (currentId, title) => {
      expect(owg.getItem(items, currentId)).toEqual(
        expect.objectContaining({
          title,
        })
      );
    });
  });

  it('getSiblings', () => {
    const siblings = owg.getSiblings(items, 2);
    expect(siblings).toEqual(
      expect.arrayContaining([
        expect.objectContaining(items[0]),
        expect.objectContaining(items[1]),
        expect.objectContaining(items[2]),
        expect.objectContaining(items[3]),
      ])
    );
  });

  describe('isFirst', () => {
    it.each([
      [1, true],
      [2, false],
      [3, false],
      [4, false],
    ])('isFirst #%d => %s', (currentId, isFirst) => {
      expect(owg.isFirst(items, currentId)).toBe(isFirst);
    });
  });

  describe('isLast', () => {
    it.each([
      [1, false],
      [2, false],
      [3, false],
      [4, false],
      [5, true],
    ])('isLast #%d => %s', (currentId, isLast) => {
      expect(owg.isLast(items, currentId)).toBe(isLast);
    });
  });

  describe('getNextItem', () => {
    it.each([
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ])('getNextItem #%d => %s', (currentId, nextId) => {
      expect(owg.getNextItem(items, currentId)).toEqual(
        expect.objectContaining({ id: nextId })
      );
    });

    it.each([[5]])('getNextItem #%d => undefined', currentId => {
      expect(owg.getNextItem(items, currentId)).toBeUndefined();
    });
  });
});
