import { DEFAULT_VALUE } from '../constants';
import { load, save } from './chrome-utils';
import { FilterState, SaveName } from './types';

type LSItems = {
  currentName: string;
  currentFilterState: FilterState;
  savesStorage: Map<SaveName, FilterState>;
};

type LSNames = keyof LSItems;

export const saveToLocal = (items: Partial<LSItems>): void => {
  if (!Object.keys(items)) {
    throw new Error('Item name for storage is missing');
  }

  const { currentName, currentFilterState, savesStorage } = items;

  if (currentName !== undefined) {
    save({ currentName });
  }
  if (currentFilterState !== undefined) {
    save({ currentFilterState });
  }
  if (savesStorage !== undefined) {
    save({ savesStorage: Array.from(savesStorage) });
  }
};

export const loadFromLocal = async (): Promise<LSItems> => {
  const itemsNames: LSNames[] = ['currentName', 'currentFilterState', 'savesStorage'];
  const data = await load(itemsNames);
  const result: LSItems = {
    currentName: data.currentName ?? '',
    currentFilterState: data.currentFilterState ?? { ...DEFAULT_VALUE },
    savesStorage: new Map<SaveName, FilterState>(data.savesStorage ?? []),
  };
  return result;
};
