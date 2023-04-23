import { DEFAULT_FILTER } from '../constants';
import { load, save } from './chrome-utils';
import { FilterState, SaveName } from './types';

type LSItems = {
  currentName: string;
  currentFilterState: FilterState;
  savesMap: Map<SaveName, FilterState>;
};

type LSNames = keyof LSItems;

export const saveToLocal = (items: Partial<LSItems>): void => {
  if (!Object.keys(items).length) {
    throw new Error('At least one key should be provided');
  }

  const { currentName, currentFilterState, savesMap } = items;

  if (typeof currentName === 'string') {
    save({ currentName });
  }
  if (currentFilterState) {
    save({ currentFilterState });
  }
  if (savesMap) {
    save({ savesMap: Array.from(savesMap) });
  }
};

export const loadFromLocal = async (): Promise<LSItems> => {
  const itemsNames: LSNames[] = ['currentName', 'currentFilterState', 'savesMap'];
  const data = await load(itemsNames);
  const result: LSItems = {
    currentName: data.currentName ?? '',
    currentFilterState: data.currentFilterState ?? { ...DEFAULT_FILTER },
    savesMap: new Map<SaveName, FilterState>(data.savesMap ?? []),
  };
  return result;
};
