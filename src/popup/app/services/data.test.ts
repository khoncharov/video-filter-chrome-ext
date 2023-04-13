/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
import { DEFAULT_VALUE } from '../constants';
import SaveDataService from './data';
import { DataEvent } from './types';

jest.mock('./chrome-utils');

describe('Test SaveDataService class', () => {
  const service = new SaveDataService();

  const onSaveCallback = jest.fn();
  const onDeleteCallback = jest.fn();
  const onLoadCallback = jest.fn();

  const saveName1 = 'First save';
  const state1 = { brightness: 101, contrast: 102, saturation: 103, isFlipped: true };
  const saveName2 = 'Second save';
  const state2 = { brightness: 111, contrast: 112, saturation: 113, isFlipped: false };
  const saveName3 = '3d save';
  const state3 = { brightness: 121, contrast: 122, saturation: 123, isFlipped: false };

  service.addEventListener(DataEvent.Saved, onSaveCallback);
  service.addEventListener(DataEvent.Deleted, onDeleteCallback);
  service.addEventListener(DataEvent.Loaded, onLoadCallback);

  test('Should be correctly initialized', () => {
    expect(service.currentSaveName).toEqual('');
    expect(service.savesStorage.size).toEqual(0);
    expect(service.currentFilterState).toStrictEqual(DEFAULT_VALUE);
  });

  test('Should return correct values after SAVE', () => {
    service.brightness = state1.brightness;
    service.contrast = state1.contrast;
    service.saturation = state1.saturation;
    service.isFlipped = state1.isFlipped;
    service.saveState(saveName1);

    service.brightness = state2.brightness;
    service.contrast = state2.contrast;
    service.saturation = state2.saturation;
    service.isFlipped = state2.isFlipped;
    service.saveState(saveName2);

    expect(service.currentSaveName).toEqual(saveName2);
    expect(service.savesStorage.size).toEqual(2);
    expect(service.currentFilterState).toStrictEqual(state2);
  });

  test('Should return correct values after DELETE', () => {
    service.deleteSavedState(saveName2);

    expect(service.currentSaveName).toEqual('');
    expect(service.savesStorage.size).toEqual(1);
    expect(service.savesStorage.get(saveName1)).toStrictEqual(state1);
    expect(service.currentFilterState).toStrictEqual(state2);
  });

  test('Should return correct values after RESTORE', () => {
    service.brightness = state3.brightness;
    service.contrast = state3.contrast;
    service.saturation = state3.saturation;
    service.isFlipped = state3.isFlipped;
    service.saveState(saveName3);

    service.restoreState(saveName1);

    expect(service.currentSaveName).toEqual(saveName1);
    expect(service.savesStorage.size).toEqual(2);
    expect(service.currentFilterState).toStrictEqual(state1);
  });

  test('Should notify on data event', () => {
    expect(onSaveCallback.mock.calls.length).toEqual(3);
    expect(onDeleteCallback.mock.calls.length).toEqual(1);
    expect(onLoadCallback.mock.calls.length).toEqual(2); // init + restore
  });
});
