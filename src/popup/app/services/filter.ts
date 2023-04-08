/* eslint-disable no-underscore-dangle */
import { DEFAULT_VALUE } from '../constants';
import { FilterState } from '../types';

export default class FilterStateService extends EventTarget {
  private _brightness: number = DEFAULT_VALUE.brightness;

  private _contrast: number = DEFAULT_VALUE.contrast;

  private _saturation: number = DEFAULT_VALUE.saturation;

  private _isFlipped: boolean = DEFAULT_VALUE.isFlipped;

  notify() {
    this.dispatchEvent(new CustomEvent('filterChanged'));
  }

  get brightness() {
    return this._brightness;
  }

  set brightness(value: number) {
    this._brightness = value;
    this.notify();
  }

  get contrast() {
    return this._contrast;
  }

  set contrast(value: number) {
    this._contrast = value;
    this.notify();
  }

  get saturation() {
    return this._saturation;
  }

  set saturation(value: number) {
    this._saturation = value;
    this.notify();
  }

  get isFlipped() {
    return this._isFlipped;
  }

  set isFlipped(value: boolean) {
    this._isFlipped = value;
    this.notify();
  }

  getState(): FilterState {
    return {
      brightness: this._brightness,
      contrast: this._contrast,
      saturation: this._saturation,
      isFlipped: this._isFlipped,
    };
  }

  restoreState(state: FilterState): void {
    this._brightness = state.brightness;
    this._contrast = state.contrast;
    this._saturation = state.saturation;
    this._isFlipped = state.isFlipped;

    this.notify();
  }

  reset(): void {
    this.restoreState(DEFAULT_VALUE);
  }
}
