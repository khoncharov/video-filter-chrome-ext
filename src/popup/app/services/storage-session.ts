import { SessionDescriptor, TabId } from './types';

export const saveToSession = (tabId: TabId, descriptor: SessionDescriptor): void => {
  chrome.storage.session.set({ [tabId]: descriptor });
};

type SessionPropName = keyof SessionDescriptor;

const isSessionDescriptor = (item: any): item is SessionDescriptor => {
  const prop1: SessionPropName = 'filterApplied';
  const prop2: SessionPropName = 'filterState';
  const prop3: SessionPropName = 'saveName';

  if (prop1 in item && prop2 in item && prop3 in item) {
    return true;
  }
  return false;
};

export const loadFromSession = async (tabId: TabId): Promise<SessionDescriptor | null> => {
  const data = await chrome.storage.session.get([tabId.toString()]);

  if (data[tabId] && isSessionDescriptor(data[tabId])) {
    return data[tabId];
  }

  return null;
};
