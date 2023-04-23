import { DEFAULT_FILTER } from '../constants';
import filterData from '../services/filter-data';
import appState from '../services/app-state';
import { showRectHandler } from '../context/show-rect';
import { applyFilterToContext } from '../context/filter-to-context';

export default class PageControlsComponent {
  private showRectBtn = document.querySelector('button#show-rect-btn') as HTMLButtonElement;

  private applyBtn = document.querySelector('button#apply-btn') as HTMLButtonElement;

  constructor() {
    this.showRectBtn.addEventListener('click', showRectHandler);

    this.applyBtn.addEventListener('click', () => {
      if (appState.filterApplied) {
        appState.filterApplied = false;
        this.applyBtn.innerText = 'apply';
        applyFilterToContext(DEFAULT_FILTER);

        const queryOptions = { active: true, lastFocusedWindow: true };
        chrome.tabs.query(queryOptions).then((res) => {
          const [tab] = res;
          chrome.action.setBadgeText({ tabId: tab.id, text: '' });
          chrome.action.setBadgeBackgroundColor({ tabId: tab.id, color: '#000' });
        });
      } else {
        appState.filterApplied = true;
        this.applyBtn.innerText = 'cancel';
        applyFilterToContext(filterData.getState());

        const queryOptions = { active: true, lastFocusedWindow: true };
        chrome.tabs.query(queryOptions).then((res) => {
          const [tab] = res;
          chrome.action.setBadgeText({ tabId: tab.id, text: 'ON' });
          chrome.action.setBadgeBackgroundColor({ tabId: tab.id, color: '#000' });
        });
      }
    });
  }
}
