import { fromEvent, throttleTime } from 'rxjs';
import FilterDialogComponent from './components/filter/filter-dialog';
import FilterService from './services/filter';
import { changeFilterHandler, showRectHandler } from './utils';
import { DEFAULT_VALUE } from './constants';
import SaveDialogComponent from './components/saves/saves-dialog';
import SaveDataService from './services/data';

export default class RootComponent {
  private showRectBtn = document.querySelector('#show-rect-btn') as HTMLButtonElement;

  private defaultBtn = document.querySelector('#default-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('#apply-btn') as HTMLButtonElement;

  public isTracking: boolean = false;

  private filter = new FilterService();

  private data = new SaveDataService();

  private filterDialog: FilterDialogComponent;

  private saveDialog: SaveDialogComponent;

  constructor() {
    this.filterDialog = new FilterDialogComponent(this.filter);

    this.saveDialog = new SaveDialogComponent(this.filter, this.data);
  }

  init(): void {
    fromEvent(this.showRectBtn, 'click').pipe(throttleTime(600)).subscribe(showRectHandler);

    fromEvent(this.defaultBtn, 'click')
      .pipe(throttleTime(50))
      .subscribe(() => {
        this.isTracking = false;
        this.changeApplyBtnAppearance(this.isTracking);
        changeFilterHandler(DEFAULT_VALUE);
      });

    fromEvent(this.applyBtn, 'click')
      .pipe(throttleTime(50))
      .subscribe(() => {
        this.isTracking = true;
        this.changeApplyBtnAppearance(this.isTracking);
        changeFilterHandler(this.filter);
      });

    fromEvent(this.filter, 'filterChanged').subscribe(() => {
      this.filterDialog.update();

      if (this.isTracking) {
        changeFilterHandler(this.filter);
      }
    });
  }

  changeApplyBtnAppearance(isTracking: boolean): void {
    if (isTracking) {
      this.applyBtn.innerText = 'track';
      this.applyBtn.classList.add('btn-tracking-mode');
    } else {
      this.applyBtn.innerText = 'apply';
      this.applyBtn.classList.remove('btn-tracking-mode');
    }
  }
}
