import FilterComponent from './components/filter';
import { changeFilterHandler, showRectHandler } from './context-utils';
import { DEFAULT_VALUE } from './constants';
import { FilterEvent } from './services/types';
import filterData from './services/filter-data';
import filterState from './services/filter-state';
import SavesListComponent from './components/saves-list';

export default class RootComponent {
  private showRectBtn = document.querySelector('button#show-rect-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('button#apply-btn') as HTMLButtonElement;

  private saveNameCaption = document.querySelector('span#save-name-caption') as HTMLSpanElement;

  private isFilterApplied: boolean = false;

  private filterComp: FilterComponent;

  private savesListComp: SavesListComponent;

  constructor() {
    this.filterComp = new FilterComponent();
    this.savesListComp = new SavesListComponent();
  }

  init(): void {
    this.showRectBtn.addEventListener('click', showRectHandler);

    this.applyBtn.addEventListener('click', () => {
      if (this.isFilterApplied) {
        this.isFilterApplied = false;
        this.applyBtn.innerText = 'apply';
        changeFilterHandler(DEFAULT_VALUE);
      } else {
        this.isFilterApplied = true;
        this.applyBtn.innerText = 'cancel';
      }
    });

    filterData.addEventListener(FilterEvent.UserChange, () => {
      filterState.currentSaveName = '';
      this.savesListComp.clearSelected();
      this.updateSaveNameCaption();
      this.applyContextScript();
    });

    filterState.addEventListener(FilterEvent.Loaded, () => {
      this.filterComp.updateView();
      this.updateSaveNameCaption();
      this.savesListComp.update();
    });

    filterState.addEventListener(FilterEvent.Selected, () => {
      this.filterComp.updateView();
      this.updateSaveNameCaption();
      this.applyContextScript();
    });

    filterState.addEventListener(FilterEvent.Saved, () => {
      this.updateSaveNameCaption();
      this.savesListComp.update();
      this.applyContextScript();
    });

    filterState.addEventListener(FilterEvent.Deleted, () => {
      this.updateSaveNameCaption();
    });
  }

  applyContextScript(): void {
    if (this.isFilterApplied) {
      changeFilterHandler(filterData.getState());
    }
  }

  updateSaveNameCaption(): void {
    const currentName = filterState.currentSaveName ? ` - ${filterState.currentSaveName}` : '';
    this.saveNameCaption.textContent = currentName;
  }
}
