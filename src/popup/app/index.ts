import AppStateService from './services/app-state';
import FilterComponent from './components/filter';
import FilterDataService from './services/filter-data';
import PageControlsComponent from './components/page-controls';
import SavesListComponent from './components/saves-list';
import { applyFilterToContext } from './context/filter-to-context';
import { FilterEvent } from './services/app-events';
import { updateLayout } from './layout';

export default class RootComponent {
  private filterData: FilterDataService;

  private appState: AppStateService;

  private pageControlsComp: PageControlsComponent;

  private filterComp: FilterComponent;

  private savesListComp: SavesListComponent;

  constructor() {
    updateLayout();

    this.filterData = new FilterDataService();
    this.appState = new AppStateService(this.filterData);

    this.pageControlsComp = new PageControlsComponent(this.appState);
    this.filterComp = new FilterComponent(this.appState);
    this.savesListComp = new SavesListComponent(this.appState);
  }

  init(): void {
    const applyContextScript = (): void => {
      if (this.appState.filterApplied) {
        applyFilterToContext(this.filterData.getState());
      }
    };

    this.filterData.addEventListener(FilterEvent.UserChange, () => {
      this.appState.setCurrentSaveName('');
      this.savesListComp.clearSelected();
      this.filterComp.updateCaption();
      applyContextScript();
    });

    this.appState.addEventListener(FilterEvent.Loaded, () => {
      this.pageControlsComp.updateApplyBtn();
      this.filterComp.updateView();
      this.filterComp.updateCaption();
      this.savesListComp.update();
    });

    this.appState.addEventListener(FilterEvent.Selected, () => {
      this.filterComp.updateView();
      this.filterComp.updateCaption();
      applyContextScript();
    });

    this.appState.addEventListener(FilterEvent.Saved, () => {
      this.filterComp.updateCaption();
      this.savesListComp.update();
      applyContextScript();
    });

    this.appState.addEventListener(FilterEvent.Deleted, () => {
      this.filterComp.updateCaption();
    });
  }
}
