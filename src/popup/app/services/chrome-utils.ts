import { FilterState, SaveName } from './types';

export const load = async (items: string[]) => {
  const data = await chrome.storage.local.get(items);
  return data;
};

export const save = (items: {
  [key: string]: string | FilterState | Array<[SaveName, FilterState]>;
}) => {
  chrome.storage.local.set(items);
};
