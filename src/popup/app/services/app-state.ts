import AppEventTarget, { FilterEvent } from './app-events';
import FilterDataService from './filter-data';
import { getActiveTabId } from '../context/tab-utils';
import { FilterSaves, FilterState, SaveName } from './types';
import { loadFromLocal, saveToLocal } from './storage-local';
import { loadFromSession, saveToSession } from './storage-session';

export default class AppStateService extends AppEventTarget {
  public filterData: FilterDataService;

  public savesMap: FilterSaves = new Map<SaveName, FilterState>();

  private currentName: SaveName = '';

  public filterApplied: boolean = false;

  private tabIndex: number | null = null;

  constructor(filterData: FilterDataService) {
    super();
    this.filterData = filterData;
    this.loadAppState();
  }

  private async loadAppState(): Promise<void> {
    const saves = await loadFromLocal();
    if (saves) {
      this.savesMap = saves;
    }

    this.tabIndex = await getActiveTabId();

    if (this.tabIndex !== null) {
      const session = await loadFromSession(this.tabIndex);

      if (session) {
        this.currentName = session.saveName;
        this.filterApplied = session.filterApplied;
        this.filterData.setState(session.filterState);
      }
    }

    this.notify(FilterEvent.Loaded);
  }

  get tabId() {
    return this.tabIndex;
  }

  saveSessionState(): void {
    if (this.tabIndex) {
      saveToSession(this.tabIndex, {
        saveName: this.currentName,
        filterApplied: this.filterApplied,
        filterState: this.filterData.getState(),
      });
    }
  }

  saveLocalState(): void {
    if (this.tabIndex) {
      saveToLocal(this.savesMap);
    }
  }

  setCurrentSaveName(value: SaveName) {
    this.currentName = value;
    this.saveSessionState();
  }

  getCurrentSaveName() {
    return this.currentName;
  }

  save(name: SaveName) {
    this.savesMap.set(name, { ...this.filterData.getState() });
    this.currentName = name;

    this.saveSessionState();
    this.saveLocalState();

    this.notify(FilterEvent.Saved);
  }

  delete(name: SaveName) {
    this.savesMap.delete(name);
    if (name === this.currentName) {
      this.currentName = '';
    }

    this.saveSessionState();
    this.saveLocalState();

    this.notify(FilterEvent.Deleted);
  }

  restore(name: SaveName) {
    const state = this.savesMap.get(name);
    if (state) {
      this.filterData.setState(state);
      this.currentName = name;

      this.saveSessionState();

      this.notify(FilterEvent.Selected);
    }
  }
}
