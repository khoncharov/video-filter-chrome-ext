/* eslint-disable operator-linebreak */
import filterState from '../../services/filter-state';
import InputFormComponent from './input-form';
import createSaveItem from './save-item';

export default class SavesListComponent {
  private list = document.querySelector('ul#list-saves') as HTMLUListElement;

  private inputForm: InputFormComponent;

  constructor() {
    this.inputForm = new InputFormComponent();
  }

  redraw(): void {
    this.list.innerHTML = '';
    filterState.savesStorage.forEach((value, name) => {
      const item = createSaveItem(name);
      this.list.appendChild(item);

      const isSelected =
        item.dataset.name && item.dataset.name === filterState.getCurrentSaveName();

      if (isSelected) {
        item.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }

  clearSelected(): void {
    this.list.querySelectorAll('input').forEach((input) => {
      if (input.checked) {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      }
    });
  }
}
