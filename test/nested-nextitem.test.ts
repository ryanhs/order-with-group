import { OWG_Item } from '../src/types';
import * as owg from '../src';

describe('nested nextItem', () => {
  const items: OWG_Item<number>[] = [
    { id: 1, order: 1, title: '1', parentId: null },
    { id: 2, order: 3, title: '2', parentId: null },
    { id: 3, order: 1, title: '2.1', parentId: 2 },
    { id: 4, order: 5, title: '2.2', parentId: 2 },
    { id: 5, order: 5, title: '5', parentId: null },
  ];

  describe('getItem', () => {
    it.each([
      [1, '1'],
      [2, '2'],
      [3, '2.1'],
      [4, '2.2'],
      [5, '5'],
    ])('getItem #%d => %s', (currentId, title) => {
      expect(owg.getItem(items, currentId)).toEqual(
        expect.objectContaining({
          title,
        })
      );
    });
  });

  describe('getSiblings', () => {
    it.each([
      [1, [1, 2, 5]],
      [2, [1, 2, 5]],
      [5, [1, 2, 5]],
      [3, [3, 4]],
      [4, [3, 4]],
    ])('getSiblings of %d are %s', (currentId, siblingIds) => {
      const siblings = owg.getSiblings(items, currentId);
      expect(siblings).toEqual(
        expect.arrayContaining(
          siblingIds.map(id => expect.objectContaining({ id }))
        )
      );
    });

    it.each([
      [1, [3, 4]],
      [2, [3, 4]],
      [5, [3, 4]],
      [3, [1, 2, 5]],
      [4, [1, 2, 5]],
    ])('getSiblings of %d are not %s', (currentId, notSiblingIds) => {
      const siblings = owg.getSiblings(items, currentId);
      expect(siblings).toEqual(
        expect.arrayContaining(
          notSiblingIds.map(id => expect.not.objectContaining({ id }))
        )
      );
    });
  });

  describe('isFirst', () => {
    it.each([
      [1, true],
      [2, false],
      [3, true], // in siblings level
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
      [4, true], // in siblings level
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
