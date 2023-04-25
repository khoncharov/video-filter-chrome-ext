import { getLocal, setLocal } from './chrome-utils';
import { FilterSaves, LocalStorageItem, LocalStorageName } from './types';

export const loadFromLocal = async (): Promise<FilterSaves | null> => {
  const itemToLoad: LocalStorageName[] = ['savesStorage'];
  const data = await getLocal(itemToLoad);
  return data.savesStorage ? new Map(data.savesStorage) : null;
};

export const saveToLocal = (filterSaves: FilterSaves): void => {
  const itemToStore: LocalStorageItem = { savesStorage: Array.from(filterSaves) };
  setLocal(itemToStore);
};
