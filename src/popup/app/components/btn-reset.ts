import FilterStateService from '../services/filter';

export default class ResetBtnComponent {
  private element = document.querySelector('#btn-reset') as HTMLButtonElement;

  private filter: FilterStateService;

  constructor(filter: FilterStateService) {
    this.filter = filter;

    this.element.addEventListener('click', () => {
      this.filter.reset();
    });
  }
}
