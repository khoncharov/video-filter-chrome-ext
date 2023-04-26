import AppStateService from '../../services/app-state';
import { DEFAULT_FILTER } from '../../constants';

export default class FlipVideoComponent {
  private element: HTMLInputElement;

  private appState: AppStateService;

  constructor(appState: AppStateService) {
    this.appState = appState;

    this.element = document.querySelector('input#input-flip') as HTMLInputElement;

    this.element.checked = this.appState.filterData.isFlipped;

    this.element.addEventListener('change', () => {
      this.appState.filterData.isFlipped = this.element.checked;
    });
  }

  update(): void {
    this.element.checked = this.appState.filterData.isFlipped;
  }

  reset(): void {
    this.appState.filterData.isFlipped = DEFAULT_FILTER.isFlipped;
    this.update();
  }
}
