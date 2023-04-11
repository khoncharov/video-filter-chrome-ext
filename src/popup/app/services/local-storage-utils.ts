import { DEFAULT_VALUE } from '../constants';
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
    chrome.storage.local.set({ currentName });
  }
  if (currentFilterState !== undefined) {
    chrome.storage.local.set({ currentFilterState });
  }
  if (savesStorage !== undefined) {
    chrome.storage.local.set({ savesStorage: Array.from(savesStorage) });
  }
};

export const loadFromLocal = async (): Promise<LSItems> => {
  const itemsNames: LSNames[] = ['currentName', 'currentFilterState', 'savesStorage'];
  const data = await chrome.storage.local.get(itemsNames);
  const result: LSItems = {
    currentName: data.currentName ?? '',
    currentFilterState: data.currentFilterState ?? { ...DEFAULT_VALUE },
    savesStorage: new Map<SaveName, FilterState>(data.savesStorage ?? '[]'),
  };
  return result;
};
