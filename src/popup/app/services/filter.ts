/* eslint-disable no-underscore-dangle */
import { DEFAULT_VALUE } from '../constants';
import { FilterState } from '../types';

export default class FilterStateService extends EventTarget {
  private _brightness: number = DEFAULT_VALUE.brightness;

  private _contrast: number = DEFAULT_VALUE.contrast;

  private _saturation: number = DEFAULT_VALUE.saturation;

  private _isFlipped: boolean = DEFAULT_VALUE.isFlipped;

  constructor() {
    super();
    this.init();
  }

  get brightness() {
    return this._brightness;
  }

  set brightness(value: number) {
    this._brightness = value;
    this.notify();
    chrome.storage.local.set({ brightness: value });
  }

  get contrast() {
    return this._contrast;
  }

  set contrast(value: number) {
    this._contrast = value;
    this.notify();
    chrome.storage.local.set({ contrast: value });
  }

  get saturation() {
    return this._saturation;
  }

  set saturation(value: number) {
    this._saturation = value;
    this.notify();
    chrome.storage.local.set({ saturation: value });
  }

  get isFlipped() {
    return this._isFlipped;
  }

  set isFlipped(value: boolean) {
    this._isFlipped = value;
    this.notify();
    chrome.storage.local.set({ isFlipped: value });
  }

  notify() {
    this.dispatchEvent(new CustomEvent('filterChanged'));
  }

  async init(): Promise<void> {
    await chrome.storage.local.get(['brightness']).then((data) => {
      this._brightness = data.brightness ?? DEFAULT_VALUE.brightness;
    });
    await chrome.storage.local.get(['contrast']).then((data) => {
      this._contrast = data.contrast ?? DEFAULT_VALUE.contrast;
    });
    await chrome.storage.local.get(['saturation']).then((data) => {
      this._saturation = data.saturation ?? DEFAULT_VALUE.saturation;
    });
    await chrome.storage.local.get(['isFlipped']).then((data) => {
      this._isFlipped = data.isFlipped ?? DEFAULT_VALUE.isFlipped;
    });

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
