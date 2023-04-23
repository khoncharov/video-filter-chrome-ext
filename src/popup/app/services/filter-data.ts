import { DEFAULT_FILTER } from '../constants';
import AppEventTarget from './app-events';
import { FilterEvent, FilterState } from './types';

class FilterDataService extends AppEventTarget {
  private currentState: FilterState = { ...DEFAULT_FILTER };

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
