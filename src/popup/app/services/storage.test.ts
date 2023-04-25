/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
import { loadFromLocal, saveToLocal } from './storage-local';
import { loadFromSession, saveToSession } from './storage-session';
import { FilterState, SaveName } from './types';

jest.mock('./chrome-utils');

describe('Functions to interact with extension local and session storage', () => {
  test('Should load app state from empty storage', async () => {
    const dataLocal = await loadFromLocal();
    const tabId0 = 0;
    const dataSession = await loadFromSession(tabId0);

    expect(dataLocal).toBeNull();
    expect(dataSession).toBeNull();
  });

  test('Should save & load session values', async () => {
    const tabId10 = 10;
    let saveName = 'hello world';
    let filterApplied = true;
    let filterState = { brightness: 1, contrast: 2, saturation: 3, isFlipped: true };
    saveToSession(tabId10, { saveName, filterApplied, filterState });

    const tabId15 = 15;
    saveName = 'qwerty';
    filterApplied = false;
    filterState = { brightness: 11, contrast: 22, saturation: 33, isFlipped: false };
    saveToSession(tabId15, { saveName, filterApplied, filterState });

    const dataSession = await loadFromSession(tabId10);

    expect(dataSession).toStrictEqual({
      saveName: 'hello world',
      filterApplied: true,
      filterState: { brightness: 1, contrast: 2, saturation: 3, isFlipped: true },
    });
  });

  test('Should save & load local values', async () => {
    const filterState1 = { brightness: 4, contrast: 5, saturation: 6, isFlipped: false };
    const filterState2 = { brightness: 7, contrast: 8, saturation: 9, isFlipped: true };
    const savesMap = new Map<SaveName, FilterState>([
      ['name1', filterState1],
      ['name2', filterState2],
    ]);

    saveToLocal(savesMap);

    const dataLocal = await loadFromLocal();

    expect(dataLocal?.size).toEqual(2);
    expect(dataLocal).toStrictEqual(
      new Map<SaveName, FilterState>([
        ['name1', filterState1],
        ['name2', filterState2],
      ]),
    );
  });
});
