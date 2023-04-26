/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
import AppStateService from './app-state';
import FilterDataService from './filter-data';
import { DEFAULT_FILTER } from '../constants';
import { FilterEvent } from './app-events';

jest.mock('./chrome-utils');

describe('Test SaveDataService class', () => {
  const filter = new FilterDataService();
  const appState = new AppStateService(filter);

  const onSaveCallback = jest.fn();
  const onDeleteCallback = jest.fn();
  const onLoadCallback = jest.fn();
  const onSelectCallback = jest.fn();

  const saveName1 = 'First save';
  const state1 = { brightness: 101, contrast: 102, saturation: 103, isFlipped: true };
  const saveName2 = 'Second save';
  const state2 = { brightness: 111, contrast: 112, saturation: 113, isFlipped: false };
  const saveName3 = '3d save';
  const state3 = { brightness: 121, contrast: 122, saturation: 123, isFlipped: false };

  appState.addEventListener(FilterEvent.Saved, onSaveCallback);
  appState.addEventListener(FilterEvent.Deleted, onDeleteCallback);
  appState.addEventListener(FilterEvent.Loaded, onLoadCallback);
  appState.addEventListener(FilterEvent.Selected, onSelectCallback);

  test('Should be correctly initialized', () => {
    expect(appState.getCurrentSaveName()).toEqual('');
    expect(appState.savesMap.size).toEqual(0);
    expect(appState.filterData.getState()).toStrictEqual(DEFAULT_FILTER);
  });

  test('Should return correct values after SAVE', () => {
    appState.filterData.brightness = state1.brightness;
    appState.filterData.contrast = state1.contrast;
    appState.filterData.saturation = state1.saturation;
    appState.filterData.isFlipped = state1.isFlipped;
    appState.save(saveName1);

    appState.filterData.brightness = state2.brightness;
    appState.filterData.contrast = state2.contrast;
    appState.filterData.saturation = state2.saturation;
    appState.filterData.isFlipped = state2.isFlipped;
    appState.save(saveName2);

    expect(appState.getCurrentSaveName()).toEqual(saveName2);
    expect(appState.savesMap.size).toEqual(2);
    expect(appState.filterData.getState()).toStrictEqual(state2);
  });

  test('Should return correct values after DELETE', () => {
    appState.delete(saveName2);

    expect(appState.getCurrentSaveName()).toEqual('');
    expect(appState.savesMap.size).toEqual(1);
    expect(appState.savesMap.get(saveName1)).toStrictEqual(state1);
    expect(appState.filterData.getState()).toStrictEqual(state2);
  });

  test('Should return correct values after RESTORE', () => {
    appState.filterData.brightness = state3.brightness;
    appState.filterData.contrast = state3.contrast;
    appState.filterData.saturation = state3.saturation;
    appState.filterData.isFlipped = state3.isFlipped;
    appState.save(saveName3);

    appState.restore(saveName1);

    expect(appState.getCurrentSaveName()).toEqual(saveName1);
    expect(appState.savesMap.size).toEqual(2);
    expect(appState.filterData.getState()).toStrictEqual(state1);
  });

  test('Should notify on data event', () => {
    expect(onSaveCallback.mock.calls.length).toEqual(3);
    expect(onDeleteCallback.mock.calls.length).toEqual(1);
    expect(onLoadCallback.mock.calls.length).toEqual(1);
    expect(onSelectCallback.mock.calls.length).toEqual(1);
  });
});
