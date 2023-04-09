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
