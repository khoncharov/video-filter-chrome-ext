import { FilterSaves, LocalStorageItem, LocalStorageName } from './types';

export const saveToLocal = (filterSaves: FilterSaves): void => {
  const itemToStore: LocalStorageItem = { savesStorage: Array.from(filterSaves) };
  chrome.storage.session.set(itemToStore);
};

export const loadFromLocal = async (): Promise<FilterSaves | null> => {
  const itemToLoad: LocalStorageName[] = ['savesStorage'];
  const data = await chrome.storage.session.get(itemToLoad);
  return data.savesStorage ? new Map(data.savesStorage) : null;
};
