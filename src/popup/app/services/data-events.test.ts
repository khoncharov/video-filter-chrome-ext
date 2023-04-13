import DataEventTarget from './data-events';
import { DataEvent } from './types';

describe('Test DataEventTarget class', () => {
  const obj = new DataEventTarget();
  const cb = jest.fn();
  obj.addEventListener(DataEvent.Saved, cb);

  test('Should call callback function', () => {
    obj.notify(DataEvent.Saved);
    expect(cb.mock.calls.length).toEqual(1);
  });
});
