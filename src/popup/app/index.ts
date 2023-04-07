import { fromEvent, throttleTime } from 'rxjs';
import FilterDialogComponent from './components/dialog-filter';
import FilterService from './services/filter';
import { changeFilterHandler, showRectHandler } from './utils';
import { DEFAULT_VALUE } from './constants';

export default class RootComponent {
  private showRectBtn = document.querySelector('#show-rect-btn') as HTMLButtonElement;

  private defaultBtn = document.querySelector('#default-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('#apply-btn') as HTMLButtonElement;

  public isTracking: boolean = false;

  private filter: FilterService = new FilterService();

  private filterDialog: FilterDialogComponent;

  // public loadedSave!: SaveName;
  // private data: DataService;

  constructor() {
    this.filterDialog = new FilterDialogComponent(this.filter);
    // this.data = new DataService();
    // this.data.restoreAppState();
    // this.filter.brightness.subscribe();
  }

  init(): void {
    fromEvent(this.showRectBtn, 'click').pipe(throttleTime(600)).subscribe(showRectHandler);

    fromEvent(this.defaultBtn, 'click')
      .pipe(throttleTime(50))
      .subscribe(() => {
        this.isTracking = false;
        changeFilterHandler(DEFAULT_VALUE);
      });

    fromEvent(this.applyBtn, 'click')
      .pipe(throttleTime(50))
      .subscribe(() => {
        this.isTracking = true;
        changeFilterHandler(this.filter);
      });

    fromEvent(this.filter, 'filterChanged')
      .pipe(throttleTime(50))
      .subscribe(() => {
        this.filterDialog.update();
      });
  }
}
