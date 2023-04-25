import { getSession, setSession } from './chrome-utils';
import { SessionDescriptor, TabId } from './types';

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
  const data = await getSession([tabId.toString()]);

  if (data[tabId] && isSessionDescriptor(data[tabId])) {
    return data[tabId];
  }

  return null;
};

export const saveToSession = (tabId: TabId, descriptor: SessionDescriptor): void => {
  setSession({ [tabId]: descriptor });
};
