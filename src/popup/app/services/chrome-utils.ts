import { LocalStorageItem, SessionDescriptor, TabId } from './types';

export const getLocal = async (item: string[]) => {
  const data = await chrome.storage.local.get(item);
  return data;
};

export const setLocal = (item: LocalStorageItem) => {
  chrome.storage.local.set(item);
};

export const getSession = async (item: string[]) => {
  const data = await chrome.storage.session.get(item);
  return data;
};

export const setSession = (item: { [key: TabId]: SessionDescriptor }) => {
  chrome.storage.session.set(item);
};
