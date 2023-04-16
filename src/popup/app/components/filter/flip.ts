import { DEFAULT_VALUE } from '../../constants';
import filterData from '../../services/filter-state';

export default class FlipVideoComponent {
  private element: HTMLInputElement;

  constructor() {
    this.element = document.querySelector('input#input-flip') as HTMLInputElement;

    this.element.checked = filterData.isFlipped;

    this.element.addEventListener('change', () => {
      filterData.isFlipped = this.element.checked;
    });
  }

  update(): void {
    this.element.checked = filterData.isFlipped;
  }

  reset(): void {
    filterData.isFlipped = DEFAULT_VALUE.isFlipped;
    this.update();
  }
}
