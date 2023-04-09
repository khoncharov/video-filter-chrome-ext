// export interface TDataService {
//   savedData: Map<SaveName, FilterState>;
// }

export type SaveName = string;

export interface FilterState {
  brightness: number;
  contrast: number;
  saturation: number;
  isFlipped: boolean;
}

export enum DataEvent {
  UserChangeFilter = 'userChangeFilter',
  Loaded = 'dataLoaded',
  Saved = 'dataSaved',
  Deleted = 'dataDeleted',
}
