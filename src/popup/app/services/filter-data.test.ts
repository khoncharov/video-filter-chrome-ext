/* eslint-disable object-curly-newline */
import { DEFAULT_FILTER } from '../constants';
import { FilterEvent } from './app-events';
import { FilterDataService } from './filter-data';

describe('Test FilterDataService class', () => {
  const userActionHandler = jest.fn();
  const filterData = new FilterDataService();
  filterData.addEventListener(FilterEvent.UserChange, userActionHandler);

  test('Should return correct default values', () => {
    const { brightness, contrast, saturation, isFlipped } = filterData;

    expect(brightness).toEqual(DEFAULT_FILTER.brightness);
    expect(contrast).toEqual(DEFAULT_FILTER.contrast);
    expect(saturation).toEqual(DEFAULT_FILTER.saturation);
    expect(isFlipped).toEqual(DEFAULT_FILTER.isFlipped);
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
