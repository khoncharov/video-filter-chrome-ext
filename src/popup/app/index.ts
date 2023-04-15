import FilterComponent from './components/filter';
import SaveStateComponent from './components/save-state';
import SaveDataService from './services/data';
import { changeFilterHandler, showRectHandler } from './context-utils';
import { DEFAULT_VALUE } from './constants';
import { DataEvent } from './services/types';

export default class RootComponent {
  private showRectBtn = document.querySelector('button#show-rect-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('button#apply-btn') as HTMLButtonElement;

  private saveNameCaption = document.querySelector('span#save-name-caption') as HTMLSpanElement;

  private isFilterApplied: boolean = false;

  private data = new SaveDataService();

  private filterComp: FilterComponent;

  private saveComp: SaveStateComponent;

  constructor() {
    this.filterComp = new FilterComponent(this.data);

    this.saveComp = new SaveStateComponent(this.data);
  }

  init(): void {
    this.showRectBtn.addEventListener('click', showRectHandler);

    this.applyBtn.addEventListener('click', () => {
      if (this.isFilterApplied) {
        this.isFilterApplied = false;
        this.applyBtn.innerText = 'apply';
        changeFilterHandler(DEFAULT_VALUE);
        // chrome.action.setBadgeText({ text: '' });
        // chrome.action.setBadgeBackgroundColor({ color: '#000' });
      } else {
        this.isFilterApplied = true;
        this.applyBtn.innerText = 'cancel';
        changeFilterHandler(this.data.currentFilterState);
        // chrome.action.setBadgeText({ text: 'ON' });
        // chrome.action.setBadgeBackgroundColor({ color: '#000' });
      }
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
    });

    this.data.addEventListener(DataEvent.Selected, () => {
      this.filterComp.updateView();
      this.updateSaveNameCaption();
      this.applyContextScript();
    });

    this.data.addEventListener(DataEvent.Saved, () => {
      this.updateSaveNameCaption();
      this.saveComp.list.update();
      this.applyContextScript();
    });

    this.data.addEventListener(DataEvent.Deleted, () => {
      this.updateSaveNameCaption();
    });
  }

  applyContextScript(): void {
    if (this.isFilterApplied) {
      changeFilterHandler(this.data.currentFilterState);
    }
  }

  updateSaveNameCaption(): void {
    const currentName = this.data.currentSaveName ? ` - ${this.data.currentSaveName}` : '';
    this.saveNameCaption.textContent = currentName;
  }
}
