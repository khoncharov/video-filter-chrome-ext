/* Local */

export type SaveName = string;

export interface FilterState {
  brightness: number;
  contrast: number;
  saturation: number;
  isFlipped: boolean;
}

export type FilterSaves = Map<SaveName, FilterState>;

export interface LocalStorageItem {
  savesStorage: [SaveName, FilterState][];
}

export type LocalStorageName = keyof LocalStorageItem;

/* Session */

export type TabId = number;

export interface SessionDescriptor {
  filterApplied: boolean;
  saveName: SaveName;
  filterState: FilterState;
}

export interface SessionStorageItem {
  [key: string]: SessionDescriptor;
}
