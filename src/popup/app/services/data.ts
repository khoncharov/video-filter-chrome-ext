import { DEFAULT_VALUE } from '../constants';
import { DataEvent, FilterState, SaveName } from '../types';

export default class SaveDataService extends EventTarget {
  private storage = new Map<SaveName, FilterState>();

  private currentName: SaveName = '';

  private currentState: FilterState = { ...DEFAULT_VALUE };

  constructor() {
    super();
    this.restoreFromLS();
  }

  notify(event: DataEvent) {
    this.dispatchEvent(new CustomEvent(event));
  }

  set brightness(value: number) {
    this.currentState.brightness = value;
    this.notify(DataEvent.UserChangeFilter);
  }

  get brightness() {
    return this.currentState.brightness;
  }

  set contrast(value: number) {
    this.currentState.contrast = value;
    this.notify(DataEvent.UserChangeFilter);
  }

  get contrast() {
    return this.currentState.contrast;
  }

  set saturation(value: number) {
    this.currentState.saturation = value;
    this.notify(DataEvent.UserChangeFilter);
  }

  get saturation() {
    return this.currentState.saturation;
  }

  set isFlipped(value: boolean) {
    this.currentState.isFlipped = value;
    this.notify(DataEvent.UserChangeFilter);
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

  set currentSaveName(value: SaveName) {
    this.currentName = value;
    chrome.storage.local.set({
      currentName: value,
    });
  }

  get currentSaveName() {
    return this.currentName;
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
    this.notify(DataEvent.Saved);
  }

  getState(name: SaveName): FilterState | null {
    return this.storage.get(name) ?? null;
  }

  deleteItem(name: SaveName) {
    this.storage.delete(name);
    if (name === this.currentName) {
      this.currentSaveName = '';
    }
    chrome.storage.local.set({
      savesList: JSON.stringify(Array.from(this.storage)),
    });
    this.notify(DataEvent.Deleted);
  }

  restoreState(name: SaveName) {
    const state = this.getState(name);
    if (state) {
      this.loadFilterState(state);
      this.currentName = name;
    }

    this.notify(DataEvent.Loaded);
  }

  restoreFromLS() {
    chrome.storage.local.get(['savesList', 'currentName']).then((data) => {
      this.storage = new Map<SaveName, FilterState>(JSON.parse(data.savesList ?? '[]'));
      this.currentName = data.currentName ?? '';

      this.notify(DataEvent.Loaded);
    });
  }
}
