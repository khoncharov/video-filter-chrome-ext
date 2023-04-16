import { FilterEvent } from './types';

export default class FilterEventTarget extends EventTarget {
  notify(event: FilterEvent) {
    this.dispatchEvent(new Event(event));
  }
}
