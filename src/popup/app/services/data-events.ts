import { DataEvent } from './types';

export default class DataEventTarget extends EventTarget {
  notify(event: DataEvent) {
    this.dispatchEvent(new CustomEvent(event));
  }
}
