# order-with-group

A TypeScript utility library for managing hierarchical ordered items with grouping support.

## Installation

```sh
npm install order-with-group
```

or

```sh
yarn add order-with-group
```

## Usage

### Importing

```typescript
import { getItem, getSiblings, getNextItem, isFirst, isLast } from 'order-with-group';
import { OWG_Item } from 'order-with-group/types';
```

### Data Structure

The library operates on items structured as follows:

```typescript
type OWG_Item<T> = {
  id: T;
  order: number;
  title?: string;
  parentId?: T | null;
};
```

### Functions

#### `getItem<T>(items: OWG_Item<T>[], id: T): OWG_Item<T> | undefined`
Finds an item by its `id`.

#### `getSiblings<T>(items: OWG_Item<T>[], currentId: T): OWG_Item<T>[]`
Retrieves all sibling items sorted by `order`.

#### `getNextItem<T>(items: OWG_Item<T>[], currentId: T): OWG_Item<T> | undefined`
Finds the next item in the hierarchy.

#### `isFirst<T>(items: OWG_Item<T>[], currentId: T): boolean`
Checks if the given item is the first among its siblings.

#### `isLast<T>(items: OWG_Item<T>[], currentId: T): boolean`
Checks if the given item is the last among its siblings.

## License

MIT

