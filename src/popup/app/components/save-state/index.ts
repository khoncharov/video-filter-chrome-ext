import filterState from '../../services/data';
import InputFormComponent from './input-form';
import createSaveItem from './save-item';

export default class SavesListComponent {
  private list = document.querySelector('ul#list-saves') as HTMLUListElement;

  private inputForm: InputFormComponent;

  constructor() {
    this.inputForm = new InputFormComponent();
  }

  update(): void {
    this.list.innerHTML = '';
    filterState.savesStorage.forEach((value, name) => {
      const item = createSaveItem(name);
      this.list.appendChild(item);
      item.scrollIntoView({ behavior: 'smooth' }); // FIXME - func for save operation
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
