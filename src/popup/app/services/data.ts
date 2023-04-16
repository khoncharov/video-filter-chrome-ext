import AppFilterEventTarget from './data-events';
import filterData from './filter-state';
import { loadFromLocal, saveToLocal } from './local-storage-utils';
import { FilterEvent, FilterState, SaveName } from './types';

class FilterStateService extends AppFilterEventTarget {
  public savesStorage = new Map<SaveName, FilterState>();

  private currentName: SaveName = '';

  constructor() {
    super();
    this.loadAppState();
  }

  private async loadAppState(): Promise<void> {
    const { currentName, currentFilterState, savesStorage } = await loadFromLocal();
    filterData.setState(currentFilterState);
    this.currentName = currentName;
    this.savesStorage = savesStorage;

    this.notify(FilterEvent.Loaded);
  }

  set currentSaveName(value: SaveName) {
    this.currentName = value;
    saveToLocal({
      currentName: this.currentName,
      currentFilterState: filterData.getState(),
    });
  }

  get currentSaveName() {
    return this.currentName;
  }

  save(name: SaveName) {
    this.savesStorage.set(name, { ...filterData.getState() });
    this.currentName = name;
    saveToLocal({ currentName: this.currentName, savesStorage: this.savesStorage });

    this.notify(FilterEvent.Saved);
  }

  delete(name: SaveName) {
    this.savesStorage.delete(name);
    if (name === this.currentName) {
      this.currentName = '';
    }
    saveToLocal({ currentName: this.currentName, savesStorage: this.savesStorage });

    this.notify(FilterEvent.Deleted);
  }

  restore(name: SaveName) {
    const state = this.savesStorage.get(name);
    if (state) {
      filterData.setState(state);
      this.currentName = name;
      saveToLocal({ currentName: this.currentName, currentFilterState: state });
    }

    this.notify(FilterEvent.Selected);
  }
}

const filterState = new FilterStateService();
export default filterState;
