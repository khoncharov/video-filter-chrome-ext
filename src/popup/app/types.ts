export interface AppState {
  filterState: FilterState;
  loadedSave: SaveName;
  isTracking: boolean;
}

export interface TDataService {
  savedData: Map<SaveName, FilterState>;
}

export type SaveName = string;

export interface SaveItem {
  name: SaveName;
  data: FilterState;
}

export interface FilterState {
  brightness: number;
  contrast: number;
  saturation: number;
  isFlipped: boolean;
}
