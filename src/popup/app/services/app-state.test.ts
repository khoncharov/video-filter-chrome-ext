/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
import AppStateService from './app-state';
import FilterDataService from './filter-data';
import { DEFAULT_FILTER } from '../constants';
import { FilterEvent } from './app-events';

jest.mock('./chrome-utils');
jest.mock('../context/tab-utils');

describe('Test SaveDataService class', () => {
  const filter = new FilterDataService();

  const onSaveCallback = jest.fn();
  const onDeleteCallback = jest.fn();
  const onLoadCallback = jest.fn();
  const onSelectCallback = jest.fn();

  const appState = new AppStateService(filter);

  appState.addEventListener(FilterEvent.Saved, onSaveCallback);
  appState.addEventListener(FilterEvent.Deleted, onDeleteCallback);
  appState.addEventListener(FilterEvent.Loaded, onLoadCallback);
  appState.addEventListener(FilterEvent.Selected, onSelectCallback);

  test('Should be correctly initialized', () => {
    expect(appState.filterData.getState()).toEqual(DEFAULT_FILTER);
    expect(appState.savesMap.size).toEqual(0);
    expect(appState.getCurrentSaveName()).toEqual('');
    expect(appState.filterApplied).toBeFalsy();
    expect(appState.tabId).toBe(123);
  });

  const saveName1 = 'First save';
  const saveState1 = { brightness: 101, contrast: 102, saturation: 103, isFlipped: true };
  const saveFilterApplied1 = true;
  const saveName2 = 'Second save';
  const saveState2 = { brightness: 111, contrast: 112, saturation: 113, isFlipped: false };
  const saveFilterApplied2 = false;

  test('Should save & return correct values after SAVE', () => {
    appState.setCurrentSaveName(saveName1);
    appState.filterData.setState(saveState1);
    appState.filterApplied = saveFilterApplied1;
    appState.save(saveName1);

    expect(appState.filterData.getState()).toEqual(saveState1);
    expect(appState.savesMap.size).toEqual(1);
    expect(appState.getCurrentSaveName()).toEqual(saveName1);
    expect(appState.filterApplied).toBe(saveFilterApplied1);
    expect(appState.tabId).toBe(123);

    appState.setCurrentSaveName(saveName2);
    appState.filterData.setState(saveState2);
    appState.filterApplied = saveFilterApplied2;
    appState.save(saveName2);
    expect(appState.filterData.getState()).toEqual(saveState2);
    expect(appState.savesMap.size).toEqual(2);
    expect(appState.getCurrentSaveName()).toEqual(saveName2);
    expect(appState.filterApplied).toBe(saveFilterApplied2);
    expect(appState.tabId).toBe(123);
  });

  test('Should return correct values after RESTORE', () => {
    appState.restore(saveName1);
    expect(appState.filterData.getState()).toEqual(saveState1);
    expect(appState.savesMap.size).toEqual(2);
    expect(appState.getCurrentSaveName()).toEqual(saveName1);
    expect(appState.filterApplied).toBe(saveFilterApplied2);
    expect(appState.tabId).toBe(123);
  });

  test('Should return correct values after DELETE', () => {
    appState.delete(saveName1);
    expect(appState.filterData.getState()).toEqual(saveState1);
    expect(appState.savesMap.size).toEqual(1);
    expect(appState.getCurrentSaveName()).toEqual('');
    expect(appState.filterApplied).toBe(saveFilterApplied2);
    expect(appState.tabId).toBe(123);
  });

  test('Should notify on data event', () => {
    expect(onSaveCallback.mock.calls.length).toEqual(2);
    expect(onDeleteCallback.mock.calls.length).toEqual(1);
    expect(onLoadCallback.mock.calls.length).toEqual(1);
    expect(onSelectCallback.mock.calls.length).toEqual(1);
  });
});
