import FilterComponent from './components/filter';
import SaveStateComponent from './components/save-state';
import SaveDataService from './services/data';
import { changeFilterHandler, showRectHandler } from './utils';
import { DEFAULT_VALUE } from './constants';

export default class RootComponent {
  private showRectBtn = document.querySelector('#show-rect-btn') as HTMLButtonElement;

  private defaultBtn = document.querySelector('#default-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('#apply-btn') as HTMLButtonElement;

  public isTracking: boolean = false;

  private data = new SaveDataService();

  private filterComp: FilterComponent;

  private saveComp: SaveStateComponent;

  constructor() {
    this.filterComp = new FilterComponent(this.data);

    this.saveComp = new SaveStateComponent(this.data);
  }

  init(): void {
    this.showRectBtn.addEventListener('click', showRectHandler);

    this.defaultBtn.addEventListener('click', () => {
      this.isTracking = false;
      this.changeApplyBtn(this.isTracking);
      changeFilterHandler(DEFAULT_VALUE);
    });

    this.applyBtn.addEventListener('click', () => {
      this.isTracking = true;
      this.changeApplyBtn(this.isTracking);
      changeFilterHandler(this.data.getCurrentFilterState());
    });

    this.data.addEventListener('dataChanged', () => {
      // INPUT on some filter control
      this.saveComp.clearSelectedItem();

      this.applyContextScript();
    });

    this.data.addEventListener('dataLoaded', () => {
      // LIST ITEM click or load from LS ??
      this.filterComp.updateView();
      this.saveComp.updateList();

      this.applyContextScript();
    });

    this.data.addEventListener('dataSaved', () => {
      // NEW SAVE ADDED - saveItem click
      // this.filter.updateView();
      this.saveComp.updateList();

      this.applyContextScript();
    });
  }

  applyContextScript() {
    if (this.isTracking) {
      changeFilterHandler(this.data.getCurrentFilterState());
    }
  }

  changeApplyBtn(isTracking: boolean): void {
    if (isTracking) {
      this.applyBtn.innerText = 'track';
      this.applyBtn.classList.add('btn-tracking-mode');
    } else {
      this.applyBtn.innerText = 'apply';
      this.applyBtn.classList.remove('btn-tracking-mode');
    }
  }
}
