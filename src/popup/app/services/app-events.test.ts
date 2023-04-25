import AppEventTarget, { FilterEvent } from './app-events';

describe('Test AppEventTarget class', () => {
  const obj = new AppEventTarget();
  const cb = jest.fn();
  obj.addEventListener(FilterEvent.Saved, cb);

  test('Should call callback function', () => {
    obj.notify(FilterEvent.Saved);
    expect(cb.mock.calls.length).toEqual(1);
  });
});
