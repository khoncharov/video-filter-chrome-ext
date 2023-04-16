import FilterEventTarget from './filter-events';
import { FilterEvent } from './types';

describe('Test FilterEventTarget class', () => {
  const obj = new FilterEventTarget();
  const cb = jest.fn();
  obj.addEventListener(FilterEvent.Saved, cb);

  test('Should call callback function', () => {
    obj.notify(FilterEvent.Saved);
    expect(cb.mock.calls.length).toEqual(1);
  });
});
