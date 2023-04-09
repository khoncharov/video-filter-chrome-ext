import { DEFAULT_VALUE } from '../constants';
import { FilterState, SaveName } from '../types';

type TDataEvent = 'dataChanged' | 'dataLoaded' | 'dataSaved';

export default class SaveDataService extends EventTarget {
  private storage = new Map<SaveName, FilterState>();

  private current: SaveName = '';

  private currentState: FilterState = { ...DEFAULT_VALUE };

  constructor() {
    super();
    this.restoreFromLS();
  }

  set brightness(value: number) {
    this.currentState.brightness = value;
    this.notify('dataChanged');
  }

  get brightness() {
    return this.currentState.brightness;
  }

  set contrast(value: number) {
    this.currentState.contrast = value;
    this.notify('dataChanged');
  }

  get contrast() {
    return this.currentState.contrast;
  }

  set saturation(value: number) {
    this.currentState.saturation = value;
    this.notify('dataChanged');
  }

  get saturation() {
    return this.currentState.saturation;
  }

  set isFlipped(value: boolean) {
    this.currentState.isFlipped = value;
    this.notify('dataChanged');
  }

  get isFlipped() {
    return this.currentState.isFlipped;
  }

  loadFilterState(state: FilterState = DEFAULT_VALUE) {
    this.currentState.brightness = state.brightness;
    this.currentState.contrast = state.contrast;
    this.currentState.saturation = state.saturation;
    this.currentState.isFlipped = state.isFlipped;
  }

  getCurrentFilterState(): FilterState {
    return this.currentState;
  }

  notify(event: TDataEvent) {
    this.dispatchEvent(new CustomEvent(event));
  }

  set currentSaveName(value: SaveName) {
    this.current = value;
    chrome.storage.local.set({
      currentName: value,
    });
  }

  get currentSaveName() {
    return this.current;
  }

  forEach(
    callbackfn: (value: FilterState, key: SaveName, map: Map<SaveName, FilterState>) => void,
  ): void {
    const map = this.storage;
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of this.storage.entries()) {
      const key = entry[0];
      const value = entry[1];
      callbackfn(value, key, map);
    }
  }

  saveItem(name: SaveName) {
    this.storage.set(name, this.currentState);
    this.currentSaveName = name;
    chrome.storage.local.set({
      savesList: JSON.stringify(Array.from(this.storage)),
      currentName: this.currentSaveName,
    });
    this.notify('dataSaved');
  }

  getState(item: SaveName): FilterState | null {
    return this.storage.get(item) ?? null;
  }

  deleteItem(item: SaveName) {
    this.storage.delete(item);
    if (item === this.current) {
      this.currentSaveName = '';
    }
    chrome.storage.local.set({
      savesList: JSON.stringify(Array.from(this.storage)),
    });
    this.notify('dataChanged');
  }

  restoreState(name: SaveName) {
    const state = this.getState(name);
    if (state) {
      this.loadFilterState(state);
      this.current = name;
    }

    this.notify('dataLoaded');
  }

  restoreFromLS() {
    chrome.storage.local.get(['savesList', 'currentName']).then((data) => {
      this.storage = new Map<SaveName, FilterState>(JSON.parse(data.savesList ?? '[]'));
      this.current = data.currentName ?? '';

      this.notify('dataLoaded');
    });
  }
}
