import { APPLY_BTN_CAPTION, CANCEL_BTN_CAPTION, DEFAULT_FILTER } from '../constants';
import filterData from '../services/filter-data';
import appState from '../services/app-state';
import { showRectHandler } from '../context/show-rect';
import { applyFilterToContext } from '../context/filter-to-context';
import { updateTabBadge } from './badge';

export default class PageControlsComponent {
  private showRectBtn = document.querySelector('button#show-rect-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('button#apply-btn') as HTMLButtonElement;

  constructor() {
    this.showRectBtn.addEventListener('click', showRectHandler);

    this.applyBtn.addEventListener('click', () => {
      if (appState.filterApplied) {
        appState.filterApplied = false;
        this.applyBtn.innerText = APPLY_BTN_CAPTION;
        applyFilterToContext(DEFAULT_FILTER);

        updateTabBadge();
      } else {
        appState.filterApplied = true;
        this.applyBtn.innerText = CANCEL_BTN_CAPTION;
        applyFilterToContext(filterData.getState());

        updateTabBadge();
      }

      appState.saveSessionState();
    });
  }

  updateApplyBtn(): void {
    if (appState.filterApplied) {
      this.applyBtn.innerText = CANCEL_BTN_CAPTION;
      applyFilterToContext(filterData.getState());

      updateTabBadge();
    } else {
      this.applyBtn.innerText = APPLY_BTN_CAPTION;
      applyFilterToContext(DEFAULT_FILTER);

      updateTabBadge();
    }
  }
}
