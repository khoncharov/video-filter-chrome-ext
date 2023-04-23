/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
import { DEFAULT_VALUE } from '../constants';
import { loadFromLocal, saveToLocal } from './local-storage';
import { FilterState, SaveName } from './types';

jest.mock('./chrome-utils');

describe('Functions to interact with extension local storage', () => {
  test('Should load default app state from empty local storage', async () => {
    const data = await loadFromLocal();
    expect(data).toStrictEqual({
      currentName: '',
      currentFilterState: { ...DEFAULT_VALUE },
      savesStorage: new Map<SaveName, FilterState>([]),
    });
  });

  test('Should throw err with empty object provided', async () => {
    expect(() => {
      saveToLocal({});
    }).toThrow();
  });

  test('Should save & load value', async () => {
    saveToLocal({ currentName: 'John Smith' });
    const data1 = await loadFromLocal();
    expect(data1).toStrictEqual({
      currentName: 'John Smith',
      currentFilterState: { ...DEFAULT_VALUE },
      savesStorage: new Map<SaveName, FilterState>([]),
    });

    saveToLocal({ currentName: '' });
    const data2 = await loadFromLocal();
    expect(data2).toStrictEqual({
      currentName: '',
      currentFilterState: { ...DEFAULT_VALUE },
      savesStorage: new Map<SaveName, FilterState>([]),
    });
  });

  test('Should save & load values', async () => {
    const currentName = 'hello world';
    const currentFilterState = { brightness: 1, contrast: 2, saturation: 3, isFlipped: true };
    const currentFilterState1 = { brightness: 4, contrast: 5, saturation: 6, isFlipped: false };
    const currentFilterState2 = { brightness: 7, contrast: 8, saturation: 9, isFlipped: true };
    const savesStorage = new Map<string, FilterState>([
      ['name1', currentFilterState1],
      ['name2', currentFilterState2],
    ]);
    saveToLocal({ currentName, currentFilterState, savesStorage });
    const data = await loadFromLocal();
    expect(data).toStrictEqual({
      currentName,
      currentFilterState,
      savesStorage,
    });
  });
});
