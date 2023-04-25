import { showVideoRect } from './show-rect';

jest.useFakeTimers();

afterAll(() => {
  jest.useRealTimers();
});

describe('Test showVideoRect function', () => {
  jest.spyOn(window, 'setTimeout');

  const BORDER_STYLE = '1rem dashed magenta';

  test('Should not be called if there is no <video> tag on the page', () => {
    showVideoRect();

    expect(setTimeout).toHaveBeenCalledTimes(0);
  });

  test('Border style should be changed for a short time if there is <video> tag on the page', () => {
    const vid = document.createElement('video');
    document.body.append(vid);

    showVideoRect();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(vid.style.border).toBe(BORDER_STYLE);

    jest.runAllTimers();

    expect(vid.style.border).toBe('');
  });
});
