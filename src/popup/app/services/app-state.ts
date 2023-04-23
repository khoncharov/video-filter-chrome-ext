import AppEventTarget from './app-events';
import filterData from './filter-data';
import { loadFromLocal, saveToLocal } from './local-storage';
import { FilterEvent, FilterState, SaveName } from './types';

class AppStateService extends AppEventTarget {
  public savesMap = new Map<SaveName, FilterState>();

  private currentName: SaveName = '';

  public filterApplied = false;

  constructor() {
    super();
    this.loadAppState();
  }

  private async loadAppState(): Promise<void> {
    const { currentName, currentFilterState, savesMap } = await loadFromLocal();
    filterData.setState(currentFilterState);
    this.currentName = currentName;
    this.savesMap = savesMap;

    this.notify(FilterEvent.Loaded);
  }

  setCurrentSaveName(value: SaveName) {
    this.currentName = value;
    saveToLocal({
      currentName: this.currentName,
      currentFilterState: filterData.getState(),
    });
  }

  getCurrentSaveName() {
    return this.currentName;
  }

  save(name: SaveName) {
    this.savesMap.set(name, { ...filterData.getState() });
    this.currentName = name;
    saveToLocal({ currentName: this.currentName, savesMap: this.savesMap });

    this.notify(FilterEvent.Saved);
  }

  delete(name: SaveName) {
    this.savesMap.delete(name);
    if (name === this.currentName) {
      this.currentName = '';
    }
    saveToLocal({ currentName: this.currentName, savesMap: this.savesMap });

    this.notify(FilterEvent.Deleted);
  }

  restore(name: SaveName) {
    const state = this.savesMap.get(name);
    if (state) {
      filterData.setState(state);
      this.currentName = name;
      saveToLocal({ currentName: this.currentName, currentFilterState: state });

      this.notify(FilterEvent.Selected);
    }
  }
}

const appState = new AppStateService();
export default appState;
