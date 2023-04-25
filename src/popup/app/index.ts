import FilterComponent from './components/filter';
import { FilterEvent } from './services/app-events';
import filterData from './services/filter-data';
import appState from './services/app-state';
import SavesListComponent from './components/saves-list';
import { applyFilterToContext } from './context/filter-to-context';
import PageControlsComponent from './components/page-controls';
import { updateLayout } from './layout';

export default class RootComponent {
  private pageControlsComp: PageControlsComponent;

  private filterComp: FilterComponent;

  private savesListComp: SavesListComponent;

  constructor() {
    updateLayout();
    this.pageControlsComp = new PageControlsComponent();
    this.filterComp = new FilterComponent();
    this.savesListComp = new SavesListComponent();
  }

  init(): void {
    const applyContextScript = (): void => {
      if (appState.filterApplied) {
        applyFilterToContext(filterData.getState());
      }
    };

    filterData.addEventListener(FilterEvent.UserChange, () => {
      appState.setCurrentSaveName('');
      this.savesListComp.clearSelected();
      this.filterComp.updateCaption();
      applyContextScript();
    });

    appState.addEventListener(FilterEvent.Loaded, () => {
      this.pageControlsComp.updateApplyBtn();
      this.filterComp.updateView();
      this.filterComp.updateCaption();
      this.savesListComp.update();
    });

    appState.addEventListener(FilterEvent.Selected, () => {
      this.filterComp.updateView();
      this.filterComp.updateCaption();
      applyContextScript();
    });

    appState.addEventListener(FilterEvent.Saved, () => {
      this.filterComp.updateCaption();
      this.savesListComp.update();
      applyContextScript();
    });

    appState.addEventListener(FilterEvent.Deleted, () => {
      this.filterComp.updateCaption();
    });
  }
}
