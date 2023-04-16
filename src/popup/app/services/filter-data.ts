import { DEFAULT_VALUE } from '../constants';
import FilterEventTarget from './filter-events';
import { FilterEvent, FilterState } from './types';

class FilterDataService extends FilterEventTarget {
  private currentState: FilterState = { ...DEFAULT_VALUE };

  set brightness(value: number) {
    this.currentState.brightness = value;
    this.notify(FilterEvent.UserChange);
  }

  get brightness() {
    return this.currentState.brightness;
  }

  set contrast(value: number) {
    this.currentState.contrast = value;
    this.notify(FilterEvent.UserChange);
  }

  get contrast() {
    return this.currentState.contrast;
  }

  set saturation(value: number) {
    this.currentState.saturation = value;
    this.notify(FilterEvent.UserChange);
  }

  get saturation() {
    return this.currentState.saturation;
  }

  set isFlipped(value: boolean) {
    this.currentState.isFlipped = value;
    this.notify(FilterEvent.UserChange);
  }

  get isFlipped() {
    return this.currentState.isFlipped;
  }

  setState(value: FilterState): void {
    this.currentState = { ...value };
  }

  getState(): FilterState {
    return this.currentState;
  }
}

const filterData = new FilterDataService();
export default filterData;
