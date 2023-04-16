export type SaveName = string;

export interface FilterState {
  brightness: number;
  contrast: number;
  saturation: number;
  isFlipped: boolean;
}

export enum FilterEvent {
  UserChange = 'userChange',
  Loaded = 'dataLoaded',
  Saved = 'dataSaved',
  Deleted = 'dataDeleted',
  Selected = 'dataSelected',
}
