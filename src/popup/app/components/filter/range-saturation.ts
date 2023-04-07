import { DEFAULT_VALUE } from '../../constants';
import FilterStateService from '../../services/filter';

export default class SaturationRangeComponent {
  private filter: FilterStateService;

  private element: HTMLElement;

  private controlValue: HTMLParagraphElement;

  private range: HTMLInputElement;

  private btn: HTMLInputElement;

  constructor(filter: FilterStateService) {
    this.filter = filter;

    this.element = document.querySelector('#component-saturation') as HTMLElement;
    this.controlValue = this.element.querySelector('.ctrl__value') as HTMLParagraphElement;
    this.range = this.element.querySelector('input') as HTMLInputElement;
    this.btn = this.element.querySelector('button') as HTMLInputElement;

    this.range.value = this.filter.saturation.toString();

    this.range.addEventListener('input', () => {
      this.filter.saturation = Number(this.range.value);
    });

    this.controlValue.textContent = this.range.value;

    this.btn.addEventListener('click', () => {
      this.reset();
    });
  }

  update() {
    this.range.value = this.filter.saturation.toString();
    this.controlValue.textContent = this.range.value;
  }

  reset() {
    this.filter.saturation = DEFAULT_VALUE.saturation;
  }
}
