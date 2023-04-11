import { DEFAULT_VALUE } from '../constants';
import DataEventTarget from './data-events';
import { DataEvent, FilterState } from './types';

export default class FilterDataService extends DataEventTarget {
  protected filterState: FilterState = { ...DEFAULT_VALUE };

  set brightness(value: number) {
    this.filterState.brightness = value;
    this.notify(DataEvent.UserChangeFilter);
  }

  get brightness() {
    return this.filterState.brightness;
  }

  set contrast(value: number) {
    this.filterState.contrast = value;
    this.notify(DataEvent.UserChangeFilter);
  }

  get contrast() {
    return this.filterState.contrast;
  }

  set saturation(value: number) {
    this.filterState.saturation = value;
    this.notify(DataEvent.UserChangeFilter);
  }

  get saturation() {
    return this.filterState.saturation;
  }

  set isFlipped(value: boolean) {
    this.filterState.isFlipped = value;
    this.notify(DataEvent.UserChangeFilter);
  }

  get isFlipped() {
    return this.filterState.isFlipped;
  }

  get currentFilterState() {
    return this.filterState;
  }
}
