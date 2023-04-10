import { DEFAULT_VALUE } from '../constants';
import { DataEvent, FilterState, SaveName } from '../types';

export default class SaveDataService extends EventTarget {
  private storage = new Map<SaveName, FilterState>();

  private currentName: SaveName = '';

  private currentState: FilterState = { ...DEFAULT_VALUE };

  constructor() {
    super();
    this.restoreFromLocal();
  }

  notify(event: DataEvent) {
    this.dispatchEvent(new CustomEvent(event));
  }

  // FILTER ITEMS

  set brightness(value: number) {
    this.currentState.brightness = value;
    this.saveCurrentFilterStateToLocal();
    this.notify(DataEvent.UserChangeFilter);
  }

  get brightness() {
    return this.currentState.brightness;
  }

  set contrast(value: number) {
    this.currentState.contrast = value;
    this.saveCurrentFilterStateToLocal();
    this.notify(DataEvent.UserChangeFilter);
  }

  get contrast() {
    return this.currentState.contrast;
  }

  set saturation(value: number) {
    this.currentState.saturation = value;
    this.saveCurrentFilterStateToLocal();
    this.notify(DataEvent.UserChangeFilter);
  }

  get saturation() {
    return this.currentState.saturation;
  }

  set isFlipped(value: boolean) {
    this.currentState.isFlipped = value;
    this.saveCurrentFilterStateToLocal();
    this.notify(DataEvent.UserChangeFilter);
  }

  get isFlipped() {
    return this.currentState.isFlipped;
  }

  // FILTER STATE

  saveCurrentFilterStateToLocal() {
    chrome.storage.local.set({
      currentFilterState: this.currentState,
    });
  }

  set currentFilterState(state: FilterState) {
    this.currentState = { ...state };
    this.saveCurrentFilterStateToLocal();
  }

  get currentFilterState(): FilterState {
    return this.currentState;
  }

  // CURRENT SAVE NAME

  set currentSaveName(name: SaveName) {
    this.currentName = name;
    chrome.storage.local.set({
      currentName: name,
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
      this.currentFilterState = state;
      this.currentSaveName = name;
    }

    this.notify(DataEvent.Loaded);
  }

  restoreFromLocal() {
    chrome.storage.local.get(['savesList', 'currentName', 'currentFilterState']).then((data) => {
      this.storage = new Map<SaveName, FilterState>(JSON.parse(data.savesList ?? '[]'));
      this.currentName = data.currentName ?? '';
      this.currentFilterState = data.currentFilterState ?? { ...DEFAULT_VALUE };

      this.notify(DataEvent.Loaded);
    });
  }
}
