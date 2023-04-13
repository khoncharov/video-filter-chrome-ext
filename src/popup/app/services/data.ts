import FilterDataService from './filter-state';
import { loadFromLocal, saveToLocal } from './local-storage-utils';
import { DataEvent, FilterState, SaveName } from './types';

export default class SaveDataService extends FilterDataService {
  public savesStorage = new Map<SaveName, FilterState>();

  private currentName: SaveName = '';

  constructor() {
    super();

    this.loadAppState();

    this.addEventListener(DataEvent.UserChangeFilter, () => {
      this.currentName = '';
      saveToLocal({ currentName: this.currentSaveName, currentFilterState: this.filterState });
    });
  }

  private async loadAppState(): Promise<void> {
    const { currentName, currentFilterState, savesStorage } = await loadFromLocal();
    this.filterState = currentFilterState;
    this.currentName = currentName;
    this.savesStorage = savesStorage;

    this.notify(DataEvent.Loaded);
  }

  get currentSaveName() {
    return this.currentName;
  }

  saveState(name: SaveName) {
    this.savesStorage.set(name, { ...this.filterState });
    this.currentName = name;
    saveToLocal({ currentName: this.currentName, savesStorage: this.savesStorage });

    this.notify(DataEvent.Saved);
  }

  deleteSavedState(name: SaveName) {
    this.savesStorage.delete(name);
    if (name === this.currentName) {
      this.currentName = '';
    }
    saveToLocal({ currentName: this.currentName, savesStorage: this.savesStorage });

    this.notify(DataEvent.Deleted);
  }

  restoreState(name: SaveName) {
    const state = this.savesStorage.get(name);
    if (state) {
      this.filterState = { ...state };
      this.currentName = name;
      saveToLocal({ currentName: this.currentName, currentFilterState: state });
    }

    this.notify(DataEvent.Selected);
  }
}
