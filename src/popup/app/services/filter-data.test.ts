/* eslint-disable object-curly-newline */
import { FilterEvent } from './types';
import { DEFAULT_VALUE } from '../constants';
import filterData from './filter-data';

describe('Test FilterDataService class', () => {
  const userActionHandler = jest.fn();
  filterData.addEventListener(FilterEvent.UserChange, userActionHandler);

  test('Should return correct default values', () => {
    const { brightness, contrast, saturation, isFlipped } = filterData;

    expect(brightness).toEqual(DEFAULT_VALUE.brightness);
    expect(contrast).toEqual(DEFAULT_VALUE.contrast);
    expect(saturation).toEqual(DEFAULT_VALUE.saturation);
    expect(isFlipped).toEqual(DEFAULT_VALUE.isFlipped);
  });

  test('Should return correct values', () => {
    filterData.brightness = 999;
    filterData.contrast = 888;
    filterData.saturation = 777;
    filterData.isFlipped = true;

    expect(filterData.getState()).toStrictEqual({
      brightness: 999,
      contrast: 888,
      saturation: 777,
      isFlipped: true,
    });
  });

  test('Should notify', () => {
    expect(userActionHandler.mock.calls.length).toBe(4);
  });
});
