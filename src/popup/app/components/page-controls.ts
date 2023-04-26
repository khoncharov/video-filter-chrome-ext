import AppStateService from '../services/app-state';
import { APPLY_BTN_CAPTION, CANCEL_BTN_CAPTION, DEFAULT_FILTER } from '../constants';
import { applyFilterToContext } from '../context/filter-to-context';
import { showRectHandler } from '../context/show-rect';
import { updateTabBadge } from './badge';

export default class PageControlsComponent {
  private showRectBtn = document.querySelector('button#show-rect-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('button#apply-btn') as HTMLButtonElement;

  private appState: AppStateService;

  constructor(appState: AppStateService) {
    this.appState = appState;

    this.showRectBtn.addEventListener('click', showRectHandler);

    this.applyBtn.addEventListener('click', () => {
      if (appState.filterApplied) {
        this.appState.filterApplied = false;
        this.applyBtn.innerText = APPLY_BTN_CAPTION;
        applyFilterToContext(DEFAULT_FILTER);

        updateTabBadge(this.appState);
      } else {
        this.appState.filterApplied = true;
        this.applyBtn.innerText = CANCEL_BTN_CAPTION;
        applyFilterToContext(this.appState.filterData.getState());

        updateTabBadge(this.appState);
      }

      appState.saveSessionState();
    });
  }

  updateApplyBtn(): void {
    if (this.appState.filterApplied) {
      this.applyBtn.innerText = CANCEL_BTN_CAPTION;
      applyFilterToContext(this.appState.filterData.getState());

      updateTabBadge(this.appState);
    } else {
      this.applyBtn.innerText = APPLY_BTN_CAPTION;
      applyFilterToContext(DEFAULT_FILTER);

      updateTabBadge(this.appState);
    }
  }
}
