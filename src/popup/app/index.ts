import FilterComponent from './components/filter';
import { DEFAULT_VALUE } from './constants';
import { FilterEvent } from './services/types';
import filterData from './services/filter-data';
import appState from './services/app-state';
import SavesListComponent from './components/saves-list';
import { showRectHandler } from './context/show-rect';
import { applyFilterToContext } from './context/filter-to-context';

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
        applyFilterToContext(DEFAULT_VALUE);
      } else {
        this.isFilterApplied = true;
        this.applyBtn.innerText = 'cancel';
        applyFilterToContext(filterData.getState());
      }
    });

    filterData.addEventListener(FilterEvent.UserChange, () => {
      appState.setCurrentSaveName('');
      this.savesListComp.clearSelected();
      this.updateSaveNameCaption();
      this.applyContextScript();
    });

    appState.addEventListener(FilterEvent.Loaded, () => {
      this.filterComp.updateView();
      this.updateSaveNameCaption();
      this.savesListComp.redraw();
    });

    appState.addEventListener(FilterEvent.Selected, () => {
      this.filterComp.updateView();
      this.updateSaveNameCaption();
      this.applyContextScript();
    });

    appState.addEventListener(FilterEvent.Saved, () => {
      this.updateSaveNameCaption();
      this.savesListComp.redraw();
      this.applyContextScript();
    });

    appState.addEventListener(FilterEvent.Deleted, () => {
      this.updateSaveNameCaption();
    });
  }

  applyContextScript(): void {
    if (this.isFilterApplied) {
      applyFilterToContext(filterData.getState());
    }
  }

  updateSaveNameCaption(): void {
    this.saveNameCaption.textContent = appState.getCurrentSaveName()
      ? ` - ${appState.getCurrentSaveName()}`
      : '';
  }
}
