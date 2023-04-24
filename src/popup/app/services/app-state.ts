import { getActiveTabId } from '../context/tab-utils';
import AppEventTarget, { FilterEvent } from './app-events';
import filterData from './filter-data';
import { loadFromLocal, saveToLocal } from './storage-local';
import { loadFromSession, saveToSession } from './storage-session';
import { FilterSaves, FilterState, SaveName } from './types';

class AppStateService extends AppEventTarget {
  public savesMap: FilterSaves = new Map<SaveName, FilterState>();

  private currentName: SaveName = '';

  public filterApplied: boolean = false;

  public tabId: number | null = null;

  constructor() {
    super();
    this.loadAppState();
  }

  private async loadAppState(): Promise<void> {
    const saves = await loadFromLocal();
    if (saves) {
      this.savesMap = saves;
    }

    this.tabId = await getActiveTabId();

    if (this.tabId !== null) {
      const session = await loadFromSession(this.tabId);

      if (session) {
        this.currentName = session.saveName;
        this.filterApplied = session.filterApplied;
        filterData.setState(session.filterState);
      }
    }

    this.notify(FilterEvent.Loaded);
  }

  setCurrentSaveName(value: SaveName) {
    this.currentName = value;

    if (this.tabId) {
      saveToSession(this.tabId, {
        saveName: this.currentName,
        filterApplied: this.filterApplied,
        filterState: filterData.getState(),
      });
    }
  }

  getCurrentSaveName() {
    return this.currentName;
  }

  save(name: SaveName) {
    this.savesMap.set(name, { ...filterData.getState() });
    this.currentName = name;

    if (this.tabId) {
      saveToSession(this.tabId, {
        saveName: this.currentName,
        filterApplied: this.filterApplied,
        filterState: filterData.getState(),
      });
      saveToLocal(this.savesMap);
    }

    this.notify(FilterEvent.Saved);
  }

  delete(name: SaveName) {
    this.savesMap.delete(name);
    if (name === this.currentName) {
      this.currentName = '';
    }

    if (this.tabId) {
      saveToSession(this.tabId, {
        saveName: this.currentName,
        filterApplied: this.filterApplied,
        filterState: filterData.getState(),
      });
      saveToLocal(this.savesMap);
    }

    this.notify(FilterEvent.Deleted);
  }

  restore(name: SaveName) {
    const state = this.savesMap.get(name);
    if (state) {
      filterData.setState(state);
      this.currentName = name;

      if (this.tabId) {
        saveToSession(this.tabId, {
          saveName: this.currentName,
          filterApplied: this.filterApplied,
          filterState: filterData.getState(),
        });
      }

      this.notify(FilterEvent.Selected);
    }
  }
}

const appState = new AppStateService();
export default appState;
