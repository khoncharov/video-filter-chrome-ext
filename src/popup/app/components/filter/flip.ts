/* eslint-disable no-param-reassign */
import FilterStateService from '../../services/filter';

export default class FlipVideoComponent {
  private element = document.querySelector('#input-flip') as HTMLInputElement;

  private filter: FilterStateService;

  constructor(filter: FilterStateService) {
    this.filter = filter;
    this.element.checked = this.filter.isFlipped;

    this.element.addEventListener('change', () => {
      this.filter.isFlipped = this.element.checked;
    });
  }

  update(): void {
    this.element.checked = this.filter.isFlipped;
  }
}
