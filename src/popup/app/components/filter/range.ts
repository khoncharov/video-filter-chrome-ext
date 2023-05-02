/* eslint-disable implicit-arrow-linebreak */
import AppStateService from '../../services/app-state';
import { DEFAULT_FILTER } from '../../constants';

type RangeName = 'brightness' | 'contrast' | 'saturation';

export default class RangeComponent {
  private appState: AppStateService;

  private rangeName: RangeName;

  private textValue: HTMLParagraphElement;

  private range: HTMLInputElement;

  private rangeBar: HTMLSpanElement;

  constructor(rangeName: RangeName, appState: AppStateService) {
    this.rangeName = rangeName;
    this.appState = appState;

    const element = document.querySelector(`div#component-${rangeName}`) as HTMLElement;
    this.textValue = element.querySelector('p.ctrl__value') as HTMLParagraphElement;
    this.range = element.querySelector('input') as HTMLInputElement;
    this.rangeBar = element.querySelector('.track-bar') as HTMLSpanElement;
    const resetBtn = element.querySelector('button') as HTMLButtonElement;

    this.update();

    this.rangeBar.style.width = this.getBarWidth();

    this.range.addEventListener('input', () => {
      this.appState.filterData[`${rangeName}`] = Number(this.range.value);
      this.update();
    });

    resetBtn.addEventListener('click', () => {
      this.reset();
    });
  }

  private getBarWidth = () =>
    `${(Number(this.range.clientWidth) * Number(this.range.value)) / Number(this.range.max)}px`;

  update() {
    this.range.value = this.appState.filterData[`${this.rangeName}`].toString();
    this.rangeBar.style.width = this.getBarWidth();
    this.textValue.textContent = this.range.value;
  }

  reset() {
    this.appState.filterData[`${this.rangeName}`] = DEFAULT_FILTER[`${this.rangeName}`];
    this.update();
  }
}
