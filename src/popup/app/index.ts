import FilterComponent from './components/filter';
import SaveStateComponent from './components/save-state';
import SaveDataService from './services/data';
import { changeFilterHandler, showRectHandler } from './context-utils';
import { DEFAULT_VALUE } from './constants';
import { DataEvent } from './services/types';

export default class RootComponent {
  private showRectBtn = document.querySelector('button#show-rect-btn') as HTMLButtonElement;

  private defaultBtn = document.querySelector('button#default-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('button#apply-btn') as HTMLButtonElement;

  private saveNameCaption = document.querySelector('span#save-name-caption') as HTMLSpanElement;

  private isTracking: boolean = false;

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
      changeFilterHandler(this.data.currentFilterState);
    });

    this.data.addEventListener(DataEvent.UserChangeFilter, () => {
      this.saveComp.list.clearSelected();
      this.updateSaveNameCaption();
      this.applyContextScript();
    });

    this.data.addEventListener(DataEvent.Loaded, () => {
      this.filterComp.updateView();
      this.updateSaveNameCaption();
      this.saveComp.list.update();
      this.applyContextScript();
    });

    this.data.addEventListener(DataEvent.Saved, () => {
      this.updateSaveNameCaption();
      this.saveComp.list.update();
      this.applyContextScript();
    });

    this.data.addEventListener(DataEvent.Deleted, () => {
      this.updateSaveNameCaption();
      this.saveComp.list.update();
    });
  }

  applyContextScript(): void {
    if (this.isTracking) {
      changeFilterHandler(this.data.currentFilterState);
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

  updateSaveNameCaption(): void {
    const currentName = this.data.currentSaveName ? ` - ${this.data.currentSaveName}` : '';
    this.saveNameCaption.textContent = currentName;
  }
}
