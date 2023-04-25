export enum FilterEvent {
  UserChange = 'userChange',
  Loaded = 'dataLoaded',
  Saved = 'dataSaved',
  Deleted = 'dataDeleted',
  Selected = 'dataSelected',
}

export default class FilterEventTarget extends EventTarget {
  notify(event: FilterEvent) {
    this.dispatchEvent(new Event(event));
  }
}
