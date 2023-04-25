import { validTabId, validTabUrl } from './tab-utils';

describe('Test valid tab conditions', () => {
  test('Tab id validation function', () => {
    expect(validTabId(0)).toBeTruthy();
    expect(validTabId(42)).toBeTruthy();
    expect(validTabId(undefined)).toBeFalsy();
  });

  test('Tab url validation function', () => {
    expect(validTabUrl('https://www.youtube.com/')).toBeTruthy();
    expect(validTabUrl('chrome://extensions/')).toBeFalsy();
    expect(validTabUrl(undefined)).toBeFalsy();
  });
});
