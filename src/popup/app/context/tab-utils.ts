/* eslint-disable implicit-arrow-linebreak */

export const validTabId = (value: number | undefined): value is number => typeof value === 'number';

export const validTabUrl = (value: string | undefined): boolean =>
  typeof value === 'string' && value.startsWith('http');

export const getActiveTabId = async (): Promise<number | null> => {
  const options = { active: true, lastFocusedWindow: true };

  const [tab] = await chrome.tabs.query(options);

  if (validTabId(tab.id) && validTabUrl(tab.url)) {
    return tab.id;
  }

  return null;
};
