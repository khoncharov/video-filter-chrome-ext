import { FilterState, SaveName } from '../types';

export default class SaveDataService extends EventTarget {
  private data = new Map<SaveName, FilterState>();

  private current: SaveName = '';

  constructor() {
    super();
    this.restore();
  }

  set currentSaveName(value: SaveName) {
    this.current = value;
    chrome.storage.local.set({
      currentName: value,
    });
    this.dispatchEvent(new CustomEvent('dataChanged'));
  }

  get currentSaveName() {
    return this.current;
  }

  forEachValue(
    callbackfn: (value: FilterState, key: SaveName, map: Map<SaveName, FilterState>) => void,
  ): void {
    const map = this.data;
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of this.data.entries()) {
      const key = entry[0];
      const value = entry[1];
      callbackfn(value, key, map);
    }
  }

  saveItem(item: SaveName, state: FilterState) {
    this.data.set(item, state);
    this.current = item;
    chrome.storage.local.set({
      savesList: JSON.stringify(Array.from(this.data)),
      currentName: item,
    });
    this.dispatchEvent(new CustomEvent('dataChanged'));
  }

  getState(item: SaveName): FilterState | null {
    return this.data.get(item) ?? null;
  }

  deleteItem(item: SaveName) {
    this.data.delete(item);
    if (item === this.current) {
      this.current = '';
    }
    chrome.storage.local.set({
      savesList: JSON.stringify(Array.from(this.data)),
    });
    this.dispatchEvent(new CustomEvent('dataChanged'));
  }

  restore() {
    chrome.storage.local.get(['savesList', 'currentName']).then((data) => {
      this.data = new Map<SaveName, FilterState>(JSON.parse(data.savesList ?? '[]'));
      this.current = data.currentName ?? '';

      this.dispatchEvent(new CustomEvent('dataChanged'));
    });
  }
}
