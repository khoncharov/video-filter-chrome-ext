/* eslint-disable object-curly-newline */
import { DataEvent } from './types';
import { DEFAULT_VALUE } from '../constants';
import FilterDataService from './filter-state';

describe('Test FilterDataService class', () => {
  const filter = new FilterDataService();
  const userActionHandler = jest.fn();
  filter.addEventListener(DataEvent.UserChangeFilter, userActionHandler);

  test('Should return correct default values', () => {
    const { brightness, contrast, saturation, isFlipped } = filter;

    expect(brightness).toEqual(DEFAULT_VALUE.brightness);
    expect(contrast).toEqual(DEFAULT_VALUE.contrast);
    expect(saturation).toEqual(DEFAULT_VALUE.saturation);
    expect(isFlipped).toEqual(DEFAULT_VALUE.isFlipped);
  });

  test('Should return correct values', () => {
    filter.brightness = 999;
    filter.contrast = 888;
    filter.saturation = 777;
    filter.isFlipped = true;

    expect(filter.currentFilterState).toStrictEqual({
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
