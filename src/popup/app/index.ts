import FilterComponent from './components/filter';
import { FilterEvent } from './services/types';
import filterData from './services/filter-data';
import appState from './services/app-state';
import SavesListComponent from './components/saves-list';
import { applyFilterToContext } from './context/filter-to-context';
import PageControlsComponent from './components/page-controls';

export default class RootComponent {
  private pageControlsComp: PageControlsComponent;

  private filterComp: FilterComponent;

  private savesListComp: SavesListComponent;

  constructor() {
    this.pageControlsComp = new PageControlsComponent();
    this.filterComp = new FilterComponent();
    this.savesListComp = new SavesListComponent();
  }

  init(): void {
    filterData.addEventListener(FilterEvent.UserChange, () => {
      appState.setCurrentSaveName('');
      this.savesListComp.clearSelected();
      this.filterComp.updateCaption();
      this.applyContextScript();
    });

    appState.addEventListener(FilterEvent.Loaded, () => {
      this.filterComp.updateView();
      this.filterComp.updateCaption();
      this.savesListComp.redraw();
    });

    appState.addEventListener(FilterEvent.Selected, () => {
      this.filterComp.updateView();
      this.filterComp.updateCaption();
      this.applyContextScript();
    });

    appState.addEventListener(FilterEvent.Saved, () => {
      this.filterComp.updateCaption();
      this.savesListComp.redraw();
      this.applyContextScript();
    });

    appState.addEventListener(FilterEvent.Deleted, () => {
      this.filterComp.updateCaption();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  applyContextScript(): void {
    if (appState.filterApplied) {
      applyFilterToContext(filterData.getState());
    }
  }
}
